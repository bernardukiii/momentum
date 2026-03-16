import LogIn from "./LogIn"
import { createSupabaseServerClient  } from "@/lib/supabase/server-client"

export default async function LogInPage() {
    // instantiate the server client
    const supabase = await createSupabaseServerClient()
    const {
        data: { user }
    } = await supabase.auth.getUser()

    console.log( { user })

    return <LogIn user={null} />
}