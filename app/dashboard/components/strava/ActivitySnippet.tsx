'use client'

import React from 'react'

type ActivitySnippetProps = {
  activityTitle: string,
  weeklyKms: string,
  weeklyTime: string,
  weeklyCalories: string
}


const ActivitySnippet: React.FC<ActivitySnippetProps> = ({ activityTitle, weeklyKms, weeklyTime, weeklyCalories }) => {

  return (
    <div className='flex flex-col justify-center items-center'>
      <h3 className='text-black text-lg underline font-bold' >{activityTitle}</h3>
      <div className='flex justify-between items-center w-full'>
        <h4 className='font-semibold'>Weekly Km's</h4>
        <span>{}</span>
      </div>

      <div className='flex justify-between items-center w-full'>
        <h4 className='font-semibold'>Weekly time</h4>
        <span>{}</span>
      </div>

      <div className='flex justify-between items-center w-full'>
        <h4 className='font-semibold'>Weekly calories burnt</h4>
        <span>{}</span>
      </div>
    </div> 
  )
}

export default ActivitySnippet