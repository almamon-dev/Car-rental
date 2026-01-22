import React, { useState, useRef, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { Search, Bell, ChevronDown, Menu, User, LogOut, Settings, LayoutDashboard, Calendar, Globe, Info, CreditCard } from "lucide-react";

const Header = ({ onMenuClick }) => {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
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
        <header className="h-[52px] bg-white/90 backdrop-blur-md sticky top-0 z-[100] flex items-center shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-all duration-300">
            <div className="max-w-[1600px] w-full mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
                
                {/* LEFT: Search & Navigation */}
                <div className="flex items-center gap-6 flex-1">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 -ml-2 rounded-full text-gray-500 hover:bg-[#edf3f8] transition-colors"
                    >
                        <Menu size={22} />
                    </button>

                    {/* Pro Search - Tailored for Car Rentals */}
                    <div className={`relative transition-all duration-500 ease-in-out hidden md:block group ${isSearchFocused ? 'max-w-[420px] shadow-lg shadow-blue-500/5' : 'max-w-[280px]'} w-full`}>
                        <Search
                            size={16}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? 'text-[#0a66c2]' : 'text-gray-600'}`}
                        />
                        <input
                            type="text"
                            placeholder="Search cars, bookings, or customers..."
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            className="w-full bg-[#edf3f8] border border-transparent rounded-[4px] py-1.5 pl-11 pr-4 text-sm placeholder:text-gray-500 focus:ring-0 focus:border-[#0a66c2] focus:bg-white transition-all h-[34px] font-medium"
                        />
                    </div>
                </div>

                {/* RIGHT: High-Fidelity Status Bar */}
                <div className="flex items-center">
                    {/* Navigation Links - Car Rental Focus */}
                    <nav className="flex items-center h-[52px]">
                        <HeaderNavItem icon={LayoutDashboard} label="Admin" active />
                        <HeaderNavItem icon={Calendar} label="Bookings" badge={2} />
                        <HeaderNavItem icon={Bell} label="Alerts" />
                        
                        {/* Profile Dropdown */}
                        <div ref={dropdownRef} className="relative h-full">
                            <div
                                onClick={() => setOpen(!open)}
                                className="flex flex-col items-center justify-center min-w-[64px] h-full group cursor-pointer border-b-2 border-transparent hover:border-black transition-all px-2"
                            >
                                <div className="relative">
                                    <img
                                        src={auth?.user?.profile_photo_url || `https://ui-avatars.com/api/?name=${auth?.user?.name || 'Admin'}&background=0a66c2&color=fff`}
                                        alt="Me"
                                        className="w-6 h-6 rounded-full border border-gray-100 shadow-sm transition-transform group-hover:scale-110"
                                    />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                                </div>
                                <div className="flex items-center gap-0.5 mt-0.5">
                                    <span className="text-[12px] text-gray-600 group-hover:text-black font-medium leading-none">Me</span>
                                    <ChevronDown size={12} className={`text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
                                </div>
                            </div>

                            {/* Dropdown Menu */}
                            {open && (
                                <div className="absolute right-0 mt-2 w-72 bg-white rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="p-4 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={auth?.user?.profile_photo_url || `https://ui-avatars.com/api/?name=${auth?.user?.name || 'Admin'}&background=0a66c2&color=fff`}
                                                className="w-14 h-14 rounded-full border border-gray-100 shadow-sm"
                                                alt="Avatar"
                                            />
                                            <div className="leading-tight">
                                                <p className="text-[16px] font-bold text-gray-900 truncate">
                                                    {auth?.user?.name || "Rental Admin"}
                                                </p>
                                                <p className="text-[13px] text-gray-500 truncate mt-0.5">
                                                    Fleet & Operations Manager
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            href={route("profile.edit")}
                                            className="block w-full mt-4 text-center border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2]/5 font-bold rounded-full py-1 text-[14px] transition-colors"
                                        >
                                            Manage Profile
                                        </Link>
                                    </div>

                                    <div className="p-3 space-y-1">
                                        <p className="px-3 text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-2">Account</p>
                                        <DropdownLink icon={Settings} label="System Settings" />
                                        <DropdownLink icon={CreditCard} label="Billing & Rates" />
                                        <DropdownLink icon={Globe} label="Region & Currency" />
                                    </div>

                                    <div className="border-t border-gray-100 bg-gray-50/50">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-6 py-3.5 text-[14px] text-gray-600 hover:text-red-600 font-semibold flex items-center gap-2 transition-colors"
                                        >
                                            <LogOut size={16} />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Vertical Divider */}
                    <div className="h-8 w-px bg-gray-200 mx-4 hidden lg:block" />

                    {/* Fleet Controls */}
                    <div className="hidden lg:flex flex-col items-center justify-center min-w-[72px] h-[52px] group cursor-pointer border-b-2 border-transparent hover:border-black transition-all px-2">
                        <div className="relative">
                           <Settings size={22} className="text-gray-500 group-hover:text-black transition-colors" />
                           <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#0a66c2] rounded-full shadow-sm shadow-blue-500/50" />
                        </div>
                        <div className="flex items-center gap-0.5 mt-0.5">
                            <span className="text-[12px] text-gray-600 group-hover:text-black font-medium leading-none">Settings</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

const HeaderNavItem = ({ icon: Icon, label, active, badge }) => (
    <div className={`flex flex-col items-center justify-center min-w-[80px] h-full group cursor-pointer relative transition-all border-b-2 ${active ? 'border-black text-black' : 'border-transparent text-gray-600 hover:text-black'}`}>
        <div className="relative">
            <Icon size={22} strokeWidth={active ? 2.5 : 2} className="transition-transform group-hover:scale-105" />
            {badge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-black flex items-center justify-center rounded-full border border-white shadow-sm">{badge}</span>
            )}
        </div>
        <span className={`text-[12px] mt-0.5 font-medium leading-none ${active ? 'font-bold' : ''}`}>{label}</span>
    </div>
);

const DropdownLink = ({ icon: Icon, label }) => (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-[4px] text-[13px] text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium">
        <Icon size={16} className="text-gray-400" />
        <span>{label}</span>
    </button>
);

const Link = ({ href, children, ...props }) => (
    <a href={href} {...props}>{children}</a>
);

export default Header;
