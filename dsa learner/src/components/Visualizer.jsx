import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Visualizer({ state }) {
  if (!state) return null;
  const { array, activeIndices, swapping, pointers, doneIndices } = state;

  return (
    <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden w-full h-full">
      <div className={`flex gap-4 items-end ${state.orientation === 'vertical' ? 'flex-col-reverse items-center justify-start h-full' : 'flex-row'}`}>
        <AnimatePresence mode="popLayout">
          {array.map((value, index) => {
            const isActive = activeIndices?.includes(index);
            const isSwapping = swapping && isActive;
            const isDone = doneIndices?.includes(index);
            
            const blockClasses = twMerge(
              "w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold relative transition-colors duration-300",
              "bg-white border border-slate-200 shadow-sm",
              isActive && "border-status-warning bg-status-warning/10 shadow-[0_0_15px_rgba(234,179,8,0.2)]",
              isSwapping && "border-brand-cyan bg-brand-cyan/10 shadow-[0_0_20px_rgba(6,182,212,0.3)]",
              isDone && "border-status-success bg-status-success/10 text-status-success"
            );

            return (
              <motion.div
                key={value}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={blockClasses}
              >
                <div className="w-full h-full flex items-center justify-center font-bold whitespace-pre-line text-center text-sm">
                  {value}
                </div>
                
                {pointers?.left === index && (
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="absolute -bottom-8 text-sm font-bold text-status-warning">L</motion.div>
                )}
                {pointers?.right === index && (
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="absolute -bottom-8 text-sm font-bold text-status-error">R</motion.div>
                )}
                {pointers?.i === index && (
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="absolute -bottom-8 text-sm font-bold text-brand-purple">i</motion.div>
                )}
                {pointers?.j === index && (
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="absolute -bottom-8 text-sm font-bold text-brand-cyan">j</motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
