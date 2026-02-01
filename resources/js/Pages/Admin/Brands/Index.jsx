/**
 * Admin - Car Brands Management
 * 
 * Manages the collection of car manufacturers and brands.
 * Handles brand logos, operational status, and fleet integration details.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React, { useState, useRef, useCallback } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { TableManager } from "@/Hooks/TableManager";
import { 
    Plus, 
    BadgeCheck, 
    Search, 
    Filter, 
    Activity, 
    Database, 
    ShieldCheck, 
    LayoutGrid,
    MoreHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Partials
import BulkActionBanner from "./Partials/BulkActionBanner";
import BrandTableRow from "./Partials/TableRow";
import StatusTabs from "./Partials/StatusTabs";
import TableSkeleton from "./Partials/TableSkeleton";
import EmptyState from "./Partials/EmptyState";

/**
 * BrandList Component
 */
export default function BrandList({ auth, brands, filters = {}, counts = {} }) {
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
    } = TableManager("admin.brands.index", brands.data, filters);

    const performVisit = useCallback((params, withLoading = true) => {
        if (withLoading) setIsLoading(true);
        router.get(route("admin.brands.index"), params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onFinish: () => {
                if (withLoading) setIsLoading(false);
                setIsSearching(false);
            },
        });
    }, []);

    const handleSearch = useCallback(
        (value) => {
            if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
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
            <Head title="Car Brands | Admin Panel" />

            <div className="max-w-full mx-auto space-y-6">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-[#191919]">
                    <div className="px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a66c2] shadow-sm border border-slate-100">
                                <BadgeCheck size={28} strokeWidth={2} />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-3 bg-[#0a66c2] rounded-full" />
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Inventory Setup</span>
                                </div>
                                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                                    Car Brands
                                </h1>
                                <p className="text-[14px] text-slate-500 font-medium italic">
                                    Manage car manufacturers, brand logos, and their active status in your system.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link href={route("admin.brands.create")}>
                                <button className="h-11 px-6 bg-[#0a66c2] hover:bg-[#084d92] text-white rounded-xl font-bold text-[13px] transition-all flex items-center gap-2 shadow-md shadow-[#0a66c2]/10">
                                    <Plus size={18} strokeWidth={2} />
                                    Add New Brand
                                </button>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="px-6 border-t border-slate-50 bg-slate-50/20">
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

                {/* --- MAIN CONTENT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-9 space-y-4">
                        
                        {/* Search & Filter */}
                        <div className="bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-3 shadow-sm">
                            <div className="flex-1 relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input 
                                    type="text"
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search by brand name..."
                                    className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-lg py-2.5 pl-12 pr-4 text-[13px] text-slate-700 outline-none transition-all font-semibold"
                                />
                            </div>
                            <button className="h-10 px-4 text-[12px] font-bold text-slate-500 hover:bg-slate-50 rounded-lg flex items-center gap-2 border border-transparent hover:border-slate-100">
                                <Filter size={16} />
                                Filter
                            </button>
                        </div>

                        {/* Bulk Action Banner */}
                        <AnimatePresence>
                            {(selectedIds.length > 0 || selectAllGlobal) && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <BulkActionBanner
                                        selectedIds={selectedIds}
                                        selectAllGlobal={selectAllGlobal}
                                        setSelectAllGlobal={setSelectAllGlobal}
                                        isAllPageSelected={isAllPageSelected}
                                        totalCount={brands.total}
                                        itemCount={brands.data.length}
                                        clearSelection={clearSelection}
                                        getEffectiveSelectedIds={getEffectiveSelectedIds}
                                        search={search}
                                        onDeleteSuccess={handleDeleteSuccess}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Brands Table */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-[#f8fbff] border-b border-slate-100">
                                        <tr>
                                            <th className="py-4 px-10 w-12 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isAllPageSelected}
                                                    onChange={toggleSelectAll}
                                                    className="w-4 h-4 rounded border-slate-300 text-[#0a66c2] focus:ring-[#0a66c2]/20 cursor-pointer"
                                                />
                                            </th>
                                            <th className="py-4 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Logo</th>
                                            <th className="py-4 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Brand Name</th>
                                            <th className="py-4 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="py-4 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Added On</th>
                                            <th className="py-4 px-4 text-right pr-10 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-50">
                                        {isLoading && !isSearching ? (
                                            <TableSkeleton rowCount={8} />
                                        ) : brands.data.length === 0 ? (
                                            <tr>
                                                <td colSpan="6">
                                                    <EmptyState
                                                        hasActiveFilters={!!search || !!filters.status}
                                                        onResetFilters={() => performVisit({})}
                                                    />
                                                </td>
                                            </tr>
                                        ) : (
                                            brands.data.map((item, index) => (
                                                <BrandTableRow
                                                    key={item.id}
                                                    item={item}
                                                    isEffectivelySelected={isEffectivelySelected}
                                                    toggleSelect={toggleSelect}
                                                    onDeleteSuccess={handleDeleteSuccess}
                                                    index={index}
                                                />
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {brands.total > 0 && (
                                <div className="px-8 py-5 border-t border-slate-50 bg-slate-50/20">
                                    <Pagination
                                        meta={brands}
                                        onPageChange={(page) => performVisit({ ...filters, page })}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats Sidebar */}
                    <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
                        <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5"
                        >
                            <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                                <Activity size={16} className="text-[#0a66c2]" />
                                Brand Statistics
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-slate-500 font-semibold">Total Brands</span>
                                    <span className="text-[15px] font-bold text-slate-900">{counts.all || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-slate-500 font-semibold">Live Entities</span>
                                    <span className="text-[15px] font-bold text-[#0a66c2] bg-blue-50 px-2 py-0.5 rounded-lg">
                                        {counts.active || 0}
                                    </span>
                                </div>
                                <div className="h-px bg-slate-50" />
                                <div className="pt-1 flex items-center gap-3">
                                    <Database size={22} className="text-slate-200" />
                                    <div className="space-y-0.5">
                                        <p className="text-[11px] font-bold text-slate-400 uppercase">Database</p>
                                        <p className="text-[13px] font-bold text-emerald-600">Sync Healthy</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="bg-slate-900 rounded-xl shadow-lg p-6 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <ShieldCheck size={18} className="text-[#0a66c2]" />
                                    <span className="text-[11px] font-bold text-[#0a66c2]">Pro Tip</span>
                                </div>
                                <h4 className="text-white font-bold text-lg mb-2">Build Trust</h4>
                                <p className="text-slate-400 text-[13px] mb-5 font-medium leading-relaxed italic">
                                    "Using official brand logos makes your inventory look more professional and builds customer trust."
                                </p>
                            </div>
                            <LayoutGrid size={120} className="absolute -right-10 -bottom-10 text-white/[0.03] rotate-12" />
                        </div>

                         <div className="pt-4 text-center">
                             <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest block border-t border-slate-50 pt-4">Fleet Registry © 2026</span>
                         </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
