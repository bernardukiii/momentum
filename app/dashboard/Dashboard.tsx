'use client'

import React from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import MomentumNavBar from "./components/MomentumNavBar"

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

      <div className="w-full max-w-md bg-momentum-bg-card rounded-2xl shadow-xl p-8 text-center border border-momentum-gray-primary">
        {/* User Avatar / Icon placeholder */}
        <div className="w-20 h-20 bg-momentum-primary-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">👋</span>
        </div>

        <h1 className="text-momentum-black font-bold text-3xl mb-2">
          Welcome back {displayName}!
        </h1>
        
        <p className="text-momentum-black-64 font-medium mb-8">
          Logged in with: <span className="text-momentum-primary-purple">{user?.email}</span>
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-momentum-gray-secondary rounded-lg text-left">
            <p className="text-xs font-bold text-momentum-black-64 uppercase tracking-wider mb-1">Status</p>
            <p className="text-momentum-midnight-indigo font-semibold">Active Session</p>
          </div> 
        </div>
      </div>
    </main>
  )
}

export default Dashboard