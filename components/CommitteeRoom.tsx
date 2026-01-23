import React, { useState, useEffect } from 'react';
import { Users, ShieldAlert, Cpu, Lightbulb, Play, CheckCircle } from 'lucide-react';
import { AnalysisResult, CommitteeMessage, CommitteeAgent } from '../types';
import { startCommitteeDebate } from '../services/geminiService';

interface CommitteeRoomProps {
    analysis: AnalysisResult;
    onProceed: () => void;
    onReject: () => void;
}

const AGENTS: Record<string, CommitteeAgent> = {
    tech: {
        id: 'tech',
        name: 'Tanya (CTO)',
        role: 'Technical Analyst',
        avatar: '👩‍💻',
        personality: 'Skeptical, focused on scalability and moat.'
    },
    risk: {
        id: 'risk',
        name: 'Roger (CFO)',
        role: 'Risk Manager',
        avatar: '📉',
        personality: 'Conservative, focused on burn rate and competition.'
    },
    vision: {
        id: 'vision',
        name: 'Victoria (Partner)',
        role: 'Visionary',
        avatar: '🚀',
        personality: 'Optimistic, focused on market size and narrative.'
    }
};

export const CommitteeRoom: React.FC<CommitteeRoomProps> = ({ analysis, onProceed, onReject }) => {
    const [messages, setMessages] = useState<CommitteeMessage[]>([]);
    const [isDebating, setIsDebating] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        // Start debate automatically
        const startDebate = async () => {
            setIsDebating(true);
            try {
                const debateMessages = await startCommitteeDebate(analysis);
                // Simulate typing / streaming by adding them one by one
                let i = 0;
                const interval = setInterval(() => {
                    if (i >= debateMessages.length) {
                        clearInterval(interval);
                        setIsDebating(false);
                        setHasVoted(true);
                        return;
                    }
                    setMessages(prev => [...prev, debateMessages[i]]);
                    i++;
                }, 3000); // New message every 3 seconds
            } catch (e) {
                console.error("Debate failed", e);
                setIsDebating(false);
            }
        };

        startDebate();
    }, [analysis]);

    return (
        <div className="max-w-4xl mx-auto animate-fade-in relative px-2">
            <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Investment Committee</h2>
                <p className="text-sm sm:text-base text-slate-400">The partners are debating your startup.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                {Object.values(AGENTS).map(agent => (
                    <div key={agent.id} className="bg-slate-900 border border-slate-700 p-4 sm:p-6 rounded-xl flex flex-col items-center text-center">
                        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 p-3 sm:p-4 bg-slate-800 rounded-full">{agent.avatar}</div>
                        <h3 className="text-white font-bold text-sm sm:text-base">{agent.name}</h3>
                        <p className="text-slate-500 text-xs sm:text-sm">{agent.role}</p>
                    </div>
                ))}
            </div>

            <div className="bg-slate-950/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-800 min-h-[300px] sm:min-h-[400px] mb-6 sm:mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-purple-500 to-amber-500 opacity-20"></div>

                <div className="space-y-4 sm:space-y-6">
                    {messages.filter(msg => msg && msg.agentId).map((msg, idx) => {
                        const agent = AGENTS[msg.agentId as keyof typeof AGENTS];
                        if (!agent) return null; // Skip if agent not found
                        return (
                            <div key={idx} className={`flex gap-2 sm:gap-3 lg:gap-4 animate-slide-up ${msg.agentId === 'vision' ? 'flex-row-reverse' : ''
                                }`}>
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg sm:text-xl border border-slate-700 shrink-0">
                                    {agent.avatar}
                                </div>
                                <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl max-w-[85%] sm:max-w-[80%] ${msg.agentId === 'tech' ? 'bg-indigo-900/30 border border-indigo-500/30 text-indigo-100 rounded-tl-none' :
                                        msg.agentId === 'risk' ? 'bg-amber-900/30 border border-amber-500/30 text-amber-100 rounded-tl-none' :
                                            'bg-purple-900/30 border border-purple-500/30 text-purple-100 rounded-tr-none'
                                    }`}>
                                    <p className="text-xs font-bold mb-1 opacity-70">{agent.name}</p>
                                    <p className="text-sm sm:text-base">{msg.text}</p>
                                </div>
                            </div>
                        );
                    })}

                    {isDebating && (
                        <div className="flex items-center gap-2 text-slate-500 italic text-sm animate-pulse">
                            <Users className="w-4 h-4" />
                            The committee is deliberating...
                        </div>
                    )}
                </div>
            </div>

            {hasVoted && (
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 animate-scale-up px-4">
                    <button
                        onClick={onProceed}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg shadow-emerald-900/40 text-sm sm:text-base">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                        Proceed to Negotiation
                    </button>
                    <button
                        onClick={onReject}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 sm:px-6 py-3 sm:py-4 rounded-xl font-medium transition-all text-sm sm:text-base">
                        Walk Away
                    </button>
                </div>
            )}
        </div>
    );
};
