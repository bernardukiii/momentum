//// Utility functions ////

// GET WEEKLY ACTIVITIES AND CALCULATE TOTAL DISTANCE, AVG CALORIES AND TIME (IN MINUTES) //

type ActivityType = 'Ride' | 'Run' | 'Walk' | 'All'

// Helper to keep your code clean
export const getWeeklyActivities = (activities: any[]) => {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  return activities.filter(a => new Date(a.start_date) >= oneWeekAgo)
}

export const calculateWeeklyTotalDistance = (activities: any[], type: ActivityType = 'All') => {
  const weekly = getWeeklyActivities(activities)
  const filtered = type === 'All' ? weekly : weekly.filter(a => a.type === type)
  
  const totalMeters = filtered.reduce((sum, a) => sum + (a.distance || 0), 0)
  return parseFloat((totalMeters / 1000).toFixed(1))
}

export const calculateWeeklyAvgCalories = (activities: any[], type: ActivityType = 'All') => {
  const weekly = getWeeklyActivities(activities)
  // Added the filter here so it respect the 'Ride' or 'Run' tag
  const filtered = type === 'All' ? weekly : weekly.filter(a => a.type === type)
  
  const totalCals = filtered.reduce((sum, a) => sum + (a.calories || 0), 0)
  
  // Divide by 7 to see your "Daily Average" for that specific sport this week
  return Math.round(totalCals / 7)
}

export const calculateWeeklyTotalTime = (activities: any[], type: ActivityType = 'All') => {
  const weekly = getWeeklyActivities(activities)
  const filtered = type === 'All' ? weekly : weekly.filter(a => a.type === type)

  const totalSeconds = filtered.reduce((sum, a) => sum + (a.moving_time || 0), 0)
  return Math.round(totalSeconds / 60)
}

// CHART SPECIFIC FUNCTION
// Ensures that if there is no activity for a day, it returns 0 instead of null
import { format, subDays, isSameDay } from 'date-fns'

export const getRollingSevenDayData = (activities: any[], type: string) => {
  // 1. Generate array of last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    return subDays(new Date(), i)
  }).reverse()

  // 2. Map activities to these days
  return last7Days.map((date) => {
    const dayName = format(date, 'EEE') // "Mon", "Tue", etc.
    
    // Sum distance for this specific day and activity type
    const dayTotal = activities
      .filter((a) => a.type === type && isSameDay(new Date(a.start_date), date))
      .reduce((sum, a) => sum + (a.distance / 1000), 0); // Convert meters to km

    return {
      day: dayName,
      distance: parseFloat(dayTotal.toFixed(2)),
    }
  })
}

// Calories spent weekly
export const getWeeklyCalories = (activities: any[]) => {
  // 1. Get the date 7 days ago
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  // 2. Filter and Sum
  const total = activities
    .filter(a => new Date(a.start_date) >= sevenDaysAgo)
    .reduce((sum, a) => sum + (a.calories || 0), 0)

  return Math.round(total)
}