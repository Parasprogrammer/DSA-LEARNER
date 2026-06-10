import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export default function GraphVisualizer({ state }) {
  if (!state || !state.nodes) return null;
  const { nodes, edges, activeNodes = [], visitedNodes = [], pointers = {} } = state;

  return (
    <div className="flex-1 w-full h-full relative p-4 flex items-center justify-center overflow-hidden bg-black/10 rounded-lg border border-white/5">
      <div className="relative w-full h-full max-w-[600px] max-h-[400px]">
        {/* Render Edges */}
        <svg className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none z-0">
          {edges?.map(edge => {
            const source = nodes.find(n => n.id === edge.from);
            const target = nodes.find(n => n.id === edge.to);
            if (!source || !target) return null;
            
            const isTraversed = edge.isTraversed;
            
            return (
              <g key={edge.id}>
                <motion.line
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  x1={source.x} y1={source.y}
                  x2={target.x} y2={target.y}
                  stroke={isTraversed ? "rgba(6,182,212, 0.8)" : "rgba(255, 255, 255, 0.15)"}
                  strokeWidth={isTraversed ? "4" : "2"}
                  className="transition-colors duration-300"
                />
                {edge.weight !== undefined && (
                  <text 
                    x={(source.x + target.x) / 2} 
                    y={(source.y + target.y) / 2 - 5}
                    fill="rgba(255,255,255,0.7)"
                    fontSize="12"
                    textAnchor="middle"
                    className="font-mono"
                  >
                    {edge.weight}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Render Nodes */}
        <AnimatePresence>
          {nodes.map((node) => {
            const isActive = activeNodes.includes(node.id);
            const isVisited = visitedNodes.includes(node.id);
            
            const nodeClasses = twMerge(
              "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold absolute -ml-6 -mt-6 transition-all duration-300 border-2 z-10",
              "bg-white shadow-sm",
              isVisited && !isActive ? "border-brand-purple shadow-[0_0_20px_rgba(139,92,246,0.3)] text-brand-purple" : "border-slate-200 text-slate-600",
              isActive && "border-brand-cyan shadow-[0_0_20px_rgba(6,182,212,0.8)] bg-brand-cyan/20 text-white scale-110"
            );

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, x: node.x, y: node.y }}
                className="absolute left-0 top-0"
              >
                <div className={nodeClasses}>
                  {node.val}
                </div>
                
                {/* Pointer tags */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20">
                  {Object.entries(pointers).map(([ptrName, targetId]) => {
                    if (targetId === node.id) {
                      return (
                        <div key={ptrName} className="bg-black/90 text-white border border-brand-cyan/30 px-2 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap shadow-xl">
                          {ptrName}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
