'use client'

// react + nextjs imports
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
// supabase + strava imports
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import { syncStravaActivities } from "@/lib/strava/syncActivities"
import { User } from "@supabase/supabase-js"
// utility function imports
import { getWeeklyCalories } from "@/lib/utility-functions"
// importing store
import { useMomentumGlobalStore } from "@/lib/store/momentumGlobalStore"
// component imports
import Image from "next/image"
import MomentumNavBar from "../../components/momentum/MomentumNavBar"
import MomentumCard from "../../components/momentum/MomentumCard"
import ActivityChart from "./components/strava/ActivityChart"
import ActivityNumbers from "./components/strava/ActivityNumbers"
import AmortizationPopUp from "./components/amortization/AmortizationPopUp"


type DashboardProps = {
  user: User | null
}


const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const supabase = getSupabaseBrowserClient()
  const router = useRouter()
  // setting store
  const setActivities = useMomentumGlobalStore((state) => state.setActivities)
  // state
  const activities = useMomentumGlobalStore((state) => state.activities)
  const isLoaded = useMomentumGlobalStore((state) => state.isLoaded)
  const [isPopUpOpen, setPopUpOpen] = useState(false)
  const [bike, setBike] = useState<any>(null)

  // Caloric spenditure
  const weeklyTotal = getWeeklyCalories(activities)
  // comparing to bitterball just for fun
  const bitterballenEquivalent = Math.floor(weeklyTotal / 55)
  // Simple percentage for a gauge (e.g., goal of 4000 kcal/week)
  const calorieProgress = Math.min((weeklyTotal / 4000) * 100, 100)

  //// Strava auth to start getting activities ////
  // Handle window
  const handleStravaAuth = () => {
    if (!user) return alert("Please log in first"); // Safety guard just in case
    
    const width = 500
    const height = 600
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2

    const STRAVA_AUTH_URL = `https://www.strava.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI}&response_type=code&scope=read,activity:read_all`

    // Open the popup
    const popup = window.open(
      STRAVA_AUTH_URL,
      "Strava Login",
      `width=${width},height=${height},top=${top},left=${left}`
    )

    // Listen for the "success" message from the popup
    const receiveMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return

      if (event.data.type === "STRAVA_AUTH_SUCCESS") {
        const code = event.data.code
        
        // Clean up window/listener first
        window.removeEventListener("message", receiveMessage)
        popup?.close()

        try {
          // 1. Exchange the code for the real Access Token
          const res = await fetch('/api/strava/exchange', {
            method: 'POST',
            body: JSON.stringify({ code })
          })
          const { accessToken } = await res.json()

          if (!accessToken) throw new Error("No access token received")

          // 2. sync the activities with the actual token
          // userId comes from your props: user.id
          await syncStravaActivities(accessToken, user!.id)
          
          // 3. Refresh the UI so the ActivitySummary card shows the new data
          router.refresh()
          
          console.log("Sync Complete!")
        } catch (err: any) {
          console.error("Exchange or Sync failed:", err)
          console.error("Detailed Sync Error:", err.message || err);
        }
      }
    }

    window.addEventListener("message", receiveMessage)
  }

  // username
  const displayName = user?.user_metadata?.full_name || user?.email || "Guest"

  async function handleSignOut() {
    // 1. Tell Supabase to kill the session
    const { error } = await supabase.auth.signOut()
    
    if (!error) {
      // 2. Clear the server-side cache and redirect
      router.refresh() 
      router.push('/login')
    } else {
      console.error("Error signing out:", error.message)
    }
  }

  // fetch bike data if any
  // 1. get the bike from the DB and put it in state
  const loadBikeFromDb = async () => {
    if (!user?.id) return
    const { data, error } = await supabase
      .from('bikes')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle() // if no bike exists yet

    if (data && !error) {
      setBike(data)
    }
  }

  // 2. calculate history and update the bike
  const syncBikeWithHistory = async (bikeId: string) => {
    if (!user?.id) return

    // Get sum of all 'Ride' distances
    const { data: activitySum, error: sumError } = await supabase
      .from('activities')
      .select('distance')
      .eq('user_id', user.id)
      .eq('type', 'Ride')

    if (sumError) return

    const totalHistoryKm = activitySum.reduce((acc, curr) => acc + (curr.distance / 1000), 0)

    // Update the bike record with this historical total
    const { error: updateError } = await supabase
      .from('bikes')
      .update({ total_km: totalHistoryKm })
      .eq('id', bikeId)

    if (!updateError) {
      // Refresh the state so the card shows the new total_km
      loadBikeFromDb()
    }
  }

  // Initial Load: Just get the bike if it exists
  useEffect(() => {
    if (user) loadBikeFromDb()
  }, [user])

  // useEffect to hydrate with zustand store
  useEffect(() => {
    // 1. Define the fetcher
    const fetchUserActivities = async () => {
      if (!user?.id) return

      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('start_date', { ascending: false })

      if (error) {
        console.error("Error hydration store:", error.message)
        return
      }

      // 2. Fill Zustand 
      if (data) {
        setActivities(data)
      }
    }

    // 3. Only fetch if we haven't loaded yet this session
    if (!isLoaded && user) {
      fetchUserActivities()
    }
  }, [user, isLoaded, setActivities, supabase])

  return (
    <main className="w-full min-h-screen bg-linear-to-t from-momentum-primary-purple-light via-momentum-bg-soft via-100% to-white">
      <MomentumNavBar userName={displayName} handleSignOut={handleSignOut} />
      
      <div className="flex flex-col justify-center items-center mt-6
      ">
        {/* HEADER SECTION - WILL EVENTUALLY CONTAIN SOME INSIGHTS ON THE RIGHT SIDE */}
        <section className="flex justify-center items-center w-full max-w-[95%] bg-momentum-bg-card rounded-2xl shadow-xl p-8 text-center border border-momentum-gray-primary
            rounded-4xl shadow-sm hover:shadow-md transition-all group overflow-hidden
          bg-white/50 backdrop-blur-md border border-white/30 shadow-lg
        
        
        " >
          {/* LEFT SIDE - WELCOME AND LOGIN */}
          <div className="w-full border-r-px">
            {/* User Avatar / Icon placeholder */}
            <div className="flex justify-center items-center mb-2">
              <div className="w-20 h-20 bg-momentum-primary-purple/10 rounded-full flex items-center justify-center mx-4">
                <span className="text-3xl">👋</span>
              </div>

              <div className="flex justify-center items-center">
                <h1 className="text-momentum-black font-bold text-3xl mb-2">
                  Welcome back {displayName}!
                </h1>
              </div>
            </div>
            
            <div className="flex flex-col justify-center items-center">
              <p className="text-momentum-black-64 font-medium mb-8">
                Logged in with: <span className="text-momentum-primary-purple">{user?.email}</span>
              </p>
            </div>
          </div>
          {/* RIGHT SIDE - QUICK SNAP INSIGHTS */}
          <div className="w-full flex items-center justify-end border-l-px text-black">
            <div>
               {/* STRAVA BUTTON */}
              <div className="mb-8 cursor-pointer">
                <button 
                  type="button"
                  className="w-3/4 h-full p-4 flex flex-col justify-center pointer-events-auto items-center border border-momentum-gray-primary rounded-lg hover:bg-momentum-gray-secondary transition-colors group"
                  onClick={handleStravaAuth}
                >
                  <Image src="/strava-logo.svg" width={24} height={24} alt="strava-icon" />
                  <span className="m-2 font-semibold text-momentum-midnight-indigo">Get/Update Strava activities</span>
                </button>
              </div>
            </div>
            {/* Calculate amortization */}
            <div>
              <div className="mb-8 cursor-pointer">
                <button 
                  type="button"
                  className="w-3/4 h-full p-4 flex flex-col justify-center pointer-events-auto items-center border border-momentum-gray-primary rounded-lg hover:bg-momentum-gray-secondary transition-colors group"
                  onClick={() => setPopUpOpen(true)}
                >
                  <Image src="/amortization-icon.png" width={24} height={24} alt="amortization-icon" />
                  <span className="m-2 font-semibold text-momentum-midnight-indigo">Calculate bike amortization</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CARD SECTION */}
        <section className="w-full max-w-[85%] mt-6 flex justify-around items-start">
          <MomentumCard title="Activity chart" icon={'/strava-logo.svg'}>
            <ActivityChart />
          </MomentumCard>

          <MomentumCard title="Activities" icon={'/strava-logo.svg'}>
            <ActivityNumbers />
          </MomentumCard>

          {/* WEEKLY CALORIC BURN CARD */}
          <MomentumCard title="Weekly Active Burn" icon="/nutrition.svg">
            <div className="p-5 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Last 7 Days
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-black text-momentum-black tracking-tighter">
                      {weeklyTotal.toLocaleString()}
                    </p>
                    <span className="text-sm font-bold text-orange-500 uppercase">kcal</span>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-2 rounded-xl">
                  <span className="text-xl">🔥</span>
                </div>
              </div>

              {/* Visual Gauge */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  <span>Baseline</span>
                  <span>Peak Performance</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-1000" 
                    style={{ width: `${calorieProgress}%` }}
                  />
                </div>
              </div>

              {/* Fun Insight */}
              <div className="mt-4 pt-4 border-t border-slate-50">
                <p className="text-lg text-slate-500 font-medium italic">
                  That's roughly <span className="text-momentum-black font-bold">{bitterballenEquivalent} bitterballen</span>!
                </p>
              </div>
            </div>
          </MomentumCard>


          {/* IF BIKE DATA, NEW CARD TO DISPLAY THE AMORTIZATION */}
          {bike ? (
            <MomentumCard title="Bike Amortization" icon="/bike-icon.svg">
              <div className="p-5 space-y-5">
                {/* Header Info */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bike</p>
                    <h3 className="text-xl font-black text-momentum-black leading-tight">
                      {bike.brand} <span className="text-momentum-primary-purple">{bike.model}</span>
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Spent on bike</p>
                    <p className="font-bold text-slate-700">€{bike.price}</p>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <p className="text-4xl font-black text-momentum-black">
                      {Math.min(((bike.total_km * 0.41) / bike.price) * 100, 100).toFixed(1)}%
                    </p>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase italic">
                      €{(bike.total_km * 0.41).toFixed(2)} amortized
                    </p>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                    <div 
                      className="h-full bg-linear-to-r from-emerald-400 to-teal-500 transition-all duration-1000" 
                      style={{ width: `${Math.min(((bike.total_km * 0.41) / bike.price) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Footer Stats */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-50/50 p-3 rounded-2xl border border-white">
                    <p className="text-[9px] uppercase font-bold text-slate-400">Lifetime KM</p>
                    <p className="text-lg font-black text-slate-700">{bike.total_km.toFixed(0)}</p>
                  </div>
                  <div className="bg-slate-50/50 p-3 rounded-2xl border border-white">
                    <p className="text-[9px] uppercase font-bold text-slate-400">Est. Weeks Left</p>
                    <p className="text-lg font-black text-slate-700">
                      {Math.ceil((bike.price - (bike.total_km * 0.41)) / (0.41 * 40)) || 0}
                    </p>
                  </div>
                </div>
              </div>
            </MomentumCard>
          ) : (
            /* Empty State - Click to add bike */
            ''
          )}


        </section>
      </div>

        <AmortizationPopUp 
          isOpen={isPopUpOpen} 
          onClose={() => setPopUpOpen(false)} 
          userId={user.id}
          onSuccess={(newBikeId) => syncBikeWithHistory(newBikeId)}
        />
    </main>
  )
}

export default Dashboard