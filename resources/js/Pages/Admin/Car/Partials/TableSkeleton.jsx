import React from "react";

export default function TableSkeleton({ rowCount = 5 }) {
    return (
        <tbody className="bg-white">
            {Array.from({ length: rowCount }).map((_, i) => (
                <tr key={i} className="animate-pulse border-b border-gray-100">
                    {/* Checkbox Column */}
                    <td className="py-6 px-6 w-12 text-center">
                        <div className="h-4 w-4 bg-gray-100 rounded mx-auto" />
                    </td>

                    {/* Merged Vehicle Column (Thumb + Meta) */}
                    <td className="py-4 px-4">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-gray-100 rounded flex-shrink-0" />
                            <div className="flex flex-col gap-2">
                                <div className="h-4 w-32 bg-gray-100 rounded" />
                                <div className="h-3 w-20 bg-gray-50 rounded" />
                            </div>
                        </div>
                    </td>

                    {/* Category Column */}
                    <td className="py-4 px-4">
                        <div className="h-4 w-20 bg-gray-100 rounded mb-2" />
                        <div className="h-3 w-16 bg-gray-50 rounded" />
                    </td>

                    {/* Specifications Column */}
                    <td className="py-4 px-4">
                        <div className="h-4 w-28 bg-gray-100 rounded mb-2" />
                        <div className="h-3 w-20 bg-gray-50 rounded" />
                    </td>

                    {/* Pricing Column */}
                    <td className="py-4 px-4">
                        <div className="h-4 w-20 bg-gray-100 rounded mb-2" />
                        <div className="h-3 w-16 bg-gray-50 rounded" />
                    </td>

                    {/* Status Column */}
                    <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-gray-100" />
                            <div className="h-4 w-16 bg-gray-100 rounded" />
                        </div>
                    </td>

                    {/* Actions Column */}
                    <td className="py-4 px-4 text-right pr-6">
                        <div className="h-8 w-8 bg-gray-100 rounded-full ml-auto" />
                    </td>
                </tr>
            ))}
        </tbody>
    );
}
