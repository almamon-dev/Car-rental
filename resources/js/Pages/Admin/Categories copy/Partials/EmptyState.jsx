import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Search, Plus, RotateCcw } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function EmptyState({ hasActiveFilters, onResetFilters }) {
    return (
        <motion.div
            className="py-20 px-4 text-center bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-md mx-auto">
                <motion.div
                    className="w-20 h-20 mx-auto mb-6 bg-slate-50 rounded-2xl flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                >
                    {hasActiveFilters ? (
                        <Search size={32} className="text-slate-300" />
                    ) : (
                        <LayoutGrid size={32} className="text-primary/40" />
                    )}
                </motion.div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {hasActiveFilters
                        ? "No matching categories"
                        : "No categories yet"}
                </h3>

                <p className="text-slate-500 mb-8 text-sm">
                    {hasActiveFilters
                        ? "We couldn't find any categories matching your current search or filters."
                        : "Organize your products by creating your first category department."}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {hasActiveFilters ? (
                        <button
                            onClick={onResetFilters}
                            className="px-5 py-2.5 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all inline-flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={16} />
                            Clear all filters
                        </button>
                    ) : (
                        <Link
                            href={route("admin.category.create")}
                            className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-md transition-all inline-flex items-center justify-center gap-2"
                        >
                            <Plus size={18} />
                            Add Your First Category
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
