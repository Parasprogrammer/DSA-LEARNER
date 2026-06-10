import React from 'react';
import { useSudokuStore } from '../store/useSudokuStore';
import { motion } from 'framer-motion';

const SudokuBoard = () => {
  const { currentBoard, originalBoard, steps, currentStepIndex } = useSudokuStore();

  const getCellColor = (r, c) => {
    if (currentStepIndex >= 0 && currentStepIndex < steps.length) {
      const step = steps[currentStepIndex];
      if (step.row === r && step.col === c) {
        if (step.action === 'place') return 'bg-sudoku-valid text-white';
        if (step.action === 'invalid') return 'bg-sudoku-invalid text-white';
        if (step.action === 'remove') return 'bg-sudoku-backtrack text-white';
      }
    }
    
    if (originalBoard[r] && originalBoard[r][c] !== 0) {
      return 'bg-sudoku-fixed text-slate-100 font-bold';
    }
    
    return 'bg-dark-800 text-slate-300';
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="grid grid-cols-9 gap-1 bg-dark-600 p-1 rounded-lg shadow-xl border-2 border-dark-600">
        {currentBoard.map((row, r) => 
          row.map((val, c) => {
            const isRightBorder = (c + 1) % 3 === 0 && c !== 8;
            const isBottomBorder = (r + 1) % 3 === 0 && r !== 8;
            
            return (
              <motion.div 
                key={`${r}-${c}`}
                layout
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl rounded-sm transition-colors duration-300
                  ${getCellColor(r, c)}
                  ${isRightBorder ? 'mr-1' : ''}
                  ${isBottomBorder ? 'mb-1' : ''}
                `}
              >
                {val !== 0 ? val : ''}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SudokuBoard;
