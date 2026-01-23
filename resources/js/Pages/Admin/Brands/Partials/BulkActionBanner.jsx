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
    search,
    onDeleteSuccess,
}) => {
    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-6 left-0 right-0 z-[60] flex justify-center p-4 pointer-events-none"
        >
            <div className="bg-white/95 backdrop-blur-md text-[#1a1c1e] px-6 py-3.5 rounded-full shadow-[0_12px_40px_rgba(10,102,194,0.15)] flex items-center gap-8 pointer-events-auto border border-[#0a66c2]/20">
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#eef3f8] rounded-full">
                        <Trash2 size={20} className="text-[#0a66c2]" />
                    </div>
                    <div>
                        <span className="text-[15px] font-bold text-[#1a1c1e] block leading-none mb-0.5">
                            {selectAllGlobal ? totalCount : selectedIds.length}{" "}
                            Brands Selected
                        </span>
                        <span className="text-[11px] text-[#5e6670] font-semibold uppercase tracking-wider">Bulk Operations Active</span>
                    </div>
                </div>

                <div className="h-8 w-px bg-gray-200 ml-2" />

                <div className="flex items-center gap-6">
                    {!selectAllGlobal &&
                        isAllPageSelected &&
                        itemCount < totalCount && (
                            <button
                                onClick={() => setSelectAllGlobal(true)}
                                className="text-[14px] font-bold text-[#0a66c2] hover:text-[#004182] transition-colors underline decoration-2 underline-offset-4"
                            >
                                Select all {totalCount} brands
                            </button>
                        )}

                    <DeleteAction
                        isBulk={true}
                        routeName="admin.brands.bulk-destroy"
                        selectedIds={getEffectiveSelectedIds()}
                        selectAllGlobal={selectAllGlobal}
                        totalCount={totalCount}
                        search={search}
                        onSuccess={onDeleteSuccess}
                        className="h-10 px-6 bg-[#0a66c2] hover:bg-[#004182] text-white text-[14px] font-bold rounded-full shadow-sm transition-all active:scale-95 flex items-center gap-2"
                    >
                        <Trash2 size={16} />
                        Confirm Delete
                    </DeleteAction>

                    <button
                        onClick={clearSelection}
                        className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
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
