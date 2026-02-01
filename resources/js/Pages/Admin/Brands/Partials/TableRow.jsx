import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Link, router } from "@inertiajs/react";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";
import DeleteAction from "@/Components/modals/ConfirmDelete";

const BrandTableRow = React.memo(function BrandTableRow({
    item,
    isEffectivelySelected,
    toggleSelect,
    isClientSideLoading,
    onDeleteSuccess,
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [menuStyles, setMenuStyles] = useState({});
    
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Handle menu positioning logic
    useLayoutEffect(() => {
        if (isMenuOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const menuHeight = 120; 
            
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

    const handleStatusToggle = () => {
        router.patch(
            route("admin.brands.status", item.id),
            {},
            { preserveScroll: true }
        );
    };

    const handleDeleteTrigger = () => {
        setIsMenuOpen(false);
        setTimeout(() => setIsDeleteModalOpen(true), 50);
    };

    return (
        <tr
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

            <td className="py-4 px-4">
                <div className="h-10 w-14 bg-white rounded-xl border border-slate-100 overflow-hidden flex items-center justify-center shadow-sm group-hover:border-slate-200 transition-colors">
                    {item.logo ? (
                        <img
                            src={`/${item.logo}`}
                            alt={item.name}
                            className="w-full h-full object-contain p-1"
                        />
                    ) : (
                        <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">No Logo</div>
                    )}
                </div>
            </td>

            <td className="py-4 px-4 min-w-[180px]">
                <div className="font-bold text-slate-800 text-[14px] leading-tight mb-0.5">{item.name}</div>
                <div className="text-[11px] text-gray-400 font-semibold tracking-wider uppercase">
                    /{item.slug}
                </div>
            </td>

            <td className="py-4 px-4">
                <button
                    onClick={handleStatusToggle}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                        item.is_active 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-slate-50 text-slate-500 border-slate-100"
                    }`}
                >
                    <div className={`w-1.5 h-1.5 rounded-full ${item.is_active ? "bg-emerald-500" : "bg-slate-400"}`} />
                    {item.is_active ? "Active" : "Inactive"}
                </button>
            </td>

            <td className="py-4 px-4 truncate">
                <span className="px-3 py-1 bg-gray-50 text-gray-600 text-[12px] font-semibold rounded-lg border border-gray-100 whitespace-nowrap inline-flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-gray-400" />
                    {new Date(item.created_at).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            </td>

            <td className="py-4 px-4 text-right pr-6">
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
                            className="w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 animate-in fade-in zoom-in-95 duration-100 z-[9999]"
                        >
                            <Link
                                href={route("admin.brands.edit", item.id)}
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
                        routeName="admin.brands.destroy"
                        onSuccess={onDeleteSuccess}
                    />
                </div>
            </td>
        </tr>
    );
});

export default BrandTableRow;
