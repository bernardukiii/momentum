'use client'

import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client'
import { User } from '@supabase/supabase-js'
import { useState } from 'react'
import Image from "next/image"

type SignUpProps = {
    user: User | null
    onSwitch: () => void
}

const SignUp: React.FC<SignUpProps> = ({ user, onSwitch }) => {
  const supabase = getSupabaseBrowserClient()

  // 1. Input State Listeners
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  // Status and Loading states
  const [signUpStatus, setSignUpStatus] = useState('')
  const [loading, setLoading] = useState(false)

  // 2. Handle submit
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSignUpStatus('')
    
    // Check if passwords match
    if (password !== confirmPassword) {
        setSignUpStatus("Passwords do not match!")
        return
    }

    setLoading(true)

    const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
    })

    setLoading(false)

    if (error) {
        setSignUpStatus(error.message)
    } else {
        setSignUpStatus("Check your inbox to confirm your new account!")
    }
  }

  // Determine if button should be active (both fields filled + passwords match)
  const isFormValid = email.length > 0 && password.length >= 6 && password === confirmPassword
  
  return (
    <main className="overflow-hidden">
        <div className="h-screen flex flex-col justify-around items-center bg-linear-to-t from-momentum-primary-purple via-momentum-bg-soft via-90% to-white">
          <section className="w-full flex flex-col justify-between items-center">
            <div className="w-11/12 md:w-[450px] bg-momentum-bg-card rounded-2xl shadow-2xl p-8 mt-8 md:mt-0">
              <div className="w-full">
                
                <div className="mb-8">
                  <h1 className="text-momentum-black font-bold text-4xl mb-2">Create your dashboard!</h1>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Email Input */}
                  <div className="flex flex-col">
                    <label className="text-momentum-black-64 font-semibold mb-2 text-sm">E-mail</label>
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="h-11 bg-momentum-gray-secondary text-black rounded-lg px-4 outline-none border border-transparent focus:border-momentum-primary-purple transition-all"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="flex flex-col">
                    <label className="text-momentum-black-64 font-semibold mb-2 text-sm">Password</label>
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-11 bg-momentum-gray-secondary text-black rounded-lg px-4 outline-none border border-transparent focus:border-momentum-primary-purple transition-all"
                    />
                  </div>

                  {/* Repeat Password Input */}
                  <div className="flex flex-col">
                    <label className="text-momentum-black-64 font-semibold mb-2 text-sm">Repeat password</label>
                    <input 
                      type="password" 
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-11 bg-momentum-gray-secondary text-black rounded-lg px-4 outline-none border border-transparent focus:border-momentum-primary-purple transition-all"
                    />
                  </div>

                  <p className="text-center text-sm text-momentum-black-64">
                    Already have an account?
                    <button type="button" onClick={onSwitch} className="ml-1 text-momentum-primary-purple font-bold hover:underline">
                        Log In
                    </button>
                  </p>

                  <button 
                    type="submit"
                    disabled={!isFormValid || loading}
                    className={ isFormValid ? 
                                "w-full h-12 bg-momentum-primary-purple hover:bg-momentum-primary-indigo-hover text-white font-bold rounded-lg shadow-lg shadow-momentum-primary-purple/20 transition-all active:scale-[0.98] disabled:opacity-70"
                                :
                                "w-full h-12 bg-momentum-primary-purple text-white font-bold rounded-lg shadow-lg shadow-momentum-primary-purple/20 transition-all opacity-50 pointer-events-none" }
                    >
                    {loading ? "Creating account..." : "Continue to dashboard"}
                  </button>
                </form>

                {signUpStatus && (
                    <p className={`mt-4 text-center text-sm font-semibold ${signUpStatus.includes('Check') ? 'text-green-600' : 'text-red-500'}`}>
                        {signUpStatus}
                    </p>
                )}

              </div>
            </div>
          </section>
        </div>
    </main>
  )
}

export default SignUp