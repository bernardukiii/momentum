import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client'

export async function syncStravaActivities(accessToken: string, userId: string) {
  // 1. Fetch the list of Recent Activities (Summary Level)
  const response = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?per_page=50`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  )
  
  const summaryActivities = await response.json()

  // 2. Fetch "Detailed" data for each activity to get the calories
  // We use Promise.all to fetch all details simultaneously
  const detailedActivities = await Promise.all(
    summaryActivities.map(async (summary: any) => {
      const detailResponse = await fetch(
        `https://www.strava.com/api/v3/activities/${summary.id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      )
      return await detailResponse.json()
    })
  )

  // 3. Map the DETAILED JSON to Supabase Schema
  const formattedActivities = detailedActivities.map((activity: any) => ({
    id: activity.id,
    user_id: userId,
    name: activity.name,
    type: activity.type,
    distance: activity.distance,       
    moving_time: activity.moving_time, 
    calories: activity.calories || 0,  // <--- This will now have real data!
    average_speed: activity.average_speed,
    start_date: activity.start_date,
  }))

  // 4. Upsert to Supabase
  const { error } = await getSupabaseBrowserClient()
    .from('activities')
    .upsert(formattedActivities, { onConflict: 'id' })

  if (error) throw error
  return formattedActivities.length
}