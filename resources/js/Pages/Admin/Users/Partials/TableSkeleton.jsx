import React from 'react';

export default function TableSkeleton({ rowCount = 5 }) {
    return (
        <>
            {[...Array(rowCount)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200" />
                            <div className="space-y-2">
                                <div className="h-4 w-32 bg-gray-200 rounded" />
                                <div className="h-3 w-48 bg-gray-100 rounded" />
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="h-6 w-20 bg-gray-100 rounded-full" />
                    </td>
                    <td className="px-6 py-4">
                        <div className="space-y-2">
                            <div className="h-4 w-24 bg-gray-100 rounded" />
                            <div className="h-3 w-16 bg-gray-50 rounded" />
                        </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                            <div className="h-8 w-8 bg-gray-100 rounded" />
                            <div className="h-8 w-8 bg-gray-100 rounded" />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
}
