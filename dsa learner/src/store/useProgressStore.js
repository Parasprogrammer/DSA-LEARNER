import { create } from 'zustand';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

export const useProgressStore = create((set, get) => ({
  xp: 0,
  completedModules: [],
  achievements: [],
  loading: false,

  // Fetch progress from Firestore
  fetchProgress: async () => {
    const user = auth.currentUser;
    if (!user) return;
    
    set({ loading: true });
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const data = userSnap.data();
        set({
          xp: data.xp || 0,
          completedModules: data.completedModules || [],
          achievements: data.achievements || [],
        });
      } else {
        // Initialize new user document
        const initialData = { xp: 0, completedModules: [], achievements: [] };
        await setDoc(userRef, initialData);
        set(initialData);
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      set({ loading: false });
    }
  },

  // Internal helper to sync state to Firestore
  _syncToFirestore: async (updates) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, updates);
    } catch (error) {
      console.error("Error syncing progress to Firestore:", error);
    }
  },
  
  addXP: (amount) => set((state) => {
    const newXp = state.xp + amount;
    get()._syncToFirestore({ xp: newXp });
    return { xp: newXp };
  }),
  
  completeModule: (moduleId, xpReward) => set((state) => {
    if (state.completedModules.includes(moduleId)) return state;
    
    const newCompleted = [...state.completedModules, moduleId];
    const newXp = state.xp + xpReward;
    
    get()._syncToFirestore({ 
      completedModules: newCompleted,
      xp: newXp
    });
    
    return {
      completedModules: newCompleted,
      xp: newXp
    };
  }),
  
  unlockAchievement: (achievement) => set((state) => {
    if (state.achievements.includes(achievement)) return state;
    
    const newAchievements = [...state.achievements, achievement];
    get()._syncToFirestore({ achievements: newAchievements });
    
    return { achievements: newAchievements };
  }),

  // Reset local state when user logs out
  resetProgress: () => set({ xp: 0, completedModules: [], achievements: [] })
}));
