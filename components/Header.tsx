import React from 'react';
import { Activity } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Activity className="h-6 w-6 text-emerald-400" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            VentureScout AI
          </span>
        </div>
        <nav>
          <ul className="flex space-x-6 text-sm font-medium text-slate-300">
            <li className="hover:text-emerald-400 cursor-pointer transition-colors">Investors</li>
            <li className="hover:text-emerald-400 cursor-pointer transition-colors">Startups</li>
            <li className="hover:text-emerald-400 cursor-pointer transition-colors">Portfolio</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
