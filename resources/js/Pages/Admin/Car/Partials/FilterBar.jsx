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
        <div className="flex flex-wrap items-center justify-between p-4 gap-3 bg-white">
            <div className="relative flex-1 min-w-[200px]">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 bg-[#F3F6F9] border-[#3B82F6]/40 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-200"
                />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
                {/* Brand Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="bg-[#F3F6F9] px-4 py-2 rounded-md text-sm text-gray-500 flex items-center justify-between min-w-[160px] border border-[#3B82F6]/40 outline-none focus:ring-1 focus:ring-blue-200"
                        disabled={isClientSideLoading}
                    >
                        {currentBrand || "All Brands"}
                        <ChevronDown size={14} className="ml-2 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[160px]">
                        <DropdownMenuItem
                            onClick={() => handleFilter("brand", "all")}
                            className="flex justify-between cursor-pointer"
                        >
                            All Brands
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
                                {b.name}
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
                        className="bg-[#F3F6F9] px-4 py-2 rounded-md text-sm text-gray-500 flex items-center justify-between min-w-[160px] border border-[#3B82F6]/40 outline-none focus:ring-1 focus:ring-blue-200"
                        disabled={isClientSideLoading}
                    >
                        {currentTransmission || "Transmission"}
                        <ChevronDown size={14} className="ml-2 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[160px]">
                        <DropdownMenuItem
                            onClick={() => handleFilter("transmission", "all")}
                            className="cursor-pointer"
                        >
                            Any
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                handleFilter("transmission", "Manual")
                            }
                            className="cursor-pointer"
                        >
                            Manual
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                handleFilter("transmission", "Automatic")
                            }
                            className="cursor-pointer"
                        >
                            Automatic
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Fuel Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="bg-[#F3F6F9] px-4 py-2 rounded-md text-sm text-gray-500 flex items-center justify-between min-w-[160px] border border-[#3B82F6]/40 outline-none focus:ring-1 focus:ring-blue-200"
                        disabled={isClientSideLoading}
                    >
                        {currentFuel || "Fuel Type"}
                        <ChevronDown size={14} className="ml-2 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[160px]">
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
                                className="cursor-pointer"
                            >
                                {f}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Premium Animated Reset Button */}
                <AnimatePresence>
                    {hasActiveFilters && (
                        <motion.button
                            initial={{
                                opacity: 0,
                                x: 20,
                                filter: "blur(10px)",
                            }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: 10, filter: "blur(10px)" }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                                router.get(route("admin.cars.index"))
                            }
                            className="group flex items-center gap-2 px-3 py-2 bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white rounded-md transition-all duration-300 border border-rose-100 hover:border-rose-500 shadow-sm overflow-hidden"
                            disabled={isClientSideLoading}
                        >
                            <motion.div
                                initial={{ rotate: 0 }}
                                animate={{ rotate: -360 }}
                                transition={{ duration: 0.5 }}
                            >
                                <RotateCcw
                                    size={16}
                                    className="group-hover:rotate-180 transition-transform duration-500"
                                />
                            </motion.div>

                            <span className="text-xs font-bold whitespace-nowrap">
                                Clear All
                            </span>

                            <X
                                size={14}
                                className="ml-1 opacity-50 group-hover:opacity-100 group-hover:rotate-90 transition-all"
                            />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
