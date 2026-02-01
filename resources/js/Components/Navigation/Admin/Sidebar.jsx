/**
 * Admin - Sidebar Navigation
 * 
 * Manages the navigation structure for the administrative dashboard.
 * Focuses on clarity, user-friendly terminology, and intuitive groupings.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard, Users as UserGroup, Package, PlusSquare, AlertCircle, 
    List, Layers, Tag, Boxes, FileText, ShieldCheck, 
    UserCircle, Mail, Lock, File, DollarSign, Clock, Calendar,
    Settings, Globe, Smartphone, Monitor, CreditCard, Briefcase, Plug,
    LogOut, ChevronDown, ChevronRight, ChevronsLeft, Activity, MapPin, 
    Wrench, BarChart3, Car
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isMobileOpen, setIsMobileOpen, isCollapsed, toggleCollapse }) => {
    const { url } = usePage();
    const currentPath = url.split("?")[0];
    const [openMenus, setOpenMenus] = useState({});
    const navRef = useRef(null);

    const checkActive = (path, routeName) => {
        if (routeName && typeof route === 'function') {
            if (route().current(routeName)) return true;
        }

        if (!path) return false;
        const normalizedPath = (typeof path === 'string' && path.startsWith('http')) 
            ? new URL(path).pathname 
            : path;
            
        if (currentPath === normalizedPath) return true;

        if (normalizedPath.startsWith('/admin') && currentPath.startsWith(normalizedPath) && normalizedPath !== '/admin') {
            const pathParts = normalizedPath.split('/').filter(Boolean);
            const currentParts = currentPath.split('/').filter(Boolean);
            return pathParts.every((part, i) => currentParts[i] === part);
        }
        return false;
    };

    useEffect(() => {
        if (!isCollapsed) {
            const initialOpenMenus = {};
            menuItems.forEach(group => {
                group.items.forEach(item => {
                    if (item.children) {
                        const hasActiveChild = item.children.some(child => checkActive(child.path, child.routeName));
                        if (hasActiveChild) initialOpenMenus[item.key] = true;
                    }
                });
            });
            setOpenMenus(prev => ({ ...prev, ...initialOpenMenus }));
        }
    }, [currentPath, isCollapsed]);

    // --- User-Friendly Navigation Menu ---
    const menuItems = [
        {
            group: "Main Menu",
            items: [
                { label: "Dashboard", path: "/dashboard", icon: <BarChart3 size={18} /> },
                { label: "Bookings", path: "/admin/bookings", icon: <Calendar size={18} />, routeName: "admin.bookings.index" },
            ]
        },
        {
            group: "Inventory",
            items: [
                {
                    label: "Cars Control",
                    key: "cars",
                    icon: <Car size={18} />,
                    children: [
                        { label: "All Cars", path: "/admin/cars", routeName: "admin.cars.index" },
                        { label: "Add New Car", path: "/admin/cars/create", routeName: "admin.cars.create" },
                    ]
                },
                {
                    label: "Brands / Makes",
                    key: "brands",
                    icon: <Tag size={18} />,
                    children: [
                        { label: "All Brands", path: "/admin/brands", routeName: "admin.brands.index" },
                        { label: "Add New Brand", path: "/admin/brands/create", routeName: "admin.brands.create" },
                    ]
                },
                {
                    label: "Categories",
                    key: "categories",
                    icon: <Layers size={18} />,
                    children: [
                        { label: "Main Categories", path: "/admin/category", routeName: "admin.category.index" },
                        { label: "Sub Categories", path: "/admin/categories/sub-categories", routeName: "admin.category.sub.index" },
                        { label: "Add Category", path: "/admin/category/create", routeName: "admin.category.create" },
                    ]
                },
                {
                    label: "Locations",
                    key: "locations",
                    icon: <MapPin size={18} />,
                    children: [
                        { label: "All Hubs", path: "/admin/locations", routeName: "admin.locations.index" },
                        { label: "Add Location", path: "/admin/locations/create", routeName: "admin.locations.create" },
                    ]
                },
            ]
        },
        {
            group: "Users & Messages",
            items: [
                { label: "All Users", path: "/admin/users", icon: <UserGroup size={18} />, routeName: "admin.users.index" },
                { label: "Messages", path: "/admin/contacts", icon: <Mail size={18} />, routeName: "admin.contacts.index" },
                { label: "My Profile", path: "/profile", icon: <UserCircle size={18} /> },
            ]
        },
        {
            group: "Settings & System",
            items: [
                { 
                    label: "General Settings", 
                    key: "platform_settings",
                    icon: <Settings size={18} />, 
                    children: [
                        { label: "Site Config", path: route('admin.settings.general') },
                        { label: "Logo & Colors", path: route('admin.settings.branding') },
                        { label: "SEO Settings", path: route('admin.settings.seo') },
                        { label: "Social Media", path: route('admin.settings.social') },
                    ]
                },
                { 
                    label: "Maintenance", 
                    key: "system_settings",
                    icon: <Activity size={18} />, 
                    children: [
                        { label: "System Logs", path: route('admin.maintenance.logs') },
                        { label: "Backups", path: route('admin.maintenance.backups') },
                        { label: "Optimize Performance", path: route('admin.maintenance.optimize') },
                        { label: "Check Updates", path: route('admin.maintenance.updates') }
                    ]
                },
                { 
                    label: "Integrations", 
                    key: "integration_settings",
                    icon: <Plug size={18} />, 
                    children: [
                        { label: "Email Settings", path: route('admin.settings.email') },
                        { label: "Payment Gateway", path: route('admin.settings.sslcommerz') },
                        { label: "Notifications", path: route('admin.settings.notifications') },
                    ]
                },
                { label: "Logout", path: "/logout", icon: <LogOut size={18} /> },
            ]
        }
    ];

    const toggleMenu = (key) => {
        setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="flex flex-col h-full bg-white shadow-sm relative transition-all duration-300">
            
            {/* Collapse Toggle Control */}
            <button 
                onClick={toggleCollapse}
                className={`absolute -right-3 top-7 z-[200] w-6 h-6 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-[#0a66c2] shadow-md border border-slate-100 transition-all duration-500
                    ${isCollapsed ? 'rotate-180' : 'rotate-0'}`}
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
                <ChevronsLeft size={12} strokeWidth={3} />
            </button>

            {/* Logo Section */}
            <div className={`h-16 flex items-center border-b border-slate-50 transition-all duration-300 ${isCollapsed ? 'justify-center px-0' : 'px-6'}`}>
                <div className={`flex items-center gap-3 overflow-hidden whitespace-nowrap ${isCollapsed ? 'justify-center w-full' : ''}`}>
                        <div className="w-10 h-10 min-w-[40px] bg-[#0a66c2] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#0a66c2]/10">
                            <Car size={22} strokeWidth={2.5} />
                        </div>
                        {!isCollapsed && (
                            <motion.span 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="font-bold text-[18px] text-slate-800 tracking-tight"
                            >
                                Admin<span className="text-[#0a66c2]">Panel</span>
                            </motion.span>
                        )}
                </div>
            </div>

            {/* Menu Items */}
            <nav 
                ref={navRef}
                className={`flex-1 overflow-y-auto py-6 custom-scrollbar overflow-x-hidden transition-all duration-300 ${isCollapsed ? 'px-2 space-y-4' : 'px-4 space-y-7'}`}
            >
                {menuItems.map((group) => (
                    <div key={group.group} className="space-y-2.5">
                        {!isCollapsed && (
                            <h3 className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap h-4 flex items-center">
                                {group.group}
                            </h3>
                        )}
                        
                        <div className="space-y-1">
                            {group.items.map((item) => (
                                <SidebarLink 
                                    key={item.label}
                                    item={item}
                                    currentPath={currentPath}
                                    isOpen={openMenus[item.key]}
                                    onToggle={() => toggleMenu(item.key)}
                                    isCollapsed={isCollapsed}
                                    checkActive={checkActive}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </div>
    );
};

const SidebarLink = ({ item, currentPath, isOpen, onToggle, isCollapsed, checkActive }) => {
    const isActive = item.children 
        ? item.children.some(child => checkActive(child.path, child.routeName))
        : checkActive(item.path, item.routeName);

    const activeStyles = "bg-[#eef6ff] text-[#0a66c2]";
    const inactiveStyles = "text-slate-600 hover:bg-slate-50 hover:text-slate-900";

    return (
        <div className={isActive ? 'active-sidebar-link' : ''}>
            {item.children ? (
                <button
                    onClick={onToggle}
                    title={isCollapsed ? item.label : ""}
                    className={`w-full flex items-center py-2.5 rounded-xl transition-all group mb-0.5
                        ${isActive || isOpen ? activeStyles : inactiveStyles}
                        ${isCollapsed ? 'justify-center px-0' : 'px-3'}
                    `}
                >
                    <span className={`shrink-0 transition-colors ${isActive || isOpen ? 'text-[#0a66c2]' : 'text-slate-400 group-hover:text-slate-500'}`}>
                        {item.icon}
                    </span>
                    {!isCollapsed && (
                        <>
                            <span className={`ml-3 text-[14px] flex-1 text-left whitespace-nowrap overflow-hidden ${isActive || isOpen ? 'font-bold' : 'font-semibold'}`}>
                                {item.label}
                            </span>
                            <ChevronDown size={14} className={`transition-transform duration-300 shrink-0 ml-auto
                                ${isOpen ? 'rotate-180 text-[#0a66c2]' : 'text-slate-300 group-hover:text-slate-400'}`} />
                        </>
                    )}
                </button>
            ) : (
                <Link
                    href={item.path}
                    title={isCollapsed ? item.label : ""}
                    className={`flex items-center py-2.5 rounded-xl transition-all group mb-0.5
                        ${isActive ? activeStyles : inactiveStyles}
                        ${isCollapsed ? 'justify-center px-0' : 'px-3'}
                    `}
                >
                    <span className={`shrink-0 transition-colors ${isActive ? 'text-[#0a66c2]' : 'text-slate-400 group-hover:text-slate-500'}`}>
                        {item.icon}
                    </span>
                    {!isCollapsed && (
                        <span className={`ml-3 text-[14px] flex-1 whitespace-nowrap overflow-hidden ${isActive ? 'font-bold' : 'font-semibold'}`}>
                            {item.label}
                        </span>
                    )}
                </Link>
            )}

            <AnimatePresence>
                {isOpen && !isCollapsed && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-0.5 space-y-0.5 pb-2">
                            {item.children.map(child => (
                                <Link
                                    key={child.label}
                                    href={child.path}
                                    className={`flex items-center gap-3 py-2 pl-10 pr-4 rounded-lg text-[13px] transition-all group relative whitespace-nowrap
                                        ${checkActive(child.path, child.routeName) 
                                            ? 'text-[#0a66c2] font-bold bg-[#0a66c2]/5' 
                                            : 'text-slate-500 hover:text-slate-900 font-medium hover:bg-slate-50'}`}
                                >
                                    <span className={`w-1 h-1 rounded-full transition-all shrink-0 ${checkActive(child.path, child.routeName) ? 'bg-[#0a66c2] scale-150' : 'bg-slate-300 group-hover:bg-slate-400'}`}></span>
                                    <span className="truncate">{child.label}</span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Sidebar;
