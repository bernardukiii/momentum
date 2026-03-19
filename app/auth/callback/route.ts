// catch the code that the google provider returns after logging in with google
// turn it into a cookie that the frontend can access
import { createSupabaseServerClient } from "@/lib/supabase/server-client"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  if (code) {
    const supabase = await createSupabaseServerClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Once the cookie is set, NOW go to the dashboard
  return NextResponse.redirect(`${origin}/dashboard`)
}