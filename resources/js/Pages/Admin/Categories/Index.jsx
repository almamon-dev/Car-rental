import React, { useState, useRef, useCallback } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { TableManager } from "@/Hooks/TableManager";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import Partials
import BulkActionBanner from "./Partials/BulkActionBanner";
import CategoryTableRow from "./Partials/TableRow";
import FilterBar from "./Partials/FilterBar";
import StatusTabs from "./Partials/StatusTabs";
import TableSkeleton from "./Partials/TableSkeleton";
import EmptyState from "./Partials/EmptyState";

export default function CategoryList({
    auth,
    categories,
    filters = {},
    counts = {},
}) {
    const [isLoading, setIsLoading] = useState(false);
    const searchTimeoutRef = useRef(null);

    // TableManager Hook logic
    const {
        search,
        handleSearch: originalHandleSearch,
        selectedIds,
        toggleSelectAll,
        toggleSelect,
        selectAllGlobal,
        setSelectAllGlobal,
        clearSelection,
        isAllPageSelected,
        getEffectiveSelectedIds,
        isEffectivelySelected,
    } = TableManager("admin.category.index", categories.data, filters);

    // Page navigation and filtering logic
    const performVisit = useCallback((params) => {
        setIsLoading(true);
        router.get(route("admin.category.index"), params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onFinish: () => setTimeout(() => setIsLoading(false), 300),
        });
    }, []);

    // Debounced search logic
    const handleSearch = useCallback(
        (value) => {
            if (searchTimeoutRef.current)
                clearTimeout(searchTimeoutRef.current);
            originalHandleSearch(value);
            setIsLoading(true);
            searchTimeoutRef.current = setTimeout(() => {
                performVisit({ ...filters, search: value || null, page: 1 });
            }, 600);
        },
        [filters, originalHandleSearch, performVisit]
    );

    // Handle delete success - clear selection
    const handleDeleteSuccess = useCallback(() => {
        clearSelection();
        setSelectAllGlobal(false);
    }, [clearSelection, setSelectAllGlobal]);

    return (
        <AdminLayout user={auth.user}>
            <Head title="Manage Categories" />

            {/* Bulk Action Banner */}
            <AnimatePresence>
                {(selectedIds.length > 0 || selectAllGlobal) && (
                    <BulkActionBanner
                        selectedIds={selectedIds}
                        selectAllGlobal={selectAllGlobal}
                        setSelectAllGlobal={setSelectAllGlobal}
                        isAllPageSelected={isAllPageSelected}
                        totalCount={categories.total}
                        itemCount={categories.data.length}
                        clearSelection={clearSelection}
                        getEffectiveSelectedIds={getEffectiveSelectedIds}
                        search={search}
                        onDeleteSuccess={handleDeleteSuccess}
                    />
                )}
            </AnimatePresence>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                {/* Header Section */}
                <div className="flex justify-between items-center px-6 py-6 ">
                    <h1 className="text-xl font-bold text-slate-800">
                        Categories
                    </h1>
                    <Link href={route("admin.category.create")}>
                        <motion.div
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                            className="flex items-center gap-2 px-4 py-2 bg-[#3B82F6] rounded-[20px] cursor-pointer overflow-hidden relative"
                        >
                            {/* Background Hover Effect Overlay */}
                            <motion.div
                                variants={{
                                    rest: { scale: 0, opacity: 0 },
                                    hover: { scale: 1.5, opacity: 1 },
                                }}
                                className="absolute inset-0 bg-blue-600 rounded-full -z-10"
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Text Label */}
                            <motion.span
                                variants={{
                                    rest: { x: 0 },
                                    hover: { x: -2 },
                                }}
                                className="text-white font-bold text-xs tracking-wider"
                            >
                                Add Car
                            </motion.span>

                            {/* Icon with Motion */}
                            <motion.div
                                variants={{
                                    rest: { rotate: 0, scale: 1 },
                                    hover: { rotate: 90, scale: 1.1 },
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                }}
                                className="flex items-center justify-center bg-white/20 rounded-full p-1"
                            >
                                <Plus size={16} className="text-white" />
                            </motion.div>
                        </motion.div>
                    </Link>
                </div>

                {/* Filter and Tabs Section */}
                <StatusTabs
                    currentStatus={filters.status || "all"}
                    handleTabChange={(tab) =>
                        performVisit({
                            ...filters,
                            status: tab === "all" ? null : tab,
                            page: 1,
                        })
                    }
                    counts={counts}
                />

                <FilterBar
                    search={search}
                    handleSearch={handleSearch}
                    isClientSideLoading={isLoading}
                />

                {/* Table Section - height auto করা হয়েছে */}
                <div className="overflow-x-auto relative">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-400 font-bold text-[11px] uppercase tracking-wider border-b border-gray-100 bg-gray-50/30">
                                <th className="py-4 px-6 w-10 text-center">
                                    <input
                                        type="checkbox"
                                        checked={
                                            isAllPageSelected || selectAllGlobal
                                        }
                                        onChange={toggleSelectAll}
                                        className="rounded border-gray-300 accent-primary"
                                    />
                                </th>
                                <th className="py-4 px-4">Icon</th>
                                <th className="py-4 px-4">Name / Slug</th>
                                <th className="py-4 px-4">Description</th>
                                <th className="py-4 px-4">Status</th>
                                <th className="py-4 px-4">Created At</th>
                                <th className="py-4 px-4 text-right pr-10">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <TableSkeleton key="skeleton" />
                            ) : categories.data.length === 0 ? (
                                <motion.tbody
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <tr>
                                        <td colSpan="7">
                                            <EmptyState
                                                hasActiveFilters={
                                                    !!search || !!filters.status
                                                }
                                                onResetFilters={() =>
                                                    performVisit({})
                                                }
                                            />
                                        </td>
                                    </tr>
                                </motion.tbody>
                            ) : (
                                <motion.tbody
                                    key="data"
                                    className="divide-y divide-gray-100"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {categories.data.map((item) => (
                                        <CategoryTableRow
                                            key={item.id}
                                            item={item}
                                            isEffectivelySelected={
                                                isEffectivelySelected
                                            }
                                            toggleSelect={toggleSelect}
                                            onDeleteSuccess={
                                                handleDeleteSuccess
                                            } // Pass success handler
                                        />
                                    ))}
                                </motion.tbody>
                            )}
                        </AnimatePresence>
                    </table>
                </div>

                {/* Pagination Section */}
                {categories.data.length > 0 && (
                    <div className="p-4 ">
                        <Pagination
                            meta={categories}
                            onPageChange={(page) =>
                                performVisit({ ...filters, page })
                            }
                        />
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
