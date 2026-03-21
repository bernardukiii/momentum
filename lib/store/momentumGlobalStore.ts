import { create } from 'zustand'

// Define exactly what an Activity looks like based on your Supabase table
interface Activity {
  id: number;
  name: string;
  type: string;
  distance: number;
  moving_time: number;
  calories: number;
  start_date: string;
}

interface ActivityState {
  activities: Activity[];
  isSyncing: boolean;
  // Actions
  setActivities: (data: Activity[]) => void;
  setSyncing: (status: boolean) => void;
  // Helper: Get today's total calories
  getTodayCalories: () => number;
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  activities: [],
  isSyncing: false,
  
  setActivities: (data) => set({ activities: data }),
  
  setSyncing: (status) => set({ isSyncing: status }),

  getTodayCalories: () => {
    const today = new Date().toISOString().split('T')[0];
    return get().activities
      .filter(a => a.start_date.startsWith(today))
      .reduce((sum, a) => sum + (a.calories || 0), 0);
  }
}))