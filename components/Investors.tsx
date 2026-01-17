import React from 'react';
import { Target, TrendingUp, Shield, Globe } from 'lucide-react';

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
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-white mb-6">
          Investment <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Philosophy</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          VentureScout AI uses advanced Gemini models to identify and partner with the next generation of industry titans. Our automated screening process ensures fair, data-driven evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {criteria.map((item, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl hover:bg-slate-800 transition-colors">
            <div className="bg-slate-900 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-slate-700">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-emerald-900/40 to-cyan-900/40 border border-emerald-500/30 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Are you ready to build the future?</h2>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
          Submit your pitch deck and video today to get an instant AI evaluation and term sheet negotiation.
        </p>
        <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition-colors">
          Start Application Process
        </button>
      </div>
    </div>
  );
};