'use client'
import { useState } from 'react'
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
        <SignUp onSwitch={() => setMode('signin')} />
      ) : (
        <LogIn onSwitch={() => setMode('signup')} />
      )}
    </div>
  )
}

export default AuthToggle