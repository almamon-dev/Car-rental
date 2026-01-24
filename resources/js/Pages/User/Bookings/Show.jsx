import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { 
    Car, 
    Calendar, 
    MapPin, 
    ChevronLeft, 
    Download,
    Printer,
    CheckCircle2,
    ShieldCheck,
    CreditCard,
    Info,
    ArrowRight
} from "lucide-react";
import { useLanguage } from "@/Contexts/LanguageContext";

export default function Show({ auth, booking }) {
    const { t } = useLanguage();

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'text-green-700 bg-green-50 border-green-200';
            case 'pending': return 'text-amber-700 bg-amber-50 border-amber-200';
            case 'completed': return 'text-blue-700 bg-blue-50 border-blue-200';
            case 'cancelled': return 'text-red-700 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <GuestLayout>
            <Head title={`Booking - ${booking.car?.name}`} />

            <div className="bg-[#f3f2ef] min-h-screen py-6 font-sans antialiased text-[#000000e6]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    
                    {/* Header Actions */}
                    <div className="flex items-center justify-between mb-4">
                        <Link 
                            href={route('user.bookings.index')} 
                            className="flex items-center gap-2 text-[#00000099] font-semibold hover:text-[#0a66c2] transition-colors"
                        >
                            <ChevronLeft size={20} />
                            Back to Reservations
                        </Link>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-400 rounded-full font-semibold text-[#000000bf] hover:bg-gray-50 text-[14px]">
                                <Printer size={16} />
                                Print Manifest
                            </button>
                            <button className="flex items-center gap-2 px-4 py-1.5 bg-[#0a66c2] text-white rounded-full font-semibold hover:bg-[#004182] text-[14px]">
                                <Download size={16} />
                                Download PDF
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* LEFT: MAIN DETAILS */}
                        <div className="md:col-span-2 space-y-6">
                            
                            {/* Summary Card */}
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h1 className="text-[24px] font-bold leading-tight">{booking.car?.name}</h1>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[12px] font-bold text-[#00000099] uppercase tracking-widest">{booking.car?.brand?.name}</span>
                                                <span className="text-gray-300">·</span>
                                                <span className="text-[12px] font-bold text-[#0a66c2] uppercase tracking-widest">{booking.car?.category?.name}</span>
                                            </div>
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full border text-[13px] font-bold uppercase ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 py-6 border-y border-gray-100">
                                        <div className="space-y-1">
                                            <p className="text-[11px] font-black text-[#00000099] uppercase tracking-widest">Pickup Logistics</p>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={18} className="text-[#0a66c2]" />
                                                <span className="text-[15px] font-semibold">{booking.pickup_location || 'Main Terminal Hub'}</span>
                                            </div>
                                            <p className="text-[13px] text-[#00000099] font-medium ml-6">Elite Branch, Sec-14</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[11px] font-black text-[#00000099] uppercase tracking-widest">Return Logistics</p>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={18} className="text-[#0a66c2]" />
                                                <span className="text-[15px] font-semibold">{booking.dropoff_location || 'Main Terminal Hub'}</span>
                                            </div>
                                            <p className="text-[13px] text-[#00000099] font-medium ml-6">Standard Repositioning</p>
                                        </div>
                                    </div>

                                    <div className="py-6">
                                        <div className="flex items-center gap-12">
                                            <div className="space-y-1">
                                                <p className="text-[11px] font-black text-[#00000099] uppercase tracking-widest">Start Date</p>
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={18} className="text-[#0a66c2]" />
                                                    <span className="text-[16px] font-bold">{new Date(booking.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                                </div>
                                            </div>
                                            <ArrowRight className="text-gray-300 mt-4" size={24} />
                                            <div className="space-y-1">
                                                <p className="text-[11px] font-black text-[#00000099] uppercase tracking-widest">End Date</p>
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={18} className="text-[#0a66c2]" />
                                                    <span className="text-[16px] font-bold">{new Date(booking.end_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[13px] font-semibold text-[#00000099]">
                                        <ShieldCheck size={18} className="text-green-600" />
                                        Elite-Grade Insurance Active
                                    </div>
                                    <Link href={`/car-details/${booking.car?.slug}`} className="text-[13px] font-bold text-[#0a66c2] hover:underline">View Asset Specifications</Link>
                                </div>
                            </div>

                            {/* Technical Manifest */}
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
                                <h3 className="text-[18px] font-bold">Logistical Manifest</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0a66c2] shadow-sm">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-[#00000099] uppercase tracking-widest">VIN Verified</p>
                                            <p className="text-[14px] font-bold">LV-9920-X88</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0a66c2] shadow-sm">
                                            <Info size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-[#00000099] uppercase tracking-widest">Fuel Protocol</p>
                                            <p className="text-[14px] font-bold">Full-to-Full</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: FINANCIAL SUMMARY */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-5 border-b border-gray-100 bg-gray-50/30">
                                    <h3 className="text-[16px] font-bold">Financial Architecture</h3>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div className="flex justify-between text-[14px]">
                                        <span className="text-[#00000099]">Base Rental Fee</span>
                                        <span className="font-bold font-mono">$850.00</span>
                                    </div>
                                    <div className="flex justify-between text-[14px]">
                                        <span className="text-[#00000099]">Insurance (Tier-1)</span>
                                        <span className="font-bold font-mono">$120.00</span>
                                    </div>
                                    <div className="flex justify-between text-[14px]">
                                        <span className="text-[#00000099]">Logistics Fee</span>
                                        <span className="font-bold font-mono">$45.00</span>
                                    </div>
                                    <div className="pt-4 border-t border-gray-100 flex justify-between">
                                        <span className="text-[16px] font-bold">Total Liability</span>
                                        <span className="text-[18px] font-black text-[#0a66c2] font-mono">$1,015.00</span>
                                    </div>
                                </div>
                                <div className="p-5 bg-blue-50/50 border-t border-blue-100">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#0a66c2] shadow-sm">
                                            <CreditCard size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-[#00000099] uppercase tracking-widest leading-none mb-1">Payment Method</p>
                                            <p className="text-[14px] font-bold">Visa ···· 4242</p>
                                        </div>
                                    </div>
                                    <span className="text-[11px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded uppercase">Payment Synchronized</span>
                                </div>
                            </div>

                            <div className="bg-[#1d2226] text-white rounded-lg p-6 shadow-md">
                                <h3 className="text-[18px] font-bold mb-3 italic">Need Help?</h3>
                                <p className="text-[13px] text-gray-300 font-medium mb-6 leading-tight">Our 24/7 concierge is ready to assist with any logistical modifications.</p>
                                <button className="w-full py-2 bg-[#0a66c2] text-white rounded-full font-bold hover:bg-[#004182] transition-colors shadow-lg">Contact Concierge</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
