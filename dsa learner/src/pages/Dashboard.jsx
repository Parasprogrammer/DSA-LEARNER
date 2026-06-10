import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '../store/useProgressStore';
import { 
  List, Search, ArrowDownUp, Layers, Network, Boxes, TreePine, 
  Share2, Merge, Zap, Filter, Hash, Calculator, Mountain, 
  GitCommit, Activity, Route, RefreshCcw, RefreshCw, MoveRight, 
  Code, ArrowUp, MoveHorizontal, Circle, LogOut
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const MODULES = [
  // Sorting (Already Available)
  { id: 'bubble-sort', name: 'Bubble Sort', category: 'Sorting', icon: ArrowDownUp, color: 'text-brand-cyan', isAvailable: true },
  { id: 'merge-sort', name: 'Merge Sort', category: 'Sorting', icon: Merge, color: 'text-brand-purple', isAvailable: true },
  { id: 'quick-sort', name: 'Quick Sort', category: 'Sorting', icon: Zap, color: 'text-brand-cyan', isAvailable: true },
  { id: 'bucket-sort', name: 'Bucket Sort', category: 'Sorting', icon: Filter, color: 'text-status-warning', isAvailable: true },
  { id: 'radix-sort', name: 'Radix Sort', category: 'Sorting', icon: Hash, color: 'text-status-success', isAvailable: true },
  
  // Arrays (Batch 1)
  { id: 'binary-search', name: 'Binary Search', category: 'Arrays', icon: Search, color: 'text-brand-purple', isAvailable: true },
  { id: 'array-reversal', name: 'Array Reversal', category: 'Arrays', icon: RefreshCcw, color: 'text-status-success', isAvailable: true },
  { id: 'linear-search', name: 'Linear Search', category: 'Arrays', icon: List, color: 'text-brand-cyan', isAvailable: true },
  { id: 'two-pointer', name: 'Two Pointer Technique', category: 'Arrays', icon: MoveRight, color: 'text-brand-purple', isAvailable: true },
  { id: 'sliding-window', name: 'Sliding Window', category: 'Arrays', icon: MoveHorizontal, color: 'text-status-warning', isAvailable: true },
  { id: 'prefix-sum', name: 'Prefix Sum', category: 'Arrays', icon: Calculator, color: 'text-status-success', isAvailable: true },
  { id: 'kadanes', name: "Kadane's Algorithm", category: 'Arrays', icon: Activity, color: 'text-brand-cyan', isAvailable: true },

  // Linked Lists (Batch 2)
  { id: 'linked-list', name: 'Singly Linked List', category: 'Linked Lists', icon: Network, color: 'text-status-warning', isAvailable: true },
  { id: 'doubly-linked-list', name: 'Doubly Linked List', category: 'Linked Lists', icon: MoveHorizontal, color: 'text-brand-purple', isAvailable: true },
  { id: 'circular-linked-list', name: 'Circular Linked List', category: 'Linked Lists', icon: Circle, color: 'text-brand-cyan', isAvailable: true },
  { id: 'reverse-linked-list', name: 'Reverse Linked List', category: 'Linked Lists', icon: RefreshCcw, color: 'text-status-success', isAvailable: true },
  { id: 'cycle-detection', name: 'Cycle Detection (Floyd)', category: 'Linked Lists', icon: RefreshCw, color: 'text-brand-purple', isAvailable: true },

  // Stack & Queue (Batch 3)
  { id: 'stack', name: 'Stack (LIFO)', category: 'Stack & Queue', icon: Layers, color: 'text-brand-purple', isAvailable: true },
  { id: 'queue', name: 'Queue (FIFO)', category: 'Stack & Queue', icon: Boxes, color: 'text-brand-cyan', isAvailable: true },
  { id: 'balanced-parens', name: 'Balanced Parentheses', category: 'Stack & Queue', icon: Code, color: 'text-brand-cyan', isAvailable: true },
  { id: 'infix-postfix', name: 'Infix → Postfix', category: 'Stack & Queue', icon: MoveHorizontal, color: 'text-brand-purple', isAvailable: true },
  { id: 'next-greater', name: 'Next Greater Element', category: 'Stack & Queue', icon: ArrowUp, color: 'text-status-warning', isAvailable: true },
  { id: 'monotonic-stack', name: 'Monotonic Stack', category: 'Stack & Queue', icon: Activity, color: 'text-status-success', isAvailable: true },
  { id: 'circular-queue', name: 'Circular Queue', category: 'Stack & Queue', icon: RefreshCw, color: 'text-brand-cyan', isAvailable: true },
  { id: 'deque', name: 'Deque', category: 'Stack & Queue', icon: MoveHorizontal, color: 'text-brand-purple', isAvailable: true },
  { id: 'priority-queue', name: 'Priority Queue', category: 'Stack & Queue', icon: List, color: 'text-status-warning', isAvailable: true },

  // Trees (Batch 4)
  { id: 'bst', name: 'Binary Search Tree', category: 'Trees', icon: TreePine, color: 'text-status-success', isAvailable: true },
  { id: 'tree-traversals', name: 'Tree Traversals', category: 'Trees', icon: MoveRight, color: 'text-brand-cyan', isAvailable: true },
  { id: 'avl-tree', name: 'AVL Tree', category: 'Trees', icon: Activity, color: 'text-brand-purple', isAvailable: true },
  { id: 'segment-tree', name: 'Segment Tree', category: 'Trees', icon: Network, color: 'text-status-warning', isAvailable: true },
  { id: 'fenwick-tree', name: 'Fenwick Tree (BIT)', category: 'Trees', icon: Calculator, color: 'text-brand-cyan', isAvailable: true },

  // Heaps (Batch 4)
  { id: 'min-heap', name: 'Min Heap', category: 'Heaps', icon: ArrowUp, color: 'text-status-success', isAvailable: true },
  { id: 'max-heap', name: 'Max Heap', category: 'Heaps', icon: ArrowUp, color: 'text-brand-purple', isAvailable: true },
  { id: 'heap-sort', name: 'Heap Sort', category: 'Heaps', icon: ArrowUp, color: 'text-brand-cyan', isAvailable: true },

  // Graphs (Batch 5)
  { id: 'bfs', name: 'BFS Traversal', category: 'Graphs', icon: Share2, color: 'text-brand-cyan', isAvailable: true },
  { id: 'dfs', name: 'DFS Traversal', category: 'Graphs', icon: Network, color: 'text-brand-purple', isAvailable: true },
  { id: 'dijkstra', name: 'Dijkstra', category: 'Graphs', icon: Route, color: 'text-status-success', isAvailable: true },
  { id: 'topological-sort', name: 'Topological Sort', category: 'Graphs', icon: List, color: 'text-brand-cyan', isAvailable: true },
  { id: 'union-find', name: 'Union Find (DSU)', category: 'Graphs', icon: Merge, color: 'text-brand-purple', isAvailable: true },
  { id: 'kruskal', name: 'Kruskal', category: 'Graphs', icon: Network, color: 'text-status-warning', isAvailable: true },
  { id: 'prim', name: 'Prim', category: 'Graphs', icon: Network, color: 'text-status-success', isAvailable: true },

  // DP (Batch 6)
  { id: 'fibonacci', name: 'Fibonacci', category: 'Dynamic Programming', icon: Activity, color: 'text-status-success', isAvailable: true },
  { id: 'climbing-stairs', name: 'Climbing Stairs', category: 'Dynamic Programming', icon: Activity, color: 'text-status-warning', isAvailable: true },
  { id: 'knapsack', name: 'Knapsack (0/1)', category: 'Dynamic Programming', icon: Calculator, color: 'text-brand-cyan', isAvailable: true },
  { id: 'lcs', name: 'LCS', category: 'Dynamic Programming', icon: Merge, color: 'text-brand-purple', isAvailable: true },
  { id: 'lis', name: 'LIS', category: 'Dynamic Programming', icon: Activity, color: 'text-status-success', isAvailable: true },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { xp, completedModules } = useProgressStore();
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Group modules by category
  const groupedModules = MODULES.reduce((acc, mod) => {
    if (!acc[mod.category]) acc[mod.category] = [];
    acc[mod.category].push(mod);
    return acc;
  }, {});

  const categoryOrder = [
    'Arrays', 'Sorting', 'Linked Lists', 'Stack & Queue', 
    'Trees', 'Heaps', 'Graphs', 'Dynamic Programming'
  ];

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-12 glass-panel p-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-purple to-brand-cyan text-transparent bg-clip-text">
            Dashboard
          </h1>
          {user && <p className="text-sm text-slate-500 mt-1">{user.email}</p>}
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white/10 px-4 py-2 rounded-lg font-mono text-status-warning flex items-center gap-2">
            XP: {xp}
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
            title="Log Out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b border-slate-200 pb-2">Practice Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            className="glass-panel p-6 cursor-pointer hover:border-brand-purple/50 transition-all group"
            onClick={() => navigate('/code-checker')}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-brand-purple/20 text-brand-purple">
                <Code size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-brand-purple transition-colors">Code Quality Checker</h3>
                <p className="text-slate-500 text-sm mt-1">Write your own code and get instant feedback on cleanliness and optimization.</p>
              </div>
            </div>
            <button className="btn btn-primary w-full mt-2">
              Launch Checker
            </button>
          </div>
        </div>
      </div>

      {categoryOrder.map(category => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b border-slate-200 pb-2">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {groupedModules[category]?.map(mod => {
              const isCompleted = completedModules.includes(mod.id);
              const Icon = mod.icon;
              
              return (
                <div 
                  key={mod.id} 
                  className={`glass-panel p-6 transition-all ${
                    mod.isAvailable 
                      ? 'cursor-pointer hover:border-brand-cyan/50' 
                      : 'opacity-50 cursor-not-allowed grayscale'
                  } ${isCompleted && mod.isAvailable ? 'border-status-success/50' : ''}`}
                  onClick={() => mod.isAvailable && navigate(`/visualizer/${mod.id}`)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-lg bg-white shadow-sm border border-slate-200 ${mod.color}`}>
                      <Icon size={24} />
                    </div>
                    {isCompleted && mod.isAvailable && (
                      <span className="text-xs font-semibold px-2 py-1 bg-status-success/20 text-status-success rounded-full">
                        Completed
                      </span>
                    )}
                    {!mod.isAvailable && (
                      <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{mod.name}</h3>
                  <p className="text-slate-500 text-xs mb-4">{mod.category}</p>
                  
                  <button 
                    className={`btn w-full text-sm ${mod.isAvailable ? 'btn-secondary' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}
                    disabled={!mod.isAvailable}
                  >
                    {isCompleted ? 'Practice Again' : (mod.isAvailable ? 'Start Lesson' : 'Locked')}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
