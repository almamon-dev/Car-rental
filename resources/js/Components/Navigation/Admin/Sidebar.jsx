import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    ShoppingCart,
    RefreshCw,
    Users,
    Tag,
    FileText,
    BarChart2,
    ChevronRight,
    Settings,
    PlusCircle,
    List,
    UserCircle,
    Mail,
    CreditCard,
    X,
} from "lucide-react";

const Sidebar = ({ isCollapsed, isMobileOpen, setIsMobileOpen }) => {
    const { url } = usePage();

    const currentPath = url.split("?")[0];

    const [openMenus, setOpenMenus] = useState({
        "/admin/cars": false,
        blogs: false,
        settings: false,
    });

    const toggleMenu = (key) => {
        setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    };


    useEffect(() => {
        menuItems.forEach((item) => {
            if (
                item.children &&
                item.children.some((child) =>
                    currentPath.startsWith(child.path)
                )
            ) {
                setOpenMenus((prev) => ({ ...prev, [item.key]: true }));
            }
        });
    }, [currentPath]);

    const menuItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: <LayoutDashboard size={18} />,
        },
        { label: "Orders", path: "/orders", icon: <ShoppingCart size={18} /> },
        {
            label: "Brands",
            path: "/admin/brands",
            icon: <List size={18} />,
            key: "/admin/brands",
        },
        {
            label: "Categories",
            path: "/admin/category",
            icon: <List size={18} />,
            key: "/admin/category",
        },
        { label: "Returns", path: "/returns", icon: <RefreshCw size={18} /> },
        { label: "All leads", path: "/leads", icon: <Users size={18} /> },
        {
            label: "Sales - B2C",
            path: "/sales-b2c",
            icon: <BarChart2 size={18} />,
        },
        {
            label: "Customers - B2B",
            path: "/customers-b2b",
            icon: <Users size={18} />,
        },
        {
            label: "Car Management",
            path: "/admin/cars",
            icon: <Tag size={18} />,
            key: "/admin/cars",
            children: [
                {
                    label: "All Cars",
                    path: "/admin/cars",
                    icon: <List size={14} />,
                },
                {
                    label: "Add Car",
                    path: "/admin/cars/create",
                    icon: <PlusCircle size={14} />,
                },
            ],
        },
        {
            label: "Blogs",
            path: "/blogs",
            icon: <Tag size={18} />,
            key: "blogs",
            children: [
                {
                    label: "All Blogs",
                    path: "/blogs",
                    icon: <List size={14} />,
                },
                {
                    label: "Add Blog",
                    path: "/blogs/create",
                    icon: <PlusCircle size={14} />,
                },
            ],
        },
        {
            label: "Create Invoice",
            path: "/invoice/create",
            icon: <FileText size={18} />,
        },
        {
            label: "Analytics",
            path: "/analytics",
            icon: <BarChart2 size={18} />,
        },
        {
            label: "Settings",
            path: "/settings",
            icon: <Settings size={18} />,
            key: "settings",
            children: [
                {
                    label: "Profile Settings",
                    path: "/profile-settings",
                    icon: <UserCircle size={14} />,
                },
                {
                    label: "Account Settings",
                    path: "/account-settings",
                    icon: <UserCircle size={14} />,
                },
                {
                    label: "Email Settings",
                    path: "/email-settings",
                    icon: <Mail size={14} />,
                },
                {
                    label: "Payment Settings",
                    path: "/payment-settings",
                    icon: <CreditCard size={14} />,
                },
            ],
        },
    ];

    return (
        <div className="flex flex-col h-full bg-white border-r border-gray-100 shadow-sm">
            {/* Logo Section */}
            <div
                className={`flex items-center h-20 shrink-0 ${
                    isCollapsed ? "justify-center" : "px-6"
                }`}
            >
                <img
                    src="/img/logo.png"
                    alt="Logo"
                    className={`object-contain ${
                        isCollapsed ? "h-8 w-8" : "h-9"
                    }`}
                />
                {isMobileOpen && (
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="lg:hidden ml-auto p-2 text-gray-400"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-sidebar-scrollbar">
                {!isCollapsed && (
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
                        Main Menu
                    </p>
                )}

                <div className="space-y-1">
                    {menuItems.map((item) => {
                        // চেক করা হচ্ছে এই মেনু আইটেমটি একটিভ কি না
                        const isActive = item.children
                            ? item.children.some(
                                  (child) => currentPath === child.path
                              )
                            : currentPath === item.path;

                        return item.children ? (
                            <SidebarItem
                                key={item.key}
                                icon={item.icon}
                                label={item.label}
                                isCollapsed={isCollapsed}
                                hasChild
                                active={isActive}
                                isOpen={openMenus[item.key]}
                                onClick={() => toggleMenu(item.key)}
                            >
                                {!isCollapsed && (
                                    <div className="mt-1 space-y-1 ml-4 border-l border-gray-100">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.path}
                                                href={child.path}
                                                className={`flex items-center gap-3 ml-4 py-2 px-3 rounded-md text-sm transition-all ${
                                                    currentPath === child.path
                                                        ? "text-primary font-semibold bg-blue-50/50"
                                                        : "text-slate-500 hover:text-blue-500 hover:bg-blue-50"
                                                }`}
                                            >
                                                <span
                                                    className={`${
                                                        currentPath ===
                                                        child.path
                                                            ? "text-primary"
                                                            : "text-slate-400"
                                                    }`}
                                                >
                                                    {child.icon}
                                                </span>
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </SidebarItem>
                        ) : (
                            <SidebarItem
                                key={item.path}
                                icon={item.icon}
                                label={item.label}
                                path={item.path}
                                active={isActive}
                                isCollapsed={isCollapsed}
                            />
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

const SidebarItem = ({
    icon,
    label,
    path,
    active,
    isCollapsed,
    hasChild,
    isOpen,
    onClick,
    children,
}) => {
    const itemContent = (
        <div
            onClick={hasChild ? onClick : undefined}
            className={`flex items-center group cursor-pointer py-2.5 rounded-lg transition-all duration-200 ${
                isCollapsed ? "justify-center px-0" : "px-3"
            } ${
                active && !hasChild
                    ? "bg-blue-50 text-primary"
                    : "text-slate-600 hover:bg-blue-50 hover:text-primary"
            } ${hasChild && active ? "text-primary font-semibold" : ""}`}
        >
            <div
                className={`shrink-0 transition-colors ${
                    active ? "text-primary" : "group-hover:text-primary"
                }`}
            >
                {icon}
            </div>
            {!isCollapsed && (
                <span className="ml-3 text-[13.5px] font-medium">{label}</span>
            )}

            {hasChild && !isCollapsed && (
                <div className="ml-auto">
                    <ChevronRight
                        size={14}
                        className={`transition-transform duration-200 ${
                            isOpen ? "rotate-90 text-primary" : "text-gray-400"
                        }`}
                    />
                </div>
            )}
        </div>
    );

    return (
        <div>
            {hasChild ? itemContent : <Link href={path}>{itemContent}</Link>}
            {isOpen && children}
        </div>
    );
};

export default Sidebar;
