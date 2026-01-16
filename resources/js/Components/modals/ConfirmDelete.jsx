import React from "react";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";
import { Trash2 } from "lucide-react";

export default function DeleteAction({
    id = null,
    selectedIds = [],
    isBulk = false,
    routeName,
    totalCount = 0,
    selectAllGlobal = false,
    search = "",
    onSuccess,
    title = "Are you sure?",
    children, // টেক্সট বা অন্য কন্টেন্ট পাস করার জন্য
}) {
    const handleDelete = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation(); // ড্রপডাউন বন্ধ হওয়া বা অন্য ইভেন্ট আটকানোর জন্য
        }

        const count = isBulk
            ? selectAllGlobal
                ? totalCount
                : selectedIds.length
            : 1;

        Swal.fire({
            title,
            text: isBulk
                ? `${count} items will be deleted permanently!`
                : "This item will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: isBulk ? "Yes, Delete All!" : "Yes, Delete!",
            customClass: {
                confirmButton: "rounded-lg px-5 py-2.5 font-bold mx-2",
                cancelButton: "rounded-lg px-5 py-2.5 font-bold mx-2",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const deleteRoute = isBulk
                    ? route(routeName)
                    : route(routeName, id);

                router.delete(deleteRoute, {
                    data: { ids: selectedIds, all: selectAllGlobal, search },
                    preserveScroll: true,
                    preserveState: false,
                    onSuccess: () => {
                        if (onSuccess) onSuccess();
                    },
                });
            }
        });
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            className={
                isBulk
                    ? "flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-full text-sm font-bold text-white transition-all transform active:scale-95 pointer-events-auto"
                    : "flex items-center w-full text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
            }
        >
            <Trash2 size={isBulk ? 14 : 18} />
            {children ? (
                children
            ) : (
                <span>{isBulk ? "Delete Permanently" : ""}</span>
            )}
        </button>
    );
}
