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
    ExternalLink
} from "lucide-react";

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
        const scrollPosition = window.scrollY;
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
            <Head title="Category Hierarchy | Admin" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                {/* 1. Simplified LinkedIn Header (Flat & Clean) */}
                <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm">
                    <div className="px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-[#f3f6f8] rounded flex items-center justify-center text-[#0a66c2]">
                                <Layers size={24} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[20px] font-semibold text-[#000000e6]">
                                    {view === 'sub' ? 'Inventory Sub-segments' : 'Category Hierarchy'}
                                </h1>
                                <p className="text-[13px] text-[#00000099] mt-0.5 font-medium">
                                    {view === 'sub' 
                                        ? 'Detailed view of child categories and their parent mappings.' 
                                        : 'Manage your inventory structure and vehicle segmentation.'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link href={route("admin.category.create")}>
                                <button className="h-9 px-6 bg-[#0a66c2] hover:bg-[#004182] text-white rounded-full font-bold text-[14px] transition-all flex items-center gap-2 shadow-sm active:scale-95">
                                    <Plus size={16} strokeWidth={3} />
                                    New Entry
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Section: Table Hub */}
                    <div className="lg:col-span-9 space-y-4">
                        
                        {/* Compact Filter Bar */}
                        <div className="bg-white rounded-lg border border-[#EBEBEB] p-3 flex items-center gap-3 shadow-sm">
                            <div className="flex-1 relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a66c2] transition-colors" size={16} />
                                <input 
                                    type="text"
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search descriptors..."
                                    className="w-full bg-[#f3f6f8] border-none rounded py-1.5 pl-9 pr-4 text-[13px] text-gray-700 outline-none transition-all"
                                />
                            </div>
                            <button className="h-8 px-3 text-[13px] font-semibold text-[#00000099] hover:bg-gray-100 rounded flex items-center gap-1.5 transition-all">
                                <Filter size={14} />
                                Filter
                            </button>
                        </div>

                        {/* Selection Banner */}
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
                                view={view}
                                onDeleteSuccess={handleDeleteSuccess}
                            />
                        )}

                        {/* Simplified Table Card */}
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm overflow-hidden h-auto min-h-[200px]">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-[#fbfeff] border-b border-[#f3f2ef]">
                                        <tr>
                                            <th className="py-3.5 px-10 w-12 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isAllPageSelected || selectAllGlobal}
                                                    onChange={toggleSelectAll}
                                                    className="w-4 h-4 rounded border-gray-300 text-[#0a66c2] focus:ring-[#0a66c2]/10 cursor-pointer"
                                                />
                                            </th>
                                            <th className="py-3.5 px-4 text-[11px] font-bold text-[#00000099] uppercase tracking-wider">Entity</th>
                                            <th className="py-3.5 px-4 text-[11px] font-bold text-[#00000099] uppercase tracking-wider">Context</th>
                                            <th className="py-3.5 px-4 text-[11px] font-bold text-[#00000099] uppercase tracking-wider text-center">Inventory</th>
                                            <th className="py-3.5 px-4 text-[11px] font-bold text-[#00000099] uppercase tracking-wider">Status</th>
                                            <th className="py-3.5 px-4 text-right pr-10 text-[11px] font-bold text-[#00000099] uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#f3f2ef]">
                                        {isLoading && !isSearching ? (
                                            <TableSkeleton rowCount={10} />
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
                                            categories.data.map((item) => (
                                                <CategoryTableRow
                                                    key={item.id}
                                                    item={item}
                                                    level={view === 'sub' ? 1 : 0}
                                                    isEffectivelySelected={isEffectivelySelected}
                                                    toggleSelect={toggleSelect}
                                                    onDeleteSuccess={handleDeleteSuccess}
                                                />
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {categories.total > 0 && (
                                <div className="px-6 py-4 border-t border-[#f3f2ef] bg-[#f8f9fa]/20">
                                    <Pagination
                                        meta={categories}
                                        onPageChange={(page) => performVisit({ ...filters, page })}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Section: Compact Stats Area */}
                    <div className="lg:col-span-3 space-y-4 sticky top-1">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-5">
                            <h3 className="text-[14px] font-bold text-[#000000e6] mb-4">Logic Breakdown</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-gray-500 font-medium">Root segments</span>
                                    <span className="text-[14px] font-bold text-gray-900">{counts.all}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-gray-500 font-medium">Sub-categories</span>
                                    <span className="text-[14px] font-bold text-gray-900">{counts.sub_total}</span>
                                </div>
                                <div className="h-px bg-gray-50" />
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-gray-500 font-medium">Active Coverage</span>
                                    <span className="text-[12px] font-bold text-[#057642] px-2 py-0.5 bg-emerald-50 rounded">
                                        Stable
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-50 rounded text-[#0a66c2]">
                                    <LayoutGrid size={18} />
                                </div>
                                <h4 className="text-[14px] font-bold text-gray-800 tracking-tight">System Guidance</h4>
                            </div>
                            <p className="text-[12px] text-gray-500 leading-relaxed font-normal">
                                Ensure descriptors are clear and concise. This hierarchy directly influences how vehicles are filtered in the global search utility.
                            </p>
                            <Link href={route('admin.category.sub.index')} className="mt-4 block">
                                <button className="w-full py-2 text-[12px] font-bold text-[#0a66c2] border border-[#0a66c2] rounded-full hover:bg-blue-50 transition-all">
                                    Refine Sub-Segments
                                </button>
                            </Link>
                        </div>

                         <div className="pt-4 text-center opacity-40">
                             <span className="text-[11px] font-bold text-gray-500">Inventory Management © 2026</span>
                         </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
