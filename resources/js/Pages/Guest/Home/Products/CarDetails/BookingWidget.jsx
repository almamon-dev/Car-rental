import { motion } from "framer-motion";
import {
    MapPin,
    CheckCircle2,
    ShieldCheck,
    Clock as ClockIcon,
    Calendar,
    ArrowRight,
    Settings2,
    Activity,
    AlertCircle,
    CheckCircle
} from "lucide-react";
import ExtraServices from "./ExtraServices";
import { useState } from "react";
import axios from "axios";
import { useLanguage } from "@/Contexts/LanguageContext";

export default function BookingWidget({
    car,
    locations = [],
    selectedLocation,
    setSelectedLocation,
    bookingDates,
    setBookingDates,
    priceSummary,
    selectedExtras,
    handleExtraServiceToggle,
    handleBookNow,
}) {
    const { t } = useLanguage();
    const currency = car.price_details?.currency || '৳';
    const [availability, setAvailability] = useState(null); // null, 'checking', 'available', 'busy'
    const [error, setError] = useState(null);

    const checkAvailability = async () => {
        setAvailability('checking');
        setError(null);
        try {
            const response = await axios.get(route('api.check-availability'), {
                params: {
                    car_id: car.id,
                    start_date: `${bookingDates.pickup} ${bookingDates.pickupTime}`,
                    end_date: `${bookingDates.dropoff} ${bookingDates.dropoffTime}`,
                }
            });
            
            if (response.data.available) {
                setAvailability('available');
            } else {
                setAvailability('busy');
            }
        } catch (err) {
            setError(locale === 'en' ? "Failed to verify status. Please try again." : "স্ট্যাটাস যাচাই করতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
            setAvailability(null);
        }
    };
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[12px] border border-gray-200 shadow-sm sticky top-24 overflow-hidden font-sans"
        >
            {/* Header / Console Status */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-3 bg-[#0a66c2] rounded-full" />
                    <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">
                        {t.details.booking_manifest}
                    </h3>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-white border border-gray-100 text-[10px] font-black text-green-600 uppercase tracking-widest shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    {t.details.secure}
                </div>
            </div>

            <div className="p-5 space-y-6">
                
                {/* DEPLOYMENT MODE (Rental Type Sync) */}
                <div>
                    <label className="block text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest">
                         {t.details.deployment_config}
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        {[
                            { period: t.details.daily, id: 'Daily', price: `${currency}${Number(car.price_details?.daily_rate || 0).toLocaleString()}` },
                            { period: t.details.weekly, id: 'Weekly', price: `${currency}${Number(car.price_details?.weekly_rate || 0).toLocaleString()}` },
                            { period: t.details.monthly, id: 'Monthly', price: `${currency}${Number(car.price_details?.monthly_rate || 0).toLocaleString()}` },
                        ].map((type) => (
                            <button
                                key={type.id}
                                className={`py-3 px-1 rounded-[8px] border transition-all ${
                                    type.id === "Daily"
                                        ? "bg-[#f3f7fb] border-[#0a66c2]/30 text-[#0a66c2] shadow-[0_4px_12px_rgba(10,102,194,0.08)]"
                                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <div className="text-[12px] font-black uppercase tracking-tight">{type.period}</div>
                                <div className="text-[10px] font-bold mt-1.5 opacity-70">{type.price}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* LOGISTICS (Locations) */}
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                         <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <Activity size={12} className="text-[#0a66c2]" />
                                {t.details.origin_terminal}
                            </label>
                            <select
                                value={selectedLocation.pickup}
                                onChange={(e) => {
                                    setSelectedLocation((prev) => ({
                                        ...prev,
                                        pickup: e.target.value,
                                    }));
                                    setAvailability(null);
                                }}
                                className="w-full h-11 px-4 bg-[#f3f7fb]/50 border border-gray-200 rounded-[8px] text-[13px] font-bold text-gray-900 focus:border-[#0a66c2] focus:ring-4 focus:ring-[#0a66c2]/5 outline-none transition-all cursor-pointer appearance-none"
                            >
                                {locations.map(loc => <option key={loc.id} value={loc.name}>{loc.name}, {loc.city}</option>)}
                            </select>
                            {selectedLocation.pickup !== (car.location?.name) && car.location && (
                                <p className="text-[9px] text-amber-600 font-bold mt-2 uppercase tracking-tight flex items-center gap-1">
                                    <AlertCircle size={10} /> {t.details.repositioning_fee}
                                </p>
                            )}
                         </div>
                         
                         <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <MapPin size={12} className="text-blue-400" />
                                {t.details.destination}
                            </label>
                            <select
                                value={selectedLocation.dropoff}
                                onChange={(e) =>
                                    setSelectedLocation((prev) => ({
                                        ...prev,
                                        dropoff: e.target.value,
                                    }))
                                }
                                className="w-full h-11 px-4 bg-[#f3f7fb]/50 border border-gray-200 rounded-[8px] text-[13px] font-bold text-gray-900 focus:border-[#0a66c2] focus:ring-4 focus:ring-[#0a66c2]/5 outline-none transition-all cursor-pointer appearance-none"
                            >
                                {locations.map(loc => <option key={loc.id} value={loc.name}>{loc.name}, {loc.city}</option>)}
                                <option value="Custom Drop-off">{t.details.custom_dropoff}</option>
                            </select>
                         </div>
                    </div>
                </div>

                {/* TEMPORAL WINDOW (Dates & Times) */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-gray-700">{t.details.deployment_start}</label>
                        <input
                            type="date"
                            value={bookingDates.pickup}
                            className="w-full h-9 px-2 bg-white border border-gray-200 rounded-[4px] text-[12px] font-bold text-gray-900 outline-none"
                            onChange={(e) => {
                                setBookingDates(prev => ({...prev, pickup: e.target.value}));
                                setAvailability(null);
                            }}
                        />
                         <input
                            type="time"
                            value={bookingDates.pickupTime}
                            className="w-full h-9 px-2 bg-white border border-gray-200 rounded-[4px] text-[12px] font-bold text-gray-900 outline-none mt-1"
                            onChange={(e) => {
                                setBookingDates(prev => ({...prev, pickupTime: e.target.value}));
                                setAvailability(null);
                            }}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-gray-700">{t.details.deployment_end}</label>
                        <input
                            type="date"
                            value={bookingDates.dropoff}
                            className="w-full h-9 px-2 bg-white border border-gray-200 rounded-[4px] text-[12px] font-bold text-gray-900 outline-none"
                            onChange={(e) => {
                                setBookingDates(prev => ({...prev, dropoff: e.target.value}));
                                setAvailability(null);
                            }}
                        />
                         <input
                            type="time"
                            value={bookingDates.dropoffTime}
                            className="w-full h-9 px-2 bg-white border border-gray-200 rounded-[4px] text-[12px] font-bold text-gray-900 outline-none mt-1"
                            onChange={(e) => {
                                setBookingDates(prev => ({...prev, dropoffTime: e.target.value}));
                                setAvailability(null);
                            }}
                        />
                    </div>
                </div>

                {/* ENHANCEMENTS (Extra Services) */}
                <div className="pt-2">
                    <ExtraServices
                        selectedExtras={selectedExtras}
                        handleExtraServiceToggle={handleExtraServiceToggle}
                    />
                </div>

                {/* FINANCIAL MANIFEST (Price Breakdown) */}
                <div className="bg-[#f3f7fb]/50 border border-gray-100 rounded-[12px] p-4 space-y-2.5">
                    <ManifestItem label={t.details.base_allocation} val={`${currency}${priceSummary.baseRate}`} />
                    <ManifestItem label={t.details.institutional_insurance} val={`${currency}${priceSummary.insurance}`} />
                    <ManifestItem label={t.details.operational_fee} val={`${currency}${priceSummary.serviceFee}`} />
                    {priceSummary.extras > 0 && <ManifestItem label={t.details.asset_enhancements} val={`${currency}${priceSummary.extras}`} />}
                    
                    <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                         <span className="text-[14px] font-bold text-gray-900">{t.details.total_liability}</span>
                         <span className="text-[20px] font-bold text-[#0a66c2]">{currency}{priceSummary.total}</span>
                    </div>
                </div>

                {/* AVAILABILITY FEEDBACK */}
                <div className="space-y-3">
                    {availability === 'available' && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-[12px] font-bold">
                            <CheckCircle size={14} />
                            {t.details.asset_active}
                        </div>
                    )}
                    {availability === 'busy' && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-[12px] font-bold">
                            <AlertCircle size={14} />
                            {t.details.conflict_detected}
                        </div>
                    )}
                    {error && (
                        <div className="text-red-500 text-[10px] font-bold text-center italic">{error}</div>
                    )}

                    {!availability && (
                        <button
                            onClick={checkAvailability}
                            className="w-full py-2.5 border border-[#0a66c2] text-[#0a66c2] text-[14px] font-bold rounded-full hover:bg-[#f0f7ff] transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                            <Activity size={16} /> {t.details.check_availability}
                        </button>
                    )}

                    {availability === 'checking' && (
                        <button
                            disabled
                            className="w-full py-2.5 bg-gray-50 text-gray-400 text-[14px] font-bold rounded-full shadow-sm flex items-center justify-center gap-2"
                        >
                            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" /> {t.details.analyzing}
                        </button>
                    )}

                    <button
                        onClick={handleBookNow}
                        disabled={availability !== 'available'}
                        className={`w-full py-2.5 text-white text-[14px] font-bold rounded-full transition-all flex items-center justify-center gap-2 ${
                            availability === 'available' 
                            ? "bg-[#0a66c2] hover:bg-[#004182] active:scale-[0.98] shadow-sm" 
                            : "bg-gray-100 cursor-not-allowed text-gray-400 border border-gray-100"
                        }`}
                    >
                        {t.details.confirm_acquisition} <ArrowRight size={16} />
                    </button>
                    
                    <button className="w-full py-2 rounded-full border border-gray-200 text-gray-500 text-[12px] font-bold hover:bg-gray-50 transition-all">
                        {t.details.sync_calendar}
                    </button>
                </div>

                {/* TRUST METRICS */}
                <div className="flex items-center justify-center gap-5 pt-4 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <MetricItem Icon={ShieldCheck} label="T-1 Secure" />
                    <MetricItem Icon={Activity} label="24/7 Ops" />
                    <MetricItem Icon={CheckCircle2} label="Verified" />
                </div>
            </div>
        </motion.div>
    );
}

const ManifestItem = ({ label, val }) => (
    <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-gray-500">{label}</span>
        <span className="text-[12px] font-bold text-gray-900">{val}</span>
    </div>
);

const MetricItem = ({ Icon, label }) => (
    <div className="flex flex-col items-center">
        <Icon size={14} className="text-[#0a66c2] mb-1" />
        <span className="text-[9px] font-bold text-gray-500">{label}</span>
    </div>
);

