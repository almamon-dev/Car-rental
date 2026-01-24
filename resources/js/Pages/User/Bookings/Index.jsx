import React, { useState, useMemo } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { 
    Car, 
    Calendar, 
    MapPin, 
    ChevronRight, 
    ArrowUpRight,
    Search,
    Filter,
    MoreHorizontal,
    Share2,
    MessageSquare,
    ThumbsUp
} from "lucide-react";
import { useLanguage } from "@/Contexts/LanguageContext";
import UserSidebar from "@/Components/Navigation/User/Sidebar";

export default function Index({ auth, bookings, stats }) {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");

    const getStatusStyle = (status) => {
        switch (status) {
            case 'confirmed': return 'text-green-700 bg-green-50 border-green-100';
            case 'pending': return 'text-amber-700 bg-amber-50 border-amber-100';
            case 'completed': return 'text-slate-600 bg-slate-50 border-slate-100';
            case 'cancelled': return 'text-red-700 bg-red-50 border-red-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    const filteredBookings = useMemo(() => {
        if (!searchQuery) return bookings || [];
        const query = searchQuery.toLowerCase();
        return (bookings || []).filter(booking => 
            booking.car?.name?.toLowerCase().includes(query) || 
            booking.car?.brand?.name?.toLowerCase().includes(query)
        );
    }, [bookings, searchQuery]);

    return (
        <GuestLayout>
            <Head title={t.nav.bookings} />

            <div className="bg-[#f3f2ef] min-h-screen py-6 font-sans antialiased text-[#000000e6]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-12 gap-5">
                        
                        {/* Left Sidebar */}
                        <UserSidebar user={auth.user} stats={stats} />

                        {/* Main Feed */}
                        <main className="col-span-12 lg:col-span-9 space-y-3">
                            <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm flex items-center justify-between">
                                <h1 className="text-[18px] font-semibold text-gray-900">{t.nav.bookings}</h1>
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input 
                                            type="text" 
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder={t.nav.search_placeholder} 
                                            className="h-8 pl-8 pr-4 bg-[#edf3f8] border-none rounded-full text-[13px] font-medium w-48 sm:w-64 focus:ring-1 focus:ring-[#0a66c2] transition-all"
                                        />
                                    </div>
                                    <button className="h-8 w-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                                        <Filter size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking) => (
                                        <div key={booking.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all group">
                                            {/* Header */}
                                            <div className="px-3 py-2 border-b border-gray-50 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                                                        <img 
                                                            src={booking.car?.brand?.logo_url || 'https://ui-avatars.com/api/?name=B&background=0a66c2&color=fff'} 
                                                            className="w-full h-full object-contain p-1"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[13px] font-semibold text-gray-900 leading-none hover:text-[#0a66c2] cursor-pointer">
                                                            {booking.car?.brand?.name}
                                                        </h4>
                                                        <p className="text-[11px] text-gray-500 mt-0.5">
                                                            {new Date(booking.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button className="p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </div>

                                            {/* Content */}
                                            <div className="p-3">
                                                <div className="flex flex-col sm:flex-row gap-4">
                                                    <div className="w-full sm:w-44 h-28 rounded overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 relative">
                                                        <img 
                                                            src={booking.car?.image_url || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=600&auto=format&fit=crop'} 
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        />
                                                        <div className="absolute top-1.5 left-1.5">
                                                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border shadow-sm ${getStatusStyle(booking.status)} uppercase`}>
                                                                {booking.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-[16px] font-semibold text-gray-900 mb-1.5 truncate">
                                                            {booking.car?.name}
                                                        </h3>
                                                        
                                                        <div className="space-y-1 mb-3">
                                                            <div className="flex items-center gap-2 text-[13px] text-gray-500">
                                                                <Calendar size={14} className="text-gray-400" />
                                                                <span className="truncate">{new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-[13px] text-gray-500">
                                                                <MapPin size={14} className="text-gray-400" />
                                                                <span className="truncate">{booking.pickup_location || t.dashboard.main_hub}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <Link 
                                                                href={route('user.bookings.show', booking.id)}
                                                                className="text-[13px] font-semibold text-[#0a66c2] border border-[#0a66c2] px-4 py-1 rounded-full hover:bg-blue-50 transition-all flex items-center gap-1"
                                                            >
                                                                {t.dashboard.asset_details}
                                                                <ArrowUpRight size={12} />
                                                            </Link>
                                                            <button className="text-[13px] font-semibold text-gray-500 hover:bg-gray-100 px-3 py-1 rounded transition-all">
                                                                {t.dashboard.modify_logistics}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="px-1 py-1 bg-white border-t border-gray-50 flex items-center gap-1 group-hover:bg-gray-50/10">
                                                <button className="flex-1 py-1.5 flex items-center justify-center gap-2 text-[13px] font-medium text-gray-500 hover:bg-gray-100 rounded transition-all">
                                                    <ThumbsUp size={16} />
                                                    <span>View</span>
                                                </button>
                                                <button className="flex-1 py-1.5 flex items-center justify-center gap-2 text-[13px] font-medium text-gray-500 hover:bg-gray-100 rounded transition-all">
                                                    <MessageSquare size={16} />
                                                    <span>Support</span>
                                                </button>
                                                <button className="flex-1 py-1.5 flex items-center justify-center gap-2 text-[13px] font-medium text-gray-500 hover:bg-gray-100 rounded transition-all">
                                                    <Share2 size={16} />
                                                    <span>Share</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
                                        <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-full mx-auto mb-4 border border-gray-100">
                                            <Search size={32} className="text-gray-300" />
                                        </div>
                                        <h2 className="text-[18px] font-semibold text-gray-900">
                                            {searchQuery ? "No matching reservations" : t.dashboard.no_history}
                                        </h2>
                                        <p className="text-[14px] text-gray-500 max-w-sm mx-auto mt-2 leading-tight">
                                            {searchQuery 
                                                ? `We couldn't find anything for "${searchQuery}"` 
                                                : t.dashboard.no_history_desc}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
