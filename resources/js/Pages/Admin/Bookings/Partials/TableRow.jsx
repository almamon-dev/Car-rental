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
            const menuHeight = 200; 
            
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

    const handleDeleteConfirm = () => {
        router.delete(route("admin.bookings.destroy", item.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                if (onDeleteSuccess) onDeleteSuccess();
            },
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
            ongoing: 'bg-purple-100 text-purple-800 border-purple-200',
            completed: 'bg-green-100 text-green-800 border-green-200',
            cancelled: 'bg-red-100 text-red-800 border-red-200',
        };
        return badges[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const calculateDuration = () => {
        const start = new Date(item.start_date);
        const end = new Date(item.end_date);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return days;
    };

    return (
        <>
            <tr className={`group hover:bg-slate-50/50 transition-all ${isClientSideLoading ? "opacity-50" : ""}`}>
                {/* Checkbox */}
                <td className="px-6 py-4">
                    <input
                        type="checkbox"
                        checked={isEffectivelySelected(item.id)}
                        onChange={() => toggleSelect(item.id)}
                        className="w-4 h-4 text-[#0a66c2] bg-white border-gray-300 rounded focus:ring-[#0a66c2] focus:ring-2 cursor-pointer"
                    />
                </td>

                {/* Booking ID */}
                <td className="px-6 py-4">
                    <span className="text-[13px] font-bold text-[#0a66c2]">#{item.id}</span>
                </td>

                {/* Customer */}
                <td className="px-6 py-4">
                    <div>
                        <p className="text-[13px] font-semibold text-gray-900">{item.user?.name}</p>
                        <p className="text-[11px] text-gray-500">{item.user?.email}</p>
                    </div>
                </td>

                {/* Car */}
                <td className="px-6 py-4">
                    <div>
                        <p className="text-[13px] font-semibold text-gray-900">{item.car?.name}</p>
                        <p className="text-[11px] text-gray-500">{item.car?.brand?.name}</p>
                    </div>
                </td>

                {/* Dates */}
                <td className="px-6 py-4">
                    <div className="text-[12px]">
                        <p className="text-gray-700 font-medium">{new Date(item.start_date).toLocaleDateString()}</p>
                        <p className="text-gray-500">to {new Date(item.end_date).toLocaleDateString()}</p>
                        <p className="text-[#0a66c2] font-semibold mt-0.5">{calculateDuration()} days</p>
                    </div>
                </td>

                {/* Amount */}
                <td className="px-6 py-4">
                    <span className="text-[14px] font-bold text-gray-900">৳{item.total_price?.toLocaleString()}</span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase border ${getStatusBadge(item.status)}`}>
                        {item.status}
                    </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <button
                            ref={buttonRef}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                        >
                            <MoreVertical size={16} />
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
                        className="w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-[9999]"
                    >
                        <Link
                            href={route("admin.bookings.show", item.id)}
                            className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <Eye size={14} />
                            View Details
                        </Link>

                        <button
                            onClick={handleDeleteTrigger}
                            className="w-full flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <Trash2 size={14} />
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
        </>
    );
});

export default BookingTableRow;
