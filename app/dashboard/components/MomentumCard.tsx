'use client'

import React from 'react'
import Image from 'next/image'

interface MomentumCardProps {
  title: string
  icon?: string
  onExpand: () => void // function to open to a popup
  children: React.ReactNode // with children we can change the content
}

const MomentumCard: React.FC<MomentumCardProps> = ({ title, icon, onExpand, children }) => {
  return (
    <div className="flex flex-col h-full w-full bg-white rounded-3xl border border-momentum-gray-darker shadow-sm hover:shadow-md transition-all group overflow-hidden">
      
      {/* Header */}
      <div className="p-5 pb-2 flex justify-start items-center">
        <Image src={icon} alt='card-icon' width={40} height={40} className='rounded-full' />

        <h3 className="ml-2 text-lg font-black text-momentum-black-64 uppercase tracking-widest">
          {title}
        </h3>
      </div>

      {/* Main content */}
      <div className="flex-1 px-5 py-2 overflow-hidden">
        {children}
      </div>

      {/* Footer*/}
      <footer className='flex justify-end items-center'>
        <div className='w-full flex justify-end items-center'>
            <button 
                onClick={onExpand}
                className="pointer-cursor w-1/4 p-4 m-2 rounded-lg text-[10px] font-bold text-center border-t border-gray-50 bg-momentum-primary-purple hover:bg-momentum-primary-purple hover:text-white transition-colors uppercase tracking-widest"
            >
                See more
            </button>
        </div>
      </footer>
    </div>
  )
}

export default MomentumCard