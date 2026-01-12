import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { TableManager } from "@/Hooks/TableManager";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
    Search,
    Pencil,
    ImageOff,
    X,
    ChevronDown,
    Plus,
    Car,
    MoreVertical,
    Check,
} from "lucide-react";
import DeleteAction from "@/Components/modals/ConfirmDelete";

export default function CarList({
    auth,
    cars,
    brands = [],
    filters = {},
    counts = {},
}) {
    const {
        search,
        handleSearch,
        isLoading,
        selectedIds,
        toggleSelectAll,
        toggleSelect,
        selectAllGlobal,
        setSelectAllGlobal,
        clearSelection,
        isAllPageSelected,
        isPartialSelected,
        excludedIds,
        getEffectiveSelectedIds,
        isEffectivelySelected,
    } = TableManager("admin.cars.index", cars.data, filters);

    const currentStatus = filters.status || "all";
    const currentBrand = filters.brand || "";
    const currentTransmission = filters.transmission || "";
    const currentFuel = filters.fuel_type || "";

    const handleFilter = (key, value) => {
        router.get(
            route("admin.cars.index"),
            { ...filters, [key]: value === "all" ? null : value, page: 1 },
            { preserveState: true }
        );
    };

    const skeletonRows = Array.from({ length: 5 });

    return (
        <AdminLayout user={auth.user}>
            <Head title="Manage Cars" />
            <div className="bg-white min-h-screen font-sans">
                {/* Top Header */}
                {/* Header Section */}
                <div className="flex justify-between items-center px-6 py-6 border-b border-gray-50 bg-white">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">
                            All Products
                        </h1>
                    </div>

                    <Link
                        href={route("admin.cars.create")}
                        className="group relative flex items-center justify-end h-10 min-w-[40px] transition-all duration-500 ease-in-out"
                    >
                        <span className="absolute right-12 whitespace-nowrap text-blue-500 font-medium opacity-100 group-hover:text-white group-hover:right-10 transition-all duration-500 ease-in-out z-10 pointer-events-none">
                            Add New product
                        </span>
                        <div className="flex items-center justify-center bg-[#3B82F6] text-white h-10 w-10 group-hover:w-44 rounded-full transition-all duration-500 ease-in-out shadow-md overflow-hidden relative">
                            <div className="absolute right-0 flex items-center justify-center min-w-[40px] h-10 z-20">
                                <Plus size={20} />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-8 px-6 text-sm border-b border-slate-100">
                    {["all", "available", "reserved", "sold"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleFilter("status", tab)}
                            className={`py-4 transition-all relative font-medium capitalize ${
                                currentStatus === tab
                                    ? "text-blue-500 border-b-2 border-blue-500"
                                    : "text-slate-500"
                            }`}
                        >
                            {tab === "all" ? "All Products" : tab + " Products"}{" "}
                            ({counts[tab] || 0})
                        </button>
                    ))}
                </div>

                {/* Filters Bar */}
                <div className="flex flex-wrap items-center justify-between p-4 gap-3 bg-white">
                    <div className="relative flex-1 max-w-md">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            size={16}
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 bg-[#F3F6F9] border-none rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-200"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {/* Brand Filter */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="bg-[#F3F6F9] px-4 py-2 rounded-md text-sm text-gray-500 flex items-center justify-between min-w-[160px] border border-[#3B82F6]/40 outline-none focus:ring-1 focus:ring-blue-200">
                                {currentBrand || "All Brands"}
                                <ChevronDown
                                    size={14}
                                    className="ml-2 opacity-50"
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="start"
                                className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[160px]"
                            >
                                <DropdownMenuItem
                                    active={currentBrand === ""}
                                    onClick={() => handleFilter("brand", "all")}
                                >
                                    All Brands
                                </DropdownMenuItem>
                                {brands.map((b) => (
                                    <DropdownMenuItem
                                        key={b.id}
                                        active={currentBrand === b.name}
                                        onClick={() =>
                                            handleFilter("brand", b.name)
                                        }
                                        className="flex justify-between"
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
                            <DropdownMenuTrigger className="bg-[#F3F6F9] px-4 py-2 rounded-md text-sm text-gray-500 flex items-center justify-between min-w-[160px] border border-[#3B82F6]/40 outline-none focus:ring-1 focus:ring-blue-200">
                                {currentTransmission || "Transmission"}
                                <ChevronDown
                                    size={14}
                                    className="ml-2 opacity-50"
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="start"
                                className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[160px]"
                            >
                                <DropdownMenuItem
                                    active={currentTransmission === ""}
                                    onClick={() =>
                                        handleFilter("transmission", "all")
                                    }
                                >
                                    Any
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    active={currentTransmission === "Manual"}
                                    onClick={() =>
                                        handleFilter("transmission", "Manual")
                                    }
                                >
                                    Manual
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    active={currentTransmission === "Automatic"}
                                    onClick={() =>
                                        handleFilter(
                                            "transmission",
                                            "Automatic"
                                        )
                                    }
                                >
                                    Automatic
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Fuel Filter */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="bg-[#F3F6F9] px-4 py-2 rounded-md text-sm text-gray-500 flex items-center justify-between min-w-[160px] border border-[#3B82F6]/40 outline-none focus:ring-1 focus:ring-blue-200">
                                {currentFuel || "Fuel Type"}
                                <ChevronDown
                                    size={14}
                                    className="ml-2 opacity-50"
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="start"
                                className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[160px]"
                            >
                                <DropdownMenuItem
                                    active={currentFuel === ""}
                                    onClick={() =>
                                        handleFilter("fuel_type", "all")
                                    }
                                >
                                    Any Fuel
                                </DropdownMenuItem>
                                {["Petrol", "Diesel", "Electric", "Hybrid"].map(
                                    (f) => (
                                        <DropdownMenuItem
                                            key={f}
                                            active={currentFuel === f}
                                            onClick={() =>
                                                handleFilter("fuel_type", f)
                                            }
                                        >
                                            {f}
                                        </DropdownMenuItem>
                                    )
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Reset Button */}
                        {(currentBrand ||
                            currentTransmission ||
                            currentFuel ||
                            search) && (
                            <button
                                onClick={() =>
                                    router.get(route("admin.cars.index"))
                                }
                                className="text-rose-500 p-2 hover:bg-rose-50 rounded-md transition-colors border border-rose-100"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Bulk Actions Bar */}
                {(selectedIds.length > 0 || selectAllGlobal) && (
                    <div className="bg-blue-600 text-white px-6 py-2.5 flex items-center justify-between animate-in slide-in-from-top">
                        <div className="flex items-center gap-4 text-sm font-medium">
                            <span className="bg-white text-blue-600 px-2 py-0.5 rounded-full font-bold text-xs">
                                {selectAllGlobal
                                    ? `All (${cars.total})`
                                    : selectedIds.length}
                            </span>
                            <span>Selected</span>
                            {isAllPageSelected &&
                                !selectAllGlobal &&
                                cars.total > cars.data.length && (
                                    <button
                                        onClick={setSelectAllGlobal}
                                        className="ml-2 text-xs bg-blue-500 px-3 py-1 rounded border border-blue-400"
                                    >
                                        Select all {cars.total} vehicles
                                    </button>
                                )}
                            <button
                                onClick={clearSelection}
                                className="ml-4 text-xs font-bold hover:underline opacity-80"
                            >
                                Clear
                            </button>
                        </div>
                        <DeleteAction
                            selectedIds={getEffectiveSelectedIds()}
                            selectAllGlobal={selectAllGlobal}
                            routeName="admin.cars.bulk-destroy"
                            onSuccess={clearSelection}
                        />
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-400 font-bold text-[11px] uppercase tracking-wider border-b border-gray-100 bg-gray-50/30">
                                <th className="py-4 px-6 w-10 text-center">
                                    <input
                                        type="checkbox"
                                        checked={
                                            isAllPageSelected || selectAllGlobal
                                        }
                                        ref={(el) => {
                                            if (el)
                                                el.indeterminate =
                                                    (isPartialSelected &&
                                                        !selectAllGlobal) ||
                                                    (selectAllGlobal &&
                                                        excludedIds.length >
                                                            0 &&
                                                        excludedIds.length <
                                                            cars.total);
                                        }}
                                        onChange={toggleSelectAll}
                                        className="rounded border-gray-300 accent-blue-500 cursor-pointer"
                                    />
                                </th>
                                <th className="py-4 px-4">Thumb</th>
                                <th className="py-4 px-4">Name / Brand</th>
                                <th className="py-4 px-4">Owner / Category</th>
                                <th className="py-4 px-4">Ratings</th>
                                <th className="py-4 px-4">Price Details</th>
                                <th className="py-4 px-4">Info</th>
                                <th className="py-4 px-4">Published</th>
                                <th className="py-4 px-4 text-right pr-10">
                                    Options
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                skeletonRows.map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="py-6 px-6">
                                            <div className="h-4 w-4 bg-gray-100 rounded mx-auto"></div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="h-16 w-16 bg-gray-100 rounded"></div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="h-4 w-32 bg-gray-100 rounded mb-2"></div>
                                            <div className="h-3 w-20 bg-gray-50 rounded"></div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="h-4 w-24 bg-gray-100 rounded"></div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="h-4 w-20 bg-gray-100 rounded"></div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="h-6 w-16 bg-gray-100 rounded"></div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="h-4 w-20 bg-gray-100 rounded"></div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="h-5 w-10 bg-gray-100 rounded-full"></div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="h-8 w-8 bg-gray-100 rounded ml-auto"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : cars.data.length > 0 ? (
                                cars.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className={`${
                                            isEffectivelySelected(item.id)
                                                ? "bg-blue-50/40"
                                                : "hover:bg-gray-50/30"
                                        } transition-colors`}
                                    >
                                        <td className="py-6 px-6 text-center">
                                            <input
                                                type="checkbox"
                                                checked={isEffectivelySelected(
                                                    item.id
                                                )}
                                                onChange={() =>
                                                    toggleSelect(item.id)
                                                }
                                                className="rounded border-gray-300 accent-blue-500 cursor-pointer"
                                            />
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="w-16 h-16 border border-gray-100 rounded shadow-sm flex items-center justify-center p-1 bg-white">
                                                {item.images?.[0] ? (
                                                    <img
                                                        src={`/${item.images[0].file_path}`}
                                                        className="max-w-full max-h-full object-contain"
                                                        alt="car"
                                                    />
                                                ) : (
                                                    <ImageOff
                                                        size={20}
                                                        className="text-gray-200"
                                                    />
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <span className="text-[13px] font-medium text-gray-700 leading-tight mb-1">
                                                    {item.make} {item.model}
                                                </span>
                                                <span className="text-[11px] font-bold text-blue-500 uppercase">
                                                    {item.brand?.name ||
                                                        "No Brand"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <span className="text-[12px] text-blue-500 font-medium mb-0.5">
                                                    Filon Asset Store
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase">
                                                    Main Category
                                                </span>
                                                <span className="text-[11px] font-black text-gray-800 uppercase">
                                                    Computer & Accessories
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <div className="flex text-orange-400 gap-0.5">
                                                    ★ ★ ★ ★ ★
                                                </div>
                                                <span className="text-[11px] text-gray-500 font-bold mt-1">
                                                    5 out of 5.0
                                                </span>
                                                <span className="text-[10px] text-gray-400">
                                                    1 reviews
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 border-l border-gray-50 pl-6">
                                            <div className="flex flex-col">
                                                <span className="text-[11px] text-gray-400 uppercase font-bold">
                                                    Price
                                                </span>
                                                <span className="text-[14px] font-bold text-gray-800">
                                                    $
                                                    {Number(
                                                        item.price_details
                                                            ?.daily_rate
                                                    ).toLocaleString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col text-[11px]">
                                                <span className="text-gray-400 font-bold uppercase">
                                                    Number of Sale
                                                </span>
                                                <span className="font-black text-gray-800 text-sm">
                                                    10
                                                </span>
                                                <button className="text-blue-500 font-bold mt-1 hover:underline text-left">
                                                    View Stock
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div
                                                className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer ${
                                                    item.status === "available"
                                                        ? "bg-blue-500"
                                                        : "bg-gray-200"
                                                }`}
                                            >
                                                <div
                                                    className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                                                        item.status ===
                                                        "available"
                                                            ? "left-5"
                                                            : "left-1"
                                                    }`}
                                                ></div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right pr-8">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="p-2 text-gray-400 hover:bg-gray-100 rounded-md outline-none transition-colors">
                                                    <MoreVertical size={18} />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="w-36"
                                                >
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={route(
                                                                "admin.cars.edit",
                                                                item.id
                                                            )}
                                                            className="flex items-center w-full"
                                                        >
                                                            <Pencil
                                                                size={14}
                                                                className="mr-2"
                                                            />{" "}
                                                            Edit Car
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <div className="border-t border-gray-100 my-1"></div>
                                                    <div className="px-2 py-1">
                                                        <DeleteAction
                                                            id={item.id}
                                                            routeName="admin.cars.destroy"
                                                        />
                                                    </div>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="9"
                                        className="py-32 text-center opacity-40"
                                    >
                                        <Car
                                            size={32}
                                            className="mx-auto mb-2"
                                        />
                                        <p className="font-bold">
                                            No vehicles registered found.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="border-t border-gray-50">
                    <Pagination meta={cars} />
                </div>
            </div>
        </AdminLayout>
    );
}
