'use client'

import React from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

type DashboardProps = {
  user: User | null
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const supabase = getSupabaseBrowserClient()
  const router = useRouter()

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()
    
    if (!error) {
      // Refresh to update server-side session and redirect to home/login
      router.push('/')
      router.refresh()
    } else {
      console.error("Error signing out:", error.message)
    }
  }

  return (
    <main className=''>
        <div className="h-screen flex flex-col justify-around items-center bg-linear-to-t from-momentum-primary-purple via-momentum-bg-soft via-90% to-white">
          <section className="w-full flex flex-col justify-between items-center max-w-md px-6 text-center">
            
            <h1 className="text-2xl font-bold mb-4">
              Welcome back, {user?.email}!
            </h1>
            
            <p className="mb-8 text-momentum-black-64">
              This is your private momentum dashboard.
            </p>

            <button 
              onClick={handleSignOut}
              className="w-full h-12 bg-momentum-primary-purple hover:bg-momentum-primary-indigo-hover text-white font-bold rounded-lg shadow-lg shadow-momentum-primary-purple/20 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              SIGN OUT
            </button>
          </section>
        </div>
    </main>
  )
}

export default Dashboard