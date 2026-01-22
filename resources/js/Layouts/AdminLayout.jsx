import React, { useState } from "react";
import Header from "../Components/Navigation/Admin/Header";
import Sidebar from "../Components/Navigation/Admin/Sidebar";
import { ChevronLeft } from "lucide-react";

export default function AdminLayout({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // -- sidebar toggle
    const showFullSidebar = !isCollapsed || isHovered;

    return (
        <div className="flex h-screen bg-[#f4f2ee] overflow-hidden font-sans selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
            {/* Mobile Overlay - Glassmorphism */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 z-[155] lg:hidden transition-all duration-500 ease-in-out backdrop-blur-[3px] animate-in fade-in"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar Container - Executive Elevation (Borderless) */}
            <aside
                onMouseEnter={() => isCollapsed && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`fixed inset-y-0 left-0 z-[160] bg-white transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col shadow-[0_20px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)]
                    ${
                        isMobileOpen
                            ? "translate-x-0 w-[280px]"
                            : "-translate-x-full lg:translate-x-0"
                    }
                    ${showFullSidebar ? "lg:w-[280px]" : "lg:w-[80px]"}`}
            >
                {/* Collapse Toggle Button - Borderless Floating Style */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex absolute -right-3 top-6 z-[170] w-6 h-6 bg-white text-[#0a66c2] rounded-full items-center justify-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:bg-[#edf3f8] hover:scale-110 active:scale-95 transition-all duration-300"
                >
                    <ChevronLeft
                        size={14}
                        strokeWidth={3}
                        className={`${
                            isCollapsed ? "rotate-180" : ""
                        } transition-transform duration-500`}
                    />
                </button>

                <Sidebar
                    isCollapsed={!showFullSidebar}
                    isMobileOpen={isMobileOpen}
                    setIsMobileOpen={setIsMobileOpen}
                />
            </aside>

            {/* Main Content Area - Professional Depth */}
            <div
                className={`flex-1 flex flex-col min-w-0 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
                    showFullSidebar ? "lg:pl-[280px]" : "lg:pl-[80px]"
                }`}
            >
                {/* Header: Navigation Bar */}
                <Header onMenuClick={() => setIsMobileOpen(true)} />

                {/* Main Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <div className="max-w-[1600px] mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}
