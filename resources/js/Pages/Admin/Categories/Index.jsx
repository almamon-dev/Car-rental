/**
 * Admin - Car Categories
 * 
 * Manages the classification system for the vehicle fleet.
 * Handles root categories, sub-categories, and provides an overview of inventory density.
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
    Layers, 
    Search,
    Download,
    Filter,
    MoreHorizontal,
    LayoutGrid,
    ChevronDown,
    ExternalLink,
    Database,
    Activity,
    ShieldCheck,
    Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Partials
import BulkActionBanner from "./Partials/BulkActionBanner";
import CategoryTableRow from "./Partials/TableRow";
import StatusTabs from "./Partials/StatusTabs";
import TableSkeleton from "./Partials/TableSkeleton";
import EmptyState from "./Partials/EmptyState";

/**
 * CategoryList Component
 */
export default function CategoryList({
    auth,
    categories,
    filters = {},
    counts = {},
    view = "root",
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
    } = TableManager(
        route().current() === "admin.category.sub.index" 
            ? "admin.category.sub.index" 
            : "admin.category.index", 
        categories.data, 
        filters
    );

    const performVisit = useCallback((params, withLoading = true) => {
        if (withLoading) setIsLoading(true);
        
        const routeName = route().current() === "admin.category.sub.index" 
            ? "admin.category.sub.index" 
            : "admin.category.index";

        router.get(route(routeName), params, {
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
            <Head title="Car Categories | Admin Panel" />

            <div className="max-w-full mx-auto space-y-6">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-[#191919]">
                    <div className="px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a66c2] shadow-sm border border-slate-100">
                                <Layers size={28} strokeWidth={2} />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-3 bg-[#0a66c2] rounded-full" />
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Fleet Categories</span>
                                </div>
                                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                                    {view === 'sub' ? 'Sub-categories' : 'Main Categories'}
                                </h1>
                                <p className="text-[14px] text-slate-500 font-medium italic">
                                    {view === 'sub' 
                                        ? 'Detailed view of sub-segments and their parent categories.' 
                                        : 'Manage the primary classification and grouping of your car inventory.'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link href={route("admin.category.create")}>
                                <button className="h-11 px-6 bg-[#0a66c2] hover:bg-[#084d92] text-white rounded-xl font-bold text-[13px] transition-all flex items-center gap-2 shadow-md shadow-[#0a66c2]/10">
                                    <Plus size={18} strokeWidth={2} />
                                    Add New Category
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
                                    placeholder="Search categories by name..."
                                    className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-lg py-2.5 pl-12 pr-4 text-[13px] text-slate-700 outline-none transition-all font-semibold"
                                />
                            </div>
                            <button className="h-10 px-4 text-[12px] font-bold text-slate-500 hover:bg-slate-50 rounded-lg flex items-center gap-2 border border-transparent hover:border-slate-100">
                                <Filter size={16} />
                                Filter
                            </button>
                        </div>

                        {/* Bulk Actions */}
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
                                        totalCount={categories.total}
                                        itemCount={categories.data.length}
                                        clearSelection={clearSelection}
                                        getEffectiveSelectedIds={getEffectiveSelectedIds}
                                        search={search}
                                        view={view}
                                        onDeleteSuccess={handleDeleteSuccess}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Categories Table */}
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
                                            <th className="py-4 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Category Details</th>
                                            <th className="py-4 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Type / Parent</th>
                                            <th className="py-4 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-center">Cars Count</th>
                                            <th className="py-4 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="py-4 px-4 text-right pr-10 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-50">
                                        {isLoading && !isSearching ? (
                                            <TableSkeleton rowCount={8} />
                                        ) : categories.data.length === 0 ? (
                                            <tr>
                                                <td colSpan="6">
                                                    <EmptyState
                                                        hasActiveFilters={!!search || !!filters.status}
                                                        onResetFilters={() => performVisit({})}
                                                    />
                                                </td>
                                            </tr>
                                        ) : (
                                            categories.data.map((item, index) => (
                                                <CategoryTableRow
                                                    key={item.id}
                                                    item={item}
                                                    level={view === 'sub' ? 1 : 0}
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

                            {categories.total > 0 && (
                                <div className="px-8 py-5 border-t border-slate-50 bg-slate-50/20">
                                    <Pagination
                                        meta={categories}
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
                                Category Overview
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-slate-500 font-semibold">Total Groups</span>
                                    <span className="text-[15px] font-bold text-slate-900">{counts.all || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-slate-500 font-semibold">Sub-categories</span>
                                    <span className="text-[15px] font-bold text-[#0a66c2] bg-blue-50 px-2 py-0.5 rounded-lg">
                                        {counts.sub_total || 0}
                                    </span>
                                </div>
                                <div className="h-px bg-slate-50" />
                                <div className="pt-1 flex items-center gap-3">
                                    <Briefcase size={22} className="text-slate-200" />
                                    <div className="space-y-0.5">
                                        <p className="text-[11px] font-bold text-slate-400 uppercase">Coverage</p>
                                        <p className="text-[13px] font-bold text-emerald-600">Inventory Ready</p>
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
                                <h4 className="text-white font-bold text-lg mb-2">Better Search</h4>
                                <p className="text-slate-400 text-[13px] mb-5 font-medium leading-relaxed italic">
                                    "Clear and descriptive car categories help your customers find the specific car they need much faster."
                                </p>
                                <Link href={route('admin.category.sub.index')} className="block">
                                    <button className="w-full py-2.5 bg-[#0a66c2] text-white rounded-lg font-bold text-[12px] hover:bg-[#084d92] transition-all shadow-md">
                                        Manage Sub-segments
                                    </button>
                                </Link>
                            </div>
                            <LayoutGrid size={120} className="absolute -right-10 -bottom-10 text-white/[0.03] rotate-12" />
                        </div>

                         <div className="pt-4 text-center">
                             <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest block border-t border-slate-50 pt-4">Category System © 2026</span>
                         </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
