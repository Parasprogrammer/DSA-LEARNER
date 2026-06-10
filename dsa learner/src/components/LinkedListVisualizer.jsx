import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { ArrowRight, ArrowLeftRight, ArrowLeft, RotateCcw } from 'lucide-react';

export default function LinkedListVisualizer({ state }) {
  if (!state || !state.nodes) return null;
  const { nodes, pointers, activeNode } = state;

  return (
    <div className="flex-1 flex flex-wrap gap-y-16 items-center justify-center p-8 relative overflow-auto w-full h-full">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <AnimatePresence>
          {nodes.map((node, index) => {
            const isActive = activeNode === node.id || node.isActive;
            const isNew = node.isNew;
            
            const nodeClasses = twMerge(
              "w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold relative transition-all duration-300 border-2",
              "bg-white shadow-sm",
              isActive ? "border-brand-cyan shadow-[0_0_20px_rgba(6,182,212,0.4)] text-brand-cyan scale-110" : "border-slate-200 text-slate-600",
              isNew && "border-status-success shadow-[0_0_20px_rgba(16,185,129,0.4)] text-white"
            );

            // Determine what kind of edge to draw
            const edgeType = node.edgeType || 'forward'; // forward, backward, bidirectional, circular, none
            
            return (
              <React.Fragment key={node.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.5, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex flex-col items-center relative"
                >
                  <div className={nodeClasses}>
                    {node.val}
                  </div>
                  
                  {/* Pointers mapping */}
                  <div className="absolute -bottom-12 flex flex-col items-center gap-1 z-10">
                    {Object.entries(pointers || {}).map(([ptrName, ptrTargetId]) => {
                      if (ptrTargetId === node.id || (Array.isArray(ptrTargetId) && ptrTargetId.includes(node.id))) {
                        return (
                          <motion.div key={ptrName} initial={{opacity: 0, y: -10}} animate={{opacity: 1, y: 0}} className="text-xs font-bold text-black bg-brand-cyan px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                            {ptrName}
                          </motion.div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </motion.div>
                
                {/* Render Edge */}
                {edgeType === 'forward' && node.next && (
                  <motion.div layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center text-white/30 px-1">
                    <ArrowRight size={24} className={isActive ? "text-brand-cyan" : ""} />
                  </motion.div>
                )}

                {edgeType === 'backward' && node.next && (
                  <motion.div layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center text-white/30 px-1">
                    <ArrowLeft size={24} className={isActive ? "text-brand-cyan" : ""} />
                  </motion.div>
                )}

                {edgeType === 'bidirectional' && node.next && (
                  <motion.div layout initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center text-white/30 px-1">
                    <ArrowLeftRight size={28} className={isActive ? "text-brand-cyan" : ""} />
                  </motion.div>
                )}

                {edgeType === 'circular' && (
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-1">
                    <RotateCcw size={24} className="text-status-warning" />
                    <div className="text-status-warning font-mono text-xs border border-status-warning/50 bg-status-warning/10 px-2 py-1 rounded">
                      Head
                    </div>
                  </motion.div>
                )}
                
                {edgeType === 'loop' && (
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-1">
                    <RefreshCw size={24} className="text-status-warning" />
                    <div className="text-status-warning font-mono text-xs border border-status-warning/50 bg-status-warning/10 px-2 py-1 rounded">
                      Loop Detected
                    </div>
                  </motion.div>
                )}
                
                {/* Null pointer logic (only if not circular/loop and has no next) */}
                {(edgeType === 'forward' || edgeType === 'bidirectional') && node.next === null && (
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-1">
                    <ArrowRight size={24} className="text-white/30" />
                    <div className="text-slate-400 font-mono text-xs border border-slate-200 px-2 py-1 rounded">
                      null
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
