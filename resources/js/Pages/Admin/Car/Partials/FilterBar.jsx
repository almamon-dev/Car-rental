import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Search, Check, RotateCcw, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { router } from "@inertiajs/react";

export default function FilterBar({
    search,
    handleSearch,
    currentBrand,
    currentTransmission,
    currentFuel,
    brands,
    isClientSideLoading,
    handleFilter,
}) {
    const hasActiveFilters =
        currentBrand || currentTransmission || currentFuel || search;

    return (
        <div className="flex flex-nowrap items-center w-full px-8 py-3 bg-white border-b border-gray-100 gap-4">
            {/* Search Input Container */}
            <div className="relative flex-grow min-w-[280px]">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <Search
                        className={`${isClientSideLoading ? "animate-pulse color-[#0a66c2]" : ""}`}
                        size={16}
                    />
                </div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search by title, brand..."
                    className="w-full pl-10 pr-4 py-2 bg-[#eef3f8] border-none rounded-md text-[14px] font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/20 transition-all placeholder:text-gray-500"
                />
            </div>

            {/* Filters Container */}
            <div className="flex flex-shrink-0 items-center gap-2">
                {/* Brand Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className={`px-4 py-2 rounded-md text-[14px] font-semibold flex items-center justify-between gap-2 border transition-all outline-none disabled:opacity-50 ${
                            currentBrand 
                                ? "bg-white border-[#0a66c2] text-[#0a66c2]" 
                                : "bg-white border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                        }`}
                        disabled={isClientSideLoading}
                    >
                        <span className="truncate">
                            {currentBrand || "All Brands"}
                        </span>
                        <ChevronDown size={14} className="flex-shrink-0 opacity-60" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px] rounded-md shadow-lg border-gray-200">
                        <DropdownMenuItem
                            onClick={() => handleFilter("brand", "all")}
                            className="flex justify-between items-center px-4 py-2 cursor-pointer text-[14px] font-medium text-gray-700 hover:bg-gray-50"
                        >
                            All Brands
                        </DropdownMenuItem>
                        <div className="h-px bg-gray-100 my-1" />
                        {brands.map((b) => (
                            <DropdownMenuItem
                                key={b.id}
                                onClick={() => handleFilter("brand", b.name)}
                                className="flex justify-between items-center px-4 py-2 cursor-pointer text-[14px] font-medium text-gray-700 hover:bg-gray-50"
                            >
                                {b.name}
                                {currentBrand === b.name && (
                                    <Check size={14} className="text-[#0a66c2]" />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Transmission Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className={`px-4 py-2 rounded-md text-[14px] font-semibold flex items-center justify-between gap-2 border transition-all outline-none disabled:opacity-50 ${
                            currentTransmission 
                                ? "bg-white border-[#0a66c2] text-[#0a66c2]" 
                                : "bg-white border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                        }`}
                        disabled={isClientSideLoading}
                    >
                        <span className="truncate">
                            {currentTransmission || "Transmission"}
                        </span>
                        <ChevronDown size={14} className="flex-shrink-0 opacity-60" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px] rounded-md shadow-lg">
                        {["all", "Manual", "Automatic"].map((t) => (
                            <DropdownMenuItem
                                key={t}
                                onClick={() => handleFilter("transmission", t)}
                                className="flex justify-between items-center px-4 py-2 cursor-pointer text-[14px] font-medium text-gray-700 hover:bg-gray-50"
                            >
                                {t === "all" ? "Any" : t}
                                {currentTransmission === (t === "all" ? "" : t) && (
                                    <Check size={14} className="text-[#0a66c2]" />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Clear Filters Button */}
                {hasActiveFilters && (
                    <button
                        onClick={() => router.get(route("admin.cars.index"))}
                        className="flex items-center gap-1 px-3 py-2 text-[#0a66c2] hover:text-[#004182] text-[14px] font-bold transition-all duration-200"
                        disabled={isClientSideLoading}
                    >
                        <RotateCcw size={16} />
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
}
