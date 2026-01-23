import React, { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { router } from "@inertiajs/react";
import { Trash2, AlertTriangle, X } from "lucide-react";

export default function DeleteAction({
    id = null,
    selectedIds = [],
    isBulk = false,
    routeName,
    totalCount = 0,
    selectAllGlobal = false,
    search = "",
    onSuccess,
    title,
    children,
    className,
    // Controlled props
    trigger = true,
    open: controlledOpen,
    onOpenChange: setControlledOpen,
}) {
    const [localOpen, setLocalOpen] = useState(false);
    
    // Determine if we are in controlled or uncontrolled mode
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : localOpen;
    const setOpen = isControlled ? setControlledOpen : setLocalOpen;

    const count = isBulk
        ? selectAllGlobal
            ? totalCount
            : selectedIds.length
        : 1;

    const modalTitle = title || (isBulk ? "Confirm bulk delete" : "Delete this item?");
    const modalDescription = isBulk 
        ? `Are you sure you want to permanently delete these ${count} items? This action will remove all associated data and cannot be undone.`
        : "Are you sure you want to permanently delete this item? This action will remove all associated data and cannot be undone.";

    const handleDelete = () => {
        const deleteRoute = isBulk
            ? route(routeName)
            : route(routeName, id);

        router.delete(deleteRoute, {
            data: { ids: selectedIds, all: selectAllGlobal, search },
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => {
                setOpen(false);
                if (onSuccess) onSuccess();
            },
        });
    };

    const content = (
        <AlertDialog.Portal>
            {/* Elite Overlay - Elevated above menus and sidebar */}
            <AlertDialog.Overlay className="fixed inset-0 z-[10000] bg-slate-900/80 backdrop-blur-[2px] animate-in fade-in duration-300" />
            
            {/* Premium Structured Content - Absolute top z-index */}
            <AlertDialog.Content className="fixed top-[50%] left-[50%] z-[10001] w-[95vw] max-w-[512px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white shadow-[0_32px_64px_rgba(0,0,0,0.25)] focus:outline-none animate-in fade-in zoom-in-95 duration-200 overflow-hidden border border-gray-100">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <AlertDialog.Title className="text-[20px] font-semibold text-[#1a1c1e] tracking-tight">
                        {modalTitle}
                    </AlertDialog.Title>
                    <AlertDialog.Cancel asChild>
                        <button className="text-gray-500 hover:text-gray-800 p-1.5 rounded-full hover:bg-gray-100 transition-all">
                            <X size={20} />
                        </button>
                    </AlertDialog.Cancel>
                </div>

                {/* Body */}
                <div className="px-6 py-6 flex gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                            <AlertTriangle className="text-red-600" size={24} />
                        </div>
                    </div>
                    <div className="flex-1">
                        <AlertDialog.Description className="text-[16px] text-[#5e6670] leading-relaxed font-medium">
                            {modalDescription}
                        </AlertDialog.Description>
                    </div>
                </div>

                {/* Footer / Actions */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3">
                    <AlertDialog.Cancel asChild>
                        <button className="inline-flex h-10 items-center justify-center rounded-full border border-[#0a66c2] px-6 text-[16px] font-semibold text-[#0a66c2] hover:bg-[#0a66c2]/5 hover:border-[#004182] transition-all min-w-[100px]">
                            Cancel
                        </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <button
                            onClick={handleDelete}
                            className="inline-flex h-10 items-center justify-center rounded-full bg-red-600 px-6 text-[16px] font-semibold text-white hover:bg-red-700 transition-all shadow-sm active:scale-95 min-w-[100px]"
                        >
                            Delete
                        </button>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    );

    if (!trigger) {
        return (
            <AlertDialog.Root open={open} onOpenChange={setOpen}>
                {content}
            </AlertDialog.Root>
        );
    }

    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Trigger asChild>
                <button
                    type="button"
                    className={
                        className || (isBulk
                            ? "flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-bold text-white transition-all transform active:scale-95 pointer-events-auto shadow-sm"
                            : "flex items-center w-full text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors font-semibold")
                    }
                >
                    {!children && <Trash2 size={isBulk ? 14 : 18} />}
                    {children || (isBulk ? "Delete Permanently" : "")}
                </button>
            </AlertDialog.Trigger>
            {content}
        </AlertDialog.Root>
    );
}
