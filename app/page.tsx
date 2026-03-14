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
        <div
          className="h-screen flex flex-col justify-around items-center bg-gradient-to-t 
                     from-momentum-primary-purple
                     via-momentum-bg-soft 
                     via-90% 
                     to-white"
        >
          <section className="w-full flex flex-col justify-between items-center">
            {/* Logo + Description */}
            <div className="flex flex-col h-1/5 justify-center items-center">
              <Image
                src=""
                width={400}
                height={200}
                alt="momentum-logo"
              />
            </div>

            {/* Sign-up card */}
            <div className="w-11/12 md:w-1/3 flex items-center justify-center bg-momentum-bg-main rounded-xl shadow-momentum-card p-6 mt-8 md:mt-0">
              
            </div>
          </section>
        </div>
      </motion.div>
    </main>
  )
}

export default Home