import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, ArrowRight, Shield } from 'lucide-react';
import { DueDiligenceClaim } from '../types';
import { Card } from './ui/Card';

interface DueDiligenceViewProps {
    claims: DueDiligenceClaim[];
    onComplete: () => void;
}

export const DueDiligenceView: React.FC<DueDiligenceViewProps> = ({ claims, onComplete }) => {
    const [activeClaims, setActiveClaims] = useState(claims);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const handleVerify = (id: string, answer: string) => {
        setAnswers(prev => ({ ...prev, [id]: answer }));
        setActiveClaims(prev =>
            prev.map(c => c.id === id ? { ...c, status: 'Verified', userResponse: answer } : c)
        );
    };

    const isAllVerified = activeClaims.every(c => c.status === 'Verified');

    return (
        <div className="max-w-4xl mx-auto animate-fade-in pb-12">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-amber-500/10 rounded-xl">
                    <ShieldCheck className="w-8 h-8 text-amber-500" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-white">Autonomous Due Diligence</h2>
                    <p className="text-slate-400">AI Agents are verifying key claims in your pitch.</p>
                </div>
            </div>

            <div className="space-y-6">
                {activeClaims.map((claim, index) => (
                    <Card
                        key={index}
                        className={`transition-all duration-300 border-l-4 ${claim.status === 'Verified'
                                ? 'border-l-emerald-500 bg-emerald-900/5'
                                : 'border-l-amber-500'
                            }`}
                        padding="md"
                    >
                        <div className="flex items-start gap-4">
                            <div className={`mt-1 p-2 rounded-lg flex-shrink-0 ${claim.status === 'Verified' ? 'bg-emerald-500/10' : 'bg-amber-500/10'
                                }`}>
                                {claim.status === 'Verified' ? (
                                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                                ) : (
                                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-900 px-2 py-0.5 rounded">
                                        {claim.category}
                                    </span>
                                    {claim.status === 'Verified' && (
                                        <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold uppercase tracking-wider">
                                            Verified
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-lg font-medium text-white mb-4">"{claim.claim}"</h3>

                                {claim.status !== 'Verified' ? (
                                    <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700/50">
                                        <div className="flex items-start gap-3 mb-4">
                                            <Shield className="w-4 h-4 text-amber-400 mt-1" />
                                            <div>
                                                <p className="text-amber-200 text-sm font-semibold mb-1">Analyst Query</p>
                                                <p className="text-slate-300 text-sm">{claim.aiQuestion}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Provide evidence or clarification..."
                                                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all placeholder:text-slate-600"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') handleVerify(claim.id, (e.target as HTMLInputElement).value);
                                                }}
                                            />
                                            <button
                                                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-amber-900/20 hover:shadow-amber-900/40"
                                                onClick={(e) => {
                                                    const input = (e.currentTarget.previousElementSibling as HTMLInputElement).value;
                                                    if (input) handleVerify(claim.id, input);
                                                }}
                                            >
                                                Verify
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-4 p-4 bg-emerald-950/20 rounded-lg border border-emerald-900/30">
                                        <p className="text-sm text-slate-400">
                                            <span className="text-emerald-400 font-bold block mb-1">Founder Response:</span>
                                            "{claim.userResponse}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="mt-10 flex justify-center">
                <button
                    onClick={onComplete}
                    disabled={!isAllVerified}
                    className={`
            group flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300
            ${isAllVerified
                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 hover:scale-105 hover:shadow-emerald-500/40'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'}
          `}
                >
                    {isAllVerified ? 'Proceed to Committee' : 'Resolve All Flags to Proceed'}
                    <ArrowRight className={`w-5 h-5 ${isAllVerified ? 'group-hover:translate-x-1 transition-transform' : ''}`} />
                </button>
            </div>
        </div>
    );
};
