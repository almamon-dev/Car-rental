import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { TableManager } from "@/Hooks/TableManager";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Car, Search } from "lucide-react";

// Import partials
import BulkActionBanner from "./Partials/BulkActionBanner";
import CarTableRow from "./Partials/CarTableRow";
import FilterBar from "./Partials/FilterBar";
import StatusTabs from "./Partials/StatusTabs";
import TableSkeleton from "./Partials/TableSkeleton";

export default function CarList({
    auth,
    cars,
    brands = [],
    filters = {},
    counts = {},
}) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isClientSideLoading, setIsClientSideLoading] = useState(false);
    const searchTimeoutRef = useRef(null);
    const previousFiltersRef = useRef(filters);

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
        excludedIds,
        getEffectiveSelectedIds,
        isEffectivelySelected,
    } = TableManager("admin.cars.index", cars.data, filters);

    // Debounced search handler
    const handleSearch = (value) => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        originalHandleSearch(value);
        setIsClientSideLoading(true);

        searchTimeoutRef.current = setTimeout(() => {
            router.get(
                route("admin.cars.index"),
                { ...filters, search: value || null, page: 1 },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 500);
    };

    // Inertia event listeners
    useEffect(() => {
        const removeStartListener = router.on("start", () => {
            setIsProcessing(true);
            setIsClientSideLoading(true);
        });

        const removeFinishListener = router.on("finish", () => {
            setIsProcessing(false);
            setIsClientSideLoading(false);
        });

        return () => {
            removeStartListener();
            removeFinishListener();
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    // Compare filters to determine if it's a filter change or pagination
    useEffect(() => {
        const prev = previousFiltersRef.current;
        const current = filters;

        const onlyPageChanged =
            prev.page !== current.page &&
            Object.keys(prev)
                .filter((k) => k !== "page")
                .every((k) => prev[k] === current[k]);

        previousFiltersRef.current = current;

        if (onlyPageChanged) {
            setIsClientSideLoading(false);
        }
    }, [filters]);

    const currentStatus = filters.status || "all";
    const currentBrand = filters.brand || "";
    const currentTransmission = filters.transmission || "";
    const currentFuel = filters.fuel_type || "";

    const handleFilter = (key, value) => {
        setIsClientSideLoading(true);
        router.get(
            route("admin.cars.index"),
            { ...filters, [key]: value === "all" ? null : value, page: 1 },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleTabChange = (tab) => {
        setIsClientSideLoading(true);
        handleFilter("status", tab);
    };

    const showSkeleton =
        isClientSideLoading && !isProcessing && cars.data.length === 0;

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
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">
                            All Products
                        </h1>
                    </div>

                    <Link
                        href={route("admin.cars.create")}
                        className="group relative flex items-center justify-end h-10 min-w-[40px] transition-all duration-500 ease-in-out"
                    >
                        <span className="absolute right-12 whitespace-nowrap text-blue-500 font-medium opacity-100 group-hover:text-white group-hover:right-8 transition-all duration-500 ease-in-out z-10 pointer-events-none">
                            Add New product
                        </span>
                        <div className="flex items-center justify-center bg-[#3B82F6] text-white h-10 w-10 group-hover:w-44 rounded-full transition-all duration-500 ease-in-out shadow-md overflow-hidden relative">
                            <div className="absolute right-0 flex items-center justify-center min-w-[40px] h-10 z-20">
                                <Plus size={20} />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Tabs */}
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
                    isClientSideLoading={isClientSideLoading}
                    handleFilter={handleFilter}
                    router={router}
                />

                {/* Table Container */}
                <div className="overflow-x-auto min-h-[400px] relative" style={{ willChange: 'scroll-position' }}>
                    {showSkeleton ? (
                        <div>
                            <TableSkeleton />
                        </div>
                    ) : cars.data.length > 0 ? (
                        <div>
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
                                                                (isPartialSelected &&
                                                                    !selectAllGlobal) ||
                                                                (selectAllGlobal &&
                                                                    excludedIds.length >
                                                                        0 &&
                                                                    excludedIds.length <
                                                                        cars.total);
                                                    }}
                                                    onChange={toggleSelectAll}
                                                    className="rounded border-gray-300 accent-blue-500 cursor-pointer"
                                                    disabled={
                                                        isClientSideLoading
                                                    }
                                                />
                                            </th>
                                            <th className="py-4 px-4">Thumb</th>
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
                                            <th className="py-4 px-4">Info</th>
                                            <th className="py-4 px-4">
                                                Published
                                            </th>
                                            <th className="py-4 px-4 text-right pr-10">
                                                Options
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
                                                    isClientSideLoading
                                                }
                                            />
                                        ))}
                                    </tbody>
                                </table>
                        </div>
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center bg-white">
                                {/* Minimal LinkedIn-Style Illustration Container */}
                                <div className="relative mb-4">
                                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center">
                                        <Car
                                            size={40}
                                            className="text-slate-300 stroke-[1.2]"
                                        />
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-sm border border-slate-100">
                                        <Search
                                            size={16}
                                            className="text-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Typography Section */}
                                <div className="text-center max-w-sm px-6">
                                    <h3 className="text-[19px] font-semibold text-slate-900 mb-2">
                                        No results found
                                    </h3>
                                    <p className="text-[14px] text-slate-500 leading-normal mb-8">
                                        Try adjusting your search or filters to
                                        find what you're looking for.
                                    </p>
                                </div>

                                {/* LinkedIn-Style Action Buttons */}
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <button
                                        onClick={() =>
                                            router.get(
                                                route("admin.cars.index")
                                            )
                                        }
                                        className="px-6 py-1.5 text-[14px] font-semibold text-slate-600 hover:bg-slate-50 border border-slate-400 rounded-full transition-all duration-200"
                                    >
                                        Clear all filters
                                    </button>

                                    <Link
                                        href={route("admin.cars.create")}
                                        className="px-6 py-1.5 text-[14px] font-semibold text-white bg-[#0A66C2] hover:bg-[#004182] rounded-full transition-all duration-200 flex items-center gap-1"
                                    >
                                        <Plus size={16} />
                                        Add new product
                                    </Link>
                                </div>
                        </div>
                    )}

                    {/* Loading overlay for pagination */}
                    {isProcessing && cars.data.length > 0 && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {cars.data.length > 0 && (
                    <div className="border-t border-gray-50 relative">
                        {isProcessing && (
                            <div className="absolute inset-0 bg-white/80 z-10"></div>
                        )}
                        <Pagination meta={cars} />
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
