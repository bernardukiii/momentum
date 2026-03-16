'use client'

import { User } from '@supabase/supabase-js'
import { useState } from 'react'

type LogInProps = {
    user: User | null
}

type Mode = 'signup' | 'signin'

export default function LogIn({ user }: LogInProps) {
    const [mode, setMode] = useState('signup')

    return (
        <div>
            <h1>Log In or SignUp</h1>
        </div>
    )
}