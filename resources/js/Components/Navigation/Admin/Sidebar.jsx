import React, { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard, Users as UserGroup, Package, PlusSquare, AlertCircle, TrendingDown,
    List, Layers, Tag, Boxes, FileText, ShieldCheck, Barcode, QrCode,
    UserCircle, Mail, Lock, FileQuestion, File, DollarSign, Clock, Calendar,
    Settings, Globe, Smartphone, Monitor, CreditCard, Settings2, Briefcase, Plug,
    LogOut, ChevronDown, ChevronRight, ChevronLeft, X, ChevronsLeft, Phone
} from "lucide-react";

const Sidebar = ({ isMobileOpen, setIsMobileOpen, isCollapsed, toggleCollapse }) => {
    const { url, props } = usePage();
    const { auth } = props;
    const currentPath = url.split("?")[0];
    const [openMenus, setOpenMenus] = useState({});
    const navRef = useRef(null);

    const checkActive = (path, routeName) => {
        if (routeName) {
            if (route().current(routeName)) return true;
            // Handle resource wildcards (index also covers create, edit, show)
            if (routeName.endsWith('.index') && route().current(routeName.replace('.index', '.*'))) return true;
        }

        if (!path) return false;
        
        // Normalize path in case it's a full URL
        const normalizedPath = (typeof path === 'string' && path.startsWith('http')) 
            ? new URL(path).pathname 
            : path;
            
        if (currentPath === normalizedPath) return true;

        // Sub-path match for admin resources (e.g. /admin/cars matches /admin/cars/create)
        if (normalizedPath.startsWith('/admin') && currentPath.startsWith(normalizedPath) && normalizedPath !== '/admin') {
            const pathParts = normalizedPath.split('/').filter(Boolean);
            const currentParts = currentPath.split('/').filter(Boolean);
            return pathParts.every((part, i) => currentParts[i] === part);
        }
            
        return false;
    };

    // Auto-expand active menus and scroll into view
    useEffect(() => {
        if (!isCollapsed) {
            const initialOpenMenus = {};
            menuItems.forEach(group => {
                group.items.forEach(item => {
                    if (item.children) {
                        const hasActiveChild = item.children.some(child => checkActive(child.path, child.routeName));
                        if (hasActiveChild) {
                            initialOpenMenus[item.key] = true;
                        }
                    }
                });
            });
            setOpenMenus(prev => ({ ...prev, ...initialOpenMenus }));

            // Scroll active element into view
            setTimeout(() => {
                const activeElement = navRef.current?.querySelector('.active-sidebar-link');
                if (activeElement) {
                    activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 300);
        }
    }, [currentPath, isCollapsed]);

    const menuItems = [
        {
            group: "Overview",
            items: [
                { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} strokeWidth={1.5} /> },
                { label: "Bookings", path: "/admin/bookings", icon: <Calendar size={20} strokeWidth={1.5} />, routeName: "admin.bookings.index" },
            ]
        },
        {
            group: "Inventory",
            items: [
                {
                    label: "Brands",
                    key: "brands",
                    icon: <Tag size={20} strokeWidth={1.5} />,
                    children: [
                        { label: "Brand List", path: "/admin/brands", routeName: "admin.brands.index" },
                        { label: "Add Brand", path: "/admin/brands/create", routeName: "admin.brands.create" },
                    ]
                },
                {
                    label: "Category Hierarchy",
                    key: "categories",
                    icon: <Layers size={20} strokeWidth={1.5} />,
                    children: [
                        { label: "Root Categories", path: "/admin/category", routeName: "admin.category.index" },
                        { label: "Sub-Categories", path: "/admin/categories/sub-categories", routeName: "admin.category.sub.index" },
                        { label: "Add Category", path: "/admin/category/create", routeName: "admin.category.create" },
                    ]
                },
                {
                    label: "Branches",
                    key: "locations",
                    icon: <Globe size={20} strokeWidth={1.5} />,
                    children: [
                        { label: "Branch List", path: "/admin/locations", routeName: "admin.locations.index" },
                        { label: "Add Branch", path: "/admin/locations/create", routeName: "admin.locations.create" },
                    ]
                },
                {
                    label: "Cars",
                    key: "cars",
                    icon: <Package size={20} strokeWidth={1.5} />,
                    children: [
                        { label: "Car List", path: "/admin/cars", routeName: "admin.cars.index" },
                        { label: "Add New Car", path: "/admin/cars/create", routeName: "admin.cars.create" },
                    ]
                },
            ]
        },
        {
            group: "Pages",
            items: [
                { label: "Profile", path: "/profile", icon: <UserCircle size={20} strokeWidth={1.5} /> },
                { label: "Users", path: "/admin/users", icon: <UserGroup size={20} strokeWidth={1.5} />, routeName: "admin.users.index" },
                { label: "Under Maintenance", path: "/maintenance", icon: <AlertCircle size={20} strokeWidth={1.5} /> },
            ]
        },
        {
            group: "Settings",
            items: [
                { 
                    label: "Platform Settings", 
                    key: "platform_settings",
                    icon: <Settings size={20} strokeWidth={1.5} />, 
                    children: [
                        { label: "General", path: route('admin.settings.general') },
                        { label: "Branding & Logo", path: route('admin.settings.branding') },
                        { label: "SEO & Analytics", path: route('admin.settings.seo') },
                        { label: "Social Media", path: route('admin.settings.social') },
                    ]
                },
                { 
                    label: "Business Settings", 
                    key: "business_settings",
                    icon: <Briefcase size={20} strokeWidth={1.5} />, 
                    children: [
                        { label: "Company Info", path: route('admin.settings.business') },
                        { label: "Contact Details", path: route('admin.settings.contact') },
                        { label: "Booking Rules", path: route('admin.settings.booking') },
                    ]
                },
                { 
                    label: "System & Maintenance", 
                    key: "system_settings",
                    icon: <Monitor size={20} strokeWidth={1.5} />, 
                    children: [
                        { label: "System Logs", path: route('admin.maintenance.logs') },
                        { label: "Database Backups", path: route('admin.maintenance.backups') },
                        { label: "Cache & Optimize", path: route('admin.maintenance.optimize') },
                        { label: "System Updates", path: route('admin.maintenance.updates') }
                    ]
                },
                { 
                    label: "Integrations", 
                    key: "integration_settings",
                    icon: <Plug size={20} strokeWidth={1.5} />, 
                    children: [
                        { label: "Email Configuration", path: route('admin.settings.email') },
                        { label: "Payment Gateway", path: route('admin.settings.sslcommerz') },
                        { label: "Notifications", path: route('admin.settings.notifications') },
                    ]
                },
                { label: "Logout", path: "/logout", icon: <LogOut size={20} strokeWidth={1.5} /> },
            ]
        }
    ];

    const toggleMenu = (key) => {
        // If collapsed, ignore clicks on parents (or expand sidebar)
        // For now, let's assume hovering expands it so clicking works
        setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="flex flex-col h-full bg-white border-r border-slate-100 transition-all duration-300 w-full relative group/sidebar">
            
            {/* Collapse Toggle Button - Orange Circle */}
            <button 
                onClick={toggleCollapse}
                className={`absolute -right-3 top-7 z-50 w-6 h-6 bg-[#004182] rounded-full flex items-center justify-center text-white shadow-md hover:bg-[#004182] transition-transform duration-300
                    ${isCollapsed ? 'rotate-180' : 'rotate-0'}`}
                title="Toggle Sidebar"
            >
                <ChevronsLeft size={14} strokeWidth={3} />
            </button>


            {/* Logo Section */}
            <div className={`h-16 flex items-center px-6 border-b border-slate-50 transition-all duration-300 ${isCollapsed ? 'justify-center px-0 group-hover:justify-start group-hover:px-6' : 'justify-between'}`}>
                <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
                        <div className="w-8 h-8 min-w-[32px] bg-[#0a66c2] rounded-md flex items-center justify-center text-white shadow-sm">
                        <Package size={20} />
                        </div>
                        <span className={`font-bold text-xl text-[#0a66c2] tracking-tight transition-opacity duration-300 
                            ${isCollapsed ? 'opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto' : 'opacity-100'}`}>
                            {props.settings.site_name ? (
                                <>
                                    {props.settings.site_name.split(' ')[0]}
                                    <span className="text-slate-600 text-xs align-top ml-0.5 font-semibold opacity-70">
                                        {props.settings.site_name.split(' ').slice(1).join(' ')}
                                    </span>
                                </>
                            ) : (
                                <>Dreams<span className="text-slate-600 text-xs align-top ml-0.5 font-semibold opacity-70">POS</span></>
                            )}
                        </span>
                </div>
            </div>

            {/* Navigation Section */}
            <nav 
                ref={navRef}
                className="flex-1 overflow-y-auto py-6 px-4 space-y-7 custom-sidebar-scrollbar overflow-x-hidden"
            >
                {menuItems.map((group) => (
                    <div key={group.group} className="space-y-3">
                        <h3 className={`px-4 text-[13px] font-bold text-[#2c3e50] tracking-tight whitespace-nowrap transition-opacity duration-300
                            ${isCollapsed ? 'opacity-0 hidden group-hover:block group-hover:opacity-100' : 'opacity-100'}`}>
                                {group.group}
                            </h3>
                        {/* If collapsed, show a separator line instead of title? No, just hide */}
                        
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

    return (
        <div className={isActive ? 'active-sidebar-link' : ''}>
            {item.children ? (
                <button
                    onClick={onToggle}
                    className={`w-full flex items-center py-2 px-3 rounded-md transition-all group mb-0.5 relative
                        ${isActive || isOpen ? 'bg-[#e8f3ff] text-[#0a66c2] font-semibold' : 'hover:bg-slate-100 text-slate-600'}
                        ${isCollapsed ? 'justify-center group-hover:justify-start' : ''}
                    `}
                >
                    <span className={`shrink-0 ${isActive || isOpen ? 'text-[#0a66c2]' : 'text-slate-500 group-hover:text-slate-700'}`}>{item.icon}</span>
                    <span className={`ml-3 text-[14px] font-medium flex-1 text-left whitespace-nowrap overflow-hidden transition-all duration-300
                         ${isCollapsed ? 'w-0 opacity-0 group-hover:w-auto group-hover:opacity-100' : 'w-auto opacity-100'}`}>
                        {item.label}
                    </span>
                    <ChevronDown size={14} className={`transition-transform duration-300 shrink-0
                        ${isCollapsed ? 'w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 ml-0 group-hover:ml-auto' : 'ml-auto opacity-100'}
                        ${isOpen ? 'rotate-180 text-[#0a66c2]' : 'text-slate-400'}`} />
                </button>
            ) : (
                <Link
                    href={item.path}
                    className={`flex items-center py-2 px-3 rounded-md transition-all group mb-0.5
                        ${isActive ? 'bg-[#e8f3ff] text-[#0a66c2] font-semibold' : 'hover:bg-slate-100 text-slate-600'}
                        ${isCollapsed ? 'justify-center group-hover:justify-start' : ''}
                    `}
                >
                    <span className={`shrink-0 ${isActive ? 'text-[#0a66c2]' : 'text-slate-500 group-hover:text-slate-700'}`}>{item.icon}</span>
                    <span className={`ml-3 text-[14px] font-medium flex-1 whitespace-nowrap overflow-hidden transition-all duration-300
                         ${isCollapsed ? 'w-0 opacity-0 group-hover:w-auto group-hover:opacity-100' : 'w-auto opacity-100'}`}>
                        {item.label}
                    </span>
                    {item.hasArrow && <ChevronRight size={14} className={`text-slate-300 shrink-0 ${isCollapsed ? 'hidden group-hover:block' : ''}`} />}
                </Link>
            )}

            {/* Submenu - Only show if open AND (not collapsed OR (collapsed AND hovered)) */}
            {/* Actually, if collapsed, we shouldn't show submenus inline unless hovered. 
                CSS opacity transition handles the "show on hover" effect for the parent, 
                but structure-wise the submenu needs to be visible only when expanded. 
            */}
            <div className={`
                ${isOpen ? 'block' : 'hidden'} 
                ${isCollapsed ? 'hidden group-hover:block' : 'block'}
            `}>
                {item.children && (
                    <div className="mt-1 space-y-1">
                        {item.children.map(child => (
                                 <Link
                                    key={child.label}
                                    href={child.path}
                                    className={`flex items-center gap-3 py-2 pl-10 pr-4 rounded-md text-[13px] transition-all group relative whitespace-nowrap
                                        ${checkActive(child.path, child.routeName) ? 'text-[#0a66c2] font-semibold' : 'text-slate-500 hover:text-slate-800'}`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full transition-colors shrink-0 ${checkActive(child.path, child.routeName) ? 'bg-[#0a66c2]' : 'bg-slate-300 group-hover:bg-slate-400'}`}></span>
                                    <span className="truncate">{child.label}</span>
                                </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
