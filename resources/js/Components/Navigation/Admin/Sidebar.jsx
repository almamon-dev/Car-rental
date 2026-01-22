import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    ShoppingCart,
    RefreshCw,
    Users,
    Tag,
    BarChart2,
    ChevronRight,
    Settings,
    PlusCircle,
    List,
    FolderOpen,
    Car,
    ShieldCheck,
    X,
} from "lucide-react";

/**
 * Premium Sidebar Component
 * Optimized for a professional, high-fidelity car rental administrative experience.
 */
const Sidebar = ({ isCollapsed, isMobileOpen, setIsMobileOpen }) => {
    const { url, props } = usePage();
    const { auth } = props;
    const currentPath = url.split("?")[0];

    const [openMenus, setOpenMenus] = useState({});

    // Navigation configuration
    const menuItems = [
        {
            group: "Operations",
            items: [
                {
                    label: "Dashboard",
                    path: "/dashboard",
                    icon: <LayoutDashboard size={18} strokeWidth={2.5} />,
                },
                { 
                    label: "Fleet Hub", 
                    path: "/admin/cars", 
                    icon: <Car size={18} strokeWidth={2.5} />,
                    key: "cars",
                    children: [
                        { label: "Inventory", path: "/admin/cars" },
                        { label: "Acquisition", path: "/admin/cars/create" },
                        { label: "Marque Management", path: "/admin/brands" },
                        { label: "Fleet Categories", path: "/admin/category" },
                    ],
                },
            ]
        },
        {
            group: "Management",
            items: [
                { 
                    label: "Booking Pipeline", 
                    path: "/orders", 
                    icon: <ShoppingCart size={18} strokeWidth={2.5} />,
                    key: "orders",
                    children: [
                        { label: "Active Orders", path: "/orders" },
                        { label: "Recoveries & Returns", path: "/returns" },
                    ]
                },
                { label: "Customer Relations", path: "/leads", icon: <Users size={18} strokeWidth={2.5} /> },
                { label: "Commercial Intel", path: "/analytics", icon: <BarChart2 size={18} strokeWidth={2.5} /> },
            ]
        },
        {
            group: "System",
            items: [
                {
                    label: "Global Settings",
                    path: "/settings",
                    icon: <Settings size={18} strokeWidth={2.5} />,
                },
            ]
        }
    ];

    const toggleMenu = (key) => {
        setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    useEffect(() => {
        const found = {};
        menuItems.forEach((group) => {
            group.items.forEach(item => {
                if (item.children && item.children.some(child => currentPath.startsWith(child.path))) {
                    found[item.key] = true;
                }
            });
        });
        setOpenMenus(prev => ({ ...prev, ...found }));
    }, [currentPath]);

    return (
        <div className="flex flex-col h-full bg-white transition-all duration-500 ease-in-out">
            {/* BRANDING SECTION */}
            <div className={`p-6 pb-2 transition-all ${isCollapsed ? 'flex justify-center' : ''}`}>
                <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0a66c2] to-[#004182] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#0a66c2]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer">
                         <Car size={24} className="text-white" strokeWidth={2.5} />
                    </div>
                    {!isCollapsed && (
                        <div className="leading-tight group cursor-pointer">
                            <span className="text-[18px] font-black text-slate-900 tracking-tight block group-hover:text-[#0a66c2] transition-colors">Herd Rental</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[10px] font-black text-[#0a66c2] uppercase tracking-[0.2em]">Management</span>
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            </div>
                        </div>
                    )}
                    {isMobileOpen && (
                        <button onClick={() => setIsMobileOpen(false)} className="lg:hidden ml-auto p-2 text-slate-400 hover:text-slate-900 transition-colors">
                            <X size={22} />
                        </button>
                    )}
                </div>
            </div>

            {/* IDENTITY SECTION (PASS OVERSTYLE) */}
            {!isCollapsed && (
                <div className="px-5 my-8">
                    <div className="relative bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100/80 shadow-sm transition-all hover:shadow-md hover:bg-white group cursor-pointer overflow-hidden">
                        {/* Subtle decorative element */}
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#0a66c2]/5 rounded-full blur-2xl group-hover:bg-[#0a66c2]/10 transition-all" />
                        
                        <div className="flex items-center gap-3.5 relative z-10">
                            <div className="p-0.5 bg-white rounded-full shadow-sm border border-slate-100">
                                <img 
                                    src={auth?.user?.profile_photo_url || `https://ui-avatars.com/api/?name=${auth?.user?.name || 'Admin'}&background=fff&color=0a66c2&bold=true&font-size=0.35`}
                                    className="w-11 h-11 rounded-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                                    alt="Admin avatar"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-[13.5px] font-bold text-slate-900 truncate tracking-tight">{auth?.user?.name || "Member"}</h4>
                                <div className="flex items-center gap-1 text-[#0a66c2] mt-0.5">
                                    <ShieldCheck size={11} strokeWidth={3} />
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">Verified Admin</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* NAVIGATION SECTION */}
            <nav className="flex-1 overflow-y-auto px-2 pb-6 space-y-9 custom-sidebar-scrollbar">
                {menuItems.map((group) => (
                    <div key={group.group} className="space-y-1.5">
                        {!isCollapsed && (
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-4 ml-6 pointer-events-none opacity-80">
                                {group.group}
                            </p>
                        )}
                        <div className="space-y-1">
                            {group.items.map((item) => (
                                <SidebarLink 
                                    key={item.label}
                                    item={item}
                                    isCollapsed={isCollapsed}
                                    currentPath={currentPath}
                                    isOpen={openMenus[item.key]}
                                    onToggle={() => toggleMenu(item.key)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* STATUS FOOOTER */}
            {!isCollapsed && (
                <div className="p-5 mt-auto">
                    <div className="bg-[#0a66c2] p-4 rounded-2xl relative overflow-hidden group cursor-pointer shadow-xl shadow-[#0a66c2]/10 transition-all hover:-translate-y-1">
                        {/* Decorative background glow */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 blur-2xl group-hover:scale-125 transition-transform duration-700" />
                        
                        <div className="flex items-center gap-3 relative z-10">
                             <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl text-white">
                                <BarChart2 size={18} strokeWidth={2.5} />
                             </div>
                             <div>
                                 <p className="text-[11px] font-black text-white/60 uppercase tracking-widest leading-none mb-1">Fleet Sync</p>
                                 <p className="text-[13px] text-white font-bold leading-none">92% Operational</p>
                             </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mt-3.5 h-1 w-full bg-white/10 rounded-full relative z-10 overflow-hidden">
                            <div 
                                className="absolute left-0 top-0 h-full bg-white transition-all duration-1000 ease-out"
                                style={{ width: '92%' }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

/**
 * Sidebar Individual Link Component
 */
const SidebarLink = ({ item, isCollapsed, currentPath, isOpen, onToggle }) => {
    const isActive = item.children 
        ? item.children.some(child => currentPath === child.path)
        : currentPath === item.path;

    return (
        <div className="px-3">
            {item.children ? (
                <>
                    <button
                        onClick={onToggle}
                        className={`w-full flex items-center py-2.5 px-3.5 rounded-xl transition-all duration-300 group relative
                            ${isActive || isOpen ? 'bg-slate-50' : 'hover:bg-slate-50/80'}
                            ${isActive ? 'text-[#0a66c2]' : 'text-slate-600'}
                        `}
                    >
                        <div className={`transition-all duration-300 ${isActive ? 'text-[#0a66c2] scale-110 drop-shadow-sm' : 'text-slate-400 group-hover:text-[#0a66c2] group-hover:scale-110'}`}>{item.icon}</div>
                        {!isCollapsed && (
                            <>
                                <span className={`ml-3.5 text-[14.5px] font-bold tracking-tight transition-colors ${isActive ? 'text-[#0a66c2]' : 'text-slate-600 group-hover:text-slate-900 font-semibold'}`}>{item.label}</span>
                                <ChevronRight 
                                    size={15} 
                                    strokeWidth={3}
                                    className={`ml-auto transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-90 text-[#0a66c2]' : 'text-slate-300 group-hover:text-slate-500'}`} 
                                />
                            </>
                        )}
                        {isActive && !isCollapsed && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#0a66c2] rounded-r-full" />
                        )}
                    </button>
                    {isOpen && !isCollapsed && (
                        <div className="mt-1 space-y-0.5 animate-in slide-in-from-top-2 duration-500">
                            {item.children.map(child => {
                                const isChildActive = currentPath === child.path;
                                return (
                                    <Link
                                        key={child.path}
                                        href={child.path}
                                        className={`flex items-center py-2 px-4 ml-10 rounded-lg text-[13.5px] transition-all
                                            ${isChildActive 
                                                ? 'bg-[#0a66c2]/5 text-[#0a66c2] font-black' 
                                                : 'text-slate-500 hover:text-slate-900 border-l border-slate-100 hover:border-[#0a66c2]/30 font-semibold'}
                                        `}
                                    >
                                        {child.label}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </>
            ) : (
                <Link
                    href={item.path}
                    className={`flex items-center py-2.5 px-3.5 rounded-xl transition-all duration-300 group relative
                        ${isActive ? 'bg-[#0a66c2] text-white shadow-lg shadow-[#0a66c2]/25' : 'hover:bg-slate-50 text-slate-600'}
                    `}
                >
                    <div className={`transition-all duration-300 ${isActive ? 'text-white scale-110 drop-shadow-md' : 'text-slate-400 group-hover:text-[#0a66c2] group-hover:scale-110'}`}>{item.icon}</div>
                    {!isCollapsed && (
                        <span className={`ml-3.5 text-[14.5px] font-black tracking-tight ${isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-900 font-semibold transition-colors transition-all'}`}>{item.label}</span>
                    )}
                    {isActive && !isCollapsed && (
                        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-sm" />
                    )}
                </Link>
            )}
        </div>
    );
};

export default Sidebar;
