/**
 * Admin - Administrative Console Header
 * 
 * Orchestrates global actions, search telemetry, and identity 
 * management within the administrative domain.
 * 
 * @author AL Mamon
 * @version 1.1.0
 */

import React, { useState, useRef, useEffect } from "react";
import { router, usePage, Link } from "@inertiajs/react";
import { 
    Search, 
    Bell, 
    Menu, 
    Settings, 
    Maximize, 
    Mail, 
    Globe,    
    Monitor,
    Plus,
    X,
    LogOut,
    User,
    ChevronDown,
    ChevronLeft,
    CreditCard,
    Home,
    ShieldCheck,
    Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Header Component
 * 
 * @param {Object} props
 * @param {Function} props.onMenuClick - Trigger for mobile sidebar expansion
 * @returns {JSX.Element}
 */
const Header = ({ onMenuClick }) => {
    // --- Context & State ---
    const { auth } = usePage().props;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // --- Logic: Session Termination ---
    const handleLogout = () => {
        router.post(route("logout"));
    };

    // --- Effects: UI Boundary Persistence ---
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="h-[64px] bg-white/95 backdrop-blur-md sticky top-0 z-[50] flex items-center px-4 md:px-6 border-b border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] selection:bg-[#0a66c2]/10 transition-all duration-300">
            
            {/* --- LEFT: ACCESS CONTROLS --- */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-2 rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* --- CENTER: TELEMETRY SEARCH --- */}
            <div className="flex-1 px-4 lg:px-8 max-w-2xl">
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a66c2] transition-colors duration-300">
                        <Search size={18} strokeWidth={2.5} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search fleet, bookings, or data points..."
                        className="w-full bg-slate-50/80 border border-slate-200 rounded-full py-2.5 pl-11 pr-10 text-[14px] font-medium focus:bg-white focus:ring-4 focus:ring-[#0a66c2]/10 focus:border-[#0a66c2] transition-all duration-300 placeholder:text-slate-400 group-hover:bg-white group-hover:shadow-sm"
                    />
                </div>
            </div>

            {/* --- RIGHT: EXECUTIVE TOOLS & IDENTITY --- */}
            <div className="flex items-center gap-3 md:gap-4 ml-auto">
                
                {/* Deployment Actions */}
                <div className="hidden md:flex items-center gap-2.5">
                     <Link
                        href="#"
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-[12px] font-bold hover:bg-slate-50 hover:shadow-sm transition-all duration-300"
                    >
                        <Monitor size={14} className="text-[#0a66c2]" />
                        <span>POS Terminal</span>
                    </Link>
                    <Link
                        href={route('admin.cars.create')}
                        className="flex items-center gap-2 bg-[#0a66c2] text-white px-5 py-2 rounded-full text-[12px] font-bold hover:bg-[#084d92] shadow-md shadow-[#0a66c2]/10 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <Plus size={16} strokeWidth={2.5} />
                        <span>Add New Car</span>
                    </Link>
                </div>

                {/* Vertical Divider */}
                <div className="h-6 w-px bg-slate-200 hidden md:block mx-2" />

                {/* System Utility Matrix */}
                <div className="flex items-center gap-1">
                     <Link 
                        href="/" 
                        className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-[#0a66c2] rounded-full transition-all duration-300" 
                        title="View Site"
                    >
                        <Home size={18} strokeWidth={1.5} />
                    </Link>
                    <button className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-[#0a66c2] rounded-full transition-all duration-300 relative group" title="Support Messages">
                        <Mail size={18} strokeWidth={1.5} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[#0a66c2] rounded-full ring-2 ring-white scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-[#0a66c2] rounded-full transition-all duration-300 relative" title="Notifications">
                        <Bell size={18} strokeWidth={1.5} />
                        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white" />
                    </button>
                    <button className="hidden sm:flex w-9 h-9 items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-[#0a66c2] rounded-full transition-all duration-300" title="Security Check">
                        <ShieldCheck size={18} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Identity Cluster */}
                <div className="relative ml-1" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                    >
                        <div className="relative">
                            <img
                                src={auth?.user?.profile_photo_url || `https://ui-avatars.com/api/?name=${auth?.user?.name || 'Admin'}&background=0a66c2&color=fff`}
                                alt="Admin Avatar"
                                className="w-8 h-8 rounded-full object-cover shadow-sm"
                            />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                        </div>
                        <div className="hidden lg:block text-left leading-tight pr-1">
                            <span className="text-[13px] font-bold text-slate-800 block max-w-[100px] truncate">{auth?.user?.name || "Admin"}</span>
                        </div>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Rich Executive Dropdown */}
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-[100]"
                            >
                                {/* Profile Summary */}
                                <div className="p-5 border-b border-slate-50 flex items-start gap-3 bg-slate-50/50">
                                    <img
                                        src={auth?.user?.profile_photo_url || `https://ui-avatars.com/api/?name=${auth?.user?.name || 'Admin'}&background=0a66c2&color=fff`}
                                        className="w-12 h-12 rounded-lg border border-white shadow-sm"
                                        alt="Identity Avatar"
                                    />
                                    <div className="flex-1 overflow-hidden">
                                         <p className="text-[15px] font-bold text-slate-900 truncate">
                                            {auth?.user?.name || "Admin"}
                                        </p>
                                        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                            Platform Administrator
                                        </p>
                                        <Link
                                            href={route("profile.edit")}
                                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 text-[#0a66c2] hover:bg-[#e8f3ff] font-bold rounded-md text-[11px] transition-all shadow-sm"
                                        >
                                            <User size={12} />
                                            My Profile
                                        </Link>
                                    </div>
                                </div>

                                {/* Link Matrix */}
                                <div className="p-2 border-b border-slate-50 space-y-1">
                                    <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Management</div>
                                    <DropdownLink icon={Activity} label="Fleet Activity" />
                                    <DropdownLink icon={Settings} label="System Config" />
                                </div>
                                <div className="p-2 space-y-1">
                                    <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Security</div>
                                    <DropdownLink icon={CreditCard} label="Billing Details" />
                                    <DropdownLink icon={ShieldCheck} label="Account Stability" />
                                </div>

                                {/* Session Termination */}
                                <div className="p-2 border-t border-slate-50 bg-slate-50/80">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 font-bold flex items-center gap-3 rounded-md transition-all group"
                                    >
                                        <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

const DropdownLink = ({ icon: Icon, label }) => (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-slate-600 hover:bg-slate-50 hover:text-[#0a66c2] transition-all font-bold group">
        <Icon size={16} className="text-slate-400 group-hover:text-[#0a66c2] transition-colors" />
        <span>{label}</span>
    </button>
);

export default Header;
