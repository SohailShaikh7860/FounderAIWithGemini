import React from 'react';
import { AnalysisResult } from '../types';
import { Award, FolderOpen, TrendingUp, Zap, Users } from 'lucide-react';
import { Card } from './ui/Card';

interface PortfolioProps {
  items: AnalysisResult[];
}

export const Portfolio: React.FC<PortfolioProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto py-20 animate-fade-in text-center px-4">
        <Card className="inline-block p-8 border-dashed border-slate-700 bg-slate-900/30" padding="none">
          <div className="bg-slate-800/50 inline-flex p-6 rounded-full mb-6 border border-slate-700">
            <FolderOpen className="w-12 h-12 text-slate-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-300 mb-2">Portfolio Empty</h2>
          <p className="text-slate-500 max-w-md mx-auto">
            No startups have been analyzed in this session yet. Return to the Dashboard to submit a pitch.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <Card key={index} className="group hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <h3 className="font-bold text-xl text-white group-hover:text-emerald-300 transition-colors truncate max-w-[180px]">
                  {item.companyName}
                </h3>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Seed Stage</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold border ${item.score >= 75
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                {item.score} / 100
              </div>
            </div>

            <p className="text-slate-400 text-sm line-clamp-3 mb-6 min-h-[60px] leading-relaxed">
              {item.summary}
            </p>

            <div className="grid grid-cols-3 gap-2 py-4 border-t border-slate-800">
              <div className="text-center p-2 rounded bg-slate-900/50">
                <TrendingUp className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <p className="text-[10px] text-slate-500 uppercase">Market</p>
              </div>
              <div className="text-center p-2 rounded bg-slate-900/50">
                <Zap className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                <p className="text-[10px] text-slate-500 uppercase">Product</p>
              </div>
              <div className="text-center p-2 rounded bg-slate-900/50">
                <Users className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                <p className="text-[10px] text-slate-500 uppercase">Team</p>
              </div>
            </div>

            <button className="w-full mt-2 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-white hover:bg-slate-800 rounded transition-colors">
              View Full Report
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};