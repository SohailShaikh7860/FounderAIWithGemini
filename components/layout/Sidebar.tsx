import React from 'react';
import { LayoutDashboard, PieChart, Users, Briefcase, X } from 'lucide-react';
import { ViewType } from '../../types';

interface SidebarProps {
    currentView: ViewType;
    onNavigate: (view: ViewType) => void;
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen, onClose }) => {
    const navItems = [
        { id: 'startups', label: 'Startups', icon: LayoutDashboard },
        { id: 'portfolio', label: 'Portfolio', icon: PieChart },
        { id: 'investors', label: 'Investors', icon: Users },
    ] as const;

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <aside className={`
                w-64 h-screen fixed left-0 top-0 bg-slate-950 border-r border-slate-800 flex flex-col z-50
                transition-transform duration-300 ease-in-out
                md:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo Area */}
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <Briefcase className="text-white w-5 h-5" />
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight text-white">
                            Founder<span className="text-emerald-500">AI</span>
                        </span>
                    </div>
                    {/* Mobile Close Button */}
                    <button
                        onClick={onClose}
                        className="md:hidden p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
                        Platform
                    </div>

                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentView === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    onNavigate(item.id);
                                    onClose(); // Close sidebar on mobile when clicked
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                                    }`}
                            >
                                <Icon size={18} className={isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'} />
                                <span className={`font-medium ${isActive ? 'text-emerald-100' : ''}`}>
                                    {item.label}
                                </span>

                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                )}
                            </button>
                        );
                    })}
                </nav>


            </aside>
        </>
    );
};
