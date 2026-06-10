import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const computeTreeLayout = (nodes, width = 600, height = 400) => {
  if (!nodes || nodes.length === 0) return { nodesWithPos: [], edges: [] };
  
  const nodesWithPos = [];
  const edges = [];
  
  const nodeMap = new Map();
  nodes.forEach(n => nodeMap.set(n.id, n));
  
  const traverse = (nodeId, x, y, level, parentX, parentY) => {
    if (nodeId === null || nodeId === undefined) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;
    
    if (parentX !== undefined && parentY !== undefined) {
      edges.push({
        id: `${nodeId}-edge`,
        x1: parentX, y1: parentY,
        x2: x, y2: y
      });
    }
    
    nodesWithPos.push({ ...node, x, y });
    
    const xOffset = 140 / Math.pow(1.6, level);
    const yOffset = 80;
    
    traverse(node.left, x - xOffset, y + yOffset, level + 1, x, y);
    traverse(node.right, x + xOffset, y + yOffset, level + 1, x, y);
  };
  
  const children = new Set();
  nodes.forEach(n => {
    if (n.left) children.add(n.left);
    if (n.right) children.add(n.right);
  });
  
  const root = nodes.find(n => !children.has(n.id));
  if (root) {
    traverse(root.id, width / 2, 40, 0);
  }
  
  return { nodesWithPos, edges };
};

export default function TreeVisualizer({ state }) {
  if (!state || !state.nodes) return null;
  const { nodes, activeNodes = [], pointers = {} } = state;
  
  const { nodesWithPos, edges } = computeTreeLayout(nodes, 600, 400);

  return (
    <div className="flex-1 w-full h-full relative p-4 flex items-center justify-center overflow-auto">
      <div className="relative" style={{ width: 600, height: 400 }}>
        <svg className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none z-0">
          {edges.map(edge => (
            <motion.line
              key={edge.id}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              x1={edge.x1} y1={edge.y1}
              x2={edge.x2} y2={edge.y2}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="2"
            />
          ))}
        </svg>

        <AnimatePresence>
          {nodesWithPos.map((node) => {
            const isActive = activeNodes.includes(node.id);
            const isNew = node.isNew;
            
            const nodeClasses = twMerge(
              "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold absolute -ml-6 -mt-6 transition-colors duration-300 border-2 z-10 bg-white shadow-sm",
              isActive ? "border-brand-cyan shadow-[0_0_20px_rgba(6,182,212,0.5)] text-white" : "border-slate-200 text-slate-600",
              isNew && "border-status-success shadow-[0_0_20px_rgba(16,185,129,0.5)] text-white"
            );

            return (
              <motion.div
                key={node.id}
                layout
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, x: node.x, y: node.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute left-0 top-0"
              >
                <div className={nodeClasses}>
                  {node.val}
                </div>
                
                <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20">
                  {Object.entries(pointers).map(([ptrName, targetId]) => {
                    if (targetId === node.id) {
                      return (
                        <motion.div 
                          key={ptrName}
                          initial={{opacity: 0, y: -5}}
                          animate={{opacity: 1, y: 0}}
                          className="bg-black/60 text-brand-purple px-1.5 py-0.5 rounded text-xs font-mono font-bold whitespace-nowrap"
                        >
                          {ptrName}
                        </motion.div>
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
