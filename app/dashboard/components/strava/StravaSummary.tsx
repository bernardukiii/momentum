'use client'

import React from 'react'
import Image from 'next/image'

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
            <div className='flex justify-between items-center w-24 bg-red-50'>
                <button className='flex justify-center items-center w-full bg-gray-200 rounded-xl'>
                    <Image src={'/bike-icon.svg'} width={20} height={20} alt="icon" />
                </button>

                <button className='flex justify-center items-center w-full bg-gray-200 rounded-xl'>
                    <Image src={'/runner-icon.svg'} width={20} height={20} alt="icon" />
                </button>
            </div>
        </div>
    </div>
  )
}

export default StravaSummary