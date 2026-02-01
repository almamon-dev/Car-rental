import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Link, router } from "@inertiajs/react";
import { MoreVertical, Eye, Trash2, CheckCircle, XCircle } from "lucide-react";
import DeleteAction from "@/Components/modals/ConfirmDelete";

const BookingTableRow = React.memo(function BookingTableRow({
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
            
            leftPosition = rect.right + window.scrollX - 160; 

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

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'bg-amber-50 text-amber-600 border-amber-100',
            confirmed: 'bg-blue-50 text-[#0a66c2] border-blue-100',
            ongoing: 'bg-indigo-50 text-indigo-600 border-indigo-100',
            completed: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            cancelled: 'bg-rose-50 text-rose-600 border-rose-100',
        };
        return badges[status] || 'bg-slate-50 text-slate-500 border-slate-100';
    };

    const calculateDuration = () => {
        const start = new Date(item.start_date);
        const end = new Date(item.end_date);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return days;
    };

    return (
        <React.Fragment>
            <tr className={`group border-b border-gray-100 hover:bg-slate-50/50 transition-all ${isClientSideLoading ? "opacity-50" : ""}`}>
                {/* Checkbox */}
                <td className="px-6 py-4 text-center">
                    <input
                        type="checkbox"
                        checked={isEffectivelySelected(item.id)}
                        onChange={() => toggleSelect(item.id)}
                        className="w-4 h-4 text-[#0a66c2] border-gray-300 rounded focus:ring-[#0a66c2]/20 cursor-pointer transition-all"
                    />
                </td>

                {/* Booking ID */}
                <td className="px-6 py-4">
                    <span className="text-[13px] font-bold text-[#0a66c2]">#BK{item.id.toString().padStart(4, '0')}</span>
                </td>

                {/* Customer */}
                <td className="px-6 py-4 min-w-[180px]">
                    <div>
                        <p className="text-[14px] font-bold text-slate-800 leading-tight">{item.user?.name}</p>
                        <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{item.user?.email}</p>
                    </div>
                </td>

                {/* Car */}
                <td className="px-6 py-4 min-w-[200px]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                            {item.car?.images?.[0] ? (
                                <img src={`/${item.car.images[0].file_path}`} className="w-full h-full object-cover rounded-lg" alt="" />
                            ) : (
                                <Eye size={14} className="text-slate-300" />
                            )}
                        </div>
                        <div>
                            <p className="text-[13px] font-bold text-slate-800 leading-snug">{item.car?.make} {item.car?.model}</p>
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{item.car?.brand?.name}</p>
                        </div>
                    </div>
                </td>

                {/* Dates */}
                <td className="px-6 py-4">
                    <div className="text-[12px] space-y-0.5 text-center">
                        <p className="text-slate-700 font-bold">{new Date(item.start_date).toLocaleDateString("en-US", { day: 'numeric', month: 'short' })}</p>
                        <p className="text-slate-400 font-medium">to {new Date(item.end_date).toLocaleDateString("en-US", { day: 'numeric', month: 'short' })}</p>
                        <span className="inline-block px-1.5 py-0.5 bg-blue-50 text-[#0a66c2] text-[10px] font-bold rounded uppercase mt-1 tracking-wider">
                            {calculateDuration()} days
                        </span>
                    </div>
                </td>

                {/* Amount */}
                <td className="px-6 py-4 text-center">
                    <span className="text-[14px] font-bold text-slate-900 tracking-tight">৳{item.total_price?.toLocaleString()}</span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${getStatusBadge(item.status)}`}>
                        {item.status}
                    </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right pr-8">
                    <div className="relative inline-block">
                        <button
                            ref={buttonRef}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${isMenuOpen ? "bg-blue-50 text-[#0a66c2]" : "text-slate-400 hover:bg-slate-100"}`}
                        >
                            <MoreVertical size={18} />
                        </button>
                    </div>
                </td>
            </tr>

            {/* Dropdown Menu Portal */}
            {isMenuOpen &&
                createPortal(
                    <div
                        ref={menuRef}
                        style={menuStyles}
                        className="w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-[9999] animate-in fade-in zoom-in-95 duration-100"
                    >
                        <Link
                            href={route("admin.bookings.show", item.id)}
                            className="flex items-center gap-3 px-4 py-2 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0a66c2] transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Eye size={16} className="text-slate-400" />
                            View Details
                        </Link>

                        <div className="h-px bg-slate-50 my-1 mx-2" />

                        <button
                            onClick={handleDeleteTrigger}
                            className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-semibold text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <Trash2 size={16} className="text-red-400" />
                            Delete
                        </button>
                    </div>,
                    document.body
                )}

            {/* Delete Modal */}
            <DeleteAction
                trigger={false}
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                routeName="admin.bookings.destroy"
                id={item.id}
                onSuccess={onDeleteSuccess}
                title="Delete Booking"
                message={`Are you sure you want to delete booking #${item.id}? This action cannot be undone.`}
            />
        </React.Fragment>
    );
});

export default BookingTableRow;
