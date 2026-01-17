import React from 'react';
import { Activity } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: 'startups' | 'investors' | 'portfolio') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const getLinkClass = (view: string) => {
    return currentView === view
      ? "text-emerald-400 font-semibold"
      : "text-slate-300 hover:text-emerald-400 cursor-pointer transition-colors";
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => onNavigate('startups')}
        >
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Activity className="h-6 w-6 text-emerald-400" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            VentureScout AI
          </span>
        </div>
        <nav>
          <ul className="flex space-x-8 text-sm font-medium">
            <li>
              <button 
                onClick={() => onNavigate('investors')}
                className={getLinkClass('investors')}
              >
                Investors
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('startups')}
                className={getLinkClass('startups')}
              >
                Startups
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('portfolio')}
                className={getLinkClass('portfolio')}
              >
                Portfolio
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};