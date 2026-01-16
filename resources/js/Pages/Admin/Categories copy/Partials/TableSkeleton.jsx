import React from "react";
import { motion } from "framer-motion";

export default function TableSkeleton() {
    return (
        <motion.tbody
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse border-b border-gray-50">
                    <td className="py-6 px-6">
                        <div className="h-4 w-4 bg-gray-100 rounded mx-auto" />
                    </td>
                    <td className="py-4 px-4">
                        <div className="h-12 w-12 bg-gray-100 rounded-lg" />
                    </td>
                    <td className="py-4 px-4">
                        <div className="h-4 w-32 bg-gray-100 rounded mb-2" />
                        <div className="h-3 w-20 bg-gray-50 rounded" />
                    </td>
                    <td className="py-4 px-4">
                        <div className="h-4 w-40 bg-gray-50 rounded" />
                    </td>
                    <td className="py-4 px-4">
                        <div className="h-5 w-10 bg-gray-100 rounded-full" />
                    </td>
                    <td className="py-4 px-4">
                        <div className="h-4 w-24 bg-gray-50 rounded" />
                    </td>
                    <td className="py-4 px-4 text-right pr-10">
                        <div className="h-8 w-8 bg-gray-100 rounded-lg ml-auto" />
                    </td>
                </tr>
            ))}
        </motion.tbody>
    );
}
