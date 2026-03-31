'use client'

import React from 'react'
import Image from 'next/image'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define the types to match your utility-functions.ts
type ActivityType = 'Ride' | 'Run' | 'Walk'

interface MomentumToggleProps {
  // This must match exactly what you pass from the parent
  activeType: ActivityType
  onTypeChange: (value: ActivityType) => void
}

export const MomentumToggle: React.FC<MomentumToggleProps> = ({ onTypeChange }) => {
  return (
    <div className="w-full flex justify-end">
      <Tabs 
        defaultValue="Ride" 
        onValueChange={(val) => onTypeChange(val as ActivityType)}
        className="w-42" // Widened slightly to fit 3 icons
      >
        <TabsList className="grid w-full grid-cols-3 h-10 bg-gray-100 rounded-xl p-1 border border-gray-200">
          
          {/* Bike Tab */}
          <TabsTrigger 
            value="Ride" 
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
            value="Run" 
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

          {/* Walk Tab */}
          <TabsTrigger 
            value="Walk" 
            className="group rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
             <Image 
              src="/walking-person.png"
              width={18} 
              height={18} 
              alt="walk" 
              className="opacity-40 group-data-[state=active]:opacity-100 transition-opacity" 
            />
          </TabsTrigger>
          
        </TabsList>
      </Tabs>
    </div>
  )
}