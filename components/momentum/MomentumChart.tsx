"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface MomentumChartProps {
  // Using 'any' record here so it accepts any object shape
  data: Record<string, any>[]; 
  dataKey: string;   // e.g., "distance" or "calories"
  labelKey: string;  // e.g., "day" or "date"
  color?: string;
}

export function MomentumChart({ data, color = "#f56523" }: MomentumChartProps) {
  return (
    <ChartContainer 
      config={{ distance: { label: "Km", color: color } }} 
      className="h-full w-full p-2"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#9ca3af' }}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Line
            type="monotone"
            dataKey="distance"
            stroke={color}
            strokeWidth={3}
            dot={{ r: 4, fill: color, strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}