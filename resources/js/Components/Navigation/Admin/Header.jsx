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
    ChevronLeft ,
    CreditCard
} from "lucide-react";

/**
 * Header Component - Dreams POS Layout w/ LinkedIn Blue Theme
 */
const Header = ({ onMenuClick }) => {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        router.post(route("logout"));
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="h-[70px] bg-white/90 backdrop-blur-md sticky top-0 z-[50] flex items-center px-4 md:px-6 border-b border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] transition-all duration-300">
            
            {/* LEFT: Toggle & Logo (Mobile) */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-2 rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* CENTER: Search Bar */}
            <div className="flex-1 px-4 lg:px-8 max-w-2xl">
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a66c2] transition-colors duration-300">
                        <Search size={19} strokeWidth={2} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-full py-2.5 pl-11 pr-10 text-sm focus:bg-white focus:ring-2 focus:ring-[#0a66c2]/20 focus:border-[#0a66c2] transition-all duration-300 placeholder:text-slate-400 group-hover:bg-white group-hover:shadow-sm"
                    />
                </div>
            </div>

            {/* RIGHT: Actions & Tools */}
            <div className="flex items-center gap-3 md:gap-4 ml-auto">
                
                {/* Action Buttons (Hidden on mobile) */}
                <div className="hidden md:flex items-center gap-3">
                     <Link
                        href="#"
                        className="flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-xs font-semibold hover:bg-white hover:shadow-md hover:border-slate-300 transition-all duration-300"
                    >
                        <Monitor size={15} />
                        <span>POS</span>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-2 bg-[#0a66c2] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#004182] hover:shadow-[0_4px_12px_rgba(10,102,194,0.3)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <Plus size={16} strokeWidth={3} />
                        <span>Create</span>
                    </Link>
                </div>

                {/* Icons Divider */}
                <div className="h-6 w-px bg-slate-200 hidden md:block mx-1" />

                {/* Utility Icons */}
                <div className="flex items-center gap-1.5">
                     <button className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-[#0a66c2] rounded-full transition-all duration-300" title="Language">
                        <Globe size={19} strokeWidth={1.5} />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-[#0a66c2] rounded-full transition-all duration-300" title="Fullscreen">
                        <Maximize size={19} strokeWidth={1.5} />
                    </button>
                     <button className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-[#0a66c2] rounded-full transition-all duration-300 relative group" title="Messages">
                        <Mail size={19} strokeWidth={1.5} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[#0a66c2] rounded-full ring-2 ring-white scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-[#0a66c2] rounded-full transition-all duration-300 relative" title="Notifications">
                        <Bell size={19} strokeWidth={1.5} />
                        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white"></span>
                    </button>
                </div>

                {/* User Profile */}
                <div className="relative ml-1" ref={dropdownRef}>
                    <button 
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors"
                    >
                        <div className="relative">
                            <img
                                src={auth?.user?.profile_photo_url || `https://ui-avatars.com/api/?name=${auth?.user?.name || 'Admin'}&background=0a66c2&color=fff`}
                                alt="User"
                                className="w-8 h-8 rounded-full object-cover border border-slate-200"
                            />
                        </div>
                        <div className="hidden lg:block text-left leading-tight">
                            <span className="text-sm font-semibold text-slate-700 block max-w-[100px] truncate">{auth?.user?.name || "Me"}</span>
                        </div>
                        <ChevronDown size={14} className="text-slate-500" />
                    </button>

                    {/* RESTORED RICH DROPDOWN MENU */}
                    {open && (
                        <div className="absolute right-0 mt-3 w-72 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            {/* Profile Header */}
                            <div className="p-4 border-b border-slate-50 flex items-start gap-3">
                                <img
                                    src={auth?.user?.profile_photo_url || `https://ui-avatars.com/api/?name=${auth?.user?.name || 'Admin'}&background=0a66c2&color=fff`}
                                    className="w-12 h-12 rounded-full border border-slate-200 shadow-sm"
                                    alt="Avatar"
                                />
                                <div className="flex-1 overflow-hidden">
                                     <p className="text-[15px] font-bold text-slate-900 truncate">
                                        {auth?.user?.name || "Rental Admin"}
                                    </p>
                                    <p className="text-[12px] text-slate-500 truncate mb-2">
                                        Fleet & Operations Manager
                                    </p>
                                    <Link
                                        href={route("profile.edit")}
                                        className="inline-block px-4 py-1 border border-[#0a66c2] text-[#0a66c2] hover:bg-[#e8f3ff] font-semibold rounded-full text-xs transition-colors"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="p-2 border-b border-slate-50">
                                <p className="px-3 py-1.5 text-[11px] font-bold text-slate-500 uppercase">Account</p>
                                <DropdownLink icon={Settings} label="Settings & Privacy" />
                                <DropdownLink icon={Globe} label="Language" />
                            </div>
                             <div className="p-2">
                                <p className="px-3 py-1.5 text-[11px] font-bold text-slate-500 uppercase">Manage</p>
                                <DropdownLink icon={CreditCard} label="Billing & Payment" />
                            </div>

                            {/* Logout Section */}
                            <div className="p-2 border-t border-slate-50 bg-slate-50">
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2 text-[13px] text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-3 rounded-md transition-colors"
                                >
                                    <LogOut size={16} />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

const DropdownLink = ({ icon: Icon, label }) => (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all font-semibold group">
        <Icon size={16} className="text-slate-400 group-hover:text-[#0a66c2] transition-colors" />
        <span>{label}</span>
    </button>
);

export default Header;
