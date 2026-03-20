'use client'

import React from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import MomentumNavBar from "./components/MomentumNavBar"
import MomentumCard from "./components/MomentumCard"


type DashboardProps = {
  user: User | null
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const supabase = getSupabaseBrowserClient()
  const router = useRouter()

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
          <div className="w-full border-l-px text-black">
            Insights
          </div>
        </section>

        {/* CARD SECTION */}
        <section className="w-full max-w-[85%] mt-6 grid grid-cols-2 lg:grid-cols-2 gap-8">
          <MomentumCard title="Strava" icon={'/strava-logo.svg'} />
        </section>


      </div>
    </main>
  )
}

export default Dashboard