import React, { useEffect } from 'react';
import { useSudokuStore } from '../store/useSudokuStore';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';

const ControlPanel = () => {
  const { 
    isPlaying, setIsPlaying, nextStep, prevStep, resetSolver, 
    speed, setSpeed, steps, currentStepIndex 
  } = useSudokuStore();

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentStepIndex >= steps.length - 1) {
          setIsPlaying(false);
        } else {
          nextStep();
        }
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, currentStepIndex, steps.length, nextStep, setIsPlaying]);

  return (
    <div className="bg-dark-800 p-4 rounded-xl shadow-lg border border-dark-700 flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-slate-200 mb-2 border-b border-dark-600 pb-2">Algorithm Controls</h3>
      
      <div className="flex items-center justify-center gap-4">
        <button 
          onClick={resetSolver}
          className="p-2 rounded-full bg-dark-700 hover:bg-dark-600 text-slate-300 transition-colors"
          title="Restart"
        >
          <RotateCcw size={20} />
        </button>
        
        <button 
          onClick={prevStep}
          disabled={currentStepIndex < 0 || isPlaying}
          className="p-2 rounded-full bg-dark-700 hover:bg-dark-600 text-slate-300 disabled:opacity-50 transition-colors"
          title="Previous Step"
        >
          <SkipBack size={20} />
        </button>
        
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={steps.length === 0 || currentStepIndex >= steps.length - 1}
          className={`p-3 rounded-full text-white transition-colors shadow-lg ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} disabled:opacity-50`}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        
        <button 
          onClick={nextStep}
          disabled={currentStepIndex >= steps.length - 1 || isPlaying}
          className="p-2 rounded-full bg-dark-700 hover:bg-dark-600 text-slate-300 disabled:opacity-50 transition-colors"
          title="Next Step"
        >
          <SkipForward size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <label className="text-sm text-slate-400 flex justify-between">
          <span>Speed: {speed}x</span>
        </label>
        <input 
          type="range" 
          min="0.5" max="10" step="0.5" 
          value={speed} 
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-2 relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-400 bg-blue-900 bg-opacity-30">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-400">
              {steps.length > 0 ? Math.round(((currentStepIndex + 1) / steps.length) * 100) : 0}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-dark-700">
          <div style={{ width: `${steps.length > 0 ? ((currentStepIndex + 1) / steps.length) * 100 : 0}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
