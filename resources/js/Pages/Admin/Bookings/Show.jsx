/**
 * Admin - Booking Details
 * 
 * Detailed view of a specific car rental booking.
 * Shows customer info, vehicle details, schedule, and payment summary.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    ArrowLeft, 
    Calendar, 
    User, 
    Car as CarIcon, 
    MapPin, 
    DollarSign, 
    Clock, 
    CheckCircle, 
    XCircle, 
    Edit, 
    Trash2,
    Activity,
    ShieldCheck,
    Database,
    Briefcase,
    ChevronLeft,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * BookingShow Component
 */
export default function BookingShow({ auth, booking }) {
    const getStatusStyle = (status) => {
        const styles = {
            pending: 'bg-amber-50 text-amber-600 border-amber-100 shadow-amber-100/20',
            confirmed: 'bg-blue-50 text-[#0a66c2] border-blue-100 shadow-blue-100/20',
            ongoing: 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-indigo-100/20',
            completed: 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100/20',
            cancelled: 'bg-rose-50 text-rose-600 border-rose-100 shadow-rose-100/20',
        };
        return styles[status] || 'bg-slate-50 text-slate-600 border-slate-100';
    };

    const calculateDuration = () => {
        const start = new Date(booking.start_date);
        const end = new Date(booking.end_date);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return days || 1;
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Booking Details | #${booking.id}`} />

            <div className="max-w-full mx-auto space-y-6">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-[#191919]">
                    <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('admin.bookings.index')}
                                className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl text-slate-400 hover:text-[#0a66c2] transition-all border border-slate-100"
                            >
                                <ChevronLeft size={20} strokeWidth={2.5} />
                            </Link>
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-3 bg-[#0a66c2] rounded-full" />
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Reservation Record</span>
                                </div>
                                <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                                    Booking #{booking.id.toString().padStart(5, '0')}
                                </h1>
                            </div>
                        </div>
                        
                        <div className={`px-5 py-2 rounded-full border text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 ${getStatusStyle(booking.status)}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${booking.status === 'confirmed' || booking.status === 'ongoing' ? 'animate-pulse' : ''} bg-current`} />
                            {booking.status}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-8 space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Customer Information */}
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                        <User size={16} className="text-[#0a66c2]" />
                                        Customer Details
                                    </h4>
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Verified Identity</span>
                                </div>
                                <div className="space-y-4">
                                    <InfoField label="Full Name" value={booking.user?.name} highlight />
                                    <InfoField label="Email Address" value={booking.user?.email} />
                                    <InfoField label="Phone Number" value={booking.user?.phone || 'Not provided'} />
                                </div>
                            </motion.div>

                            {/* Car Information */}
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                        <CarIcon size={16} className="text-[#0a66c2]" />
                                        Vehicle Selection
                                    </h4>
                                    <div className="flex items-center gap-1.5 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                                        <Database size={10} className="text-[#0a66c2]" />
                                        <span className="text-[10px] font-bold text-[#0a66c2] uppercase">Car Sync</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                      {booking.car?.images?.[0] ? (
                                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-white shadow-sm shrink-0">
                                            <img 
                                                src={`/${booking.car.images[0].file_path}`} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                      ) : (
                                        <div className="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                                            <CarIcon size={24} />
                                        </div>
                                      )}
                                      <div className="space-y-0.5">
                                          <p className="text-[15px] font-bold text-slate-800 tracking-tight leading-none">{booking.car?.make} {booking.car?.model}</p>
                                          <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{booking.car?.category?.name || 'Car Category'}</p>
                                      </div>
                                </div>

                                <div className="space-y-3 px-1">
                                    <InfoField label="Brand / Manufacturer" value={booking.car?.brand?.name || 'Generic'} />
                                    <InfoField label="Daily Rental Rate" value={`৳${booking.car?.price_details?.daily_rate?.toLocaleString()}`} />
                                </div>
                            </motion.div>
                        </div>

                        {/* Rental Schedule */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-8"
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <Clock size={16} className="text-[#0a66c2]" />
                                    Rental Schedule & Locations
                                </h4>
                                <div className="flex items-center gap-2 text-[#0a66c2] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                    <Activity size={12} className="animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{calculateDuration()} Rental Days</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:block hidden text-slate-100">
                                    <ArrowLeft size={40} className="rotate-180" strokeWidth={1} />
                                </div>

                                <SchedulePoint 
                                    label="Pickup Details"
                                    date={booking.start_date}
                                    location={booking.pickup_location}
                                    icon={MapPin}
                                    type="pickup"
                                />
                                <SchedulePoint 
                                    label="Return Details"
                                    date={booking.end_date}
                                    location={booking.dropoff_location}
                                    icon={MapPin}
                                    type="dropoff"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Sidebar */}
                    <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                        
                        {/* Payment Summary */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6"
                        >
                            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <DollarSign size={16} className="text-[#0a66c2]" />
                                Payment Summary
                            </h4>
                            
                            <div className="space-y-4">
                                <SummaryRow label="Total Duration" value={`${calculateDuration()} Days`} />
                                <SummaryRow label="Daily Cost" value={`৳${booking.car?.price_details?.daily_rate?.toLocaleString()} / day`} />
                                <div className="h-px bg-slate-50" />
                                <div className="p-6 bg-slate-900 rounded-2xl shadow-xl relative overflow-hidden group">
                                    <div className="relative z-10 flex flex-col items-center gap-1">
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider opacity-80">Total Amount Due</span>
                                        <h3 className="text-3xl font-bold text-white tracking-tight">৳{booking.total_price?.toLocaleString()}</h3>
                                    </div>
                                    <DollarSign size={80} className="absolute -right-6 -bottom-6 text-white/[0.03] rotate-12" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Booking Actions */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
                            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <Activity size={16} className="text-[#0a66c2]" />
                                Booking Actions
                            </h4>
                            <div className="grid grid-cols-1 gap-3">
                                <ActionButton label="Approve Booking" icon={CheckCircle2} color="bg-[#0a66c2]" />
                                <ActionButton label="Complete Rental" icon={CheckCircle} color="bg-emerald-600" />
                                <ActionButton label="Cancel Booking" icon={XCircle} color="bg-rose-500" variant="ghost" />
                            </div>
                        </div>

                        {/* System Info */}
                         <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4">
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={16} className="text-slate-400" />
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">System Log</span>
                            </div>
                            <div className="space-y-2.5">
                                <LogDetail label="Internal ID" value={`#BK-${booking.id.toString().padStart(6, '0')}`} />
                                <LogDetail label="Booked On" value={new Date(booking.created_at).toLocaleDateString()} />
                                <LogDetail label="Updated On" value={new Date(booking.updated_at).toLocaleDateString()} />
                            </div>
                            <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-600 font-bold uppercase tracking-wider pl-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Verified Record
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

// Components
const InfoField = ({ label, value, highlight }) => (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
        <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
        <span className={`text-[13px] font-bold tracking-tight ${highlight ? 'text-[#0a66c2]' : 'text-slate-800'}`}>
            {value || <span className="text-slate-300 italic">Not sync'd</span>}
        </span>
    </div>
);

const SchedulePoint = ({ label, date, location, icon: Icon, type }) => (
    <div className="space-y-4 flex flex-col">
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm ${type === 'pickup' ? 'bg-blue-50 border-blue-100 text-[#0a66c2]' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                <Icon size={18} strokeWidth={2.5} />
            </div>
            <div className="space-y-0.5">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-none">{label}</p>
                <div className="flex items-center gap-1.5 text-slate-800 font-bold text-[15px] tracking-tight mt-1">
                    {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                    <span className="text-slate-500 font-semibold text-[13px]">{new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 min-h-[60px] flex items-start gap-2.5">
            <MapPin size={14} className="text-[#0a66c2] mt-0.5 shrink-0" />
            <p className="text-[13px] font-semibold text-slate-600 leading-relaxed italic">
                {location || "No location address provided"}
            </p>
        </div>
    </div>
);

const SummaryRow = ({ label, value }) => (
    <div className="flex items-center justify-between py-1">
        <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
        <span className="text-[14px] font-bold text-slate-800 tracking-tight">{value}</span>
    </div>
);

const ActionButton = ({ label, icon: Icon, color, variant }) => {
    const isGhost = variant === 'ghost';
    return (
        <button className={`w-full py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-95 ${
            isGhost 
                ? `bg-white border-2 border-slate-100 text-slate-400 hover:border-red-100 hover:text-red-500 hover:bg-red-50` 
                : `${color} text-white shadow-md hover:brightness-110`
        }`}>
            <Icon size={16} strokeWidth={2.5} />
            {label}
        </button>
    );
};

const LogDetail = ({ label, value }) => (
    <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
        <span className="text-[12px] font-bold text-slate-600">{value}</span>
    </div>
);
