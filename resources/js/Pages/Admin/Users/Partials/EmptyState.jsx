import React from "react";

export default function EmptyState({ hasActiveFilters, onResetFilters }) {
    return (
        <div className="flex flex-col items-center justify-center py-10 px-6 bg-white">
            {/* Compact LinkedIn-style Illustration */}
            <div className="relative mb-4">
                <div className="w-24 h-24 bg-[#f3f6f8] rounded-full flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                            <circle cx="20" cy="20" r="15" fill="#0A66C2" />
                            <circle cx="80" cy="70" r="25" fill="#0A66C2" />
                        </svg>
                    </div>
                    <svg
                        viewBox="0 0 140 140"
                        className="w-14 h-14 relative z-10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Simplified User Profile Card Illustration */}
                        <rect x="25" y="45" width="90" height="60" rx="4" fill="white" stroke="#e0e0e0" strokeWidth="2" />
                        <circle cx="45" cy="75" r="12" fill="#CFD8DC" />
                        <rect x="65" y="68" width="40" height="4" rx="2" fill="#ECEFF1" />
                        <rect x="65" y="78" width="30" height="4" rx="2" fill="#ECEFF1" />
                        
                        {/* Search/User Circle indicator */}
                        <circle cx="105" cy="95" r="16" fill="white" stroke="#0A66C2" strokeWidth="2" />
                        <path d="M98 95L103 100L112 91" stroke="#0A66C2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            <h3 className="text-[16px] font-semibold text-gray-900 mb-1 tracking-tight">
                {hasActiveFilters ? "No matching users" : "No users found"}
            </h3>
            
            <p className="max-w-[320px] text-[13px] text-gray-500 mb-6 leading-normal font-sans text-center">
                {hasActiveFilters 
                    ? "Try adjusting your search or filters." 
                    : "The user directory is currently empty."}
            </p>

            <div className="flex items-center gap-3">
                {hasActiveFilters && (
                    <button
                        onClick={onResetFilters}
                        className="px-6 py-1.5 text-[13px] font-semibold text-[#0a66c2] border border-[#0a66c2] rounded-full hover:bg-blue-50 transition-colors"
                    >
                        Reset filters
                    </button>
                )}
            </div>
        </div>
    );
}
