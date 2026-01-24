import React from "react";

export default function TableSkeleton({ rowCount = 5 }) {
    return (
        <tbody className="divide-y divide-gray-100">
            {[...Array(rowCount)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                    <td className="py-4 px-6 text-center">
                        <div className="w-4 h-4 bg-gray-100 rounded mx-auto" />
                    </td>
                    <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg shrink-0" />
                            <div className="space-y-2 flex-1">
                                <div className="h-4 bg-gray-100 rounded w-2/3" />
                                <div className="h-3 bg-gray-50 rounded w-1/3" />
                            </div>
                        </div>
                    </td>
                    <td className="py-4 px-4">
                        <div className="h-4 bg-gray-100 rounded w-1/2" />
                    </td>
                    <td className="py-4 px-4">
                        <div className="w-20 h-6 bg-gray-100 rounded-full" />
                    </td>
                    <td className="py-4 px-4">
                        <div className="space-y-1.5">
                            <div className="h-4 bg-gray-100 rounded w-3/4" />
                            <div className="h-2 bg-gray-50 rounded w-1/2" />
                        </div>
                    </td>
                    <td className="py-4 px-4 text-right pr-6">
                        <div className="w-8 h-8 bg-gray-50 rounded-full ml-auto" />
                    </td>
                </tr>
            ))}
        </tbody>
    );
}
