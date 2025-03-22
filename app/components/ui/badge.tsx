import React from 'react';

type BadgeProps = {
    children: React.ReactNode;
    className?: string;
    variant?: 'pendiente' | 'en curso' | 'enviado' | 'entregado' | 'outline' | 'secondary' | 'default' | 'success' | 'destructive';
};

export const Badge: React.FC<BadgeProps> = ({ children, className, variant = 'default' }) => {
    const badgeClassnames = {
        pendiente: 'bg-gray-200 text-gray-800',
        'en curso': 'bg-yellow-500 text-white',
        enviado: 'bg-blue-500 text-white',
        entregado: 'bg-green-500 text-white',
        outline: 'border border-gray-300 text-gray-800',
        secondary: 'bg-gray-400 text-white',
        default: 'bg-gray-200 text-gray-800',
        success: 'bg-green-500 text-white',
        destructive: 'bg-red-500 text-white',
    };

    return (
        <span className={`${badgeClassnames[variant]} px-3 py-1 rounded-full text-sm ${className}`}>
            {children}
        </span>
    );
};
