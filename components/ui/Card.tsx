import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass' | 'outline' | 'flat';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    padding = 'md',
    className = '',
    ...props
}) => {
    const variants = {
        default: 'bg-surface border border-slate-800 shadow-xl shadow-black/20',
        glass: 'glass-panel',
        outline: 'bg-transparent border border-slate-700',
        flat: 'bg-slate-900',
    };

    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            className={`rounded-2xl ${variants[variant]} ${paddings[padding]} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};
