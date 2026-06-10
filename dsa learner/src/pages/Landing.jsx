import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Code, Trophy } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="max-w-4xl glass-panel p-12">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-brand-purple to-brand-cyan text-transparent bg-clip-text">
          DSA Quest
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Master Data Structures and Algorithms through interactive visualizations, game mechanics, and step-by-step code execution.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <Play className="w-10 h-10 text-brand-cyan mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Visualizer</h3>
            <p className="text-slate-500">See exactly how algorithms manipulate memory in real-time.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <Code className="w-10 h-10 text-brand-purple mb-4" />
            <h3 className="text-xl font-semibold mb-2">Code Execution</h3>
            <p className="text-slate-500">Follow the code execution line-by-line synced with visualizations.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <Trophy className="w-10 h-10 text-status-warning mb-4" />
            <h3 className="text-xl font-semibold mb-2">Gamified Learning</h3>
            <p className="text-slate-500">Earn XP, complete challenges, and unlock achievements.</p>
          </div>
        </div>

        <button 
          onClick={() => navigate('/dashboard')}
          className="btn btn-primary text-lg px-8 py-4 w-full md:w-auto"
        >
          Start Your Quest <Play className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
