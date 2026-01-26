import React, { useState, useRef, useCallback } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { TableManager } from "@/Hooks/TableManager";
import { Calendar, Download, Search } from "lucide-react";

// Import Partials
import BulkActionBanner from "./Partials/BulkActionBanner";
import BookingTableRow from "./Partials/TableRow";
import StatusTabs from "./Partials/StatusTabs";
import TableSkeleton from "./Partials/TableSkeleton";
import EmptyState from "./Partials/EmptyState";

export default function BookingIndex({ auth, bookings, stats, filters = {} }) {
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
    } = TableManager("admin.bookings.index", bookings.data, filters);

    // Page navigation and filtering logic
    const performVisit = useCallback((params, withLoading = true) => {
        const scrollPosition = window.scrollY;
        if (withLoading) setIsLoading(true);
        router.get(route("admin.bookings.index"), params, {
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

    // Map stats to counts for StatusTabs
    const counts = {
        all: stats.total,
        pending: stats.pending,
        confirmed: stats.confirmed,
        completed: stats.completed,
        cancelled: stats.cancelled
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Booking History" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                {/* 1. Simplified LinkedIn Header (Flat & Clean) */}
                <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm">
                    <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#f3f6f8] rounded flex items-center justify-center text-[#0a66c2]">
                                <Calendar size={20} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[18px] font-semibold text-[#000000e6]">
                                    Booking History
                                </h1>
                                <p className="text-[12px] text-[#00000099] mt-0.5 font-medium">
                                    Manage and track all customer bookings
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => window.print()}
                                className="h-8 px-5 bg-[#0a66c2] hover:bg-[#004182] text-white rounded-full font-bold text-[13px] transition-all flex items-center gap-2 shadow-sm active:scale-95"
                            >
                                <Download size={14} strokeWidth={3} />
                                Export Report
                            </button>
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Left Section: Table Hub */}
                    <div className="lg:col-span-9 space-y-4">
                        
                        {/* Compact Filter Bar */}
                        <div className="bg-white rounded-lg border border-[#EBEBEB] p-2.5 flex items-center gap-3 shadow-sm">
                            <div className="flex-1 relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a66c2] transition-colors" size={14} />
                                <input 
                                    type="text"
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search by booking number, customer, or car..."
                                    className="w-full bg-[#f3f6f8] border-none rounded py-1.5 pl-9 pr-4 text-[13px] text-gray-700 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Selection Banner */}
                        {(selectedIds.length > 0 || selectAllGlobal) && (
                            <BulkActionBanner
                                selectedIds={selectedIds}
                                selectAllGlobal={selectAllGlobal}
                                setSelectAllGlobal={setSelectAllGlobal}
                                isAllPageSelected={isAllPageSelected}
                                totalCount={bookings.total}
                                itemCount={bookings.data.length}
                                clearSelection={clearSelection}
                                getEffectiveSelectedIds={getEffectiveSelectedIds}
                                search={search}
                                onDeleteSuccess={handleDeleteSuccess}
                            />
                        )}

                        {/* Simplified Table Card */}
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm overflow-hidden h-auto min-h-[200px]">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-[#fbfeff] border-b border-[#f3f2ef]">
                                        <tr>
                                            <th className="py-3 px-6 w-12 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isAllPageSelected || selectAllGlobal}
                                                    onChange={toggleSelectAll}
                                                    className="w-3.5 h-3.5 rounded border-gray-300 text-[#0a66c2] focus:ring-[#0a66c2]/10 cursor-pointer"
                                                />
                                            </th>
                                            <th className="py-3 px-6 text-[11px] font-bold text-[#00000099] uppercase tracking-wider">Booking ID</th>
                                            <th className="py-3 px-6 text-[11px] font-bold text-[#00000099] uppercase tracking-wider">Customer</th>
                                            <th className="py-3 px-6 text-[11px] font-bold text-[#00000099] uppercase tracking-wider">Car Details</th>
                                            <th className="py-3 px-6 text-[11px] font-bold text-[#00000099] uppercase tracking-wider">Timeline</th>
                                            <th className="py-3 px-6 text-[11px] font-bold text-[#00000099] uppercase tracking-wider">Amount</th>
                                            <th className="py-3 px-6 text-[11px] font-bold text-[#00000099] uppercase tracking-wider">Status</th>
                                            <th className="py-3 px-6 text-right pr-8 text-[11px] font-bold text-[#00000099] uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#f3f2ef]">
                                        {isLoading && !isSearching ? (
                                            <TableSkeleton rowCount={10} />
                                        ) : bookings.data.length === 0 ? (
                                            <tr>
                                                <td colSpan="8">
                                                    <EmptyState
                                                        hasActiveFilters={!!search || !!filters.status}
                                                        onResetFilters={() => performVisit({})}
                                                    />
                                                </td>
                                            </tr>
                                        ) : (
                                            bookings.data.map((item) => (
                                                <BookingTableRow
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

                            {bookings.total > 0 && (
                                <div className="px-5 py-3 border-t border-[#f3f2ef] bg-[#f8f9fa]/20">
                                    <Pagination
                                        meta={bookings}
                                        onPageChange={(page) => performVisit({ ...filters, page })}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Section: Compact Stats Area */}
                    <div className="lg:col-span-3 space-y-4 sticky top-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-4">
                            <h3 className="text-[13px] font-bold text-[#000000e6] mb-3">Booking Overview</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] text-gray-500 font-medium">Total Bookings</span>
                                    <span className="text-[13px] font-bold text-gray-900">{stats.total}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] text-gray-500 font-medium">Pending</span>
                                    <span className="text-[13px] font-bold text-[#b28e00]">{stats.pending}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] text-gray-500 font-medium">Confirmed</span>
                                    <span className="text-[13px] font-bold text-[#0a66c2]">{stats.confirmed}</span>
                                </div>
                                <div className="h-px bg-gray-50" />
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] text-gray-500 font-medium">Revenue</span>
                                    <span className="text-[12px] font-bold text-[#057642] px-2 py-0.5 bg-emerald-50 rounded">
                                        ৳{stats.total_revenue?.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#f3f6f8] rounded-lg border border-[#EBEBEB] p-4">
                             <p className="text-[11px] text-[#00000099] leading-relaxed">
                                 <strong>Tip:</strong> You can export this report to track monthly booking performance and revenue.
                             </p>
                        </div>
                        
                         <div className="text-center opacity-40">
                             <span className="text-[10px] font-bold text-gray-500">Fleet Network © 2026</span>
                         </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
