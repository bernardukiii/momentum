import Dashboard from "./Dashboard" // This is your 'use client' file
import { createSupabaseServerClient } from "@/lib/supabase/server-client"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
    const supabase = await createSupabaseServerClient()
    
    // We fetch it here on the SERVER
    const { data: { user } } = await supabase.auth.getUser()

    // If the server can't find the user, we kick them out before the page even loads
    if (!user) {
        redirect('/login')
    }

    // Now we pass it to the Client Component
    return <Dashboard user={user} />
}