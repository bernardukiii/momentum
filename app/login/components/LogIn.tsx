'use client'

import { User } from '@supabase/supabase-js'
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client'
import { useState } from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation' // Added for redirecting

type LogInProps = {
    user: User | null
    onSwitch: () => void
}

const LogIn: React.FC<LogInProps> = ({ user, onSwitch }) => {
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()
  
  // 1. Input Listeners
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // Status and Loading
  const [signInStatus, setSignInStatus] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle submit
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSignInStatus('')
    setLoading(true)

    const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        setSignInStatus(error.message)
        setLoading(false)
    } else {
        setSignInStatus("Success! Redirecting...")
        // 2. Refresh the page or push to dashboard to update server session
        router.push('/dashboard')
        router.refresh()
    }
  }

  // Logic to enable button
  const canSubmit = email.length > 0 && password.length > 0
  
  return (
    <main className="overflow-hidden">
        <div className="h-screen flex flex-col justify-around items-center bg-linear-to-t from-momentum-primary-purple via-momentum-bg-soft via-90% to-white">
          <section className="w-full flex flex-col justify-between items-center">
            
            <div className="w-11/12 md:w-[450px] bg-momentum-bg-card rounded-2xl shadow-2xl p-8 mt-8 md:mt-0">
              <div className="w-full">
                
                <div className="mb-8">
                  <h1 className="text-momentum-black font-bold text-4xl mb-2">Access your dashboard!</h1>
                </div>

                {/* Google Provider - Note: This requires setup in Supabase dashboard */}
                <div className="space-y-3 mb-8 cursor-pointer">
                  <button 
                    type="button"
                    className="w-full h-12 px-4 flex justify-center items-center border border-momentum-gray-primary rounded-lg hover:bg-momentum-gray-secondary transition-colors group"
                  >
                    <Image src="/Google.png" width={24} height={24} alt="google" />
                    <span className="ml-3 font-semibold text-momentum-midnight-indigo">Log in with Google</span>
                  </button>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <label className="text-momentum-black-64 font-semibold mb-2 text-sm">E-mail</label>
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="h-11 bg-momentum-gray-secondary rounded-lg px-4 outline-none border border-transparent focus:border-momentum-primary-purple transition-all"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-momentum-black-64 font-semibold mb-2 text-sm">Password</label>
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-11 bg-momentum-gray-secondary rounded-lg px-4 outline-none border border-transparent focus:border-momentum-primary-purple transition-all"
                    />
                  </div>

                  <p className="text-center text-sm text-momentum-black-64 mt-4">
                    Don't have an account?
                    <button 
                      type="button" 
                      onClick={onSwitch} 
                      className="ml-1 text-momentum-primary-purple font-bold hover:underline"
                    >
                      Sign Up
                    </button>
                  </p>

                  <button 
                    type="submit"
                    disabled={!canSubmit || loading}
                    className={ canSubmit ? 
                                "w-full h-12 bg-momentum-primary-purple hover:bg-momentum-primary-indigo-hover text-white font-bold rounded-lg shadow-lg shadow-momentum-primary-purple/20 transition-all active:scale-[0.98] disabled:opacity-70"
                                :
                                "w-full h-12 bg-momentum-primary-purple text-white font-bold rounded-lg shadow-lg shadow-momentum-primary-purple/20 transition-all opacity-50 pointer-events-none" }
                    >
                    {loading ? "Signing in..." : "Continue to dashboard"}
                  </button>
                </form>

                {signInStatus && (
                  <p className={`mt-4 text-center text-sm font-semibold ${signInStatus.includes('Success') ? 'text-green-600' : 'text-red-500'}`}>
                    {signInStatus}
                  </p>
                )}

              </div>
            </div>
          </section>
        </div>
    </main>
  )
}

export default LogIn