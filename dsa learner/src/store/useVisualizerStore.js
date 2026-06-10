import { create } from 'zustand';

export const useVisualizerStore = create((set) => ({
  isPlaying: false,
  speed: 800,
  currentStep: 0,
  
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setSpeed: (speed) => set({ speed }),
  setCurrentStep: (step) => set({ currentStep: step }),
  
  stepForward: (maxSteps) => set((state) => {
    if (state.currentStep < maxSteps - 1) {
      return { currentStep: state.currentStep + 1 };
    }
    return { isPlaying: false };
  }),
  
  stepBack: () => set((state) => {
    if (state.currentStep > 0) {
      return { currentStep: state.currentStep - 1, isPlaying: false };
    }
    return { isPlaying: false };
  }),
  
  reset: () => set({ currentStep: 0, isPlaying: false })
}));
