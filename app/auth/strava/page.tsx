'use client'

import { useEffect } from 'react'

export default function StravaCallback() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get('code')

    if (code && window.opener) {
      // 1. Send the code back to the Home page
      window.opener.postMessage(
        { type: 'STRAVA_AUTH_SUCCESS', code },
        window.location.origin
      )
      
      // 2. CRITICAL: Close this popup window immediately
      window.close()
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <p className="text-momentum-black font-semibold">Authenticating...</p>
        <p className="text-xs text-gray-400">Closing window...</p>
      </div>
    </div>
  )
}