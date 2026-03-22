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
              <section className='flex flex-col justify-center items-center'>
                {/* BIKE */}
                <div className='flex flex-col justify-center items-center'>
                  <h3>Bike rides</h3>
                  <div className='flex justify-between items-center'>
                    <h4>Weekly km's</h4>
                    <span>{weeklyKmBike}</span>
                  </div>

                  <div className='flex justify-between items-center'>
                    <h4>Weekly time spent</h4>
                    <span>{weeklyMinsBike}</span>
                  </div>

                  <div className='flex justify-between items-center'>
                    <h4>Weekly calories burnt</h4>
                    <span>{weeklyCalsBike}</span>
                  </div>
                </div>

                {/* Run */}
                <div className='flex flex-col justify-center items-center'>
                  <h3>Runs</h3>
                  <div className='flex justify-between items-center'>
                    <h4>Weekly km's</h4>
                    <span>{weeklyKmRun}</span>
                  </div>

                  <div className='flex justify-between items-center'>
                    <h4>Weekly time spent</h4>
                    <span>{weeklyMinsRun}</span>
                  </div>

                  <div className='flex justify-between items-center'>
                    <h4>Weekly calories burnt</h4>
                    <span>{weeklyCalsRun}</span>
                  </div>
                </div>

                {/* Walk */}
                <div className='flex flex-col justify-center items-center'>
                  <h3>Walks</h3>
                  <div className='flex justify-between items-center'>
                    <h4>Weekly km's</h4>
                    <span>{weeklyKmWalk}</span>
                  </div>

                  <div className='flex justify-between items-center'>
                    <h4>Weekly time spent</h4>
                    <span>{weeklyMinsWalk}</span>
                  </div>

                  <div className='flex justify-between items-center'>
                    <h4>Weekly calories burnt</h4>
                    <span>{weeklyCalsWalk}</span>
                  </div>
                </div>
                

                {/* Total */}
                <div className='flex flex-col justify-center items-center'>
                  <h3>Total</h3>
                  <div className='flex justify-between items-center'>
                    <h4>Weekly km's</h4>
                    <span>{weeklyKmTotal}</span>
                  </div>

                  <div className='flex justify-between items-center'>
                    <h4>Weekly time spent</h4>
                    <span>{weeklyMinsTotal}</span>
                  </div>

                  <div className='flex justify-between items-center'>
                    <h4>Weekly calories burnt</h4>
                    <span>{weeklyCalsTotal}</span>
                  </div>
                </div>
              </section>
            </div>
        </section>
    </div>
  )
}

export default StravaSummary