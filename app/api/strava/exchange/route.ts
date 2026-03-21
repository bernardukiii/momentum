import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { code } = await req.json()

    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET, // Stays safe on the server
        code: code,
        grant_type: 'authorization_code',
      }),
    })

    const data = await response.json()

    if (data.errors) {
      return NextResponse.json({ error: data.message }, { status: 400 })
    }

    // Return the tokens to the frontend
    return NextResponse.json({ 
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_at 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to exchange token' }, { status: 500 })
  }
}