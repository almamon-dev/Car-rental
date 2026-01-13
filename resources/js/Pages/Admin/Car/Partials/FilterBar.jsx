import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Search, ChevronDown, X, Check, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterBar({
    search,
    handleSearch,
    currentBrand,
    currentTransmission,
    currentFuel,
    brands,
    isClientSideLoading,
    handleFilter,
    router,
}) {
    const hasActiveFilters =
        currentBrand || currentTransmission || currentFuel || search;

    return (
        <div className="flex flex-wrap items-center justify-between p-4 gap-3 bg-white border-b border-gray-50">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
                <Search
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                        isClientSideLoading
                            ? "text-blue-500 animate-pulse"
                            : "text-slate-400"
                    }`}
                    size={16}
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 bg-[#F3F6F9] border border-transparent rounded-md text-sm outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all"
                />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
                {/* Brand Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="bg-[#F3F6F9] px-4 py-2 rounded-md text-sm text-gray-600 flex items-center justify-between min-w-[140px] border border-transparent hover:border-blue-200 outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
                        disabled={isClientSideLoading}
                    >
                        <span className="truncate">
                            {currentBrand || "All Brands"}
                        </span>
                        <ChevronDown size={14} className="ml-2 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuItem
                            onClick={() => handleFilter("brand", "all")}
                            className="flex justify-between cursor-pointer"
                        >
                            All Brands{" "}
                            {currentBrand === "" && (
                                <Check size={14} className="text-blue-500" />
                            )}
                        </DropdownMenuItem>
                        {brands.map((b) => (
                            <DropdownMenuItem
                                key={b.id}
                                onClick={() => handleFilter("brand", b.name)}
                                className="flex justify-between cursor-pointer"
                            >
                                {b.name}{" "}
                                {currentBrand === b.name && (
                                    <Check
                                        size={14}
                                        className="text-blue-500"
                                    />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Transmission Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="bg-[#F3F6F9] px-4 py-2 rounded-md text-sm text-gray-600 flex items-center justify-between min-w-[140px] border border-transparent hover:border-blue-200 disabled:opacity-50"
                        disabled={isClientSideLoading}
                    >
                        <span className="truncate">
                            {currentTransmission || "Transmission"}
                        </span>
                        <ChevronDown size={14} className="ml-2 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                        {["all", "Manual", "Automatic"].map((t) => (
                            <DropdownMenuItem
                                key={t}
                                onClick={() => handleFilter("transmission", t)}
                                className="flex justify-between cursor-pointer"
                            >
                                {t === "all" ? "Any" : t}
                                {currentTransmission ===
                                    (t === "all" ? "" : t) && (
                                    <Check
                                        size={14}
                                        className="text-blue-500"
                                    />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Fuel Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="bg-[#F3F6F9] px-4 py-2 rounded-md text-sm text-gray-600 flex items-center justify-between min-w-[140px] border border-transparent hover:border-blue-200 disabled:opacity-50"
                        disabled={isClientSideLoading}
                    >
                        <span className="truncate">
                            {currentFuel || "Fuel Type"}
                        </span>
                        <ChevronDown size={14} className="ml-2 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem
                            onClick={() => handleFilter("fuel_type", "all")}
                            className="cursor-pointer"
                        >
                            Any Fuel
                        </DropdownMenuItem>
                        {["Petrol", "Diesel", "Electric", "Hybrid"].map((f) => (
                            <DropdownMenuItem
                                key={f}
                                onClick={() => handleFilter("fuel_type", f)}
                                className="flex justify-between cursor-pointer"
                            >
                                {f}{" "}
                                {currentFuel === f && (
                                    <Check
                                        size={14}
                                        className="text-blue-500"
                                    />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Reset Button */}
                <AnimatePresence>
                    {hasActiveFilters && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() =>
                                router.get(route("admin.cars.index"))
                            }
                            className="flex items-center gap-2 px-3 py-2 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-md transition-all text-xs font-bold"
                            disabled={isClientSideLoading}
                        >
                            <RotateCcw size={14} />
                            Clear All
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
