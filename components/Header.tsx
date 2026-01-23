import React, { useState } from 'react';
import { Activity, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: 'startups' | 'investors' | 'portfolio') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getLinkClass = (view: string) => {
    return currentView === view
      ? "text-emerald-400 font-semibold"
      : "text-slate-300 hover:text-emerald-400 cursor-pointer transition-colors";
  };

  const handleNavigation = (view: 'startups' | 'investors' | 'portfolio') => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => handleNavigation('startups')}
        >
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
          </div>
          <span className="text-base sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            VentureScout AI
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 lg:space-x-8 text-sm font-medium">
            <li>
              <button 
                onClick={() => handleNavigation('investors')}
                className={getLinkClass('investors')}
              >
                Investors
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('startups')}
                className={getLinkClass('startups')}
              >
                Startups
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('portfolio')}
                className={getLinkClass('portfolio')}
              >
                Portfolio
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-300 hover:text-emerald-400 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800/95 backdrop-blur-md border-t border-slate-700 animate-fade-in">
          <nav className="px-4 py-4">
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleNavigation('investors')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${getLinkClass('investors')}`}
                >
                  Investors
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('startups')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${getLinkClass('startups')}`}
                >
                  Startups
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('portfolio')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${getLinkClass('portfolio')}`}
                >
                  Portfolio
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};