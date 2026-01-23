import React from 'react';
import { AnalysisResult } from '../types';
import { Award, FolderOpen } from 'lucide-react';

interface PortfolioProps {
  items: AnalysisResult[];
}

export const Portfolio: React.FC<PortfolioProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 sm:py-20 animate-fade-in text-center px-4">
        <div className="bg-slate-800/50 inline-block p-5 sm:p-6 rounded-full mb-4 sm:mb-6 border border-slate-700">
            <FolderOpen className="w-10 h-10 sm:w-12 sm:h-12 text-slate-500" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-300">Portfolio Empty</h2>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-md mx-auto px-4">
          No startups have been analyzed in this session yet. Go to the "Startups" tab to submit a pitch and build your portfolio.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in pb-8 sm:pb-12">
      <div className="mb-8 sm:mb-10 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3 justify-center md:justify-start">
          <Award className="text-emerald-400 w-6 h-6 sm:w-8 sm:h-8" />
          Analyzed Portfolio
        </h2>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">Track analyzed startups and their Gemini scores.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {items.map((item, index) => (
          <div key={index} className="bg-slate-800 border border-slate-700 rounded-xl p-4 sm:p-6 hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-emerald-900/20 group">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg sm:text-xl text-white group-hover:text-emerald-300 transition-colors truncate pr-2">{item.companyName}</h3>
                <p className="text-xs text-slate-500 mt-1">Session Item #{items.length - index}</p>
              </div>
              <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap flex-shrink-0 ${item.score >= 90 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {item.score} / 100
              </div>
            </div>
            
            <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 mb-4 sm:mb-5 min-h-[48px] sm:min-h-[60px]">
              {item.summary}
            </p>

            <div className="space-y-2 sm:space-y-3 border-t border-slate-700 pt-3 sm:pt-4">
                <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase">Market</span>
                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-1">{item.metrics.marketSize}</p>
                </div>
                 <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase">Innovation</span>
                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-1">{item.metrics.innovation}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};