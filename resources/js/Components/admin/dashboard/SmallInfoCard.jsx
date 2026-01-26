import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function SmallInfoCard({ title, value, change, isNegative }) {
    return (
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#0a66c2]/30 transition-all duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-[12px] text-slate-500 font-bold uppercase tracking-tight">{title}</p>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">{value}</h3>
                </div>
                <div className={`${isNegative ? 'text-red-100 bg-red-50' : 'text-[#0a66c2] bg-blue-50'} p-2 rounded-full`}>
                    {isNegative ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                </div>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
                <span className={`text-[12px] font-bold ${isNegative ? "text-red-600" : "text-emerald-600"}`}>
                    {change}
                </span>
                <span className="text-slate-400 text-[11px] font-medium">
                    vs. last month
                </span>
            </div>
            
            {/* Action Link */}
            <button className="mt-3 text-[11px] font-bold text-[#0a66c2] hover:underline flex items-center gap-1 transition-all">
                View Details
            </button>
        </div>
    );
}
