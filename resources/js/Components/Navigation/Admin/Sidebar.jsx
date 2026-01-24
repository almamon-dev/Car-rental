import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard, Package, PlusSquare, AlertCircle, TrendingDown,
    List, Layers, Tag, Boxes, FileText, ShieldCheck, Barcode, QrCode,
    UserCircle, Lock, FileQuestion, File, DollarSign, Clock,
    Settings, Globe, Smartphone, Monitor, CreditCard, Settings2,
    LogOut, ChevronDown, ChevronRight, ChevronLeft, X, ChevronsLeft
} from "lucide-react";

const Sidebar = ({ isMobileOpen, setIsMobileOpen, isCollapsed, toggleCollapse }) => {
    const { url, props } = usePage();
    const { auth } = props;
    const currentPath = url.split("?")[0];
    const [openMenus, setOpenMenus] = useState({});

    // Close all menus when collapsing to avoid floating submenus looking weird
    useEffect(() => {
        if (isCollapsed) setOpenMenus({});
    }, [isCollapsed]);

    const menuItems = [
        {
            group: "Main",
            items: [
                {
                    label: "Dashboard",
                    key: "dashboard",
                    icon: <LayoutDashboard size={20} strokeWidth={1.5} />,
                    children: [
                        { label: "Admin Dashboard", path: "/dashboard" },
                        { label: "Admin Dashboard 2", path: "/dashboard-v2" },
                        { label: "Sales Dashboard", path: "/sales-dashboard" },
                    ]
                },
                { label: "Super Admin", path: "/super-admin", icon: <UserCircle size={20} strokeWidth={1.5} />, hasArrow: true },
                { label: "Application", path: "/application", icon: <Boxes size={20} strokeWidth={1.5} />, hasArrow: true },
                {
                    label: "Layouts",
                    key: "layouts",
                    icon: <Layers size={20} strokeWidth={1.5} />,
                    children: [
                        { label: "Horizontal", path: "/layouts/horizontal" },
                        { label: "Detached", path: "/layouts/detached" },
                        { label: "Two Column", path: "/layouts/two-column" },
                        { label: "Hovered", path: "/layouts/hovered" },
                        { label: "Boxed", path: "/layouts/boxed" },
                        { label: "RTL", path: "/layouts/rtl" },
                        { label: "Dark", path: "/layouts/dark" },
                    ]
                },
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
                        { label: "Brand List", path: "/admin/brands" },
                        { label: "Add Brand", path: "/admin/brands/create" },
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
                        { label: "Branch List", path: "/admin/locations" },
                        { label: "Add Branch", path: "/admin/locations/create" },
                    ]
                },
                {
                    label: "Cars",
                    key: "cars",
                    icon: <Package size={20} strokeWidth={1.5} />,
                    children: [
                        { label: "Car List", path: "/admin/cars" },
                        { label: "Add New Car", path: "/admin/cars/create" },
                        { label: "Expired Cars", path: "/admin/products/expired" },
                        { label: "Low Stocks", path: "/admin/products/low-stock" },
                    ]
                },
              
                { label: "Units", path: "/admin/units", icon: <Boxes size={20} strokeWidth={1.5} /> },
                { label: "Variant Attributes", path: "/admin/variants", icon: <FileText size={20} strokeWidth={1.5} /> },
                { label: "Warranties", path: "/admin/warranties", icon: <ShieldCheck size={20} strokeWidth={1.5} /> },
                { label: "Print Barcode", path: "/admin/print-barcode", icon: <Barcode size={20} strokeWidth={1.5} /> },
                { label: "Print QR Code", path: "/admin/print-qrcode", icon: <QrCode size={20} strokeWidth={1.5} /> },
            ]
        },
        {
            group: "Pages",
            items: [
                { label: "Profile", path: "/profile", icon: <UserCircle size={20} strokeWidth={1.5} /> },
                { label: "Authentication", path: "/auth", icon: <Lock size={20} strokeWidth={1.5} />, hasArrow: true },
                { label: "Error Pages", path: "/errors", icon: <FileQuestion size={20} strokeWidth={1.5} />, hasArrow: true },
                { label: "Blank Page", path: "/blank", icon: <File size={20} strokeWidth={1.5} /> },
                { label: "Pricing", path: "/pricing", icon: <DollarSign size={20} strokeWidth={1.5} /> },
                { label: "Coming Soon", path: "/coming-soon", icon: <Clock size={20} strokeWidth={1.5} /> },
                { label: "Under Maintenance", path: "/maintenance", icon: <AlertCircle size={20} strokeWidth={1.5} /> },
            ]
        },
        {
            group: "Settings",
            items: [
                { 
                    label: "General Settings", 
                    key: "general_settings",
                    icon: <Settings size={20} strokeWidth={1.5} />, 
                    children: [
                         { label: "Profile", path: "/settings/general/profile" },
                         { label: "Security", path: "/settings/general/security" },
                         { label: "Notifications", path: "/settings/general/notifications" }
                    ]
                },
                { 
                    label: "Website Settings", 
                    key: "website_settings",
                    icon: <Globe size={20} strokeWidth={1.5} />, 
                    children: [
                        { label: "SEO", path: "/settings/website/seo" },
                        { label: "Appearance", path: "/settings/website/appearance" },
                        { label: "Locales", path: "/settings/website/locales" }
                    ]
                },
                { 
                    label: "App Settings", 
                    key: "app_settings",
                    icon: <Smartphone size={20} strokeWidth={1.5} />, 
                    children: [
                        { label: "API Keys", path: "/settings/app/api" },
                        { label: "Integrations", path: "/settings/app/integrations" }
                    ]
                },
                { 
                    label: "System Settings", 
                    key: "system_settings",
                    icon: <Monitor size={20} strokeWidth={1.5} />, 
                    children: [
                        { label: "Logs", path: "/settings/system/logs" },
                        { label: "Backups", path: "/settings/system/backups" },
                        { label: "Updates", path: "/settings/system/updates" }
                    ]
                },
                { 
                    label: "Financial Settings", 
                    key: "financial_settings",
                    icon: <CreditCard size={20} strokeWidth={1.5} />, 
                    children: [
                        { label: "Currency", path: "/settings/financial/currency" },
                        { label: "Tax Rules", path: "/settings/financial/tax" },
                        { label: "Payment Gateways", path: "/settings/financial/gateways" }
                    ]
                },
                { 
                    label: "Other Settings", 
                    key: "other_settings",
                    icon: <Settings2 size={20} strokeWidth={1.5} />, 
                    children: [
                        { label: "Cron Jobs", path: "/settings/others/cron" },
                        { label: "Cache", path: "/settings/others/cache" }
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
        <aside className="flex flex-col h-full bg-white border-r border-slate-100 transition-all duration-300 w-full relative group/sidebar">
            
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
                            Dreams<span className="text-slate-600 text-xs align-top ml-0.5 font-semibold opacity-70">POS</span>
                        </span>
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-7 custom-sidebar-scrollbar overflow-x-hidden">
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
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
};

const SidebarLink = ({ item, currentPath, isOpen, onToggle, isCollapsed }) => {
    const isActive = item.children 
        ? item.children.some(child => 
            currentPath === child.path || 
            (child.routeName && route().current(child.routeName))
          )
        : (currentPath === item.path || (item.routeName && route().current(item.routeName)));

    return (
        <div>
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
                                    ${currentPath === child.path || (child.routeName && route().current(child.routeName)) ? 'text-[#0a66c2] font-semibold' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full transition-colors shrink-0 ${currentPath === child.path || (child.routeName && route().current(child.routeName)) ? 'bg-[#0a66c2]' : 'bg-slate-300 group-hover:bg-slate-400'}`}></span>
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
