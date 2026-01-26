import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useForm } from "@inertiajs/react";
import { MoreVertical, Mail, Calendar, ShieldCheck, UserMinus, ShieldAlert } from "lucide-react";

const UserTableRow = React.memo(function UserTableRow({
    item,
    isEffectivelySelected,
    toggleSelect,
    onDeleteSuccess,
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuStyles, setMenuStyles] = useState({});
    
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const { delete: destroy, processing } = useForm();

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

    const handleDelete = () => {
        setIsMenuOpen(false);
        if (confirm('Are you sure you want to delete this user?')) {
            destroy(route('admin.users.destroy', item.id), {
                onSuccess: () => onDeleteSuccess(),
            });
        }
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

            <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-100 shrink-0">
                        <img 
                            src={item.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=0a66c2&color=fff`} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[14px] font-black text-gray-900 leading-tight mb-0.5">{item.name}</span>
                        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Mail size={10} strokeWidth={3} />
                            {item.email}
                        </span>
                    </div>
                </div>
            </td>

            <td className="py-4 px-4">
                {item.email_verified_at ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                        <ShieldCheck size={12} strokeWidth={2.5} />
                        Verified
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                        <ShieldAlert size={12} strokeWidth={2.5} />
                        Unverified
                    </span>
                )}
            </td>

            <td className="py-4 px-4 truncate">
                <span className="px-3 py-1 bg-gray-50 text-gray-700 text-[12px] font-bold rounded-md border border-gray-200/60 whitespace-nowrap inline-flex items-center gap-1.5">
                    <Calendar size={13} strokeWidth={2} className="text-gray-400" />
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
                    >
                        <MoreVertical size={18} />
                    </button>

                    {isMenuOpen && createPortal(
                        <div
                            ref={menuRef}
                            style={menuStyles}
                            className="w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-1.5 animate-in fade-in zoom-in-95 duration-100 z-[9999]"
                        >
                            <button
                                onClick={handleDelete}
                                className="flex items-center w-full px-4 py-2 text-[13px] font-semibold text-red-600 hover:bg-red-50 text-left transition-colors"
                            >
                                <UserMinus size={16} className="mr-3 text-red-400" />
                                <span>Delete</span>
                            </button>
                        </div>,
                        document.body
                    )}
                </div>
            </td>
        </tr>
    );
});

export default UserTableRow;
