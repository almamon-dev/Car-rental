import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { 
    Car, 
    Calendar, 
    CheckCircle2,
    Clock, 
    ChevronRight, 
    CreditCard,
    ArrowUpRight,
    Search,
    BarChart3,
    History,
    Zap
} from "lucide-react";
import { useLanguage } from "@/Contexts/LanguageContext";
import UserSidebar from "@/Components/Navigation/User/Sidebar";

export default function Dashboard({ auth, bookings, stats }) {
    const { t } = useLanguage();
    const user = auth.user;

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'text-green-700 bg-green-50 border-green-100';
            case 'pending': return 'text-amber-700 bg-amber-50 border-amber-100';
            case 'completed': return 'text-slate-600 bg-slate-50 border-slate-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    const statCards = [
        { 
            label: t.dashboard.total_bookings, 
            value: stats.total_bookings, 
            icon: History, 
            color: 'text-blue-600', 
            bg: 'bg-blue-50' 
        },
        { 
            label: t.dashboard.active_rentals, 
            value: stats.active_bookings, 
            icon: Zap, 
            color: 'text-green-600', 
            bg: 'bg-green-50' 
        },
        { 
            label: t.dashboard.completed_bookings || 'Completed', 
            value: stats.completed_bookings, 
            icon: CheckCircle2, 
            color: 'text-purple-600', 
            bg: 'bg-purple-50' 
        },
    ];

    return (
        <GuestLayout>
            <Head title={t.nav.dashboard} />

            <div className="bg-[#f3f2ef] min-h-screen py-6 font-sans antialiased text-[#000000e6]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-12 gap-5">
                        
                        {/* Left Sidebar */}
                        <UserSidebar user={user} stats={stats} />

                        {/* Main Summary Content */}
                        <main className="col-span-12 lg:col-span-9 space-y-5">
                            
                            {/* Analytics Header */}
                            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h1 className="text-[22px] font-semibold text-gray-900">{t.nav.dashboard}</h1>
                                        <p className="text-[14px] text-gray-500 mt-0.5">{t.dashboard.welcome_subtitle || 'Unified mobility overview.'}</p>
                                    </div>
                                    <div className="p-2 bg-blue-50 rounded-lg text-[#0a66c2]">
                                        <BarChart3 size={24} />
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {statCards.map((stat, idx) => (
                                        <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                                                    <stat.icon size={20} />
                                                </div>
                                                <ArrowUpRight size={14} className="text-gray-300 group-hover:text-gray-400" />
                                            </div>
                                            <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                                            <p className="text-[28px] font-bold text-gray-900 mt-1">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Recent Activity (Limited) */}
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                        <h3 className="text-[16px] font-semibold text-gray-900">{t.dashboard.recent_reservations}</h3>
                                        <Link href="/user/bookings" className="text-[13px] font-semibold text-[#0a66c2] hover:underline">
                                            {t.dashboard.show_more}
                                        </Link>
                                    </div>
                                    <div className="flex-1 divide-y divide-gray-50">
                                        {bookings && bookings.slice(0, 3).map((booking) => (
                                            <div key={booking.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-100">
                                                    <img 
                                                        src={booking.car?.image_url || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=100'} 
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-[14px] font-semibold text-gray-900 truncate">{booking.car?.name}</h4>
                                                    <p className="text-[12px] text-gray-500 truncate">
                                                        {new Date(booking.start_date).toLocaleDateString()} · <span className={`font-semibold ${getStatusColor(booking.status)}`}>{booking.status}</span>
                                                    </p>
                                                </div>
                                                <ChevronRight size={16} className="text-gray-300" />
                                            </div>
                                        ))}
                                        {(!bookings || bookings.length === 0) && (
                                            <div className="p-8 text-center">
                                                <p className="text-[13px] text-gray-400">{t.dashboard.no_history}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Resource Discovery / Quick Links */}
                                <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm space-y-4">
                                    <h3 className="text-[16px] font-semibold text-gray-900">Resource Discovery</h3>
                                    <div className="space-y-2">
                                        <Link 
                                            href="/car-list" 
                                            className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-[#0a66c2] hover:bg-blue-50/50 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Car size={18} className="text-[#0a66c2]" />
                                                <span className="text-[14px] font-semibold text-gray-700">{t.dashboard.acquire_asset}</span>
                                            </div>
                                            <ChevronRight size={16} className="text-gray-300 group-hover:text-[#0a66c2]" />
                                        </Link>
                                        <Link 
                                            href="/user/payments" 
                                            className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-[#0a66c2] hover:bg-blue-50/50 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <CreditCard size={18} className="text-gray-400" />
                                                <span className="text-[14px] font-semibold text-gray-700">{t.dashboard.billing_details}</span>
                                            </div>
                                            <ChevronRight size={16} className="text-gray-300 group-hover:text-[#0a66c2]" />
                                        </Link>
                                    </div>
                                    
                                    {/* Small Analytics Tip */}
                                    <div className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
                                        <div className="flex items-center gap-2 mb-1">
                                            <BarChart3 size={14} className="text-green-600" />
                                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">Smart Insight</span>
                                        </div>
                                        <p className="text-[12px] text-gray-500 leading-tight">
                                            You have {stats.active_bookings} active rentals. Check the logistics tab for pickup details.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
