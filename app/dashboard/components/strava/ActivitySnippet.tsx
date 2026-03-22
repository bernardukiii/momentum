'use client'

import React from 'react'

type ActivitySnippetProps = {
  activityTitle: string,
  weeklyKms: string,
  weeklyTime: string,
  weeklyCalories: string
}

const ActivitySnippet: React.FC<ActivitySnippetProps> = ({ 
  activityTitle, 
  weeklyKms, 
  weeklyTime, 
  weeklyCalories 
}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full p-4'>
      <h3 className='text-black text-lg underline font-bold mb-2'>{activityTitle}</h3>
      
      <div className='flex justify-between items-center w-full'>
        <h4 className='font-semibold text-sm'>Weekly Km's</h4>
        <span className="font-bold text-orange-600">{weeklyKms} km</span>
      </div>

      <div className='flex justify-between items-center w-full'>
        <h4 className='font-semibold text-sm'>Weekly time</h4>
        <span className="font-bold text-orange-600">{weeklyTime} min</span>
      </div>

      <div className='flex justify-between items-center w-full'>
        <h4 className='font-semibold text-sm'>Daily Avg Cal</h4>
        <span className="font-bold text-orange-600">{weeklyCalories} kcal</span>
      </div>
    </div> 
  )
}

export default ActivitySnippet