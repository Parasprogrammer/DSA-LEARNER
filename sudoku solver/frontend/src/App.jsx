import React, { useState } from 'react';
import axios from 'axios';
import { useSudokuStore } from './store/useSudokuStore';
import SudokuBoard from './components/SudokuBoard';
import ControlPanel from './components/ControlPanel';
import ExplanationPanel from './components/ExplanationPanel';
import StatisticsDashboard from './components/StatisticsDashboard';
import BacktrackingTree from './components/BacktrackingTree';
import { BrainCircuit, PlayCircle, RefreshCw, Wand2 } from 'lucide-react';

const API_URL = 'http://localhost:8000/api';

function App() {
  const { setBoard, setSteps, currentBoard } = useSudokuStore();
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [hint, setHint] = useState(null);

  const generatePuzzle = async () => {
    setLoading(true);
    setHint(null);
    try {
      const res = await axios.get(`${API_URL}/generate?difficulty=${difficulty}`);
      setBoard(res.data.puzzle);
    } catch (error) {
      console.error('Failed to generate puzzle', error);
    }
    setLoading(false);
  };

  const solvePuzzle = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/solve`, { board: currentBoard });
      setSteps(res.data.steps);
    } catch (error) {
      console.error('Failed to solve puzzle', error);
    }
    setLoading(false);
  };

  const getHint = async () => {
    // Find first empty cell
    let r = -1, c = -1;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (currentBoard[i][j] === 0) {
          r = i; c = j; break;
        }
      }
      if (r !== -1) break;
    }
    
    if (r === -1) return; // No empty cells
    
    try {
      const res = await axios.get(`${API_URL}/hint?row=${r}&col=${c}&board=${JSON.stringify(currentBoard)}`);
      setHint(res.data);
    } catch (error) {
      console.error('Failed to get hint', error);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 p-4 md:p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 bg-dark-800 p-6 rounded-2xl shadow-lg border border-dark-700">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 p-3 rounded-xl shadow-lg shadow-blue-500/20">
              <BrainCircuit className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Sudoku DSA Visualizer
              </h1>
              <p className="text-slate-400 text-sm mt-1">Learn Backtracking Step-by-Step</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <select 
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-dark-700 border border-dark-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="expert">Expert</option>
            </select>
            
            <button 
              onClick={generatePuzzle} disabled={loading}
              className="flex items-center gap-2 bg-dark-700 hover:bg-dark-600 border border-dark-600 text-white font-medium rounded-lg text-sm px-4 py-2.5 transition-all shadow-md"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Generate
            </button>
            
            <button 
              onClick={solvePuzzle} disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-all shadow-lg shadow-blue-600/30"
            >
              <PlayCircle size={18} />
              Solve & Trace
            </button>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Board & Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-dark-800 p-6 rounded-2xl shadow-lg border border-dark-700 flex flex-col items-center justify-center min-h-[400px]">
              <SudokuBoard />
              
              <div className="w-full mt-6 flex justify-between items-center px-4">
                <button onClick={getHint} className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 transition-colors">
                  <Wand2 size={16} /> Get Hint
                </button>
              </div>
            </div>
            
            <ControlPanel />
          </div>
          
          {/* Right Column: Visualizations & Explanations */}
          <div className="lg:col-span-7 space-y-6 flex flex-col">
            <StatisticsDashboard />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              <ExplanationPanel />
              
              {hint && (
                <div className="bg-dark-800 p-5 rounded-xl shadow-lg border border-blue-900/50 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2 relative z-10">
                    <Wand2 size={18} /> Smart Hint
                  </h3>
                  <div className="space-y-3 relative z-10">
                    <p className="text-sm text-slate-300">Target Cell: <span className="font-mono bg-dark-900 px-2 py-0.5 rounded text-white">({hint.row + 1}, {hint.col + 1})</span></p>
                    <div>
                      <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Possible Candidates</p>
                      <div className="flex flex-wrap gap-2">
                        {hint.candidates.length > 0 ? hint.candidates.map(c => (
                          <span key={c} className="bg-green-900/30 text-green-400 border border-green-700/50 px-2.5 py-1 rounded text-sm font-bold">
                            {c}
                          </span>
                        )) : (
                          <span className="text-red-400 text-sm">No valid candidates!</span>
                        )}
                      </div>
                    </div>
                    {hint.candidates.length > 0 && (
                      <div className="pt-2 border-t border-dark-700">
                        <p className="text-sm text-slate-300">Recommended: <span className="text-white font-bold">{hint.candidates[0]}</span></p>
                        <p className="text-xs text-slate-400 mt-1">Satisfies all immediate constraints.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <BacktrackingTree />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
