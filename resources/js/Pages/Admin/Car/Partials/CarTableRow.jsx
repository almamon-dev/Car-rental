import React, { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import { Pencil, ImageOff, MoreVertical, Eye } from "lucide-react";
import DeleteAction from "@/Components/modals/ConfirmDelete";

const CarTableRow = React.memo(function CarTableRow({
    item,
    isEffectivelySelected,
    toggleSelect,
    isClientSideLoading,
    isProcessing,
    onDeleteSuccess, // এটি নিশ্চিত করুন প্যারেন্ট থেকে আসছে
}) {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageKey, setImageKey] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const previousItemId = useRef(item.id);
    const menuRef = useRef(null);

    useEffect(() => {
        if (previousItemId.current !== item.id || isProcessing) {
            setImageLoading(true);
            if (isProcessing) {
                setImageKey((prev) => prev + 1);
            }
            previousItemId.current = item.id;
        }
    }, [item.id, isProcessing]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleImageLoad = () => setImageLoading(false);
    const handleImageError = () => setImageLoading(false);

    return (
        <tr
            key={item.id}
            className={`group transition-colors duration-150 ${
                isEffectivelySelected(item.id)
                    ? "bg-primary/5"
                    : "hover:bg-gray-50/30"
            } ${
                /* ড্রপডাউন ওপেন থাকলে এই নির্দিষ্ট রো-টিকে সবার উপরে ভাসিয়ে রাখার জন্য z-index */
                isMenuOpen ? "relative z-[60]" : "relative z-0"
            }`}
        >
            <td className="py-6 px-6 text-center">
                <input
                    type="checkbox"
                    checked={isEffectivelySelected(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="rounded border-gray-300 accent-primary cursor-pointer"
                    disabled={isClientSideLoading}
                />
            </td>

            {/* Image Section */}
            <td className="py-4 px-4">
                <div className="group relative">
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/60 shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-md hover:border-gray-300/80 hover:scale-[1.02]">
                        {item.images?.[0] ? (
                            <>
                                {imageLoading && (
                                    <div className="absolute inset-0 rounded-lg overflow-hidden z-20">
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-150 to-gray-200 animate-pulse"></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent bg-[length:200%_100%] animate-shimmer opacity-90"></div>
                                    </div>
                                )}
                                <div className="relative w-full h-full flex items-center justify-center bg-white">
                                    <img
                                        key={imageKey}
                                        src={`/${item.images[0].file_path}`}
                                        className={`w-full h-full object-cover transition-all duration-500 ease-out relative z-10 ${
                                            imageLoading
                                                ? "opacity-0 blur-sm scale-105"
                                                : "opacity-100 blur-0 scale-100 group-hover:scale-110"
                                        }`}
                                        alt={`${item.make} ${item.model}`}
                                        onLoad={handleImageLoad}
                                        onError={handleImageError}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                <ImageOff size={24} className="text-gray-300" />
                            </div>
                        )}
                    </div>
                </div>
            </td>

            {/* Content Sections */}
            <td className="py-4 px-4">
                <div className="flex flex-col">
                    <span className="text-[13px] font-medium text-gray-700 leading-tight mb-1">
                        {item.make} {item.model}
                    </span>
                    <span className="text-[11px] font-bold text-primary uppercase">
                        {item.brand?.name || "No Brand"}
                    </span>
                </div>
            </td>

            <td className="py-4 px-4">
                <div className="flex flex-col">
                    <span className="text-[12px] text-primary font-medium mb-0.5">
                        Filon Asset Store
                    </span>
                    <span className="text-[11px] font-black text-gray-800 uppercase leading-none">
                        Computer & Accessories
                    </span>
                </div>
            </td>

            <td className="py-4 px-4">
                <div className="flex flex-col">
                    <div className="flex text-primary gap-0.5">★ ★ ★ ★ ★</div>
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
                            item.price_details?.daily_rate || 0
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
                            ? "bg-primary"
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

            {/* Actions Section */}
            <td className="py-4 px-4 text-right pr-8">
                <div className="relative inline-block text-left" ref={menuRef}>
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 focus:outline-none ${
                            isMenuOpen
                                ? "bg-primary text-white shadow-md scale-105"
                                : "bg-[#F3F6F9] text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                        }`}
                        disabled={isClientSideLoading}
                    >
                        <MoreVertical size={18} />
                    </button>

                    {isMenuOpen && (
                        <div
                            className={`
                            absolute right-0 z-[100] w-48 origin-top-right bg-white rounded-xl
                            shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-gray-100 py-2
                            animate-in fade-in zoom-in-95 duration-200

                            /* স্মার্ট পজিশনিং: নিচের দিকে জায়গা না থাকলে উপরে উঠবে */
                            top-full mt-2
                            group-last:top-auto group-last:bottom-full group-last:mb-2
                            group-[&:nth-last-child(2)]:top-auto group-[&:nth-last-child(2)]:bottom-full group-[&:nth-last-child(2)]:mb-2
                        `}
                        >
                            <div className="text-[10px] font-bold text-gray-400 px-4 py-1.5 uppercase tracking-wider">
                                Actions
                            </div>

                            <Link
                                href={route("admin.cars.show", item.id)}
                                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Eye size={16} className="mr-3 text-gray-400" />
                                View Details
                            </Link>

                            <Link
                                href={route("admin.cars.edit", item.id)}
                                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Pencil
                                    size={16}
                                    className="mr-3 text-gray-400"
                                />
                                Edit Car
                            </Link>

                            <div className="h-px bg-gray-100 my-2 mx-2" />

                            <div
                                className="px-1"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <DeleteAction
                                    id={item.id}
                                    routeName="admin.cars.destroy"
                                    onSuccess={onDeleteSuccess}
                                >
                                    <span className="text-sm font-medium ml-3 text-red-600">
                                        Delete Car
                                    </span>
                                </DeleteAction>
                            </div>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
});

export default CarTableRow;
