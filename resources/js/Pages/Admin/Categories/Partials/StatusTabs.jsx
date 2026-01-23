import React from "react";

export default function StatusTabs({
    currentStatus,
    handleTabChange,
    counts = {},
}) {
    const tabs = ["all", "active", "inactive"];

    return (
        <div className="flex items-center gap-1 bg-white border-b border-gray-200 relative overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
                const isActive = currentStatus === tab;
                const count = counts[tab] || 0;
                
                return (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`group relative flex items-center gap-2 px-6 py-4 focus:outline-none whitespace-nowrap`}
                    >
                        <span className={`text-[14px] font-semibold ${
                            isActive ? "text-[#0a66c2]" : "text-gray-500 group-hover:text-gray-700"
                        }`}>
                            {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)} Categories
                        </span>
                        
                        <span className={`text-[12px] font-medium ${
                            isActive ? "text-[#0a66c2]" : "text-gray-400"
                        }`}>
                            ({count})
                        </span>

                        {isActive && (
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0a66c2]" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
