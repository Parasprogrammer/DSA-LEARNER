import React from 'react';
import { useSudokuStore } from '../store/useSudokuStore';
import { Activity, CheckSquare, XSquare, Undo2, Hash } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, colorClass }) => (
  <div className="bg-dark-700 p-3 rounded-lg border border-dark-600 flex items-center gap-4">
    <div className={`p-3 rounded-lg ${colorClass} bg-opacity-20`}>
      <Icon className={colorClass.replace('bg-', 'text-')} size={24} />
    </div>
    <div>
      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-slate-100">{value}</p>
    </div>
  </div>
);

const StatisticsDashboard = () => {
  const { stats, currentStepIndex, steps } = useSudokuStore();

  return (
    <div className="bg-dark-800 p-5 rounded-xl shadow-lg border border-dark-700">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 border-b border-dark-600 pb-2 flex items-center gap-2">
        <Activity size={20} className="text-purple-400" />
        Live Algorithm Stats
      </h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Hash} 
          label="Total Steps" 
          value={currentStepIndex >= 0 ? currentStepIndex + 1 : 0} 
          colorClass="text-blue-400 bg-blue-500" 
        />
        <StatCard 
          icon={CheckSquare} 
          label="Valid Places" 
          value={stats.validPlacements} 
          colorClass="text-green-400 bg-green-500" 
        />
        <StatCard 
          icon={XSquare} 
          label="Invalid Attempts" 
          value={stats.invalidAttempts} 
          colorClass="text-red-400 bg-red-500" 
        />
        <StatCard 
          icon={Undo2} 
          label="Backtracks" 
          value={stats.backtracks} 
          colorClass="text-orange-400 bg-orange-500" 
        />
      </div>
      
      <div className="mt-4 pt-4 border-t border-dark-600 text-sm text-slate-400 flex justify-between">
        <span>Recursive Depth / Calls: <span className="text-white font-mono">{stats.recursiveCalls}</span></span>
        <span>Total Algorithm Operations: <span className="text-white font-mono">{steps.length}</span></span>
      </div>
    </div>
  );
};

export default StatisticsDashboard;
