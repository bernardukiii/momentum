'use client'

import React from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import { syncStravaActivities } from "@/lib/strava/syncActivities"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import Image from "next/image"
import MomentumNavBar from "./components/MomentumNavBar"
import MomentumCard from "./components/MomentumCard"
import StravaSummary from "./components/strava/StravaSummary"


type DashboardProps = {
  user: User | null
}


const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const supabase = getSupabaseBrowserClient()
  const router = useRouter()

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
          
          // 3. Refresh the UI so the StravaSummary card shows the new data
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
  const displayName = user?.user_metadata?.full_name || user?.email || "Guest";
  const userInitial = displayName.charAt(0).toUpperCase();

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

  return (
    <main className="w-full min-h-screen bg-linear-to-t from-momentum-primary-purple via-momentum-bg-soft via-90% to-white">
      <MomentumNavBar userName={displayName} handleSignOut={handleSignOut} />
      
      <div className="flex flex-col justify-center items-center mt-6">
        {/* HEADER SECTION - WILL EVENTUALLY CONTAIN SOME INSIGHTS ON THE RIGHT SIDE */}
        <section className="flex justify-center items-center w-full max-w-[95%] bg-momentum-bg-card rounded-2xl shadow-xl p-8 text-center border border-momentum-gray-primary" >
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
          <div className="w-full flex justify-between items-center border-l-px text-black">
            {/* STRAVA */}
            <div className="w-full">
              {/* Google Provider */}
                              <div className="space-y-3 mb-8 cursor-pointer">
                                <button 
                                  type="button"
                                  className="w-3/4 h-12 px-4 flex justify-center pointer-events-auto items-center border border-momentum-gray-primary rounded-lg hover:bg-momentum-gray-secondary transition-colors group"
                                  onClick={handleStravaAuth}
                                >
                                  <Image src="/strava-logo.svg" width={24} height={24} alt="strava-icon" />
                                  <span className="ml-3 font-semibold text-momentum-midnight-indigo">Get Strava activities</span>
                                </button>
                              </div>
            </div>
            {/* COFFE INTAKE COUNTER MAYBE */}
            <div className="w-full">
              COFFEE TRACKER MAYBE
            </div>
          </div>
        </section>

        {/* CARD SECTION */}
        <section className="w-full max-w-[85%] mt-6 grid grid-cols-2 lg:grid-cols-2 gap-8">
          <MomentumCard title="Strava" icon={'/strava-logo.svg'}>
            <StravaSummary />
          </MomentumCard>
        </section>


      </div>
    </main>
  )
}

export default Dashboard