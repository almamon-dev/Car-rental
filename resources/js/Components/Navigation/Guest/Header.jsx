import React, { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { 
    Car, Menu, X, Search, Globe, ChevronDown, Check,
    Home, Users, Bell, Grid, UserCircle, Briefcase, 
    MessageSquare, Settings
} from "lucide-react";


const Header = () => {
    const { url } = usePage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState("EN");
    const [scrolled, setScrolled] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/", icon: Home },
        { name: "Fleet", href: "/fleet", icon: Car },
        { name: "Services", href: "/services", icon: Briefcase },
        { name: "Membership", href: "/membership", icon: Users },
        { name: "Notifications", href: "/notifications", icon: Bell, badge: 3 },
    ];

    const isActive = (path) => url === path || (path !== "/" && url.startsWith(path));

    return (
        <>
            {/* Header Height Content Spacer */}
            <div className="h-[52px] sm:h-[62px] w-full" />

            <header 
                className={`fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 ${
                    scrolled 
                        ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-b border-gray-300/50" 
                        : "border-b border-gray-100"
                }`}
            >
                {/* Max-width container matching typical enterprise dashboard widths (1128px - 1280px) */}
                <div className="max-w-7xl mx-auto px-4 h-full">
                    <div className="flex h-[52px] sm:h-[62px] items-center justify-between">
                        
                        {/* --- LEFT SECTION: Logo & Search --- */}
                        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
                            {/* Brand Logo - LinkedIn Style 'Bug' */}
                            <Link href="/" className="flex-shrink-0 group relative">
                                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-[6px] bg-[#0a66c2] text-white shadow-sm transition-all group-hover:scale-105 group-hover:shadow-md group-active:scale-95">
                                    <Car size={20} strokeWidth={2.5} className="sm:w-6 sm:h-6" />
                                </div>
                                {/* Optional: Brand Name on Table/Desktop if desired, currently hidden for pure style */}
                                {/* <span className="hidden xl:block absolute left-full ml-3 text-xl font-bold text-[#0a66c2] tracking-tight">LuxDrive</span> */}
                            </Link>
                            
                            {/* Search Input - Expands on Focus */}
                            <div className={`hidden md:flex items-center px-4 py-1.5 rounded-[4px] transition-all duration-200 ease-out origin-left ${
                                isSearchFocused 
                                    ? "w-[340px] bg-white ring-2 ring-[#0a66c2] shadow-[0_4px_12px_rgba(0,0,0,0.05)]" 
                                    : "w-[260px] bg-[#edf3f8] hover:bg-[#e1eaf3]"
                            }`}>
                                <Search 
                                    size={18} 
                                    className={`mr-3 transition-colors ${isSearchFocused ? "text-[#0a66c2]" : "text-gray-600"}`} 
                                    strokeWidth={isSearchFocused ? 2.5 : 2}
                                />
                                <input 
                                    type="text" 
                                    placeholder="Search by brand, type..." 
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                    className="bg-transparent border-none outline-none text-[14px] text-gray-900 placeholder:text-gray-500 w-full p-0 font-normal focus:ring-0"
                                />
                            </div>
                        </div>

                        {/* --- CENTER SECTION: Navigation Tabs --- */}
                        <nav className="hidden lg:flex items-center ml-auto mr-4 h-full gap-2 sm:gap-6">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`group relative flex flex-col items-center justify-between h-full pt-1.5 pb-1 min-w-[70px] sm:min-w-[80px] cursor-pointer transition-colors border-b-[2px] ${
                                            active 
                                                ? "border-gray-900" 
                                                : "border-transparent hover:text-gray-900"
                                        }`}
                                    >
                                        <div className="flex flex-col items-center justify-center flex-1">
                                            <div className="relative">
                                                <Icon 
                                                    size={24} 
                                                    strokeWidth={active ? 2.5 : 1.75}
                                                    className={`mb-1 transition-all group-hover:scale-105 ${
                                                        active ? "text-gray-900 fill-gray-900" : "text-gray-500 fill-none"
                                                    }`} 
                                                />
                                                {/* Notification Badge */}
                                                {link.badge && (
                                                    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] bg-[#cc1016] rounded-full text-[10px] flex items-center justify-center text-white font-bold ring-2 ring-white">
                                                        {link.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <span className={`text-[12px] leading-3 tracking-wide transition-colors ${
                                                active ? "font-medium text-gray-900" : "font-normal text-gray-500 group-hover:text-gray-900"
                                            }`}>
                                                {link.name}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* --- RIGHT SECTION: Utilities & Auth --- */}
                        <div className="flex items-center h-full sm:border-l sm:border-gray-100 sm:pl-4 md:pl-6 gap-2 sm:gap-4">
                            
                            {/* Language Switcher */}
                            <div className="hidden sm:block h-full">
                                <LanguageDropdown current={currentLang} onChange={setCurrentLang} />
                            </div>

                            {/* Auth Buttons */}
                            <div className="hidden sm:flex items-center gap-3">
                                <Link 
                                    href="/register" 
                                    className="text-[14px] font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 px-4 py-2 rounded-full transition-all duration-200"
                                >
                                    Join now
                                </Link>
                                <Link 
                                    href="/login"
                                    className="text-[14px] font-semibold text-[#0a66c2] border border-[#0a66c2] px-6 py-1.5 rounded-full hover:bg-blue-50/50 hover:border-[#004182] hover:text-[#004182] hover:shadow-[inset_0_0_0_1px_rgba(10,102,194,1)] transition-all duration-200 active:scale-95"
                                >
                                    Sign in
                                </Link>
                            </div>

                            {/* Mobile Search & Menu Triggers */}
                            <div className="lg:hidden flex items-center gap-3 md:gap-4 pl-2">
                                <button className="text-gray-500 p-2 rounded-full hover:bg-gray-100 active:scale-90 transition-all">
                                    <Search size={22} strokeWidth={2} />
                                </button>
                                <button 
                                    onClick={() => setIsMenuOpen(true)}
                                    className="text-gray-600 p-1.5 -mr-2 hover:text-[#0a66c2] active:scale-90 transition-all"
                                >
                                    <Menu size={28} strokeWidth={2} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Premium Mobile Slide-Over Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <MobileMenu 
                        links={navLinks} 
                        isActive={isActive} 
                        onClose={() => setIsMenuOpen(false)}
                        currentLang={currentLang}
                        setLang={setCurrentLang}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

// --- Sub-components ---

const LanguageDropdown = ({ current, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const languages = [
        { code: "EN", label: "English" },
        { code: "BN", label: "Bangla" },
        { code: "FR", label: "Français" },
    ];

    return (
        <div className="relative group h-full flex flex-col justify-center" ref={containerRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity w-[60px] h-full pt-1.5 pb-1 cursor-pointer"
            >
                <Globe size={20} strokeWidth={1.5} className="mb-0.5" />
                <span className="flex items-center text-[12px] font-normal gap-0.5 leading-3">
                    {current} <ChevronDown size={10} className={`mt-0.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-[-10px] w-48 bg-white rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden py-1 z-50 origin-top-right mt-1"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    onChange(lang.code);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 text-gray-700 flex justify-between items-center transition-colors ${
                                    current === lang.code ? "bg-blue-50/50 font-semibold text-[#0a66c2]" : ""
                                }`}
                            >
                                {lang.label}
                                {current === lang.code && <Check size={16} />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MobileMenu = ({ links, isActive, onClose, currentLang, setLang }) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-[2px]"
                onClick={onClose}
            />
            
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
                className="fixed inset-y-0 left-0 w-[300px] bg-white z-[70] flex flex-col shadow-2xl"
            >
                {/* Mobile Header: User Profile Placeholder */}
                <div className="flex flex-col p-6 bg-slate-50 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-5">
                         {/* Circle Avatar */}
                        <div className="w-14 h-14 rounded-full bg-white border-[3px] border-white shadow-sm overflow-hidden flex items-center justify-center text-gray-300">
                            <UserCircle size={56} className="bg-gray-100" />
                        </div>
                        <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
                           <X size={24} />
                        </button>
                    </div>
                    <Link href="/login" className="text-[20px] font-bold text-gray-900 leading-tight hover:underline decoration-2 underline-offset-4">
                        Sign In
                    </Link>
                    <Link href="/register" className="text-[14px] font-semibold text-[#0a66c2] mt-1 hover:underline">
                        Join to unlock all features
                    </Link>
                </div>

                {/* Mobile Nav Links */}
                <div className="flex-1 overflow-y-auto py-2">
                    <nav className="py-2">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={onClose}
                                className={`flex items-center gap-4 px-6 py-3.5 text-[15px] font-medium transition-colors border-l-[4px] ${
                                    isActive(link.href)
                                        ? "bg-[#e2f0fe]/30 text-[#0a66c2] border-[#0a66c2]"
                                        : "bg-transparent text-gray-600 border-transparent hover:bg-gray-50"
                                }`}
                            >
                                <link.icon size={24} strokeWidth={isActive(link.href) ? 2.5 : 2} />
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <hr className="border-gray-100 my-1"/>

                    {/* Language Select Mobile */}
                    <div className="px-6 py-4">
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Language</h3>
                        <div className="flex flex-wrap gap-2">
                            {["EN", "BN", "FR"].map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => setLang(lang)}
                                    className={`px-4 py-1.5 rounded-full text-[12px] font-bold border transition-all ${
                                        currentLang === lang 
                                            ? "border-[#0a66c2] text-[#0a66c2] bg-white shadow-sm ring-1 ring-[#0a66c2]" 
                                            : "border-gray-200 text-gray-500 hover:border-gray-300 bg-gray-50"
                                    }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Footer */}
                <div className="p-5 border-t border-gray-100 bg-gray-50">
                    <div className="flex items-center justify-between text-gray-500">
                         <Link href="/settings" className="flex items-center gap-2 text-sm font-medium hover:text-[#0a66c2]">
                             <Settings size={18} />
                             <span>Settings</span>
                         </Link>
                         <div className="text-xs font-semibold text-gray-400">v1.2.0</div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Header;
