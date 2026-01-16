import React from "react";
import { motion } from "framer-motion";
import { Trash2, X } from "lucide-react";
import DeleteAction from "@/Components/modals/ConfirmDelete";

const BulkActionBanner = ({
    selectedIds,
    selectAllGlobal,
    setSelectAllGlobal,
    isAllPageSelected,
    totalCount,
    itemCount,
    clearSelection,
    getEffectiveSelectedIds,
    search, // সার্চ প্যারামিটার পাস করুন
}) => {
    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[60] flex justify-center p-4 pointer-events-none"
        >
            <div className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 pointer-events-auto border border-slate-700">
                <div className="flex items-center gap-3 border-r border-slate-700 pr-6">
                    <div className="bg-primary/20 p-2 rounded-full">
                        <Trash2 size={18} className="text-primary" />
                    </div>
                    <span className="font-medium">
                        {selectAllGlobal ? totalCount : selectedIds.length}{" "}
                        Vehicles Selected
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    {!selectAllGlobal &&
                        isAllPageSelected &&
                        itemCount < totalCount && (
                            <button
                                onClick={() => setSelectAllGlobal(true)}
                                className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Select all {totalCount} vehicles
                            </button>
                        )}

                    {/* SweetAlert Popup এর জন্য DeleteAction ব্যবহার করা হলো */}
                    <DeleteAction
                        isBulk={true}
                        routeName="admin.cars.bulk-destroy"
                        selectedIds={getEffectiveSelectedIds()}
                        selectAllGlobal={selectAllGlobal}
                        totalCount={totalCount}
                        search={search}
                        onSuccess={() => {
                            clearSelection(); // ডিলিট শেষে আইডি ক্লিয়ার করবে
                            setSelectAllGlobal(false); // সিলেক্ট অল অফ করবে
                        }}
                    />

                    <button
                        onClick={clearSelection}
                        className="p-1 hover:bg-slate-800 rounded-full transition-colors"
                        title="Clear Selection"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default BulkActionBanner;
