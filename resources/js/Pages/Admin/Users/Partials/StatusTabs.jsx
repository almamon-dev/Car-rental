import React from 'react';

export default function StatusTabs({ currentStatus, handleTabChange, counts }) {
    const tabs = [
        { id: 'all', label: 'All Users', count: counts.all || 0 },
        { id: 'verified', label: 'Verified', count: counts.verified || 0 },
        { id: 'unverified', label: 'Unverified', count: counts.unverified || 0 },
    ];

    return (
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`relative py-4 text-[13px] font-bold transition-all whitespace-nowrap flex items-center gap-2
                        ${currentStatus === tab.id 
                            ? 'text-[#0a66c2]' 
                            : 'text-[#00000099] hover:text-[#000000e6]'
                        }`}
                >
                    {tab.label}
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold
                        ${currentStatus === tab.id 
                            ? 'bg-[#0a66c2]/10 text-[#0a66c2]' 
                            : 'bg-gray-100/80 text-gray-500'
                        }`}>
                        {tab.count}
                    </span>
                    {currentStatus === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0a66c2] rounded-t-full" />
                    )}
                </button>
            ))}
        </div>
    );
}
