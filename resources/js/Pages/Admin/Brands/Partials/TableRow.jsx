import React, { useState, useRef, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import { MoreVertical, Eye, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DeleteAction from "@/Components/modals/ConfirmDelete";

export default function BrandTableRow({
    item,
    isEffectivelySelected,
    toggleSelect,
    onDeleteSuccess,
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target))
                setIsMenuOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleStatusToggle = () => {
        router.patch(
            route("admin.brand.status", item.id),
            {},
            { preserveScroll: true }
        );
    };

    return (
        <tr
            className={`group transition-colors border-b border-gray-50 ${
                isEffectivelySelected(item.id)
                    ? "bg-primary/5"
                    : "hover:bg-gray-50/50"
            } ${isMenuOpen ? "relative z-[60]" : "relative z-0"}`}
        >
            <td className="py-4 px-6 text-center">
                <input
                    type="checkbox"
                    checked={isEffectivelySelected(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="rounded border-gray-300 accent-primary cursor-pointer"
                />
            </td>

            <td className="py-4 px-4">
                <div className="h-12 w-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 overflow-hidden">
                    {item.logo ? (
                        <img
                            src={`/${item.logo}`}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-gray-300 text-[10px]">No Logo</span>
                    )}
                </div>
            </td>

            <td className="py-4 px-4">
                <div className="font-semibold text-slate-700">{item.name}</div>
                <div className="text-[11px] text-gray-400 font-mono uppercase tracking-tighter">
                    {item.slug}
                </div>
            </td>

            {/* Status Switch Section - Updated UI */}
            <td className="py-4 px-4">
                <div
                    onClick={handleStatusToggle}
                    className={`w-9 h-5 rounded-full relative transition-colors duration-200 cursor-pointer ${
                        item.is_active ? "bg-primary" : "bg-gray-200"
                    }`}
                >
                    <div
                        className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-200 ease-out ${
                            item.is_active ? "left-5" : "left-1"
                        }`}
                    />
                </div>
            </td>

            <td className="py-4 px-4 text-sm text-gray-500">
                {new Date(item.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </td>

            <td className="py-4 px-4 text-right pr-8">
                <div className="relative inline-block text-left" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all ${
                            isMenuOpen
                                ? "bg-primary text-white shadow-md"
                                : "bg-[#F3F6F9] text-gray-500 hover:bg-gray-200"
                        }`}
                    >
                        <MoreVertical size={18} />
                    </button>
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute right-0 z-[100] w-48 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2"
                            >
                                <div className="text-[10px] font-bold text-gray-400 px-4 py-1.5 uppercase tracking-wider">
                                    Actions
                                </div>
                                <Link
                                    href={route("admin.brand.edit", item.id)}
                                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                >
                                    <Pencil size={16} className="mr-3 text-gray-400" />
                                    Edit Brand
                                </Link>
                                <div className="h-px bg-gray-100 my-2 mx-2" />
                                <div
                                    className="px-1"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <DeleteAction
                                        id={item.id}
                                        routeName="admin.brand.destroy"
                                        onSuccess={onDeleteSuccess}
                                    >
                                        <span className="text-sm font-medium ml-3 text-red-600">
                                            Delete Brand
                                        </span>
                                    </DeleteAction>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </td>
        </tr>
    );
}
