import React from "react";
import { motion } from "framer-motion";

export default function StatusTabs({
    currentStatus,
    handleTabChange,
    counts = {},
}) {
    const tabs = ["all", "active", "inactive"];

    return (
        <div className="flex items-center gap-8 px-6 text-sm border-b border-slate-100 relative overflow-x-auto bg-white">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`py-4 transition-colors relative font-medium capitalize whitespace-nowrap flex items-center gap-2 ${
                        currentStatus === tab
                            ? "text-primary"
                            : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                    <span>
                        {tab === "all" ? "All Brands" : `${tab} Brands`}
                    </span>
                    <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            currentStatus === tab
                                ? "bg-primary/10 text-primary"
                                : "bg-slate-100 text-slate-500"
                        }`}
                    >
                        {counts[tab] || 0}
                    </span>

                    {currentStatus === tab && (
                        <motion.div
                            layoutId="activeTabUnderline"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
