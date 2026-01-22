import React from "react";

export default function EmptyState({ hasActiveFilters, onResetFilters }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-6 bg-white">
            {/* Compact LinkedIn-style Illustration */}
            <div className="relative mb-6">
                <div className="w-32 h-32 bg-[#f3f6f8] rounded-full flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                            <circle cx="20" cy="20" r="15" fill="#0A66C2" />
                            <circle cx="80" cy="70" r="25" fill="#0A66C2" />
                        </svg>
                    </div>
                    <svg
                        viewBox="0 0 140 140"
                        className="w-24 h-24 relative z-10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect x="25" y="45" width="90" height="60" rx="4" fill="white" stroke="#e0e0e0" strokeWidth="2" />
                        <rect x="35" y="58" width="50" height="4" rx="2" fill="#CFD8DC" />
                        <rect x="35" y="68" width="70" height="4" rx="2" fill="#ECEFF1" />
                        <circle cx="105" cy="95" r="16" fill="white" stroke="#0A66C2" strokeWidth="2" />
                        <path d="M98 95L103 100L112 91" stroke="#0A66C2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            <h3 className="text-[18px] font-semibold text-gray-900 mb-1 tracking-tight">
                {hasActiveFilters ? "No matching vehicles" : "Inventory is empty"}
            </h3>
            
            <p className="max-w-[360px] text-[14px] text-gray-500 mb-6 leading-normal font-sans">
                {hasActiveFilters 
                    ? "Try adjusting your filters to find what you need." 
                    : "Start building your fleet by adding a new vehicle."}
            </p>

            <div className="flex items-center gap-3">
                {hasActiveFilters ? (
                    <button
                        onClick={onResetFilters}
                        className="px-6 py-1.5 text-[14px] font-semibold text-[#0a66c2] border border-[#0a66c2] rounded-full hover:bg-blue-50 transition-colors"
                    >
                        Reset filters
                    </button>
                ) : (
                    <a
                        href="/admin/cars/create"
                        className="px-6 py-1.5 text-[14px] font-semibold text-white bg-[#0a66c2] rounded-full hover:bg-[#004182] transition-all"
                    >
                        Add vehicle
                    </a>
                )}
            </div>
        </div>
    );
}
