'use client'

import { useEffect } from 'react'

export default function StravaCallback() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get('code')

    if (code) {
      // Send the code back to the Home page
      window.opener.postMessage(
        { type: 'STRAVA_AUTH_SUCCESS', code },
        window.location.origin
      )
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Authenticating... this window will close automatically.</p>
    </div>
  )
}