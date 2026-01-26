import React, { useState, useRef, useCallback } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { TableManager } from "@/Hooks/TableManager";
import { Users, BadgeCheck, Search, SearchX } from "lucide-react";

// Import Partials
import UserTableRow from "./Partials/TableRow";
import StatusTabs from "./Partials/StatusTabs";
import TableSkeleton from "./Partials/TableSkeleton";
import EmptyState from "./Partials/EmptyState";

export default function UserList({ auth, users, filters = {}, counts = {} }) {
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
    } = TableManager("admin.users.index", users.data, filters);

    // Page navigation and filtering logic
    const performVisit = useCallback((params, withLoading = true) => {
        const scrollPosition = window.scrollY;
        if (withLoading) setIsLoading(true);
        router.get(route("admin.users.index"), params, {
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
    }, [clearSelection]);

    return (
        <AdminLayout user={auth.user}>
            <Head title="Users" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                {/* 1. LinkedIn Header */}
                <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm">
                    <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#f3f6f8] rounded flex items-center justify-center text-[#0a66c2]">
                                <Users size={20} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[18px] font-semibold text-[#000000e6]">
                                    Users Management
                                </h1>
                                <p className="text-[12px] text-[#00000099] mt-0.5 font-medium">
                                    Manage registered customer accounts and their identities
                                </p>
                            </div>
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

                {/* 2. Main Layout */}
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
                                    placeholder="Search users..."
                                    className="w-full bg-[#f3f6f8] border-none rounded py-1.5 pl-9 pr-4 text-[13px] text-gray-700 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Simplified Table Card */}
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm overflow-hidden">
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
                                            <th className="py-3 px-4 text-[11px] font-bold text-[#00000099] uppercase tracking-wider">User Details</th>
                                            <th className="py-3 px-4 text-[11px] font-bold text-[#00000099] uppercase tracking-wider">Status</th>
                                            <th className="py-3 px-4 text-[11px] font-bold text-[#00000099] uppercase tracking-wider">Registered</th>
                                            <th className="py-3 px-4 text-right pr-8 text-[11px] font-bold text-[#00000099] uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#f3f2ef]">
                                        {isLoading && !isSearching ? (
                                            <TableSkeleton rowCount={10} />
                                        ) : users.data.length === 0 ? (
                                            <tr>
                                                <td colSpan="5">
                                                    <EmptyState
                                                        hasActiveFilters={!!search || !!filters.status}
                                                        onResetFilters={() => performVisit({})}
                                                    />
                                                </td>
                                            </tr>
                                        ) : (
                                            users.data.map((user) => (
                                                <UserTableRow
                                                    key={user.id}
                                                    item={user}
                                                    isEffectivelySelected={isEffectivelySelected}
                                                    toggleSelect={toggleSelect}
                                                    onDeleteSuccess={handleDeleteSuccess}
                                                />
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {users.total > 0 && (
                                <div className="px-5 py-3 border-t border-[#f3f2ef] bg-[#f8f9fa]/20">
                                    <Pagination
                                        meta={users}
                                        onPageChange={(page) => performVisit({ ...filters, page })}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Section: Compact Stats Area */}
                    <div className="lg:col-span-3 space-y-4 sticky top-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-4">
                            <h3 className="text-[13px] font-bold text-[#000000e6] mb-3">User Base Overview</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] text-gray-500 font-medium">Total Users</span>
                                    <span className="text-[13px] font-bold text-gray-900">{counts.all || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] text-gray-500 font-medium">Verified</span>
                                    <span className="text-[13px] font-bold text-[#057642]">{counts.verified || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] text-gray-500 font-medium">Unverified</span>
                                    <span className="text-[13px] font-bold text-[#915907]">{counts.unverified || 0}</span>
                                </div>
                                <div className="h-px bg-gray-50" />
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] text-gray-500 font-medium">Network Trust</span>
                                    <span className="text-[11px] font-bold text-[#0a66c2] px-2 py-0.5 bg-blue-50 rounded">
                                        High
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#f3f6f8] rounded-lg border border-[#EBEBEB] p-4">
                             <p className="text-[11px] text-[#00000099] leading-relaxed">
                                 <strong>Admin Tip:</strong> Monitoring the verification status helps maintain a high-quality user network.
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
