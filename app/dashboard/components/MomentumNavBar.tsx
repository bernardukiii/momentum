'use client'

import React from 'react'
import Image from 'next/image'

interface MomentumNavBarProps {
  userName: string,
  handleSignOut: () => void
}

const MomentumNavBar: React.FC<MomentumNavBarProps> = ({ userName, handleSignOut }) => {
  // Logic for the Avatar Initial (First letter of name or email)
  const userInitial = userName?.charAt(0).toUpperCase() || '?'

  return (
    <header className="w-full h-16 bg-white px-8 flex justify-between items-center border-b border-momentum-gray-darker shadow-sm">
      
      {/* Logo Section */}
      <div className="flex items-center">
        <Image
          src="/logo.png" // Ensure this points to your actual logo path
          height={30}
          width={120}
          alt="momentum-logo"
          className="object-contain"
          priority
        />
      </div>

      {/* User Section */}
      <div className="flex gap-4 items-center">
        <div className='flex justify-between items-center'>
            
            <div className='flex justify-center items-center mx-4'>
                {/* User Name (Desktop Only - hidden on mobile) */}
                <span className="hidden md:block text-sm font-semibold text-momentum-midnight-indigo mx-2">
                {userName || 'Guest User'}
                </span>
                
                
                {/* Avatar Bubble */}
                <div 
                    className="w-10 h-10 rounded-full bg-momentum-primary-purple text-white font-bold text-lg 
                                flex items-center justify-center border-2 shadow-sm
                                transition-transform duration-200 hover:scale-105 select-none"
                    title={userName}
                >
                {userInitial}
                </div>
            </div>

            {/* Sign out button */}
            <button 
                onClick={handleSignOut}
                className="w-fit h-fit p-2 bg-white hover:bg-momentum-primary-purple hover:text-white font-bold rounded-lg transition-all active:scale-[0.98]
                            cursor-pointer
                "
            >
                <Image src={'/logout.png'} alt='log-out-icon' width={25} height={20} />
            </button>

        </div>
        
      </div>
    </header>
  )
}

export default MomentumNavBar