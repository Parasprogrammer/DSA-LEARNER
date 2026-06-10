import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { useSudokuStore } from '../store/useSudokuStore';
import { Network } from 'lucide-react';

const BacktrackingTree = () => {
  const { steps, currentStepIndex } = useSudokuStore();

  const { nodes, edges } = useMemo(() => {
    if (currentStepIndex < 0 || steps.length === 0) {
      return { nodes: [], edges: [] };
    }

    const n = [];
    const e = [];
    
    // We only process up to currentStepIndex. 
    // To keep performance high, we might only visualize the last ~20-50 steps, or the active path.
    // For this implementation, we will show the current active recursive path.
    
    let currentPath = []; // stack of valid placements
    let rootNodeId = "root";
    n.push({
      id: rootNodeId,
      position: { x: 250, y: 0 },
      data: { label: 'Start' },
      style: { background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '8px', padding: '10px' }
    });
    
    // Simulating the path to generate a simplified tree view
    // Since full tree is too large, we just show the active chain and recent dead ends
    let yOffset = 80;
    let parentId = rootNodeId;
    
    const maxStepsToShow = Math.min(currentStepIndex + 1, 30); // show last 30 steps for performance and clarity
    const startIndex = Math.max(0, currentStepIndex - 29);
    
    for (let i = startIndex; i <= currentStepIndex; i++) {
      const step = steps[i];
      const nodeId = `step-${i}`;
      
      let label = `(${step.row},${step.col})=${step.number}`;
      let bg = '#334155';
      let border = '#475569';
      
      if (step.action === 'place') {
        bg = '#166534'; // green
        border = '#22c55e';
      } else if (step.action === 'invalid') {
        bg = '#7f1d1d'; // red
        border = '#ef4444';
      } else if (step.action === 'remove') {
        bg = '#9a3412'; // orange
        border = '#f97316';
        label = `Backtrack: ${label}`;
      }
      
      const isCurrent = i === currentStepIndex;
      if (isCurrent) {
        border = '#eab308'; // yellow highlight for current
      }
      
      n.push({
        id: nodeId,
        position: { x: 250 + (step.action === 'invalid' ? 150 : (step.action === 'remove' ? -150 : 0)), y: yOffset },
        data: { label },
        style: { 
          background: bg, 
          color: '#fff', 
          border: `2px solid ${border}`, 
          borderRadius: '8px', 
          padding: '10px',
          boxShadow: isCurrent ? '0 0 15px rgba(234, 179, 8, 0.5)' : 'none'
        }
      });
      
      e.push({
        id: `e-${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId,
        animated: isCurrent,
        style: { stroke: border },
        markerEnd: { type: MarkerType.ArrowClosed, color: border }
      });
      
      if (step.action === 'place') {
        parentId = nodeId;
        yOffset += 80;
      }
    }

    return { nodes: n, edges: e };
  }, [steps, currentStepIndex]);

  return (
    <div className="bg-dark-800 p-5 rounded-xl shadow-lg border border-dark-700 h-[400px] flex flex-col">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 border-b border-dark-600 pb-2 flex items-center gap-2">
        <Network size={20} className="text-indigo-400" />
        Recursion Tree (Active Path)
      </h3>
      <div className="flex-1 rounded-lg overflow-hidden border border-dark-600 bg-dark-900">
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          fitView
          proOptions={{ hideAttribution: true }}
          minZoom={0.5}
        >
          <Background color="#334155" gap={16} />
          <Controls className="bg-dark-700 fill-slate-300 border-dark-600" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default BacktrackingTree;
