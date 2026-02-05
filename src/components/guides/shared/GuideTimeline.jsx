import React from 'react';
import { cn } from '../../../utils/cn';

const TimelineItem = ({ icon, title, items = [], isLast = false }) => {
    return (
        <div className="relative pl-10 pb-10 group">
            {/* Line connecting items */}
            {!isLast && (
                <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gradient-to-b from-info/50 to-info/10 group-hover:from-info transition-colors duration-300" />
            )}

            {/* Icon/Number Pin */}
            <div className="absolute left-0 top-0 w-10 h-10 bg-white border-2 border-info rounded-full flex items-center justify-center z-10 shadow-sm group-hover:scale-110 group-hover:bg-info group-hover:text-white transition-all duration-300">
                <span className="font-bold text-info group-hover:text-white">{icon}</span>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">{title}</h4>
                <ul className="space-y-2">
                    {items.map((item, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                            <span className="text-info font-bold mt-0.5">▸</span>
                            <span className="leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const GuideTimeline = ({ steps = [], className = '' }) => {
    return (
        <div className={cn("max-w-2xl mx-auto py-4", className)}>
            {steps.map((step, idx) => (
                <TimelineItem
                    key={idx}
                    icon={step.icon || (idx + 1)}
                    title={step.title}
                    items={step.items}
                    isLast={idx === steps.length - 1}
                />
            ))}
        </div>
    );
};

export default GuideTimeline;
