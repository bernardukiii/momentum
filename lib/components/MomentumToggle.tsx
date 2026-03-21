'use client'

import React from 'react'
import Image from 'next/image'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MomentumToggle {
  onTypeChange: (value: 'bike' | 'run') => void
}

export const MomentumToggle: React.FC<MomentumToggle> = ({ onTypeChange }) => {
  return (
    <div className="w-full flex justify-end">
      <Tabs 
        defaultValue="bike" 
        onValueChange={(val) => onTypeChange(val as 'bike' | 'run')}
        className="w-28"
      >
        <TabsList className="grid w-full grid-cols-2 h-10 bg-gray-100 rounded-xl p-1 border border-gray-200">
          
          {/* Bike Tab */}
          <TabsTrigger 
            value="bike" 
            className="group rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Image 
              src="/bike-icon.svg" 
              width={18} 
              height={18} 
              alt="bike" 
              className="opacity-40 group-data-[state=active]:opacity-100 transition-opacity" 
            />
          </TabsTrigger>

          {/* Run Tab */}
          <TabsTrigger 
            value="run" 
            className="group rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Image 
              src="/runner-icon.svg" 
              width={18} 
              height={18} 
              alt="run" 
              className="opacity-40 group-data-[state=active]:opacity-100 transition-opacity" 
            />
          </TabsTrigger>
          
        </TabsList>
      </Tabs>
    </div>
  )
}