import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export default function GridVisualizer({ state }) {
  if (!state || !state.grid) return null;
  const { grid, activeCells = [], comparingCells = [], doneCells = [], pointers = {}, rowHeaders, colHeaders } = state;

  const isCellInList = (list, r, c) => list.some(([lr, lc]) => lr === r && lc === c);

  return (
    <div className="flex-1 w-full h-full p-4 flex items-center justify-center overflow-auto bg-black/10 rounded-lg border border-white/5">
      <div className="relative inline-block">
        <table className="border-collapse">
          <thead>
            {colHeaders && (
              <tr>
                {rowHeaders && <th></th>}
                {colHeaders.map((header, i) => (
                  <th key={i} className="px-3 py-2 text-slate-500 font-mono text-sm border-b border-slate-200">{header}</th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {grid.map((row, r) => (
              <tr key={r}>
                {rowHeaders && (
                  <td className="px-3 py-2 text-slate-500 font-mono text-sm border-r border-slate-200 text-right pr-4">
                    {rowHeaders[r]}
                  </td>
                )}
                {row.map((val, c) => {
                  const isActive = isCellInList(activeCells, r, c);
                  const isComparing = isCellInList(comparingCells, r, c);
                  const isDone = isCellInList(doneCells, r, c);
                  
                  const cellClasses = twMerge(
                    "w-14 h-14 border border-slate-200 text-center relative transition-all duration-300 font-mono",
                    "bg-white text-slate-600",
                    isComparing && "bg-brand-purple/20 border-brand-purple text-brand-purple shadow-[inset_0_0_10px_rgba(139,92,246,0.3)]",
                    isActive && "bg-brand-cyan/20 border-brand-cyan text-white shadow-[inset_0_0_15px_rgba(6,182,212,0.5)] z-10 scale-110 shadow-2xl",
                    isDone && !isActive && !isComparing && "bg-status-success/10 text-status-success border-status-success/30"
                  );

                  return (
                    <td key={`${r}-${c}`} className="p-0.5">
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={cellClasses}
                      >
                        <div className="w-full h-full flex items-center justify-center font-bold whitespace-pre-line text-sm">
                          {val}
                        </div>
                        
                        {/* Pointers */}
                        {Object.entries(pointers).map(([ptrName, coords]) => {
                          if (coords && coords[0] === r && coords[1] === c) {
                            return (
                              <motion.div 
                                key={ptrName}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute -bottom-2 -right-2 bg-black/90 text-white border border-brand-cyan/50 px-1 py-0.5 rounded text-[10px] font-mono z-20 shadow-xl"
                              >
                                {ptrName}
                              </motion.div>
                            );
                          }
                          return null;
                        })}
                      </motion.div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
