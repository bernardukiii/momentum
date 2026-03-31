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
    <div className="flex flex-col h-fit w-fit rounded-4xl shadow-sm hover:shadow-md transition-all group overflow-hidden
                  bg-white/50 backdrop-blur-md border border-white/30 shadow-lg
    ">
      
      {/* Header */}
      <div className="p-5 pb-2 flex justify-start items-center">
        <h3 className="ml-2 text-lg font-black text-momentum-black-64 uppercase tracking-widest">
          {title}
        </h3>
      </div>

      {/* Main content */}
      <div className="flex-1 px-5 py-2 overflow-hidden">
        {children}
      </div>
    </div>
  )
}

export default MomentumCard