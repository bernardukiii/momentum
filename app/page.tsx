'use client'

import React, { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const Home: React.FC = () => {
  // Animation state
  const [isAnimating, setIsAnimating] = useState<boolean>(true)

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
                  <h1 className="text-momentum-black font-bold text-4xl mb-2">Start your transformation today</h1>
                </div>

                {/* Social Buttons */}
                <div className="space-y-3 mb-8">
                  <button className="w-full h-12 px-4 flex justify-center items-center border border-momentum-gray-primary rounded-lg hover:bg-momentum-gray-secondary transition-colors group">
                    <Image src="/strava-logo.svg" width={24} height={24} alt="strava" />
                    <span className="ml-3 font-semibold text-momentum-midnight-indigo">Log in with Strava</span>
                  </button>
                </div>

                {/* Form Logic */}
                <form  className="space-y-6">
                  <div className="flex flex-col">
                    <label className="text-momentum-black-64 font-semibold mb-2 text-sm">Name</label>
                    <input 
                      type="text" 
                      value={''}
                      placeholder="ie: John"
                      className="h-11 bg-momentum-gray-secondary rounded-lg px-4 outline-none border border-transparent focus:border-momentum-primary-purple transition-all"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full h-12 bg-momentum-primary-purple hover:bg-momentum-primary-indigo-hover text-white font-bold rounded-lg shadow-lg shadow-momentum-primary-purple/20 transition-all active:scale-[0.98] disabled:opacity-70"
                  >
                    Continue
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

export default Home