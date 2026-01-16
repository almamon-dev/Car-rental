import React, { useState, useEffect, useRef } from "react";
import { Link, router } from "@inertiajs/react";
import { MoreVertical, Eye, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DeleteAction from "@/Components/modals/ConfirmDelete";

export default function CategoryTable({
    item,
    isEffectivelySelected,
    toggleSelect,
    isClientSideLoading,
    onDeleteSuccess,
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Click outside handler
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

    // Status Toggle Logic
    const handleStatusToggle = () => {
        router.patch(
            route("admin.category.status", item.id),
            {},
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <tr
            className={`group transition-colors border-b border-gray-50 ${
                isEffectivelySelected(item.id)
                    ? "bg-primary/5"
                    : "hover:bg-gray-50/50"
            } ${
                /* মেনু ওপেন থাকলে রো-টিকে সবার উপরে রাখার জন্য z-index */
                isMenuOpen ? "relative z-[60]" : "relative z-0"
            }`}
        >
            <td className="py-4 px-6 text-center">
                <input
                    type="checkbox"
                    checked={isEffectivelySelected(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="rounded border-gray-300 accent-primary cursor-pointer"
                />
            </td>

            {/* Icon */}
            <td className="py-4 px-4">
                <div className="h-12 w-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 overflow-hidden">
                    {item.icon ? (
                        <img
                            src={`/${item.icon}`}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-gray-300 text-[10px]">
                            No Img
                        </span>
                    )}
                </div>
            </td>

            {/* Name & Slug */}
            <td className="py-4 px-4">
                <div className="font-semibold text-slate-700">{item.name}</div>
                <div className="text-[11px] text-gray-400 font-mono uppercase tracking-tighter">
                    {item.slug}
                </div>
            </td>

            {/* Description */}
            <td className="py-4 px-4 text-sm text-gray-500 max-w-[200px] truncate">
                {item.description || "—"}
            </td>

            {/* Status Switch */}
            <td className="py-4 px-4">
                <button
                    onClick={handleStatusToggle}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                        item.status === "active" ? "bg-blue-500" : "bg-gray-300"
                    }`}
                >
                    <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                            item.status === "active"
                                ? "translate-x-6"
                                : "translate-x-1"
                        }`}
                    />
                </button>
            </td>

            {/* Created At */}
            <td className="py-4 px-4 text-sm text-gray-500">
                {new Date(item.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </td>

            {/* --- Updated Action Section --- */}
            <td className="py-4 px-4 text-right pr-8">
                <div className="relative inline-block text-left" ref={menuRef}>
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 focus:outline-none ${
                            isMenuOpen
                                ? "bg-primary text-white shadow-md"
                                : "bg-[#F3F6F9] text-gray-500 hover:bg-gray-200"
                        }`}
                        disabled={isClientSideLoading}
                    >
                        <MoreVertical size={18} />
                    </button>

                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className={`
                                    absolute right-0 z-[100] w-48 origin-top-right bg-white rounded-xl
                                    shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-gray-100 py-2

                                    /* স্মার্ট পজিশনিং লজিক */
                                    top-full mt-2
                                    group-last:top-auto group-last:bottom-full group-last:mb-2
                                    group-[&:nth-last-child(2)]:top-auto group-[&:nth-last-child(2)]:bottom-full group-[&:nth-last-child(2)]:mb-2
                                `}
                            >
                                <div className="text-[10px] font-bold text-gray-400 px-4 py-1.5 uppercase tracking-wider">
                                    Actions
                                </div>

                                <Link
                                    href={route("admin.category.show", item.id)}
                                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Eye
                                        size={16}
                                        className="mr-3 text-gray-400"
                                    />
                                    View Details
                                </Link>

                                <Link
                                    href={route("admin.category.edit", item.id)}
                                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Pencil
                                        size={16}
                                        className="mr-3 text-gray-400"
                                    />
                                    Edit Category
                                </Link>

                                <div className="h-px bg-gray-100 my-2 mx-2" />

                                <div
                                    className="px-1"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <DeleteAction
                                        id={item.id}
                                        routeName="admin.category.destroy"
                                        onSuccess={onDeleteSuccess}
                                    >
                                        <span className="text-sm font-medium ml-3 text-red-600">
                                            Delete Category
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
