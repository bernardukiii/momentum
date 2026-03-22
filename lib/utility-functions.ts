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