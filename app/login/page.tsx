import AuthToggle from "./components/AuthToggle"
import { createSupabaseServerClient } from "@/lib/supabase/server-client"

export default async function LogInPage() {
    // 1. Instantiate the server client
    const supabase = await createSupabaseServerClient()
    
    // 2. Get the session user
    const { data: { user } } = await supabase.auth.getUser()

    // 3. Pass that user to the client component
    return <AuthToggle user={user} />
}