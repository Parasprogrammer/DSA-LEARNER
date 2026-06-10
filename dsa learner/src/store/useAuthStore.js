import { create } from 'zustand';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { useProgressStore } from './useProgressStore';

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: null,
  
  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      set({ user, loading: false });
      if (user) {
        await useProgressStore.getState().fetchProgress();
      } else {
        useProgressStore.getState().resetProgress();
      }
    });
    return unsubscribe;
  },

  signUp: async (email, password) => {
    set({ loading: true, error: null });
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // User will be updated by onAuthStateChanged
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User will be updated by onAuthStateChanged
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await signOut(auth);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  clearError: () => set({ error: null })
}));
