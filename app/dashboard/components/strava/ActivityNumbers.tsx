'use client'

import React, { act }  from 'react'
import { useMomentumGlobalStore } from '@/lib/store/momentumGlobalStore'
import { 
  calculateWeeklyTotalDistance, 
  calculateWeeklyTotalTime, 
  calculateWeeklyAvgCalories 
} from '@/lib/utility-functions'
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, LabelList } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const ActivityNumbers: React.FC = () => {
  const activities = useMomentumGlobalStore((state) => state.activities)
  const acts_count = activities.length

  const data = [
    { 
        type: 'Ride', 
        count: activities.filter(a => a.type === 'Ride').length, 
        km: calculateWeeklyTotalDistance(activities, 'Ride'), 
        time: calculateWeeklyTotalTime(activities, 'Ride'), 
        calories: calculateWeeklyAvgCalories(activities, 'Ride'),
        fill: '#f56523' 
    },
    { 
        type: 'Run', 
        count: activities.filter(a => a.type === 'Run').length,
        km: calculateWeeklyTotalDistance(activities, 'Run'), 
        time: calculateWeeklyTotalTime(activities, 'Run'), 
        calories: calculateWeeklyAvgCalories(activities, 'Run'),
        fill: '#3b82f6' 
    },
    { 
        type: 'Walk', 
        count: activities.filter(a => a.type === 'Walk').length,
        km: calculateWeeklyTotalDistance(activities, 'Walk'), 
        time: calculateWeeklyTotalTime(activities, 'Walk'), 
        calories: calculateWeeklyAvgCalories(activities, 'Walk'),
        fill: '#10b981' 
    },
  ]

  const chartConfig = {
    count: { label: "Weekly acts", color: "#64748b" },
    km: { label: "Weekly Km's", color: "#64748b" },
    time: { label: "Weekly time", color: "#64748b" },
    calories: { label: "Weekly calories", color: "#64748b" }
  }

  return (
    <div className="flex flex-col w-[300px] h-[300px]">        
        <div className='mb-6'>
            <h4 className="text-md font-bold text-slate-400 uppercase tracking-[0.2em]">
              Weekly Activity Count
            </h4>
        </div>

        <div className='flex flex-col justify-center items-start w-3/4'>
            <div className='flex justify-center items-center'>
                <label className='mr-2 uppercase text-sm'>Total activities:</label>
                <span>{acts_count}</span>
            </div>
        </div>

        <div className="flex-1 w-full min-h-[180px]">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 30, right: 0, left: -35, bottom: 0 }}>
                <XAxis 
                  dataKey="type" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }} 
                />
                <YAxis hide />
                
                <ChartTooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.04)', radius: 8 }}
                  content={<ChartTooltipContent indicator="line" />} 
                />

                {/* THE VISIBLE BAR */}
                <Bar dataKey="count" radius={[10, 10, 10, 10]} barSize={40}>
                  <LabelList 
                    dataKey="count" 
                    position="top" 
                    offset={12}
                    className="fill-slate-900 font-black text-sm"
                  />
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>

                {/* THE INVISIBLE DATA HOLDERS (This is the trick) */}
                <Bar dataKey="km" />
                <Bar dataKey="time" />
                <Bar dataKey="calories" />

              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
    </div>
  )
}

export default ActivityNumbers