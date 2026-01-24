import React, { useState, useRef, useCallback, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { TableManager } from "@/Hooks/TableManager";
import { Plus, Package, Search, LayoutGrid, Filter, ExternalLink } from "lucide-react";

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
            }, 300);
        },
        [filters, originalHandleSearch, performVisit]
    );

    const handleDeleteSuccess = useCallback(() => {
        clearSelection();
        setSelectAllGlobal(false);
    }, [clearSelection, setSelectAllGlobal]);

    return (
        <AdminLayout user={auth.user}>
            <Head title="Vehicle Inventory | Admin" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                {/* 1. Simplified LinkedIn Header (Flat & Clean) */}
                <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm">
                    <div className="px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-[#f3f6f8] rounded flex items-center justify-center text-[#0a66c2]">
                                <Package size={24} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[20px] font-bold text-[#081621]">
                                    Product Inventory
                                </h1>
                                <p className="text-[13px] text-[#666666] mt-0.5 font-medium">
                                    Manage your vehicle listings, specifications, and fleet availability.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link href={route("admin.cars.create")}>
                                <button className="h-9 px-6 bg-[#0a66c2] hover:bg-[#004182] text-white rounded-full font-bold text-[14px] transition-all flex items-center gap-2 shadow-sm active:scale-95">
                                    <Plus size={16} strokeWidth={3} />
                                    Add Car
                                </button>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="px-6 border-t border-[#f3f2ef]">
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
                    </div>
                </div>

                {/* 2. Main Layout (Minimalist Clean Feed) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    
                    {/* Left Section: Table Hub */}
                    <div className="lg:col-span-9 space-y-4">
                        
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

                        {/* Inventory Table Container */}
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm overflow-hidden">
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
                                    <thead className="bg-[#fbfeff] border-b border-[#f3f2ef]">
                                        <tr>
                                            <th className="py-3.5 px-6 w-12 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isAllPageSelected || selectAllGlobal}
                                                    onChange={toggleSelectAll}
                                                    className="w-4 h-4 rounded border-gray-300 text-[#0a66c2] focus:ring-[#0a66c2]/10 cursor-pointer"
                                                />
                                            </th>
                                            <th className="py-3.5 px-4 text-[11px] font-bold text-[#666666] uppercase tracking-wider">Vehicle</th>
                                            <th className="py-3.5 px-4 text-[11px] font-bold text-[#666666] uppercase tracking-wider">Category</th>
                                            <th className="py-3.5 px-4 text-[11px] font-bold text-[#666666] uppercase tracking-wider text-center">Specifications</th>
                                            <th className="py-3.5 px-4 text-[11px] font-bold text-[#666666] uppercase tracking-wider">Pricing</th>
                                            <th className="py-3.5 px-4 text-[11px] font-bold text-[#666666] uppercase tracking-wider">Status</th>
                                            <th className="py-3.5 px-4 text-right pr-10 text-[11px] font-bold text-[#666666] uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#f3f2ef]">
                                        {isLoading && !isSearching ? (
                                            <TableSkeleton rowCount={10} />
                                        ) : cars.data.length === 0 ? (
                                            <tr>
                                                <td colSpan="7">
                                                    <EmptyState
                                                        hasActiveFilters={!!search || !!filters.status || !!filters.brand}
                                                        onResetFilters={() => performVisit({})}
                                                    />
                                                </td>
                                            </tr>
                                        ) : (
                                            cars.data.map((item) => (
                                                <CarTableRow
                                                    key={item.id}
                                                    item={item}
                                                    isEffectivelySelected={isEffectivelySelected}
                                                    toggleSelect={toggleSelect}
                                                    onDeleteSuccess={handleDeleteSuccess}
                                                />
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {cars.total > 0 && (
                                <div className="px-6 py-4 border-t border-[#f3f2ef] bg-[#f8f9fa]/20">
                                    <Pagination
                                        meta={cars}
                                        onPageChange={(page) => performVisit({ ...filters, page })}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Section: Logic & Stats Area */}
                    <div className="lg:col-span-3 space-y-4 sticky top-1 text-left">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-4">
                            <h3 className="text-[13px] font-bold text-[#081621] mb-3 uppercase tracking-tight">Fleet Overview</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-[#666666] font-medium">Total Assets</span>
                                    <span className="text-[14px] font-bold text-[#081621]">{counts.all || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-[#666666] font-medium">Available Now</span>
                                    <span className="text-[14px] font-bold text-[#057642]">{counts.available || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-[#666666] font-medium">Latest Entry</span>
                                    <span className="text-[13px] font-bold text-[#081621]">
                                        {cars.data?.[0]?.created_at ? new Date(cars.data[0].created_at).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>
                                <div className="h-px bg-gray-50" />
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-[#666666] font-medium">Reserved Units</span>
                                    <span className="text-[12px] font-bold text-[#0a66c2] px-2 py-0.5 bg-blue-50 rounded">
                                        {counts.reserved || 0} Assets
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 bg-blue-50 rounded text-[#0a66c2]">
                                    <LayoutGrid size={16} />
                                </div>
                                <h4 className="text-[13px] font-bold text-[#081621] tracking-tight">Operational Guide</h4>
                            </div>
                            <p className="text-[12px] text-[#666666] leading-relaxed font-normal">
                                Ensure vehicle specifications and features are meticulously updated. Detailed assets perform 40% better in guest searches.
                            </p>
                            <Link href={route('admin.cars.create')} className="mt-4 block">
                                <button className="w-full py-2 text-[12px] font-bold text-[#0a66c2] border border-[#0a66c2] rounded-full hover:bg-blue-50 transition-all">
                                    Add New Listing
                                </button>
                            </Link>
                        </div>

                         <div className="pt-4 text-center opacity-40">
                             <span className="text-[11px] font-bold text-gray-500">Fleet Management © 2026</span>
                         </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
