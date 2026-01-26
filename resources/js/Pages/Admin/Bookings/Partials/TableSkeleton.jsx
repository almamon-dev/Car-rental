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

                    {/* Booking ID */}
                    <td className="py-4 px-6">
                        <div className="h-4 w-16 bg-gray-100 rounded" />
                    </td>

                    {/* Customer Column */}
                    <td className="py-4 px-6">
                        <div className="flex flex-col gap-2">
                            <div className="h-4 w-32 bg-gray-100 rounded" />
                            <div className="h-3 w-24 bg-gray-50 rounded" />
                        </div>
                    </td>

                    {/* Car Column */}
                    <td className="py-4 px-6">
                        <div className="flex flex-col gap-2">
                            <div className="h-4 w-28 bg-gray-100 rounded" />
                            <div className="h-3 w-20 bg-gray-50 rounded" />
                        </div>
                    </td>

                    {/* Dates Column */}
                    <td className="py-4 px-6">
                        <div className="flex flex-col gap-2">
                            <div className="h-3 w-24 bg-gray-100 rounded" />
                            <div className="h-3 w-24 bg-gray-50 rounded" />
                            <div className="h-3 w-16 bg-gray-100 rounded" />
                        </div>
                    </td>

                    {/* Amount Column */}
                    <td className="py-4 px-6">
                        <div className="h-4 w-20 bg-gray-100 rounded" />
                    </td>

                    {/* Status Column */}
                    <td className="py-4 px-6">
                        <div className="h-6 w-20 bg-gray-100 rounded-full" />
                    </td>

                    {/* Actions Column */}
                    <td className="py-4 px-6 text-right pr-6">
                        <div className="h-8 w-8 bg-gray-100 rounded-lg ml-auto" />
                    </td>
                </tr>
            ))}
        </tbody>
    );
}
