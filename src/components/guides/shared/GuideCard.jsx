import React from 'react';
import { cn } from '../../../utils/cn';

const GuideCard = ({
    icon,
    title,
    items = [],
    children,
    color = 'info',
    className = '',
    footer
}) => {
    const colorClasses = {
        info: 'border-info/30 bg-info/5 text-info',
        success: 'border-success/30 bg-success/5 text-success',
        warning: 'border-warning/30 bg-warning/5 text-warning',
        danger: 'border-error/30 bg-error/5 text-error',
        error: 'border-error/30 bg-error/5 text-error',
        purple: 'border-purple-300 bg-purple-50 text-purple-700',
        blue: 'border-blue-300 bg-blue-50 text-blue-700',
        'indo-red': 'border-indo-red/30 bg-indo-red/5 text-indo-red',
        'oz-gold': 'border-oz-gold/30 bg-oz-gold/5 text-oz-gold',
    };

    const titleColors = {
        info: 'text-gray-900',
        success: 'text-gray-900',
        warning: 'text-gray-900',
        danger: 'text-gray-900',
        error: 'text-gray-900',
        purple: 'text-purple-900',
        blue: 'text-blue-900',
        'indo-red': 'text-gray-900',
        'oz-gold': 'text-gray-900',
    };

    const bulletColors = {
        info: 'bg-info',
        success: 'bg-success',
        warning: 'bg-warning',
        danger: 'bg-error',
        error: 'bg-error',
        purple: 'bg-purple-500',
        blue: 'bg-blue-500',
        'indo-red': 'bg-indo-red',
        'oz-gold': 'bg-oz-gold',
    };

    return (
        <div className={cn(
            "h-full flex flex-col bg-white rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
            colorClasses[color] || colorClasses.info,
            className
        )}>
            {/* Header */}
            {(icon || title) && (
                <div className="flex items-center gap-3 mb-4">
                    {icon && <span className="text-3xl filter drop-shadow-sm">{icon}</span>}
                    {title && <h3 className={cn("text-xl font-bold", titleColors[color])}>{title}</h3>}
                </div>
            )}

            {/* Content */}
            <div className="flex-1">
                {items.length > 0 ? (
                    <ul className="space-y-2.5">
                        {items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <span className={cn(
                                    "mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0",
                                    bulletColors[color]
                                )} />
                                <span className="text-sm leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                ) : children}
            </div>

            {/* Footer */}
            {footer && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default GuideCard;
