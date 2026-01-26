import React from "react";
import { Calendar } from "lucide-react";

export default function EmptyState({ hasActiveFilters, onResetFilters }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-6 bg-white">
            {/* Compact LinkedIn-style Illustration */}
            <div className="relative mb-6">
                <div className="w-32 h-32 bg-[#f3f6f8] rounded-full flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                            <circle cx="20" cy="20" r="15" fill="#0A66C2" />
                            <circle cx="80" cy="70" r="25" fill="#0A66C2" />
                        </svg>
                    </div>
                    <Calendar className="w-16 h-16 text-[#0a66c2] relative z-10" strokeWidth={1.5} />
                </div>
            </div>

            <h3 className="text-[18px] font-semibold text-gray-900 mb-1 tracking-tight">
                {hasActiveFilters ? "No matching bookings" : "No bookings yet"}
            </h3>
            
            <p className="max-w-[360px] text-[14px] text-gray-500 mb-8 leading-normal font-sans text-center">
                {hasActiveFilters 
                    ? "Try adjusting your search filters to find specific bookings." 
                    : "Bookings will appear here once customers start making reservations."}
            </p>

            <div className="flex items-center gap-3">
                {hasActiveFilters && (
                    <button
                        onClick={onResetFilters}
                        className="px-8 py-2 text-[14px] font-semibold text-[#0a66c2] border border-[#0a66c2] rounded-full hover:bg-blue-50 transition-colors"
                    >
                        Reset filters
                    </button>
                )}
            </div>
        </div>
    );
}
