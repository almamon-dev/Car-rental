import React from "react";
import { Link } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Pencil, ImageOff, MoreVertical } from "lucide-react";
import DeleteAction from "@/Components/modals/ConfirmDelete";

const CarTableRow = React.memo(function CarTableRow({
    item,
    isEffectivelySelected,
    toggleSelect,
    isClientSideLoading,
}) {
    return (
        <tr
            key={item.id}
            className={`${
                isEffectivelySelected(item.id)
                    ? "bg-blue-50/40"
                    : "hover:bg-gray-50/30"
            } transition-colors duration-150`}
        >
            <td className="py-6 px-6 text-center">
                <input
                    type="checkbox"
                    checked={isEffectivelySelected(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="rounded border-gray-300 accent-blue-500 cursor-pointer"
                    disabled={isClientSideLoading}
                />
            </td>
            <td className="py-4 px-4">
                <div className="w-16 h-16 border border-gray-100 rounded shadow-sm flex items-center justify-center p-1 bg-white overflow-hidden">
                    {item.images?.[0] ? (
                        <img
                            src={`/${item.images[0].file_path}`}
                            className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-200 ease-out"
                            alt="car"
                            loading="lazy"
                        />
                    ) : (
                        <ImageOff size={20} className="text-gray-200" />
                    )}
                </div>
            </td>
            <td className="py-4 px-4">
                <div className="flex flex-col">
                    <span className="text-[13px] font-medium text-gray-700 leading-tight mb-1">
                        {item.make} {item.model}
                    </span>
                    <span className="text-[11px] font-bold text-blue-500 uppercase">
                        {item.brand?.name || "No Brand"}
                    </span>
                </div>
            </td>
            <td className="py-4 px-4">
                <div className="flex flex-col">
                    <span className="text-[12px] text-blue-500 font-medium mb-0.5">
                        Filon Asset Store
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
                            item.price_details?.daily_rate
                        ).toLocaleString()}
                    </span>
                </div>
            </td>
            <td className="py-4 px-4">
                <div className="flex flex-col text-[11px]">
                    <span className="text-gray-400 font-bold uppercase">
                        Number of Sale
                    </span>
                    <span className="font-black text-gray-800 text-sm">10</span>
                </div>
            </td>
            <td className="py-4 px-4">
                <div
                    className={`w-9 h-5 rounded-full relative transition-colors duration-200 cursor-pointer ${
                        item.status === "available"
                            ? "bg-blue-500"
                            : "bg-gray-200"
                    }`}
                >
                    <div
                        className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-200 ease-out ${
                            item.status === "available" ? "left-5" : "left-1"
                        }`}
                    />
                </div>
            </td>
            <td className="py-4 px-4 text-right pr-8">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="p-2 text-gray-400 hover:bg-gray-100 rounded-md outline-none transition-colors"
                        disabled={isClientSideLoading}
                    >
                        <MoreVertical size={18} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem asChild>
                            <Link
                                href={route("admin.cars.edit", item.id)}
                                className="flex items-center w-full cursor-pointer"
                            >
                                <Pencil size={14} className="mr-2" /> Edit Car
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
    );
});

export default CarTableRow;
