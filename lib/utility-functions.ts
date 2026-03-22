//// Utility functions ////

// GET WEEKLY ACTIVITIES AND CALCULATE TOTAL DISTANCE, AVG CALORIES AND TIME (IN MINUTES) //

// Define the activity type for better autocomplete
type ActivityType = 'Ride' | 'Run' | 'Walk' | 'All'


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


export const calculateWeeklyAvgCalories = (activities: any[]) => {
  const weekly = getWeeklyActivities(activities)
  const totalCals = weekly.reduce((sum, a) => sum + (a.calories || 0), 0)
  
  // We divide by 7 to get the daily average for the week
  return Math.round(totalCals / 7)
}


export const calculateWeeklyTotalTime = (activities: any[], type: ActivityType = 'All') => {
  const weekly = getWeeklyActivities(activities)
  const filtered = type === 'All' ? weekly : weekly.filter(a => a.type === type)

  const totalSeconds = filtered.reduce((sum, a) => sum + (a.moving_time || 0), 0)

  // Convert seconds to total minutes
  return Math.round(totalSeconds / 60)
}