import React, { useState, useRef, useCallback, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { TableManager } from "@/Hooks/TableManager";
import { Plus } from "lucide-react";

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
    const [isSearching, setIsSearching] = useState(false);
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

    const performVisit = useCallback((params, withLoading = true) => {
        const scrollPosition = window.scrollY;
        if (withLoading) setIsLoading(true);
        router.get(route("admin.cars.index"), params, {
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

    const handleSearch = useCallback(
        (value) => {
            if (searchTimeoutRef.current)
                clearTimeout(searchTimeoutRef.current);
            originalHandleSearch(value);
            setIsSearching(true);
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

            <div className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)] border border-gray-200 overflow-hidden">
                <div className="flex justify-between items-center px-8 py-5 border-b border-gray-100 bg-white">
                    <div>
                        <h1 className="text-[18px] font-semibold text-gray-900 leading-tight">
                            Product Inventory
                        </h1>
                        <p className="text-[13px] text-gray-500 font-medium mt-0.5">
                            Manage your vehicle listings and availability
                        </p>
                    </div>

                    <Link href={route("admin.cars.create")}>
                        <div className="flex items-center gap-2 px-5 py-2 bg-[#0a66c2] hover:bg-[#004182] rounded-full cursor-pointer transition-all duration-200">
                             {/* Text Label */}
                            <span className="text-white font-semibold text-[14px]">
                                Add Car
                            </span>

                            {/* Icon */}
                            <Plus size={16} className="text-white stroke-[3px]" />
                        </div>
                    </Link>
                </div>

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
                                <th className="py-3.5 px-4 text-[12px] font-bold text-gray-600 uppercase tracking-wider">Vehicle</th>
                                <th className="py-3.5 px-4 text-[12px] font-bold text-gray-600 uppercase tracking-wider">Category</th>
                                <th className="py-3.5 px-4 text-[12px] font-bold text-gray-600 uppercase tracking-wider">Registration / VIN</th>
                                <th className="py-3.5 px-4 text-[12px] font-bold text-gray-600 uppercase tracking-wider">Specifications</th>
                                <th className="py-3.5 px-4 text-[12px] font-bold text-gray-600 uppercase tracking-wider">Pricing</th>
                                <th className="py-3.5 px-4 text-[12px] font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="py-3.5 px-4 text-[12px] font-bold text-gray-600 uppercase tracking-wider">Added Date</th>
                                <th className="py-3.5 px-4 text-right pr-6 text-[12px] font-bold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        {isLoading && !isSearching ? (
                            <TableSkeleton
                                key="skeleton"
                                rowCount={
                                    filters.status && counts[filters.status] !== undefined
                                        ? counts[filters.status]
                                        : (filters.status === null || filters.status === "all") && counts.all !== undefined
                                        ? counts.all
                                        : cars.data.length > 0
                                        ? cars.data.length
                                        : cars.per_page || 10
                                }
                            />
                        ) : cars.data.length === 0 ? (
                            <tbody key="empty">
                                <tr>
                                    <td colSpan="9">
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
                            </tbody>
                        ) : (
                            <tbody
                                key="data"
                                className="divide-y divide-gray-100"
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
                                        isSearching={isSearching}
                                    />
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>

                {cars.data.length > 0 && (
                    <div className="p-4">
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
