import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "@inertiajs/react";
import { Pencil, ImageOff, MoreVertical, Eye, Trash2 } from "lucide-react";
import DeleteAction from "@/Components/modals/ConfirmDelete";

const CarTableRow = React.memo(function CarTableRow({
    item,
    isEffectivelySelected,
    toggleSelect,
    isClientSideLoading,
    isProcessing,
    onDeleteSuccess,
}) {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageKey, setImageKey] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuStyles, setMenuStyles] = useState({});
    
    const previousItemId = useRef(item.id);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        if (previousItemId.current !== item.id || isProcessing) {
            setImageLoading(true);
            if (isProcessing) {
                setImageKey((prev) => prev + 1);
            }
            previousItemId.current = item.id;
        }
    }, [item.id, isProcessing]);

    // Handle menu positioning
    useLayoutEffect(() => {
        if (isMenuOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const menuHeight = 160; // Estimated max height
            
            let topPosition, leftPosition;
            
            if (spaceBelow < menuHeight) {
                // Open upward if not enough space below
                topPosition = rect.top + window.scrollY - menuHeight;
            } else {
                // Open downward
                topPosition = rect.bottom + window.scrollY + 8;
            }
            
            // Align to right edge of button (128 is w-32 / 8rem)
            leftPosition = rect.right + window.scrollX - 128; 

            setMenuStyles({
                position: "absolute",
                top: `${topPosition}px`,
                left: `${leftPosition}px`,
            });
        }
    }, [isMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };
        
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            window.addEventListener("scroll", () => setIsMenuOpen(false), { once: true });
        }
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", () => setIsMenuOpen(false));
        };
    }, [isMenuOpen]);

    const handleImageLoad = () => setImageLoading(false);
    const handleImageError = () => setImageLoading(false);

    return (
        <tr
            key={item.id}
            className={`group border-b border-gray-100 transition-colors duration-150 ${
                isEffectivelySelected(item.id)
                    ? "bg-blue-50/40"
                    : "hover:bg-gray-50/50"
            }`}
        >
            <td className="py-4 px-6 text-center">
                <div className="flex justify-center">
                    <input
                        type="checkbox"
                        checked={isEffectivelySelected(item.id)}
                        onChange={() => toggleSelect(item.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#0a66c2] focus:ring-[#0a66c2]/20 cursor-pointer transition-all"
                        disabled={isClientSideLoading}
                    />
                </div>
            </td>

            {/* Merged Vehicle Section: Image + Primary Meta */}
            <td className="py-3 px-4">
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                        {item.images?.[0] ? (
                            <>
                                {imageLoading && (
                                    <div className="absolute inset-0 z-20 bg-gray-50 animate-pulse" />
                                )}
                                <img
                                    key={imageKey}
                                    src={`/${item.images[0].file_path}`}
                                    className={`w-full h-full object-cover ${
                                        imageLoading ? "opacity-0" : "opacity-100"
                                    }`}
                                    alt={`${item.make} ${item.model}`}
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                />
                            </>
                        ) : (
                            <ImageOff size={18} className="text-gray-300" />
                        )}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <Link
                            href={route("admin.cars.show", item.id)}
                            className="text-[14px] font-bold text-[#0a66c2] hover:underline truncate"
                        >
                            {item.make} {item.model}
                        </Link>
                        <div className="flex items-center gap-1.5 text-[12px] text-gray-500 font-medium">
                            <span>{item.brand?.name || "No Brand"}</span>
                            <span className="text-gray-300">•</span>
                            <span className="bg-gray-100 px-1 py-0.5 rounded text-[10px]">#{item.id}</span>
                        </div>
                    </div>
                </div>
            </td>

            <td className="py-3 px-4">
                <div className="flex flex-col">
                    <span className="text-[14px] text-gray-800 font-semibold truncate max-w-[120px]">
                        {item.category?.name || "Uncategorized"}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium uppercase tracking-tighter">
                        {item.rental_type || "Daily"} Rental
                    </span>
                </div>
            </td>

            <td className="py-3 px-4">
                <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-gray-700 uppercase tracking-tight">
                        {item.police_documents?.registration_number || "NO-PLATE"}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium font-mono">
                        {item.police_documents?.chassis_number || "NO-VIN"}
                    </span>
                </div>
            </td>

            <td className="py-3 px-4">
                <div className="flex flex-wrap gap-1.5 max-w-[220px]">
                    {[
                        item.specifications?.transmission,
                        item.specifications?.fuel_type,
                        item.specifications?.mileage ? `${item.specifications.mileage} KM` : null,
                        item.specifications?.steering,
                        `EY-${item.year}`
                    ].filter(Boolean).slice(0, 3).map((spec, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-bold rounded uppercase tracking-tighter border border-gray-200/50 whitespace-nowrap">
                            {spec}
                        </span>
                    ))}
                    {[
                        item.specifications?.transmission,
                        item.specifications?.fuel_type,
                        item.specifications?.mileage ? `${item.specifications.mileage} KM` : null,
                        item.specifications?.steering,
                        `EY-${item.year}`
                    ].filter(Boolean).length > 3 && (
                        <span className="px-2 py-0.5 bg-blue-50 text-[#0a66c2] text-[11px] font-bold rounded uppercase tracking-tighter border border-[#0a66c2]/10 whitespace-nowrap">
                            +{ [ 
                                item.specifications?.transmission,
                                item.specifications?.fuel_type,
                                item.specifications?.mileage ? `${item.specifications.mileage} KM` : null,
                                item.specifications?.steering,
                                `EY-${item.year}`
                            ].filter(Boolean).length - 3 } more
                        </span>
                    )}
                </div>
            </td>

            <td className="py-3 px-4">
                <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-gray-900">
                        {item.price_details?.currency || '$'}
                        {Number(item.price_details?.daily_rate || 0).toLocaleString()}
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium">per day</span>
                </div>
            </td>

            <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                        item.status === "available"
                            ? "bg-[#057642]"
                            : item.status === "reserved"
                            ? "bg-[#915907]"
                            : "bg-[#d11124]"
                    }`} />
                    <span className={`text-[13px] font-semibold capitalize ${
                        item.status === "available"
                            ? "text-[#057642]"
                            : item.status === "reserved"
                            ? "text-[#915907]"
                            : "text-[#d11124]"
                    }`}>
                        {item.status}
                    </span>
                </div>
            </td>

            <td className="py-3 px-4">
                <div className="flex items-center">
                    <span className="px-3 py-1 bg-gray-50 text-gray-700 text-[12px] font-bold rounded-md border border-gray-200/60 whitespace-nowrap inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        {new Date(item.created_at).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                        })}
                    </span>
                </div>
            </td>

            {/* Actions Section */}
            <td className="py-3 px-4 text-right pr-6">
                <div className="relative inline-block">
                    <button
                        ref={buttonRef}
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                            isMenuOpen ? "bg-[#eef3f8] text-[#0a66c2]" : "text-gray-400 hover:bg-gray-100"
                        }`}
                        disabled={isClientSideLoading}
                    >
                        <MoreVertical size={18} />
                    </button>

                    {isMenuOpen && createPortal(
                        <div
                            ref={menuRef}
                            style={menuStyles}
                            className="w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-1.5 animate-in fade-in zoom-in-95 duration-100 z-[9999]"
                        >
                            <Link
                                href={route("admin.cars.show", item.id)}
                                className="flex items-center px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#0a66c2]"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Eye size={16} className="mr-3 text-gray-400" />
                                View
                            </Link>

                            <Link
                                href={route("admin.cars.edit", item.id)}
                                className="flex items-center px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#0a66c2]"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Pencil size={16} className="mr-3 text-gray-400" />
                                Edit
                            </Link>

                            <div className="h-px bg-gray-100 my-1.5 mx-2" />

                            <DeleteAction
                                id={item.id}
                                routeName="admin.cars.destroy"
                                onSuccess={() => {
                                    onDeleteSuccess();
                                    setIsMenuOpen(false);
                                }}
                                className="flex items-center w-full px-4 py-2 text-[13px] font-semibold text-red-600 hover:bg-red-50 text-left"
                            >
                                <Trash2 size={16} className="mr-3 text-red-400" />
                                <span>Delete</span>
                            </DeleteAction>
                        </div>,
                        document.body
                    )}
                </div>
            </td>
        </tr>
    );
});

export default CarTableRow;

