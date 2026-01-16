import React, { useState, useRef, useCallback, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { TableManager } from "@/Hooks/TableManager";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import BulkActionBanner from "./Partials/BulkActionBanner";
import CarTableRow from "./Partials/CarTableRow";
import FilterBar from "./Partials/FilterBar";
import StatusTabs from "./Partials/StatusTabs";
import TableSkeleton from "./Partials/TableSkeleton";
import EmptyState from "./Partials/EmptyState";

export default function CarList({
    auth,
    cars,
    brands = [],
    filters = {},
    counts = {},
}) {
    const [isLoading, setIsLoading] = useState(false);
    const searchTimeoutRef = useRef(null);

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
    } = TableManager("admin.cars.index", cars.data, filters);

    const performVisit = useCallback((params) => {
        setIsLoading(true);
        router.get(route("admin.cars.index"), params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onFinish: () => setTimeout(() => setIsLoading(false), 300),
        });
    }, []);

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

    const handleDeleteSuccess = useCallback(() => {
        clearSelection();
        setSelectAllGlobal(false);
    }, [clearSelection, setSelectAllGlobal]);

    return (
        <AdminLayout user={auth.user}>
            <Head title="Manage Cars" />

            <AnimatePresence>
                {(selectedIds.length > 0 || selectAllGlobal) && (
                    <BulkActionBanner
                        selectedIds={selectedIds}
                        selectAllGlobal={selectAllGlobal}
                        setSelectAllGlobal={setSelectAllGlobal}
                        isAllPageSelected={isAllPageSelected}
                        totalCount={cars.total}
                        itemCount={cars.data.length}
                        clearSelection={clearSelection}
                        getEffectiveSelectedIds={getEffectiveSelectedIds}
                        onDeleteSuccess={handleDeleteSuccess}
                    />
                )}
            </AnimatePresence>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex justify-between items-center px-6 py-6 border-b border-gray-50">
                    <h1 className="text-xl font-bold text-slate-800">
                        All Products
                    </h1>

                    <Link href={route("admin.cars.create")}>
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
                    brands={brands}
                    currentBrand={filters.brand}
                    currentTransmission={filters.transmission}
                    currentFuel={filters.fuel_type}
                    isClientSideLoading={isLoading}
                    handleFilter={(key, value) =>
                        performVisit({
                            ...filters,
                            [key]: value === "all" ? null : value,
                            page: 1,
                        })
                    }
                />

                <div className="overflow-x-auto relative min-h-[400px]">
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
                                        className="rounded border-gray-300 accent-primary cursor-pointer"
                                    />
                                </th>
                                <th className="py-4 px-4">Thumb</th>
                                <th className="py-4 px-4">Name / Brand</th>
                                <th className="py-4 px-4">Owner / Category</th>
                                <th className="py-4 px-4">Price Details</th>
                                <th className="py-4 px-4">Status</th>
                                <th className="py-4 px-4 text-right pr-10">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <TableSkeleton key="skeleton" />
                            ) : cars.data.length === 0 ? (
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
                                                    !!search ||
                                                    !!filters.status ||
                                                    !!filters.brand
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
                                    {cars.data.map((item) => (
                                        <CarTableRow
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
                                </motion.tbody>
                            )}
                        </AnimatePresence>
                    </table>
                </div>

                {cars.data.length > 0 && (
                    <div className="p-4 border-t border-gray-50">
                        <Pagination
                            meta={cars}
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
