import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
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
    search,
    onDeleteSuccess,
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
                    <span className="font-medium">
                        {selectAllGlobal ? totalCount : selectedIds.length}{" "}
                        Brands Selected
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    {!selectAllGlobal &&
                        isAllPageSelected &&
                        itemCount < totalCount && (
                            <button
                                onClick={() => setSelectAllGlobal(true)}
                                className="text-sm font-bold text-blue-400 hover:text-blue-300"
                            >
                                Select all {totalCount} items
                            </button>
                        )}

                    <DeleteAction
                        isBulk={true}
                        routeName="admin.brands.bulk-destroy"
                        selectedIds={getEffectiveSelectedIds()}
                        selectAllGlobal={selectAllGlobal}
                        onSuccess={onDeleteSuccess}
                    />

                    <button
                        onClick={clearSelection}
                        className="p-1 hover:bg-slate-800 rounded-full"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default BulkActionBanner;
