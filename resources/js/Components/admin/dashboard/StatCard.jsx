import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
    title,
    value,
    change,
    color, // e.g. "bg-blue-600"
    icon,
    isNegative,
}) {
    // Extract color for the icon background by replacing bg- with text- or just using the prop
    const iconColorClass = color.replace('bg-', 'text-');
    const lightBgClass = color.replace('bg-', 'bg-') + '/10';

    return (
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-start justify-between group hover:shadow-md transition-all duration-300">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                    <div className={`${color} w-1 h-4 rounded-full`}></div>
                    <p className="text-slate-500 text-[13px] font-semibold uppercase tracking-wider">{title}</p>
                </div>
                <div className="flex items-baseline gap-2">
                    <h2 className="text-slate-900 text-2xl font-bold tracking-tight">{value}</h2>
                    <span className={`inline-flex items-center text-[11px] font-bold px-1.5 py-0.5 rounded ${isNegative ? 'text-red-600 bg-red-50' : 'text-emerald-600 bg-emerald-50'}`}>
                        {isNegative ? <ArrowDownRight size={12} className="mr-0.5" /> : <ArrowUpRight size={12} className="mr-0.5" />}
                        {change}
                    </span>
                </div>
                <p className="text-slate-400 text-[11px] mt-2 font-medium">vs. previous period</p>
            </div>
            <div className={`${lightBgClass} ${iconColorClass} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                {React.cloneElement(icon, { size: 22, strokeWidth: 2 })}
            </div>
        </div>
    );
}
