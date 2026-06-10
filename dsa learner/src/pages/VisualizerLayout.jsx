import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useProgressStore } from '../store/useProgressStore';
import { useVisualizerStore } from '../store/useVisualizerStore';
import Controls from '../components/Controls';
import CodeViewer from '../components/CodeViewer';
import Visualizer from '../components/Visualizer';
import LinkedListVisualizer from '../components/LinkedListVisualizer';
import TreeVisualizer from '../components/TreeVisualizer';
import GraphVisualizer from '../components/GraphVisualizer';
import BucketVisualizer from '../components/BucketVisualizer';
import GridVisualizer from '../components/GridVisualizer';

// Import algorithm configurations
import { bubbleSortConfig } from '../algorithms/bubbleSort';
import { arrayReversalConfig } from '../algorithms/arrayReversal';
import { binarySearchConfig } from '../algorithms/binarySearch';
import { linkedListConfig } from '../algorithms/linkedList';
import { stackConfig } from '../algorithms/stack';
import { queueConfig } from '../algorithms/queue';
import { bstConfig } from '../algorithms/bst';
import { mergeSortConfig } from '../algorithms/mergeSort';
import { quickSortConfig } from '../algorithms/quickSort';
import { bucketSortConfig } from '../algorithms/bucketSort';
import { radixSortConfig } from '../algorithms/radixSort';
import { bfsConfig } from '../algorithms/bfs';
import { dfsConfig } from '../algorithms/dfs';
import { linearSearchConfig } from '../algorithms/linearSearch';
import { twoPointerConfig } from '../algorithms/twoPointer';
import { slidingWindowConfig } from '../algorithms/slidingWindow';
import { prefixSumConfig } from '../algorithms/prefixSum';
import { kadanesConfig } from '../algorithms/kadanes';
import { doublyLinkedListConfig } from '../algorithms/doublyLinkedList';
import { circularLinkedListConfig } from '../algorithms/circularLinkedList';
import { reverseLinkedListConfig } from '../algorithms/reverseLinkedList';
import { cycleDetectionConfig } from '../algorithms/cycleDetection';
import { balancedParensConfig } from '../algorithms/balancedParens';
import { infixPostfixConfig } from '../algorithms/infixPostfix';
import { nextGreaterConfig } from '../algorithms/nextGreater';
import { monotonicStackConfig } from '../algorithms/monotonicStack';
import { circularQueueConfig } from '../algorithms/circularQueue';
import { dequeConfig } from '../algorithms/deque';
import { priorityQueueConfig } from '../algorithms/priorityQueue';
import { treeTraversalsConfig } from '../algorithms/treeTraversals';
import { avlTreeConfig } from '../algorithms/avlTree';
import { segmentTreeConfig } from '../algorithms/segmentTree';
import { fenwickTreeConfig } from '../algorithms/fenwickTree';
import { minHeapConfig } from '../algorithms/minHeap';
import { maxHeapConfig } from '../algorithms/maxHeap';
import { heapSortConfig } from '../algorithms/heapSort';
import { dijkstraConfig } from '../algorithms/dijkstra';
import { topologicalSortConfig } from '../algorithms/topologicalSort';
import { unionFindConfig } from '../algorithms/unionFind';
import { kruskalConfig } from '../algorithms/kruskal';
import { primConfig } from '../algorithms/prim';
import { fibonacciConfig } from '../algorithms/fibonacci';
import { climbingStairsConfig } from '../algorithms/climbingStairs';
import { lisConfig } from '../algorithms/lis';
import { knapsackConfig } from '../algorithms/knapsack';
import { lcsConfig } from '../algorithms/lcs';

const MODULES = {
  'bubble-sort': bubbleSortConfig,
  'array-reversal': arrayReversalConfig,
  'binary-search': binarySearchConfig,
  'linked-list': linkedListConfig,
  'stack': stackConfig,
  'queue': queueConfig,
  'bst': bstConfig,
  'merge-sort': mergeSortConfig,
  'quick-sort': quickSortConfig,
  'bucket-sort': bucketSortConfig,
  'radix-sort': radixSortConfig,
  'bfs': bfsConfig,
  'dfs': dfsConfig,
  'linear-search': linearSearchConfig,
  'two-pointer': twoPointerConfig,
  'sliding-window': slidingWindowConfig,
  'prefix-sum': prefixSumConfig,
  'kadanes': kadanesConfig,
  'doubly-linked-list': doublyLinkedListConfig,
  'circular-linked-list': circularLinkedListConfig,
  'reverse-linked-list': reverseLinkedListConfig,
  'cycle-detection': cycleDetectionConfig,
  'balanced-parens': balancedParensConfig,
  'infix-postfix': infixPostfixConfig,
  'next-greater': nextGreaterConfig,
  'monotonic-stack': monotonicStackConfig,
  'circular-queue': circularQueueConfig,
  'deque': dequeConfig,
  'priority-queue': priorityQueueConfig,
  'tree-traversals': treeTraversalsConfig,
  'avl-tree': avlTreeConfig,
  'segment-tree': segmentTreeConfig,
  'fenwick-tree': fenwickTreeConfig,
  'min-heap': minHeapConfig,
  'max-heap': maxHeapConfig,
  'heap-sort': heapSortConfig,
  'dijkstra': dijkstraConfig,
  'topological-sort': topologicalSortConfig,
  'union-find': unionFindConfig,
  'kruskal': kruskalConfig,
  'prim': primConfig,
  'fibonacci': fibonacciConfig,
  'climbing-stairs': climbingStairsConfig,
  'lis': lisConfig,
  'knapsack': knapsackConfig,
  'lcs': lcsConfig
};

