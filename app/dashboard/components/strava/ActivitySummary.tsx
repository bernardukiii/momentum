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
import ActivitySnippet from './ActivitySnippet'
import { MomentumChart } from '@/components/momentum/MomentumChart'

const ActivitySummary: React.FC = () => {
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

  // Pass data through utility function to transform it and prepare it for the chart
  const chartData = getRollingSevenDayData(activities, activeType)
  // Define dynamic color based on activity type
  const chartColor = activeType === 'Ride' ? '#f56523' : activeType === 'Run' ? '#3b82f6' : '#10b981'

  return (
    <div className="flex flex-col justify-center items-center h-full space-y-3 text-black">        
        <div className='w-full flex justify-end items-center'>
            {/* 3. UPDATE TOGGLE: Pass the state and setter to your toggle */}
            {/* Note: Ensure your MomentumToggle component accepts these props! */}
            <MomentumToggle 
              activeType={activeType} 
              onTypeChange={(val) => setActiveType(val)} 
            />
        </div>

        <section className='w-full h-full flex justify-center items-center'>
            <div className='w-full h-full flex justify-center items-center border-2'>
              <MomentumChart data={chartData} color={chartColor} />
            </div>
            <div className='w-full h-full border-2 flex justify-center items-center'>
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

export default ActivitySummary