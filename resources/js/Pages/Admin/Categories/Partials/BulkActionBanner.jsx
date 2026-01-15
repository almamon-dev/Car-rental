import React from "react";
import DeleteAction from "@/Components/modals/ConfirmDelete";

export default function BulkActionBanner({
    selectedIds,
    selectAllGlobal,
    setSelectAllGlobal,
    isAllPageSelected,
    cars,
    clearSelection,
    getEffectiveSelectedIds,
}) {
    return (
        <div className="bg-primary text-orange-600-foreground px-6 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm font-medium">
                <span className="bg-white text-orange-600 px-2 py-0.5 rounded-full font-bold text-xs">
                    {selectAllGlobal
                        ? `All (${cars.total})`
                        : selectedIds.length}
                </span>
                <span>Selected</span>
                {isAllPageSelected &&
                    !selectAllGlobal &&
                    cars.total > cars.data.length && (
                        <button
                            onClick={setSelectAllGlobal}
                            className="ml-2 text-xs bg-gray-600 px-3 py-1 rounded border border-orange-600/30"
                        >
                            Select all {cars.total} vehicles
                        </button>
                    )}
                <button
                    onClick={clearSelection}
                    className="ml-4 text-xs font-bold hover:underline opacity-80"
                >
                    Clear
                </button>
            </div>
            <DeleteAction
                selectedIds={getEffectiveSelectedIds()}
                selectAllGlobal={selectAllGlobal}
                routeName="admin.cars.bulk-destroy"
                onSuccess={clearSelection}
            />
        </div>
    );
}
