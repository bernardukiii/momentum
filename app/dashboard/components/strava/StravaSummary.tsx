'use client'

import React from 'react'
import Image from 'next/image'
import { MomentumToggle } from '../MomentumToggle'

interface StravaSummaryProps {
  distance: number
  unit: 'km' | 'mi'
  activitiesThisWeek: number
}

const StravaSummary: React.FC<StravaSummaryProps> = ({ distance, unit, activitiesThisWeek }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-3 text-black">
        <h1>Insight summary</h1>
        {/* Toggle switch */}
        <div className='w-full flex justify-end items-center'>
            <MomentumToggle />
        </div>
    </div>
  )
}

export default StravaSummary