import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export default function BucketVisualizer({ state }) {
  if (!state) return null;
  const { array, buckets, activeIndices = [], activeBuckets = [] } = state;

  return (
    <div className="flex-1 flex flex-col p-4 w-full h-full overflow-hidden">
      
      {/* Top: Main Array */}
      <div className="flex-shrink-0 flex items-center justify-center p-4 border-b border-white/5 mb-4 min-h-[120px]">
        <div className="flex gap-2 flex-wrap justify-center">
          <AnimatePresence>
            {array?.map((value, index) => {
              const isActive = activeIndices.includes(index);
              
              const blockClasses = twMerge(
                "w-12 h-12 rounded flex items-center justify-center font-bold text-sm transition-colors duration-300 border",
                "bg-white shadow-sm border-slate-200 text-slate-600",
                isActive && "border-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.4)] text-white bg-brand-cyan/20"
              );

              return (
                <motion.div
                  key={`main-${index}-${value}`}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={blockClasses}
                >
                  {value}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom: Buckets */}
      <div className="flex-1 flex flex-wrap gap-4 items-start justify-center overflow-auto p-2">
        {buckets?.map((bucket, bucketIdx) => {
          const isActiveBucket = activeBuckets.includes(bucketIdx);
          
          return (
            <div 
              key={`bucket-${bucketIdx}`} 
              className={twMerge(
                "flex flex-col items-center bg-black/30 p-3 rounded-xl border min-w-[60px] min-h-[150px] transition-colors duration-300",
                isActiveBucket ? "border-brand-purple shadow-[0_0_15px_rgba(139,92,246,0.3)]" : "border-white/5"
              )}
            >
              <span className="text-xs text-brand-purple font-mono font-bold mb-3 border-b border-brand-purple/30 pb-1 w-full text-center">
                B{bucketIdx}
              </span>
              
              <div className="flex flex-col-reverse gap-2 justify-start flex-1 w-full items-center">
                <AnimatePresence>
                  {bucket.map((val, valIdx) => (
                    <motion.div
                      key={`bval-${bucketIdx}-${valIdx}-${val}`}
                      layout
                      initial={{ opacity: 0, scale: 0.5, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="w-10 h-10 bg-white/10 border border-white/20 rounded flex items-center justify-center text-xs font-bold text-white shadow-sm"
                    >
                      {val}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
