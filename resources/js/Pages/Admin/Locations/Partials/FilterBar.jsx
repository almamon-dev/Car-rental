import React from "react";
import { Search, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterBar({
    search,
    handleSearch,
    isClientSideLoading,
}) {
    return (
        <div className="flex items-center w-full px-8 py-5 gap-4 bg-white border-b border-gray-200">
            <div className="relative flex-grow max-w-xl">
                <Search
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                        isClientSideLoading
                            ? "text-[#0a66c2] animate-pulse"
                            : "text-gray-400"
                    }`}
                    size={18}
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search by branch name or city..."
                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-[14px] font-medium text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-[#0a66c2]/10 focus:border-[#0a66c2] transition-all outline-none shadow-sm"
                />
            </div>
            <AnimatePresence>
                {search && (
                    <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        onClick={() => handleSearch("")}
                        className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 transition-all"
                    >
                        <RotateCcw size={14} /> Reset Filters
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
