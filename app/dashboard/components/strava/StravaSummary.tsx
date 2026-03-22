'use client'

import React, { useState } from 'react'
import { useMomentumGlobalStore } from '@/lib/store/momentumGlobalStore'
import { 
  calculateWeeklyTotalDistance, 
  calculateWeeklyTotalTime, 
  calculateWeeklyAvgCalories 
} from '@/lib/utility-functions'

import { MomentumToggle } from '../../../../components/momentum/MomentumToggle'
import ActivitySnippet from './ActivitySnippet'

const StravaSummary: React.FC = () => {
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
    <div className="flex flex-col justify-center items-center h-full space-y-3 text-black">
        <h1 className='text-lg font-bold text-black'>Insight summary</h1>
        
        <div className='w-full flex justify-end items-center'>
            {/* 3. UPDATE TOGGLE: Pass the state and setter to your toggle */}
            {/* Note: Ensure your MomentumToggle component accepts these props! */}
            <MomentumToggle 
              activeType={activeType} 
              onTypeChange={(val) => setActiveType(val)} 
            />
        </div>

        <section className='w-full h-full flex justify-center items-center'>
            <div className='w-full h-full bg-green-50 flex justify-center items-center'>Mini line chart</div>
            <div className='w-full h-full bg-red-50 flex justify-center items-center'>
              <section className='w-full flex flex-col justify-center items-center'>
                {/* 4. PASS THE DYNAMIC PROPS */}
                <ActivitySnippet 
                  activityTitle={titleMap[activeType]}
                  weeklyKms={currentKm}
                  weeklyTime={currentTime}
                  weeklyCalories={currentCals}
                />
              </section>
            </div>
        </section>
    </div>
  )
}

export default StravaSummary