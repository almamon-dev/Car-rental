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
    const [isSearching, setIsSearching] = useState(false);
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
    const performVisit = useCallback((params, withLoading = true) => {
        const scrollPosition = window.scrollY;
        if (withLoading) setIsLoading(true);
        router.get(route("admin.category.index"), params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onFinish: () => {
                if (withLoading) setIsLoading(false);
                setIsSearching(false);
                window.scrollTo(0, scrollPosition);
            },
        });
    }, []);

    // Debounced search logic
    const handleSearch = useCallback(
        (value) => {
            if (searchTimeoutRef.current)
                clearTimeout(searchTimeoutRef.current);
            originalHandleSearch(value);
            setIsSearching(true);
            searchTimeoutRef.current = setTimeout(() => {
                performVisit({ ...filters, search: value || null, page: 1 });
            }, 300);
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

            <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_4_12_rgba(0,0,0,0.05)] border-none overflow-hidden transition-all duration-300">
                <div className="flex justify-between items-center px-8 py-6 bg-white border-b border-[#f3f2ef]">
                    <div>
                        <h1 className="text-[20px] font-bold text-[#1a1c1e] leading-tight tracking-tight">
                            Category Management
                        </h1>
                        <p className="text-[14px] text-[#5e6670] font-medium mt-1">
                            Organize vehicles into logical segments and groups
                        </p>
                    </div>

                    <Link href={route("admin.category.create")}>
                        <div className="flex items-center gap-2 px-6 py-2.5 bg-[#0a66c2] hover:bg-[#004182] rounded-full cursor-pointer transition-all duration-300 shadow-sm border-2 border-transparent active:scale-95">
                            <Plus size={18} className="text-white stroke-[3px]" />
                            <span className="text-white font-bold text-[15px]">
                                Add Category
                            </span>
                        </div>
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
                        }, false)
                    }
                    counts={counts}
                />

                <FilterBar
                    search={search}
                    handleSearch={handleSearch}
                    isClientSideLoading={isLoading || isSearching}
                />

                {/* Table Section */}
                <div className="overflow-x-auto relative">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50">
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-6 w-12 text-center">
                                    <div className="flex justify-center">
                                        <input
                                            type="checkbox"
                                            checked={
                                                isAllPageSelected || selectAllGlobal
                                            }
                                            onChange={toggleSelectAll}
                                            className="w-4 h-4 rounded border-gray-300 text-[#0a66c2] focus:ring-[#0a66c2]/20 cursor-pointer"
                                        />
                                    </div>
                                </th>
                                <th className="py-3.5 px-4 text-[12px] font-bold text-gray-600 uppercase tracking-wider">Icon</th>
                                <th className="py-3.5 px-4 text-[12px] font-bold text-gray-600 uppercase tracking-wider">Name / Slug</th>
                                <th className="py-3.5 px-4 text-[12px] font-bold text-gray-600 uppercase tracking-wider">Description</th>
                                <th className="py-3.5 px-4 text-[12px] font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="py-3.5 px-4 text-[12px] font-bold text-gray-600 uppercase tracking-wider">Created At</th>
                                <th className="py-3.5 px-4 text-right pr-6 text-[12px] font-bold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        {isLoading && !isSearching ? (
                            <TableSkeleton 
                                rowCount={
                                    filters.status && counts[filters.status] !== undefined
                                        ? counts[filters.status]
                                        : (filters.status === null || filters.status === "all") && counts.all !== undefined
                                        ? counts.all
                                        : categories.data.length > 0
                                        ? categories.data.length
                                        : categories.per_page || 10
                                }
                            />
                        ) : categories.data.length === 0 ? (
                            <tbody>
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
                            </tbody>
                        ) : (
                            <tbody className="divide-y divide-gray-100">
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
                                        }
                                    />
                                ))}
                            </tbody>
                        )}
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
