import { supabase } from '@/lib/supabase'

export async function syncStravaActivities(accessToken: string, userId: string) {
  // Fetch from Strava
  const response = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?per_page=50`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  )
  
  const rawActivities = await response.json()

  // Map Strava JSON to Supabase Schema
  const formattedActivities = rawActivities.map((activity: any) => ({
    id: activity.id,
    user_id: userId,
    name: activity.name,
    type: activity.type,
    distance: activity.distance,       // meters
    moving_time: activity.moving_time, // seconds
    calories: activity.calories || 0,  // Might be null in some activities
    average_speed: activity.average_speed,
    start_date: activity.start_date,
  }))

  // Upsert to Supabase preventing duplicates
  const { error } = await supabase
    .from('activities')
    .upsert(formattedActivities, { onConflict: 'id' })

  if (error) throw error
  return formattedActivities.length
}