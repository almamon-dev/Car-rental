import React from "react";

export default function TableSkeleton() {
    const skeletonRows = Array.from({ length: 5 });

    return (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="text-gray-400 font-bold text-[11px] uppercase tracking-wider border-b border-gray-100 bg-gray-50/30">
                    <th className="py-4 px-6 w-10 text-center">
                        <div className="h-4 w-4 bg-gray-200 rounded mx-auto"></div>
                    </th>
                    <th className="py-4 px-4">Thumb</th>
                    <th className="py-4 px-4">Name / Brand</th>
                    <th className="py-4 px-4">Owner / Category</th>
                    <th className="py-4 px-4">Ratings</th>
                    <th className="py-4 px-4">Price Details</th>
                    <th className="py-4 px-4">Info</th>
                    <th className="py-4 px-4">Published</th>
                    <th className="py-4 px-4 text-right pr-10">Options</th>
                </tr>
            </thead>
            <tbody>
                {skeletonRows.map((_, i) => (
                    <tr key={`skeleton-${i}`} className="animate-pulse">
                        <td className="py-6 px-6">
                            <div className="h-4 w-4 bg-gray-100 rounded mx-auto"></div>
                        </td>
                        <td className="py-4 px-4">
                            <div className="h-16 w-16 bg-gray-100 rounded"></div>
                        </td>
                        <td className="py-4 px-4">
                            <div className="h-4 w-32 bg-gray-100 rounded mb-2"></div>
                            <div className="h-3 w-20 bg-gray-50 rounded"></div>
                        </td>
                        <td className="py-4 px-4">
                            <div className="h-4 w-24 bg-gray-100 rounded"></div>
                        </td>
                        <td className="py-4 px-4">
                            <div className="h-4 w-20 bg-gray-100 rounded"></div>
                        </td>
                        <td className="py-4 px-4">
                            <div className="h-6 w-16 bg-gray-100 rounded"></div>
                        </td>
                        <td className="py-4 px-4">
                            <div className="h-4 w-20 bg-gray-100 rounded"></div>
                        </td>
                        <td className="py-4 px-4">
                            <div className="h-5 w-10 bg-gray-100 rounded-full"></div>
                        </td>
                        <td className="py-4 px-4">
                            <div className="h-8 w-8 bg-gray-100 rounded ml-auto"></div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
