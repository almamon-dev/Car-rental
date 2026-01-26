import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "@inertiajs/react";
import { Eye, Trash2, User, MoreVertical } from "lucide-react";
import DeleteAction from "@/Components/modals/ConfirmDelete";

const ContactTableRow = React.memo(function ContactTableRow({
    item,
    isEffectivelySelected,
    toggleSelect,
    onDeleteSuccess,
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [menuStyles, setMenuStyles] = useState({});
    
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Handle menu positioning
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
            
            leftPosition = rect.right + window.scrollX - 140; 

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
                    />
                </div>
            </td>

            <td className="py-4 px-4 min-w-[200px]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f3f6f8] flex items-center justify-center text-[#0a66c2] flex-shrink-0 border-2 border-white shadow-sm">
                        <User size={18} strokeWidth={2} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-black text-gray-900 leading-tight mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.name}
                        </span>
                        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.email}
                        </span>
                    </div>
                </div>
            </td>

            <td className="py-4 px-4 max-w-[400px]">
                <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-bold text-gray-800 line-clamp-1">
                        {item.subject}
                    </span>
                    <p className="text-[11px] text-gray-500 line-clamp-1 italic font-medium">
                        "{item.message}"
                    </p>
                </div>
            </td>

            <td className="py-4 px-4 whitespace-nowrap">
                <span className="px-3 py-1 bg-gray-50 text-gray-700 text-[12px] font-bold rounded-md border border-gray-200/60 inline-flex items-center">
                    {new Date(item.created_at).toLocaleDateString("en-US", {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
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
                    >
                        <MoreVertical size={18} />
                    </button>

                    {isMenuOpen && createPortal(
                        <div
                            ref={menuRef}
                            style={menuStyles}
                            className="w-40 bg-white rounded-lg shadow-xl border border-gray-100 py-1.5 animate-in fade-in zoom-in-95 duration-100 z-[9999]"
                        >
                            <Link
                                href={route("admin.contacts.show", item.id)}
                                className="flex items-center px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#0a66c2] transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Eye size={16} className="mr-3 text-gray-400" />
                                View Details
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
                        routeName="admin.contacts.destroy"
                        onSuccess={onDeleteSuccess}
                    />
                </div>
            </td>
        </tr>
    );
});

export default ContactTableRow;
