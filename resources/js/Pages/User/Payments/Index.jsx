import React, { useState, useMemo } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { 
    CreditCard, 
    Download,
    ExternalLink,
    ChevronRight,
    CheckCircle2,
    Clock,
    XCircle,
    ArrowUpRight,
    Receipt,
    Info,
    Search,
    Filter,
    MoreHorizontal
} from "lucide-react";
import { useLanguage } from "@/Contexts/LanguageContext";
import UserSidebar from "@/Components/Navigation/User/Sidebar";

export default function Index({ auth, payments, stats }) {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");

    const getStatusStyle = (status) => {
        switch (status) {
            case 'completed': return 'text-green-700 bg-green-50 border-green-100';
            case 'pending': return 'text-amber-700 bg-amber-50 border-amber-100';
            case 'failed': return 'text-red-700 bg-red-50 border-red-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    const filteredPayments = useMemo(() => {
        if (!searchQuery) return payments || [];
        const query = searchQuery.toLowerCase();
        return (payments || []).filter(payment => 
            payment.booking?.car?.name?.toLowerCase().includes(query) || 
            payment.booking?.car?.brand?.name?.toLowerCase().includes(query) ||
            `#PAY-${payment.id}092`.toLowerCase().includes(query)
        );
    }, [payments, searchQuery]);

    return (
        <GuestLayout>
            <Head title={t.billing.title} />

            <div className="bg-[#f3f2ef] min-h-screen py-6 font-sans antialiased text-[#000000e6]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-12 gap-5">
                        
                        {/* Left Sidebar */}
                        <UserSidebar user={auth.user} stats={stats} />

                        <main className="col-span-12 lg:col-span-9 space-y-3">
                            {/* Improved Header with Search */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#0a66c2] border border-blue-100">
                                        <Receipt size={20} />
                                    </div>
                                    <div>
                                        <h1 className="text-[18px] font-semibold text-gray-900">{t.billing.architecture}</h1>
                                        <p className="text-[12px] text-gray-500 leading-none mt-0.5">{t.billing.subtitle}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="relative flex-1 sm:flex-none">
                                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input 
                                            type="text" 
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder={t.nav.search_placeholder} 
                                            className="h-9 pl-9 pr-4 bg-[#edf3f8] border-none rounded-full text-[13px] font-medium w-full sm:w-64 focus:ring-1 focus:ring-[#0a66c2] transition-all"
                                        />
                                    </div>
                                    <button className="h-9 w-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                                        <Filter size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Card-based Manifest List */}
                            <div className="space-y-3">
                                {filteredPayments && filteredPayments.length > 0 ? (
                                    filteredPayments.map((payment) => (
                                        <div key={payment.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all group overflow-hidden">
                                            {/* Manifest Row */}
                                            <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    {/* Car/Brand Logo Container */}
                                                    <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-blue-200 transition-colors">
                                                        <img 
                                                            src={payment.booking?.car?.brand?.logo_url || 'https://ui-avatars.com/api/?name=C&background=0a66c2&color=fff'} 
                                                            className="w-full h-full object-contain p-2" 
                                                        />
                                                    </div>
                                                    
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-[15px] font-semibold text-gray-900 truncate">
                                                                {payment.booking?.car?.name || t.billing.standard_service}
                                                            </h3>
                                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase leading-none ${getStatusStyle(payment.status)}`}>
                                                                {payment.status}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3 mt-1 text-[12px] text-gray-500">
                                                            <span className="font-medium text-[#0a66c2]">#PAY-{payment.id}092</span>
                                                            <span className="text-gray-300">|</span>
                                                            <span>{new Date(payment.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between md:justify-end md:gap-8 border-t md:border-t-0 pt-3 md:pt-0 border-gray-50">
                                                    <div className="text-left md:text-right">
                                                        <p className="text-[16px] font-bold text-gray-900 leading-none">
                                                            ${Number(payment.amount).toLocaleString()}
                                                        </p>
                                                        <p className="text-[11px] text-gray-400 mt-1 uppercase font-semibold tracking-wider">
                                                            {t.billing.amount}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-2">
                                                        <button className="h-9 px-4 bg-gray-50 border border-gray-100 text-gray-600 rounded-md text-[13px] font-semibold flex items-center gap-2 hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2] transition-all">
                                                            <Download size={16} />
                                                            <span className="hidden sm:inline">PDF</span>
                                                        </button>
                                                        <button className="h-9 w-9 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all">
                                                            <MoreHorizontal size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-white rounded-lg border border-gray-200 p-16 text-center shadow-sm">
                                        <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded-full mx-auto mb-6 border border-gray-100 text-gray-300">
                                            <Receipt size={40} />
                                        </div>
                                        <h2 className="text-[20px] font-semibold text-gray-900">
                                            {searchQuery ? "No manifest entries found" : t.billing.no_invoices}
                                        </h2>
                                        <p className="text-[14px] text-gray-500 max-w-sm mx-auto mt-2 leading-tight">
                                            {searchQuery 
                                                ? `We couldn't find any financial record for "${searchQuery}"` 
                                                : t.billing.no_invoices_desc}
                                        </p>
                                    </div>
                                )}
                            </div>
                            
                            {/* Billing Policy Footer */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-start gap-4 shadow-sm">
                                <div className="p-2 bg-blue-50 rounded-full text-[#0a66c2]">
                                    <Info size={16} />
                                </div>
                                <div>
                                    <h4 className="text-[14px] font-semibold text-gray-900">{t.billing.policy_title}</h4>
                                    <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
                                        {t.billing.policy_desc}
                                    </p>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
