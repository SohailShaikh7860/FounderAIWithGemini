import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ViewType } from '../../types';
import { Menu, Briefcase } from 'lucide-react';

interface AppLayoutProps {
    children: React.ReactNode;
    currentView: ViewType;
    onNavigate: (view: ViewType) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, currentView, onNavigate }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-slate-200 font-sans selection:bg-emerald-500/30">
            {/* Sidebar */}
            <Sidebar
                currentView={currentView}
                onNavigate={onNavigate}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className="md:pl-64 min-h-screen flex flex-col relative transition-all duration-300">

                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <Briefcase className="text-white w-5 h-5" />
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight text-white">
                            Founder<span className="text-emerald-500">AI</span>
                        </span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Background Lights */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-sky-500/5 rounded-full blur-[120px]"></div>
                </div>

                {/* Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
                    {children}
                </main>
            </div>
        </div>
    );
};
