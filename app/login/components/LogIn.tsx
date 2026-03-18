'use client'

import { User } from '@supabase/supabase-js'
import { useState } from 'react'
import { motion } from "framer-motion"
import Image from "next/image"

type LogInProps = {
    user: User | null
}

type Mode = 'signup' | 'signin'


const LogIn: React.FC<LogInProps> = ({ user }) => {
  // Animation state
  const [isAnimating, setIsAnimating] = useState<boolean>(true)
  // State
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  // MODE setter
  const [mode, setMode] = useState('signup')

  //// STRAVA AUTH ////
  // Handle window
  const handleStravaLogin = () => {
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
    const receiveMessage = (event: MessageEvent) => {
      // SECURITY: Ensure the message comes from your own domain
      if (event.origin !== window.location.origin) return

      if (event.data.type === "STRAVA_AUTH_SUCCESS") {
          console.log("Authenticated!", event.data.code)
          // Allow the user to move on to the dashboard
          setLoggedIn(true)
          // Clean up
          window.removeEventListener("message", receiveMessage)
          popup?.close()
        }
      }

    window.addEventListener("message", receiveMessage)
  }

  return (
    <main className={isAnimating ? "overflow-hidden" : ""}>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <div className="h-screen flex flex-col justify-around items-center bg-linear-to-t from-momentum-primary-purple via-momentum-bg-soft via-90% to-white">
          <section className="w-full flex flex-col justify-between items-center">
            
            {/* Merged Sign-up card */}
            <div className="w-11/12 md:w-[450px] bg-momentum-bg-card rounded-2xl shadow-2xl p-8 mt-8 md:mt-0">
              <div className="w-full">
                
                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-momentum-black font-bold text-4xl mb-2">Access your dashboard!</h1>
                </div>

                {/* Provider Button */}
                <div className="space-y-3 mb-8 cursor-pointer">
                  <button className="w-full h-12 px-4 flex justify-center items-center border border-momentum-gray-primary rounded-lg hover:bg-momentum-gray-secondary transition-colors group"
                          onClick={handleStravaLogin}
                  >
                    <Image src="/Google.png" width={24} height={24} alt="strava" />
                    <span className="ml-3 font-semibold text-momentum-midnight-indigo">Log in with Google</span>
                  </button>
                </div>

                {/* Form Logic */}
                <form  className="space-y-6">
                  <div className="flex flex-col">
                    <label className="text-momentum-black-64 font-semibold mb-2 text-sm">E-mail</label>
                    <input 
                      type="text"
                      value={''}
                      placeholder="ie: John"
                      className="h-11 bg-momentum-gray-secondary rounded-lg px-4 outline-none border border-transparent focus:border-momentum-primary-purple transition-all"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-momentum-black-64 font-semibold mb-2 text-sm">Password</label>
                    <input 
                      type="text" 
                      value={''}
                      placeholder="ie: John"
                      className="h-11 bg-momentum-gray-secondary rounded-lg px-4 outline-none border border-transparent focus:border-momentum-primary-purple transition-all"
                    />
                  </div>

                  <button 
                    type="submit"
                    className={ loggedIn ? 
                                "w-full h-12 bg-momentum-primary-purple hover:bg-momentum-primary-indigo-hover text-white font-bold rounded-lg shadow-lg shadow-momentum-primary-purple/20 transition-all active:scale-[0.98] disabled:opacity-70"
                                        :
                                "w-full h-12 bg-momentum-primary-purple text-white font-bold rounded-lg shadow-lg shadow-momentum-primary-purple/20 transition-all opacity-50 pointer-events-none" }
                    >
                    Continue to dashboard
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </main>
  )
}

export default LogIn