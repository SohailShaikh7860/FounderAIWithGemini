import React from 'react';
import { Target, TrendingUp, Shield, Globe, ArrowRight } from 'lucide-react';
import { Card } from './ui/Card';

export const Investors: React.FC = () => {
  const criteria = [
    {
      icon: <Target className="w-8 h-8 text-cyan-400" />,
      title: "Visionary Founders",
      desc: "We back founders who possess a clear, transformative vision for the future."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
      title: "Scalable Economics",
      desc: "Seeking business models with inherent high leverage and rapid growth potential."
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-400" />,
      title: "Defensible Moats",
      desc: "Innovation that provides long-term protection against competitive forces."
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-400" />,
      title: "Global Impact",
      desc: "Solutions that solve massive problems on a global scale."
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in pb-12">
      <Card className="relative overflow-hidden mb-12 border-emerald-500/20" padding="lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Building the Future with <span className="text-emerald-400">Intelligent Capital</span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            VentureScout AI uses advanced GenAI models to identify and partner with the next generation of industry titans. Our automated screening process ensures fair, data-driven evaluation.
          </p>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-slate-900 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-white">24h</span>
              <span className="text-xs text-slate-500 uppercase">Term Sheet</span>
            </div>
            <div className="px-4 py-2 bg-slate-900 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-white">$5M+</span>
              <span className="text-xs text-slate-500 uppercase">Avg Check</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {criteria.map((item, idx) => (
          <Card key={idx} className="hover:border-slate-600 transition-colors group">
            <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-slate-800 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed">
              {item.desc}
            </p>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-emerald-900/40 to-cyan-900/40 border border-emerald-500/30 rounded-3xl p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4 font-display">Are you ready to build the future?</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-lg">
            Submit your pitch deck and video today to get an instant AI evaluation and term sheet negotiation.
          </p>
          <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-xl shadow-emerald-900/20 flex items-center gap-2 mx-auto">
            Start Application Process <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};