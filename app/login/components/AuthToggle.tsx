'use client'
import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import LogIn from './LogIn'
import SignUp from './SignUp'

type AuthToggleProps = {
    user: User | null
}

type Mode = 'signup' | 'signin'

const AuthToggle: React.FC<AuthToggleProps> = ({ user }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup')

  return (
    <div>
      {mode === 'signup' ? (
        <SignUp user={user} onSwitch={() => setMode('signin')} />
      ) : (
        <LogIn user={user} onSwitch={() => setMode('signup')} />
      )}
    </div>
  )
}

export default AuthToggle