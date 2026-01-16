import React from "react";
import { motion } from "framer-motion";

export default function TableSkeleton() {
    return (
        <motion.tbody
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white"
        >
            {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse border-b border-gray-50">
                    {/* Checkbox Column */}
                    <td className="py-6 px-6 w-10 text-center">
                        <div className="h-4 w-4 bg-gray-100 rounded mx-auto" />
                    </td>

                    {/* Thumb (Thumbnail) Column */}
                    <td className="py-4 px-4">
                        <div className="h-14 w-20 bg-gray-100 rounded-lg shadow-sm" />
                    </td>

                    {/* Name / Brand Column */}
                    <td className="py-4 px-4">
                        <div className="h-4 w-32 bg-gray-100 rounded mb-2.5" />{" "}
                        {/* Car Name */}
                        <div className="h-3 w-16 bg-gray-50 rounded" />{" "}
                        {/* Brand */}
                    </td>

                    {/* Owner / Category Column */}
                    <td className="py-4 px-4">
                        <div className="h-4 w-24 bg-gray-100 rounded mb-2.5" />{" "}
                        {/* Owner */}
                        <div className="h-3 w-20 bg-gray-50 rounded" />{" "}
                        {/* Category */}
                    </td>

                    {/* Ratings Column */}
                    <td className="py-4 px-4">
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="h-3 w-3 bg-gray-50 rounded-full"
                                />
                            ))}
                        </div>
                    </td>

                    {/* Price Details Column */}
                    <td className="py-4 px-4">
                        <div className="h-4 w-20 bg-gray-100 rounded mb-2" />
                        <div className="h-3 w-12 bg-gray-50 rounded" />
                    </td>

                    {/* Info (Transmission/Fuel) Column */}
                    <td className="py-4 px-4">
                        <div className="flex flex-col gap-2">
                            <div className="h-3 w-16 bg-gray-50 rounded" />
                            <div className="h-3 w-16 bg-gray-50 rounded" />
                        </div>
                    </td>

                    {/* Published (Status) Column */}
                    <td className="py-4 px-4">
                        <div className="h-6 w-14 bg-gray-100 rounded-full" />
                    </td>

                    {/* Actions Column */}
                    <td className="py-4 px-4 text-right pr-10">
                        <div className="h-8 w-8 bg-gray-100 rounded-lg ml-auto" />
                    </td>
                </tr>
            ))}
        </motion.tbody>
    );
}
