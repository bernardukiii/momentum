'use client'

import React, { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const Home: React.FC = () => {
  // Animation state
  const [isAnimating, setIsAnimating] = useState<boolean>(true)
  // State
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  //// STRAVA AUTH ////
  // Handle window
  const handleStravaLogin = () => {
    const width = 500
    const height = 600
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2

    const STRAVA_AUTH_URL = `https://www.strava.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI}&response_type=code&scope=read_all,activity:read_all`

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
    <main className=''>
        <div className="h-screen flex flex-col justify-around items-center bg-linear-to-t from-momentum-primary-purple via-momentum-bg-soft via-90% to-white">
          <section className="w-full flex flex-col justify-between items-center">
            LANDING PAGE
          </section>
        </div>
    </main>
  )
}

export default Home