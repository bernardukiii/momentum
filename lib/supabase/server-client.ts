import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

function getEnvironmentVariables() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
            "Missing environ vars!!"
        )
    }

    return { supabaseUrl, supabaseAnonKey}
}

// communicate with the backend
export async function createSupabaseServerClient() {
    const { supabaseUrl, supabaseAnonKey } = getEnvironmentVariables()
    const cookieStore = await cookies()

    // on top of passing the supabaseUrl and the anon key, we pass a cookies configuration for nextjs
    // this way subapase can recognize the user
    return createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll() // reads all cookies from incoming request
            },
            // setAll let's supabase update the cookies to refresh tokens
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    )
                } catch(error) {
                    console.log(error)
                }
            }
        }
    })
}