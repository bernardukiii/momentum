import { create } from 'zustand'

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
  isLoaded: boolean; // Useful to show a skeleton loader
  setActivities: (data: Activity[]) => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  isLoaded: false,
  setActivities: (data) => set({ activities: data, isLoaded: true }),
}))