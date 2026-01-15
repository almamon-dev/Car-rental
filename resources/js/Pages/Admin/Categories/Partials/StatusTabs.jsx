import React from "react";
import { motion } from "framer-motion";

export default function StatusTabs({
    currentStatus,
    handleTabChange,
    counts = {},
}) {
    const tabs = ["all", "available", "reserved", "sold"];

    return (
        <div className="flex items-center gap-8 px-6 text-sm border-b border-slate-100 relative overflow-x-auto">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`py-4 transition-colors relative font-medium capitalize whitespace-nowrap ${
                        currentStatus === tab
                            ? "text-primary"
                            : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                    {tab === "all" ? "All Products" : tab + " Products"} (
                    {counts[tab] || 0})
                    {currentStatus === tab && (
                        <motion.div
                            layoutId="activeTabUnderline"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                            transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 30,
                            }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
