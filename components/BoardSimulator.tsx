import React, { useState, useEffect } from 'react';
import { History, AlertTriangle, ArrowRight, Play } from 'lucide-react';
import { AnalysisResult, BoardScenario } from '../types';
import { startBoardSimulation } from '../services/geminiService';

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
                // Add artificial delay for "Time Travel" feeling
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
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin mb-4 sm:mb-6"></div>
                <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 text-center">
                    Warping 18 Months into the Future...
                </h2>
            </div>
        );
    }

    if (!scenario) return <div className="text-center text-slate-400">Failed to load simulation.</div>;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in px-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="p-2 sm:p-3 bg-purple-500/20 rounded-xl">
                    <History className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Board Meeting Simulator</h2>
                    <p className="text-purple-400 font-mono mt-1 text-sm sm:text-base">{scenario.timeJump}</p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
                {/* Background Effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="mb-5 sm:mb-6 flex items-start gap-3 sm:gap-4">
                    <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 shrink-0" />
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{scenario.title}</h3>
                        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">{scenario.description}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-10">
                    {scenario.choices.map((choice) => {
                        const isSelected = selectedChoice === choice.id;
                        const isOtherSelected = selectedChoice !== null && !isSelected;

                        return (
                            <button
                                key={choice.id}
                                disabled={selectedChoice !== null}
                                onClick={() => handleChoice(choice.id)}
                                className={`text-left p-4 sm:p-6 rounded-lg sm:rounded-xl border transition-all duration-300 relative overflow-hidden group
                            ${isSelected
                                        ? 'bg-emerald-900/30 border-emerald-500/50 ring-2 ring-emerald-500'
                                        : 'bg-slate-800 border-slate-700 hover:border-slate-500 hover:bg-slate-750'
                                    }
                            ${isOtherSelected ? 'opacity-50' : 'opacity-100'}
                        `}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="bg-slate-700 text-slate-300 px-2 sm:px-3 py-1 rounded-lg text-xs font-bold uppercase">Option {choice.id}</span>
                                    {isSelected && <ArrowRight className="text-emerald-400 w-4 h-4 sm:w-5 sm:h-5 animate-slide-right" />}
                                </div>
                                <h4 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{choice.label}</h4>

                                {isSelected && showConsequence && (
                                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-emerald-500/30 animate-fade-in text-emerald-200 text-sm sm:text-base">
                                        {choice.consequence}
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {showConsequence && (
                    <div className="mt-6 sm:mt-10 flex justify-center animate-slide-up">
                        <button
                            onClick={onRestart}
                            className="bg-slate-700 hover:bg-slate-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-colors flex items-center gap-2 text-sm sm:text-base">
                            <History className="w-4 h-4" />
                            Restart Simulation
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};
