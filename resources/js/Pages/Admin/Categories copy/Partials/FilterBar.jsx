import React from "react";
import { Search, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterBar({
    search,
    handleSearch,
    isClientSideLoading,
}) {
    return (
        <div className="flex items-center w-full p-4 gap-4 bg-white border-b border-gray-100">
            <div className="relative flex-grow max-w-md">
                <Search
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                        isClientSideLoading
                            ? "text-primary animate-pulse"
                            : "text-slate-400"
                    }`}
                    size={16}
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search by name or description..."
                    className="w-full pl-10 pr-4 py-2 bg-[#F3F6F9] border-transparent rounded-lg text-sm focus:bg-white focus:border-primary transition-all outline-none"
                />
            </div>

            <AnimatePresence>
                {search && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => handleSearch("")}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                    >
                        <RotateCcw size={14} /> Reset
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
