import React from 'react';
import { Play, Pause, StepForward, StepBack, RotateCcw } from 'lucide-react';

export default function Controls({ 
  isPlaying, 
  onPlayPause, 
  onStepForward, 
  onStepBack, 
  onReset,
  speed,
  onSpeedChange
}) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button className="btn btn-secondary btn-icon" onClick={onReset} title="Reset">
        <RotateCcw size={20} />
      </button>
      
      <button className="btn btn-secondary btn-icon" onClick={onStepBack} title="Step Back">
        <StepBack size={20} />
      </button>

      <button className={`btn btn-icon ${isPlaying ? 'btn-primary' : 'btn-primary'}`} onClick={onPlayPause} title={isPlaying ? "Pause" : "Play"}>
        {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
      </button>

      <button className="btn btn-secondary btn-icon" onClick={onStepForward} title="Step Forward">
        <StepForward size={20} />
      </button>

      <div className="flex items-center gap-2 ml-4 text-sm text-slate-500">
        <span>Slow</span>
        <input 
          type="range" 
          min="100" 
          max="2000" 
          step="100"
          value={2100 - speed} 
          onChange={(e) => onSpeedChange(2100 - e.target.value)}
        />
        <span>Fast</span>
      </div>
    </div>
  );
}
