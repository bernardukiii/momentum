'use client'

import React from 'react'

// zustand store
import { useMomentumGlobalStore } from '@/lib/store/momentumGlobalStore'

// utility functions imports
import { 
  calculateWeeklyTotalDistance, 
  calculateWeeklyTotalTime, 
  calculateWeeklyAvgCalories 
} from '@/lib/utility-functions'

// component imports
import Image from 'next/image'
import { MomentumToggle } from '../../../../components/momentum/MomentumToggle'
import ActivitySnippet from './ActivitySnippet'


const StravaSummary: React.FC = ({ }) => {
  const activities = useMomentumGlobalStore((state) => state.activities)
  // Bike calcs
  const weeklyKmBike = calculateWeeklyTotalDistance(activities, 'Ride')
  const weeklyMinsBike = calculateWeeklyTotalTime(activities, 'Ride')
  const weeklyCalsBike = calculateWeeklyAvgCalories(activities, 'Ride')
  // Run calcs
  const weeklyKmRun = calculateWeeklyTotalDistance(activities, 'Run')
  const weeklyMinsRun = calculateWeeklyTotalTime(activities, 'Run')
  const weeklyCalsRun = calculateWeeklyAvgCalories(activities, 'Run')
  // Walk calcs
  const weeklyKmWalk = calculateWeeklyTotalDistance(activities, 'Walk')
  const weeklyMinsWalk = calculateWeeklyTotalTime(activities, 'Walk')
  const weeklyCalsWalk = calculateWeeklyAvgCalories(activities, 'Walk')
  // Total calcs
  const weeklyKmTotal = calculateWeeklyTotalDistance(activities, 'All')
  const weeklyMinsTotal = calculateWeeklyTotalTime(activities, 'All')
  const weeklyCalsTotal = calculateWeeklyAvgCalories(activities, 'All')


  return (
    <div className="flex flex-col justify-center items-center h-full space-y-3 text-black">
        <h1 className='text-lg font-bold text-black'>Insight summary</h1>
        {/* Toggle switch */}
        <div className='w-full flex-col justify-end items-center'>
            <MomentumToggle />
        </div>

        <section className='w-full h-full flex justify-center items-center'>
            {/* LEFT SIDE */}
            <div className='w-full h-full bg-green-50 flex justify-center items-center'>Mini line chart</div>
            {/* RIGHT SIDE */}
            <div className='w-full h-full bg-red-50 flex justify-center items-center'>
              <section className='w-full flex flex-col justify-center items-center'>
                <ActivitySnippet />
              </section>
            </div>
        </section>
    </div>
  )
}

export default StravaSummary