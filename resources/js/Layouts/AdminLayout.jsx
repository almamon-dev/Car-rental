/**
 * Admin - Institutional Layout
 * 
 * Provides the core structural framework for the administrative domain, 
 * orchestrating the navigational sidebar, header console, and main operational 
 * scroll-view.
 * 
 * @author AL Mamon
 * @version 1.1.0
 */

import React, { useState } from "react";
import Header from "../Components/Navigation/Admin/Header";
import Sidebar from "../Components/Navigation/Admin/Sidebar";
import { motion, AnimatePresence } from "framer-motion";

/**
 * AdminLayout Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Operational page content
 * @returns {JSX.Element}
 */
export default function AdminLayout({ children }) {
    // --- State: Navigational Topology ---
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-[#f3f2ef] overflow-hidden font-sans selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
            
            {/* --- MOBILE OVERLAY: GLASSMORPHISM MATRIX --- */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/40 z-[155] lg:hidden backdrop-blur-[3px]"
                        onClick={() => setIsMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* --- SIDEBAR CLUSTER: EXECUTIVE COMMAND CENTER --- */}
            <aside
                className={`fixed inset-y-0 left-0 z-[160] bg-white transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col border-r border-slate-100 shadow-[20px_0_25px_-5px_rgba(0,0,0,0.02)]
                    ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                    ${isSidebarCollapsed ? "lg:w-[80px]" : "lg:w-[280px]"}
                    `}
            >
                <Sidebar
                    isMobileOpen={isMobileOpen}
                    setIsMobileOpen={setIsMobileOpen}
                    isCollapsed={isSidebarCollapsed}
                    toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />
            </aside>

            {/* --- MAIN OPERATIONAL AREA --- */}
            <div
                className={`flex-1 flex flex-col min-w-0 transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
                    ${isSidebarCollapsed ? "lg:pl-[80px]" : "lg:pl-[280px]"}
                `}
            >
                {/* Header: Administrative Console */}
                <Header onMenuClick={() => setIsMobileOpen(true)} />

                {/* Main Scrollable Viewport */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-full mx-auto"
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
