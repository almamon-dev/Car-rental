import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Search, Check, RotateCcw } from "lucide-react";
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
        <div className="flex flex-nowrap items-center w-full p-4 gap-4 bg-white border-b border-gray-100">
            <div className="relative flex-grow min-w-[200px]">
                <Search
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                        isClientSideLoading
                            ? "text-blue-600 animate-pulse"
                            : "text-slate-400"
                    }`}
                    size={16}
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F3F6F9] border border-transparent rounded-lg text-sm outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all"
                />
            </div>

            <div className="flex flex-shrink-0 items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="bg-[#F3F6F9] px-4 py-2.5 rounded-lg text-sm text-gray-600 flex items-center justify-between gap-2 min-w-[140px] border border-transparent hover:border-blue-600/30 transition-all outline-none disabled:opacity-50"
                        disabled={isClientSideLoading}
                    >
                        <span className="truncate">
                            {currentBrand || "All Brands"}
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuItem
                            onClick={() => handleFilter("brand", "all")}
                            className="flex justify-between cursor-pointer"
                        >
                            All Brands
                            {currentBrand === "" && (
                                <Check size={14} className="text-blue-600" />
                            )}
                        </DropdownMenuItem>
                        {brands.map((b) => (
                            <DropdownMenuItem
                                key={b.id}
                                onClick={() => handleFilter("brand", b.name)}
                                className="flex justify-between cursor-pointer"
                            >
                                {b.name}
                                {currentBrand === b.name && (
                                    <Check
                                        size={14}
                                        className="text-blue-600"
                                    />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="bg-[#F3F6F9] px-4 py-2.5 rounded-lg text-sm text-gray-600 flex items-center justify-between gap-2 min-w-[130px] border border-transparent hover:border-blue-600/30 transition-all outline-none disabled:opacity-50"
                        disabled={isClientSideLoading}
                    >
                        <span className="truncate">
                            {currentTransmission || "Transmission"}
                        </span>
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
                                        className="text-blue-600"
                                    />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="bg-[#F3F6F9] px-4 py-2.5 rounded-lg text-sm text-gray-600 flex items-center justify-between gap-2 min-w-[120px] border border-transparent hover:border-blue-600/30 transition-all outline-none disabled:opacity-50"
                        disabled={isClientSideLoading}
                    >
                        <span className="truncate">
                            {currentFuel || "Fuel Type"}
                        </span>
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
                                {f}
                                {currentFuel === f && (
                                    <Check
                                        size={14}
                                        className="text-blue-600"
                                    />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <AnimatePresence>
                    {hasActiveFilters && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={() =>
                                router.get(route("admin.cars.index"))
                            }
                            className="flex items-center gap-2 px-3 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all text-xs font-bold whitespace-nowrap"
                            disabled={isClientSideLoading}
                        >
                            <RotateCcw size={14} />
                            Reset
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
