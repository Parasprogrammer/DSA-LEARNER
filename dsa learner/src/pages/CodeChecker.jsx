import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Code2, Play, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { analyzeCode } from '../utils/codeScorer';

export default function CodeChecker() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = () => {
    const result = analyzeCode(code, language);
    setAnalysis(result);
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-status-success shrink-0 mt-0.5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-status-warning shrink-0 mt-0.5" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-status-error shrink-0 mt-0.5" />;
      default:
        return null;
    }
  };

  const getPlaceholder = () => {
    switch (language) {
      case 'python': return 'Paste or write your Python code here...';
      case 'cpp': return 'Paste or write your C++ code here...';
      default: return 'Paste or write your JavaScript code here...';
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 gap-4 max-w-screen-2xl mx-auto w-full">
      <header className="glass-panel px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary p-2">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-brand-purple" />
            <h1 className="text-2xl font-bold text-white">Code Quality Checker</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 shadow-sm text-sm rounded-lg focus:ring-brand-purple focus:border-brand-purple block p-2.5 outline-none"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
          <button 
            onClick={handleAnalyze}
            className="btn btn-primary flex items-center gap-2"
          >
            <Play size={18} /> Analyze Code
          </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        
        {/* Left Panel: Editor */}
        <div className="glass-panel flex flex-col overflow-hidden relative group">
          <div className="absolute top-0 left-0 right-0 h-10 bg-black/40 border-b border-white/5 flex items-center px-4">
            <span className="text-sm text-slate-500 font-mono">
              {language === 'javascript' ? 'main.js' : language === 'python' ? 'main.py' : 'main.cpp'}
            </span>
          </div>
          <textarea
            className="w-full flex-1 bg-transparent text-slate-700 font-mono p-4 pt-14 resize-none focus:outline-none focus:ring-1 focus:ring-brand-purple/50 leading-relaxed"
            placeholder={getPlaceholder()}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
          />
        </div>

        {/* Right Panel: Analysis Results */}
        <div className="glass-panel p-6 flex flex-col overflow-auto bg-black/20">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            Analysis Results
          </h2>
          
          {!analysis ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
              <Code2 className="w-16 h-16 mb-4 opacity-20" />
              <p>Write some code and click Analyze to get a score.</p>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              {/* Score Header */}
              <div className="flex items-center justify-center gap-8 p-6 bg-black/30 rounded-2xl border border-white/5">
                <div className="relative flex items-center justify-center w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-white/5 stroke-current"
                      strokeWidth="8"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                    />
                    <circle
                      className={`${analysis.color} stroke-current transition-all duration-1000 ease-out`}
                      strokeWidth="8"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      strokeDasharray={`${(analysis.score / 100) * 251.2} 251.2`}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className={`text-4xl font-bold ${analysis.color}`}>
                      {analysis.score}
                    </span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Score</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-slate-500 mb-1">Grade</div>
                  <div className={`text-6xl font-black ${analysis.color}`}>
                    {analysis.grade}
                  </div>
                </div>
              </div>

              {/* Feedback List */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
                  Feedback Highlights
                </h3>
                <div className="space-y-3">
                  {analysis.feedback.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm"
                    >
                      {getIconForType(item.type)}
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