export default function VisualizerLayout() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const moduleConfig = MODULES[moduleId];
  
  const { completeModule } = useProgressStore();
  const { 
    isPlaying, speed, currentStep, 
    setIsPlaying, setSpeed, stepForward, stepBack, reset 
  } = useVisualizerStore();
  
  const [states, setStates] = useState([]);
  const timerRef = useRef(null);
  
  // Initialize states
  useEffect(() => {
    if (moduleConfig) {
      setStates(moduleConfig.generateStates());
      reset();
    }
  }, [moduleId, moduleConfig]);
  
  // Playback
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        if (currentStep < states.length - 1) {
          useVisualizerStore.getState().stepForward(states.length);
        } else {
          setIsPlaying(false);
          // Auto complete module when it reaches the end
          completeModule(moduleId, moduleConfig.xpReward);
        }
      }, speed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, speed, currentStep, states.length, moduleId, moduleConfig?.xpReward]);
  
  if (!moduleConfig) return <div className="p-8 text-center text-red-500">Module not found!</div>;

  const currentState = states[currentStep];

  return (
    <div className="h-screen flex flex-col p-4 gap-4 max-w-screen-2xl mx-auto w-full">
      <header className="glass-panel px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary p-2">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-white">{moduleConfig.name}</h1>
        </div>
        <div className="text-sm px-4 py-2 bg-brand-cyan/20 text-brand-cyan rounded-full font-semibold border border-brand-cyan/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
          +{moduleConfig.xpReward} XP Available
        </div>
      </header>

      <div className="flex-1 grid grid-cols-12 grid-rows-3 gap-4 min-h-0">
        
        {/* Left Panel: Education & Context */}
        <div className="col-span-3 row-span-3 glass-panel p-6 flex flex-col overflow-auto">
          <h2 className="text-xl font-semibold mb-4 text-brand-purple">Intuition</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            {moduleConfig.description}
          </p>
          
          <h3 className="text-lg font-semibold mb-3 text-slate-800">Complexity</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-3 bg-black/20 border border-white/5 rounded-lg">
              <span className="text-slate-500">Time (Worst)</span>
              <span className="font-mono text-status-error font-semibold">{moduleConfig.complexity.time}</span>
            </div>
            <div className="flex justify-between p-3 bg-black/20 border border-white/5 rounded-lg">
              <span className="text-slate-500">Space</span>
              <span className="font-mono text-status-success font-semibold">{moduleConfig.complexity.space}</span>
            </div>
          </div>
          
          <div className="mt-8 flex-1 flex flex-col min-h-[150px]">
            <h3 className="text-lg font-semibold mb-3 text-slate-800">Execution Log</h3>
            <div className="bg-black/40 p-4 rounded-lg text-sm font-mono text-brand-cyan flex-1 overflow-auto border border-white/5 whitespace-pre-wrap">
               {currentState?.log || "System initialized. Waiting to start..."}
            </div>
          </div>
        </div>

        {/* Center Panel: Visualization */}
        <div className="col-span-6 row-span-2 glass-panel flex flex-col relative">
          {currentState && (
            moduleConfig.type === 'graph' ? <GraphVisualizer state={currentState} /> :
            moduleConfig.type === 'buckets' ? <BucketVisualizer state={currentState} /> :
            moduleConfig.type === 'tree' ? <TreeVisualizer state={currentState} /> :
            moduleConfig.type === 'linked-list' ? <LinkedListVisualizer state={currentState} /> :
            moduleConfig.type === 'grid' ? <GridVisualizer state={currentState} /> :
            <Visualizer state={currentState} />
          )}
        </div>
        
        {/* Bottom Panel: Controls */}
        <div className="col-span-6 row-span-1 glass-panel flex flex-col justify-center px-8 relative overflow-hidden">
          <Controls 
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onStepForward={() => { setIsPlaying(false); stepForward(states.length); }}
            onStepBack={stepBack}
            onReset={reset}
            speed={speed}
            onSpeedChange={setSpeed}
          />
          <div className="mt-6 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Step: {currentStep + 1} / {states.length}</span>
            <span>Progress: {Math.round(((currentStep + 1) / states.length) * 100)}%</span>
          </div>
          
          {/* Progress bar background indicator */}
          <div className="absolute bottom-0 left-0 h-1 bg-brand-purple transition-all duration-300" style={{width: `${((currentStep + 1) / states.length) * 100}%`}}></div>
        </div>

        {/* Right Panel: Code Viewer */}
        <div className="col-span-3 row-span-3 glass-panel p-6 overflow-hidden flex flex-col">
          <CodeViewer 
            code={moduleConfig.code} 
            activeLine={currentState?.activeLine || 1} 
          />
        </div>
        
      </div>
    </div>
  );
}
