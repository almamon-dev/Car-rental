import React, { useState } from "react";
import Header from "../Components/Navigation/Admin/Header";
import Sidebar from "../Components/Navigation/Admin/Sidebar";
import { ChevronLeft } from "lucide-react";

export default function AdminLayout({ children }) {
    // -- Fixed Sidebar (No collapse)
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-[#f3f2ef] overflow-hidden font-sans selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
            {/* Mobile Overlay - Glassmorphism */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 z-[155] lg:hidden transition-all duration-500 ease-in-out backdrop-blur-[3px] animate-in fade-in"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar Container - Executive Elevation (Borderless) */}
            <aside
                className={`fixed inset-y-0 left-0 z-[160] bg-white transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col shadow-[0_20px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)]
                    ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                    ${isSidebarCollapsed ? "lg:w-[80px] hover:lg:w-[280px] group" : "lg:w-[280px]"}
                    `}
            >
                <Sidebar
                    isMobileOpen={isMobileOpen}
                    setIsMobileOpen={setIsMobileOpen}
                    isCollapsed={isSidebarCollapsed}
                    toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />
            </aside>

            {/* Main Content Area - Professional Depth */}
            <div
                className={`flex-1 flex flex-col min-w-0 transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
                    ${isSidebarCollapsed ? "lg:pl-[80px]" : "lg:pl-[280px]"}
                `}
            >
                {/* Header: Navigation Bar */}
                <Header onMenuClick={() => setIsMobileOpen(true)} />

                {/* Main Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-5">
                    <div className="max-w-full mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}
