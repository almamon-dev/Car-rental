import React from "react";
import { Link } from "@inertiajs/react";
import { Car, Search, Plus } from "lucide-react";

export default function EmptyState({ hasActiveFilters, onResetFilters }) {
    const Car = ({ size = 24, className = "" }) => (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={className}
        >
            <path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h3l3-3h4l3 3h3a2 2 0 012 2v6a2 2 0 01-2 2M5 17v3M19 17v3M7 13h0M17 13h0" />
        </svg>
    );

    const Search = ({ size = 24, className = "" }) => (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={className}
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
        </svg>
    );

    const Plus = ({ size = 24, className = "" }) => (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={className}
        >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );

    return (
        <motion.div
            className="py-16 px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-md mx-auto">
                <motion.div
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.1,
                    }}
                >
                    <Car size={32} className="text-blue-600" />
                </motion.div>

                <motion.h3
                    className="text-xl font-semibold text-gray-900 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {hasActiveFilters
                        ? "No matching cars found"
                        : "No cars listed yet"}
                </motion.h3>

                <motion.p
                    className="text-gray-600 mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {hasActiveFilters
                        ? "Try adjusting your search or filters to find what you're looking for."
                        : "Start by adding your first vehicle to the inventory."}
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {hasActiveFilters && (
                        <motion.button
                            onClick={onResetFilters}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Search size={16} />
                            Clear all filters
                        </motion.button>
                    )}
                    <motion.a
                        href="#"
                        className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-sm hover:shadow-md transition-all inline-flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Plus size={16} />
                        Add New Car
                    </motion.a>
                </motion.div>
            </div>
        </motion.div>
    );
}
