import React, { useState, useEffect } from 'react';
import { History, AlertTriangle, ArrowRight, Clock } from 'lucide-react';
import { AnalysisResult, BoardScenario } from '../types';
import { startBoardSimulation } from '../services/geminiService';
import { Card } from './ui/Card';

interface BoardSimulatorProps {
    analysis: AnalysisResult;
    onRestart: () => void;
}

export const BoardSimulator: React.FC<BoardSimulatorProps> = ({ analysis, onRestart }) => {
    const [scenario, setScenario] = useState<BoardScenario | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
    const [showConsequence, setShowConsequence] = useState(false);

    useEffect(() => {
        const loadScenario = async () => {
            try {
                await new Promise(r => setTimeout(r, 2000));
                const sim = await startBoardSimulation(analysis);
                setScenario(sim);
            } catch (e) {
                console.error("Sim failed", e);
            } finally {
                setIsLoading(false);
            }
        };
        loadScenario();
    }, [analysis]);

    const handleChoice = (choiceId: string) => {
        setSelectedChoice(choiceId);
        setShowConsequence(true);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in px-4">
                <div className="w-24 h-24 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin mb-8"></div>
                <h2 className="text-3xl font-bold font-display text-white mb-2">Simulating Future Scenarios</h2>
                <p className="text-slate-400">Projecting company trajectory based on current deal terms...</p>
            </div>
        );
    }

    if (!scenario) return <div className="text-center text-slate-400">Failed to load simulation.</div>;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in pb-12">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                    <Clock className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-white font-display">Board Room Simulator</h2>
                    <p className="text-purple-400 font-mono text-sm tracking-widest uppercase">
                        Timeline: {scenario.timeJump}
                    </p>
                </div>
            </div>

            <Card className="relative overflow-hidden border-purple-500/30" padding="lg">
                {/* Background Effect */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex items-start gap-5 mb-8">
                        <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 shrink-0">
                            <AlertTriangle className="w-8 h-8 text-amber-500" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-3">{scenario.title}</h3>
                            <p className="text-slate-300 text-lg leading-relaxed">{scenario.description}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {scenario.choices.map((choice) => {
                            const isSelected = selectedChoice === choice.id;
                            const isOtherSelected = selectedChoice !== null && !isSelected;

                            return (
                                <button
                                    key={choice.id}
                                    disabled={selectedChoice !== null}
                                    onClick={() => handleChoice(choice.id)}
                                    className={`text-left p-6 rounded-xl border-2 transition-all duration-300 relative overflow-hidden group
                                        ${isSelected
                                            ? 'bg-purple-900/20 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.15)]'
                                            : 'bg-slate-900/50 border-slate-800 hover:border-slate-600 hover:bg-slate-800'
                                        }
                                        ${isOtherSelected ? 'opacity-40 grayscale' : 'opacity-100'}
                                    `}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider
                                            ${isSelected ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-500'}
                                        `}>
                                            Option {choice.id}
                                        </span>
                                        {isSelected && <ArrowRight className="text-purple-400 w-5 h-5 animate-slide-right" />}
                                    </div>

                                    <h4 className={`text-xl font-bold mb-2 transition-colors ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-purple-300'}`}>
                                        {choice.label}
                                    </h4>

                                    {isSelected && showConsequence && (
                                        <div className="mt-4 pt-4 border-t border-purple-500/30 animate-fade-in">
                                            <p className="text-purple-200 text-lg italic">
                                                "{choice.consequence}"
                                            </p>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {showConsequence && (
                        <div className="mt-10 flex justify-center animate-slide-up">
                            <button
                                onClick={onRestart}
                                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 hover:scale-105"
                            >
                                <History className="w-5 h-5" />
                                Run New Simulation
                            </button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};
