'use client'

import React from 'react'
import Image from 'next/image'
import { MomentumToggle } from '../../../../lib/components/MomentumToggle'

interface StravaSummaryProps {
  distance: number
  unit: 'km' | 'mi'
  activitiesThisWeek: number
}

const StravaSummary: React.FC<StravaSummaryProps> = ({ distance, unit, activitiesThisWeek }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-3 text-black">
        <h1 className='text-lg font-bold text-black'>Insight summary</h1>
        {/* Toggle switch */}
        <div className='w-full flex justify-end items-center'>
            <MomentumToggle />
        </div>

        <section className='w-full h-full flex justify-center items-center'>
            {/* LEFT SIDE */}
            <div className='w-full h-full bg-green-50 flex justify-center items-center'>Mini line chart</div>
            {/* RIGHT SIDE */}
            <div className='w-full h-full bg-red-50 flex justify-center items-center'>Insights</div>
        </section>
    </div>
  )
}

export default StravaSummary