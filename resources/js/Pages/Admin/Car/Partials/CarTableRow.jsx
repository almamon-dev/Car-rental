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
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
            const menuHeight = 160; 
            
            let topPosition, leftPosition;
            
            if (spaceBelow < menuHeight) {
                topPosition = rect.top + window.scrollY - menuHeight;
            } else {
                topPosition = rect.bottom + window.scrollY + 8;
            }
            
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
            window.addEventListener("scroll", () => setIsMenuOpen(false), { once: true, capture: true });
        }
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", () => setIsMenuOpen(false), { capture: true });
        };
    }, [isMenuOpen]);

    const handleImageLoad = () => setImageLoading(false);
    const handleImageError = () => setImageLoading(false);

    const handleDeleteTrigger = () => {
        setIsMenuOpen(false);
        setTimeout(() => setIsDeleteModalOpen(true), 50);
    };

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

            <td className="py-4 px-4 min-w-[280px]">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center shadow-sm relative group/img">
                        {item.images?.[0] ? (
                            <>
                                {imageLoading && (
                                    <div className="absolute inset-0 z-20 bg-slate-50 animate-pulse" />
                                )}
                                <img
                                    key={imageKey}
                                    src={`/${item.images[0].file_path}`}
                                    className={`w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110 ${
                                        imageLoading ? "opacity-0" : "opacity-100"
                                    }`}
                                    alt={`${item.make} ${item.model}`}
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                />
                            </>
                        ) : (
                            <ImageOff size={20} className="text-slate-300" />
                        )}
                        <div className="absolute inset-x-0 bottom-0 py-0.5 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <span className="block text-center text-[8px] font-black text-white uppercase tracking-widest">View Gallery</span>
                        </div>
                    </div>

                    <div className="flex flex-col min-w-0 pt-0.5">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md uppercase tracking-[1px] border border-slate-200/50">
                                {item.brand?.name || "No Brand"}
                            </span>
                        </div>
                        
                        <Link
                            href={route("admin.cars.show", item.id)}
                            className="text-[14px] font-semibold text-[#0a66c2] hover:text-[#004182] transition-colors line-clamp-1 mb-0.5"
                        >
                            {item.make} {item.model}
                        </Link>

                        {item.description && (
                            <p className="text-[12px] text-[#666666] line-clamp-2 max-w-[220px] leading-snug">
                                {item.description}
                            </p>
                        )}
                    </div>
                </div>
            </td>


            <td className="py-3 px-4">
                <div className="flex flex-col">
                    <span className="text-[14px] text-[#191919] font-medium truncate max-w-[120px]">
                        {item.category?.name || "Uncategorized"}
                    </span>
                    <span className="text-[12px] text-[#666666] uppercase tracking-normal">
                        {item.rental_type || "Daily"} Rental
                    </span>
                </div>
            </td>

            <td className="py-3 px-4">
                <div className="flex flex-wrap gap-1.5 max-w-[240px] justify-center">
                    {(() => {
                        const specs = [
                            item.specifications?.transmission,
                            item.seats ? `${item.seats} Seats` : null,
                            item.specifications?.fuel_type,
                            item.specifications?.mileage ? `${Number(item.specifications.mileage).toFixed(0)} KM` : null,
                            item.specifications?.steering,
                            `EY-${item.year}`
                        ].filter(Boolean);
                        
                        const displaySpecs = specs.slice(0, 2);
                        const moreCount = specs.length - 2;
                        
                        return (
                            <>
                                {displaySpecs.map((spec, idx) => (
                                    <span key={idx} className="px-2 py-0.5 bg-gray-50 text-gray-700 text-[11px] font-medium rounded border border-gray-200">
                                        {spec}
                                    </span>
                                ))}
                                {moreCount > 0 && (
                                    <span className="px-2 py-0.5 bg-blue-50 text-[#0a66c2] text-[11px] font-medium rounded border border-blue-100">
                                        +{moreCount} more
                                    </span>
                                )}
                            </>
                        );
                    })()}
                </div>
            </td>



            <td className="py-3 px-4">
                <div className="flex flex-col">
                    <span className="text-[14px] font-semibold text-[#191919]">
                        {item.price_details?.currency || '$'}
                        {Number(item.price_details?.daily_rate || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[12px] text-[#666666]">per day</span>
                </div>
            </td>

            <td className="py-3 px-4">
                {item.status === "available" ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-sm">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        Active
                    </div>
                ) : item.status === "reserved" || item.status === "sold" ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-sm">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        Reserved
                    </div>
                ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-400 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-sm">
                        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60" />
                        {item.status || "Draft"}
                    </div>
                )}
            </td>

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

                            <button
                                onClick={handleDeleteTrigger}
                                className="flex items-center w-full px-4 py-2 text-[13px] font-semibold text-red-600 hover:bg-red-50 text-left transition-colors"
                            >
                                <Trash2 size={16} className="mr-3 text-red-400" />
                                <span>Delete</span>
                            </button>
                        </div>,
                        document.body
                    )}

                    <DeleteAction
                        trigger={false}
                        open={isDeleteModalOpen}
                        onOpenChange={setIsDeleteModalOpen}
                        id={item.id}
                        routeName="admin.cars.destroy"
                        onSuccess={onDeleteSuccess}
                    />
                </div>
            </td>
        </tr>
    );
});

export default CarTableRow;
