import { create } from 'zustand';

export const useSudokuStore = create((set, get) => ({
  originalBoard: Array(9).fill(Array(9).fill(0)),
  currentBoard: Array(9).fill(Array(9).fill(0)),
  steps: [],
  currentStepIndex: -1,
  isPlaying: false,
  speed: 1, // 0.5x, 1x, 2x, 5x
  stats: {
    recursiveCalls: 0,
    validPlacements: 0,
    invalidAttempts: 0,
    backtracks: 0,
  },
  
  setBoard: (board) => set({ originalBoard: board, currentBoard: board, steps: [], currentStepIndex: -1, stats: { recursiveCalls: 0, validPlacements: 0, invalidAttempts: 0, backtracks: 0 } }),
  setSteps: (steps) => set({ steps }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setSpeed: (speed) => set({ speed }),
  
  // Navigate steps
  nextStep: () => {
    const { steps, currentStepIndex, currentBoard, stats } = get();
    if (currentStepIndex >= steps.length - 1) {
      set({ isPlaying: false });
      return;
    }
    
    const nextIndex = currentStepIndex + 1;
    const step = steps[nextIndex];
    
    // Create new board
    const newBoard = currentBoard.map(row => [...row]);
    const newStats = { ...stats };
    
    if (step.action === 'place') {
      newBoard[step.row][step.col] = step.number;
      newStats.validPlacements++;
      newStats.recursiveCalls++;
    } else if (step.action === 'remove') {
      newBoard[step.row][step.col] = 0;
      newStats.backtracks++;
    } else if (step.action === 'invalid') {
      newStats.invalidAttempts++;
      newStats.recursiveCalls++; // counting as a check
    }
    
    set({ currentStepIndex: nextIndex, currentBoard: newBoard, stats: newStats });
  },
  
  prevStep: () => {
    const { steps, currentStepIndex, currentBoard, stats } = get();
    if (currentStepIndex < 0) return;
    
    const step = steps[currentStepIndex];
    
    // Revert board
    const newBoard = currentBoard.map(row => [...row]);
    const newStats = { ...stats };
    
    if (step.action === 'place') {
      newBoard[step.row][step.col] = 0;
      newStats.validPlacements--;
      newStats.recursiveCalls--;
    } else if (step.action === 'remove') {
      // It was removed, so reverting means putting it back. 
      // But we need to know what was removed.
      // The backtrack step removes it, meaning it was `step.number` before removal.
      newBoard[step.row][step.col] = step.number;
      newStats.backtracks--;
    } else if (step.action === 'invalid') {
      newStats.invalidAttempts--;
      newStats.recursiveCalls--;
    }
    
    set({ currentStepIndex: currentStepIndex - 1, currentBoard: newBoard, stats: newStats });
  },
  
  resetSolver: () => {
    const { originalBoard } = get();
    set({ 
      currentBoard: originalBoard.map(row => [...row]), 
      currentStepIndex: -1, 
      isPlaying: false,
      stats: { recursiveCalls: 0, validPlacements: 0, invalidAttempts: 0, backtracks: 0 }
    });
  }
}));
