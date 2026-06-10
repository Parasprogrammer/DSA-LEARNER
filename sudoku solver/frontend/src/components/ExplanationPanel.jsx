import React from 'react';
import { useSudokuStore } from '../store/useSudokuStore';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExplanationPanel = () => {
  const { steps, currentStepIndex } = useSudokuStore();
  
  const step = currentStepIndex >= 0 && currentStepIndex < steps.length ? steps[currentStepIndex] : null;

  return (
    <div className="bg-dark-800 p-5 rounded-xl shadow-lg border border-dark-700 min-h-[250px] flex flex-col">
      <div className="flex items-center gap-2 mb-4 border-b border-dark-600 pb-3">
        <Info className="text-blue-400" size={20} />
        <h3 className="text-lg font-semibold text-slate-200">Step Explanation</h3>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step ? (
            <motion.div 
              key={currentStepIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center bg-dark-700 p-3 rounded-lg border border-dark-600">
                <span className="text-slate-300 font-mono text-sm">Target Cell</span>
                <span className="text-white font-bold bg-dark-900 px-3 py-1 rounded-md text-sm border border-dark-500">
                  Row {step.row + 1}, Col {step.col + 1}
                </span>
              </div>
              
              <div className="bg-dark-900/50 p-4 rounded-lg border border-dark-600/50">
                <p className="text-slate-300 mb-2">
                  Attempting to place <strong className="text-white text-lg px-2 py-0.5 bg-dark-700 rounded mx-1">{step.number}</strong>
                </p>
                
                {step.action === 'place' && (
                  <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-green-400 font-medium">Valid Placement</p>
                      <p className="text-green-300/70 text-sm mt-1">{step.reason}</p>
                    </div>
                  </div>
                )}
                
                {step.action === 'invalid' && (
                  <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex items-start gap-3">
                    <XCircle className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-red-400 font-medium">Invalid Attempt</p>
                      <p className="text-red-300/70 text-sm mt-1">{step.reason}</p>
                    </div>
                  </div>
                )}
                
                {step.action === 'remove' && (
                  <div className="mt-4 p-3 bg-orange-900/20 border border-orange-500/30 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="text-orange-500 mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-orange-400 font-medium">Backtracking</p>
                      <p className="text-orange-300/70 text-sm mt-1">{step.reason}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-slate-500 flex flex-col items-center justify-center h-full gap-3">
              <Info size={32} className="opacity-20" />
              <p>Generate a puzzle and click "Solve" to start tracing the algorithm.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExplanationPanel;
