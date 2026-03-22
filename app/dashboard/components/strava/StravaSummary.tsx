'use client'

import React from 'react'

// zustand store
import { useMomentumGlobalStore } from '@/lib/store/momentumGlobalStore'
// component imports
import Image from 'next/image'
import { MomentumToggle } from '../../../../components/momentum/MomentumToggle'


const StravaSummary: React.FC = ({ }) => {
  const activities = useMomentumGlobalStore((state) => state.activities)
  




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