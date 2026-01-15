import React, { useState, useEffect, useRef, useCallback } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { TableManager } from "@/Hooks/TableManager";
import { Plus, Car, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import partials
import BulkActionBanner from "./Partials/BulkActionBanner";
import CarTableRow from "./Partials/TableRow";
import FilterBar from "./Partials/FilterBar";
import StatusTabs from "./Partials/StatusTabs";
import TableSkeleton from "./Partials/TableSkeleton";

export default function CategoryList({
    auth,
    cars,
    brands = [],
    filters = {},
    counts = {},
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
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
        isPartialSelected,
        getEffectiveSelectedIds,
        isEffectivelySelected,
    } = TableManager("admin.cars.index", cars.data, filters);

    const performVisit = useCallback(
        (params) => {
            setIsLoading(true);

            router.get(route("admin.cars.index"), params, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onFinish: () => {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                },
            });
        },
        [filters]
    );
    const handleSearch = useCallback(
        (value) => {
            if (searchTimeoutRef.current)
                clearTimeout(searchTimeoutRef.current);

            originalHandleSearch(value);
            setIsLoading(true);

            searchTimeoutRef.current = setTimeout(() => {
                performVisit({ ...filters, search: value || null, page: 1 });
            }, 1000);
        },
        [filters, originalHandleSearch, performVisit]
    );

    const handlePagination = useCallback(
        (page) => {
            performVisit({ ...filters, page });
        },
        [filters, performVisit]
    );

    const handleFilter = useCallback(
        (key, value) => {
            performVisit({
                ...filters,
                [key]: value === "all" ? null : value,
                page: 1,
            });
        },
        [filters, performVisit]
    );

    const handleTabChange = useCallback(
        (tab) => {
            handleFilter("status", tab);
        },
        [handleFilter]
    );

    const handleResetFilters = useCallback(() => {
        performVisit({});
    }, [performVisit]);

    useEffect(() => {
        const removeStartListener = router.on("start", () =>
            setIsProcessing(true)
        );
        const removeFinishListener = router.on("finish", () =>
            setIsProcessing(false)
        );

        return () => {
            removeStartListener();
            removeFinishListener();
            if (searchTimeoutRef.current)
                clearTimeout(searchTimeoutRef.current);
        };
    }, []);

    const currentStatus = filters.status || "all";
    const currentBrand = filters.brand || "";
    const currentTransmission = filters.transmission || "";
    const currentFuel = filters.fuel_type || "";

    return (
        <AdminLayout user={auth.user}>
            <Head title="Manage Cars" />

            {/* Bulk Actions Bar */}
            <AnimatePresence>
                {(selectedIds.length > 0 || selectAllGlobal) && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <BulkActionBanner
                            selectedIds={selectedIds}
                            selectAllGlobal={selectAllGlobal}
                            setSelectAllGlobal={setSelectAllGlobal}
                            isAllPageSelected={isAllPageSelected}
                            cars={cars}
                            clearSelection={clearSelection}
                            getEffectiveSelectedIds={getEffectiveSelectedIds}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bg-white font-sans">
                {/* Header Section */}
                <div className="flex justify-between items-center px-6 py-6 border-b border-gray-50 bg-white">
                    <h1 className="text-xl font-bold text-slate-800">
                        All Products
                    </h1>
                    <Link
                        href={route("admin.cars.create")}
                        className="group relative flex items-center justify-end h-10 min-w-[40px] transition-all duration-500 ease-in-out"
                    >
                        <span className="absolute right-12 whitespace-nowrap text-primary font-medium opacity-100 group-hover:text-white group-hover:right-8 transition-all duration-500 ease-in-out z-10 pointer-events-none">
                            Add New product
                        </span>
                        <div className="flex items-center justify-center bg-primary text-primary-foreground h-10 w-10 group-hover:w-44 rounded-full transition-all duration-500 ease-in-out shadow-md overflow-hidden relative">
                            <Plus size={20} className="absolute right-2.5" />
                        </div>
                    </Link>
                </div>

                {/* Status Tabs */}
                <StatusTabs
                    currentStatus={currentStatus}
                    handleTabChange={handleTabChange}
                    counts={counts}
                />

                {/* Filters Bar */}
                <FilterBar
                    search={search}
                    handleSearch={handleSearch}
                    currentBrand={currentBrand}
                    currentTransmission={currentTransmission}
                    currentFuel={currentFuel}
                    brands={brands}
                    isClientSideLoading={isLoading}
                    handleFilter={handleFilter}
                    router={router}
                />

                {/* Table Container */}
                <div className="overflow-x-auto min-h-[400px] relative">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="skeleton"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <TableSkeleton />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="table"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {cars.data.length === 0 ? (
                                    <div className="py-12 flex flex-col items-center justify-center bg-white">
                                        <div className="relative mb-4">
                                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center">
                                                <Car
                                                    size={40}
                                                    className="text-slate-300 stroke-[1.2]"
                                                />
                                            </div>
                                        </div>
                                        <h3 className="text-[19px] font-semibold text-slate-900 mb-2">
                                            No results found
                                        </h3>
                                        <button
                                            onClick={handleResetFilters}
                                            className="px-6 py-1.5 text-primary font-bold hover:underline"
                                        >
                                            Clear all filters
                                        </button>
                                    </div>
                                ) : (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="text-gray-400 font-bold text-[11px] uppercase tracking-wider border-b border-gray-100 bg-gray-50/30">
                                                <th className="py-4 px-6 w-10 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            isAllPageSelected ||
                                                            selectAllGlobal
                                                        }
                                                        ref={(el) => {
                                                            if (el)
                                                                el.indeterminate =
                                                                    isPartialSelected &&
                                                                    !selectAllGlobal;
                                                        }}
                                                        onChange={
                                                            toggleSelectAll
                                                        }
                                                        className="rounded border-gray-300 accent-blue-500 cursor-pointer"
                                                    />
                                                </th>
                                                <th className="py-4 px-4">
                                                    Thumb
                                                </th>
                                                <th className="py-4 px-4">
                                                    Name / Brand
                                                </th>
                                                <th className="py-4 px-4">
                                                    Owner / Category
                                                </th>
                                                <th className="py-4 px-4">
                                                    Ratings
                                                </th>
                                                <th className="py-4 px-4">
                                                    Price Details
                                                </th>
                                                <th className="py-4 px-4">
                                                    Info
                                                </th>
                                                <th className="py-4 px-4">
                                                    Published
                                                </th>
                                                <th className="py-4 px-4 text-right pr-10">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {cars.data.map((item) => (
                                                <CarTableRow
                                                    key={item.id}
                                                    item={item}
                                                    isEffectivelySelected={
                                                        isEffectivelySelected
                                                    }
                                                    toggleSelect={toggleSelect}
                                                    isClientSideLoading={
                                                        isLoading
                                                    }
                                                    isProcessing={isProcessing}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                {cars.data.length > 0 && (
                    <div className="relative">
                        <Pagination
                            meta={cars}
                            onPageChange={handlePagination}
                        />
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
