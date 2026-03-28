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
    <div className='flex flex-col justify-center items-center w-fit p-4'>
      <h3 className='text-black text-lg underline mb-2'>{activityTitle}</h3>
      
      <div className='flex justify-between items-center w-full'>
        <h4 className='text-sm uppercase mr-4'>Weekly Km's</h4>
        <span className="font-bold text-momentum-midnight-indigo">{weeklyKms} km</span>
      </div>

      <div className='flex justify-between items-center w-full'>
        <h4 className=' text-sm uppercase mr-4'>Weekly time</h4>
        <span className="font-bold text-momentum-midnight-indigo">{weeklyTime} min</span>
      </div>

      <div className='flex justify-between items-center w-full'>
        <h4 className=' text-sm uppercase mr-4'>Daily Avg Cal</h4>
        <span className="font-bold text-momentum-midnight-indigo">{weeklyCalories} kcal</span>
      </div>
    </div> 
  )
}

export default ActivitySnippet