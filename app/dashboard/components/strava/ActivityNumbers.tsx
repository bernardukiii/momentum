'use client'

import React, { useState } from 'react'
import { useMomentumGlobalStore } from '@/lib/store/momentumGlobalStore'
// Utility functions imports
import { 
  calculateWeeklyTotalDistance, 
  calculateWeeklyTotalTime, 
  calculateWeeklyAvgCalories,
  getRollingSevenDayData
} from '@/lib/utility-functions'
// Component imports
import { MomentumToggle } from '../../../../components/momentum/MomentumToggle'

const ActivityNumbers: React.FC = () => {
  const activities = useMomentumGlobalStore((state) => state.activities)
  
  // 1. ADD STATE: Which view are we looking at? Default to 'Ride'
  const [activeType, setActiveType] = useState<'Ride' | 'Run' | 'Walk'>('Ride')

  // Use a map for the display titles
  const titleMap = {
    Ride: "Weekly biking",
    Run: "Weekly running",
    Walk: "Weekly walking"
  }

  // 2. CALCULATE DYNAMICALLY based on activeType
  const currentKm = calculateWeeklyTotalDistance(activities, activeType).toString()
  const currentTime = calculateWeeklyTotalTime(activities, activeType).toString()
  const currentCals = calculateWeeklyAvgCalories(activities, activeType).toString()


  return (
    <div className="flex flex-col justify-center items-center w-full h-full space-y-3 text-black p-4">        
        <div className='w-full h-full flex justify-end items-center'>
            {/* 3. UPDATE TOGGLE: Pass the state and setter to your toggle */}
            {/* Note: Ensure your MomentumToggle component accepts these props! */}
            <MomentumToggle 
              activeType={activeType} 
              onTypeChange={(val) => setActiveType(val)} 
            />
        </div>

        <section className='w-full h-full flex justify-center items-center'>
            <div className='w-full h-full flex justify-center items-center'>
              
            </div>
        </section>
    </div>
  )
}

export default ActivityNumbers