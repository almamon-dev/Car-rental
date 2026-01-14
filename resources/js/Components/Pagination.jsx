import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { router } from "@inertiajs/react";

const Pagination = ({ meta, onPageChange }) => {
    if (!meta) return null;

    const {
        current_page,
        last_page,
        per_page,
        from,
        to,
        total,
        prev_page_url,
        next_page_url,
        path,
    } = meta;

    // --- Pagination Logic ---
    const maxVisibleButtons = 8;
    let startPage = Math.max(
        1,
        current_page - Math.floor(maxVisibleButtons / 2)
    );
    let endPage = startPage + maxVisibleButtons - 1;

    if (endPage > last_page) {
        endPage = last_page;
        startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    // --- Modified Handlers to Support Skeleton ---

    const handlePerPageChange = (e) => {
        const value = e.target.value;
        // যদি CarList থেকে onPageChange পাঠানো হয়, তবে সেটি ব্যবহার করবে
        if (onPageChange) {
            onPageChange(1); // Rows per page চেঞ্জ করলে ১ নম্বর পেজে নিয়ে যাবে
            // সাথে per_page ভ্যালু আপডেট করার জন্য ইনর্শিয়া কল
            router.get(
                window.location.pathname,
                { per_page: value, page: 1 },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                }
            );
        }
    };

    const handleInternalPageChange = (url, pageNumber) => {
        if (!url) return;

        // যদি CarList থেকে onPageChange (যা ৫ সেকেন্ড টাইমার হ্যান্ডেল করে) পাঠানো হয়
        if (onPageChange) {
            onPageChange(pageNumber || url);
        } else {
            // ডিফল্ট ইনর্শিয়া কল (যদি onPageChange না থাকে)
            router.get(
                url,
                {},
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                }
            );
        }
    };

    const getPageUrl = (page) => `${path}?page=${page}&per_page=${per_page}`;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-t border-[#F1F5F9] dark:border-gray-800 font-sans gap-4 transition-colors duration-300">
            {/* Left side: Rows per page and range info */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-[#94A3B8] dark:text-gray-500 text-[14px]">
                        Rows per page:
                    </span>
                    <div className="relative">
                        <select
                            value={per_page}
                            onChange={handlePerPageChange}
                            className="appearance-none bg-white dark:bg-gray-800 border border-[#E2E8F0] dark:border-gray-700 rounded-md pl-3 pr-8 py-1 text-[#64748B] dark:text-gray-300 text-[12px] focus:outline-none cursor-pointer min-w-[70px] transition-colors"
                        >
                            {[5, 10, 20, 50].map((val) => (
                                <option key={val} value={val}>
                                    {val < 10 ? `0${val}` : val}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <span className="text-[#94A3B8] dark:text-gray-500 text-[14px] ml-2 font-normal min-w-[80px]">
                    {from || 0}-{to || 0} of {total}
                </span>
            </div>

            {/* Right side: Navigation buttons */}
            <div className="flex items-center gap-1.5">
                <button
                    onClick={() =>
                        handleInternalPageChange(
                            prev_page_url,
                            current_page - 1
                        )
                    }
                    disabled={!prev_page_url}
                    className={`w-8 h-8 flex items-center justify-center border border-[#E2E8F0] dark:border-gray-700 rounded-[4px] transition-all ${
                        !prev_page_url
                            ? "text-[#E2E8F0] dark:text-gray-800 cursor-not-allowed opacity-50"
                            : "text-[#94A3B8] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                >
                    <ChevronLeft size={18} />
                </button>

                <div className="flex items-center gap-1.5">
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() =>
                                handleInternalPageChange(getPageUrl(page), page)
                            }
                            className={`w-8 h-8 flex items-center justify-center font-medium text-[14px] rounded-[4px] border transition-all ${
                                current_page === page
                                    ? "bg-[#3B82F6] dark:bg-emerald-600 text-white dark:border-emerald-600 shadow-sm"
                                    : "text-[#64748B] dark:text-gray-400 border-[#E2E8F0] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() =>
                        handleInternalPageChange(
                            next_page_url,
                            current_page + 1
                        )
                    }
                    disabled={!next_page_url}
                    className={`w-8 h-8 flex items-center justify-center border border-[#E2E8F0] dark:border-gray-700 rounded-[4px] transition-all ${
                        !next_page_url
                            ? "text-[#E2E8F0] dark:text-gray-800 cursor-not-allowed opacity-50"
                            : "text-[#94A3B8] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
