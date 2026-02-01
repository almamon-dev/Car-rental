/**
 * Car Details - Booking Widget
 * 
 * Provides the primary transactional interface for asset acquisition,
 * including date selection, rate mode configuration, and availability verification.
 * 
 * @author AL Mamon
 * @version 1.0.0
 */

import { motion } from "framer-motion";
import {
    MapPin,
    CheckCircle2,
    ShieldCheck,
    Clock as ClockIcon,
    Calendar as CalendarIcon,
    ArrowRight,
    Settings2,
    Activity,
    AlertCircle,
    CheckCircle,
    ChevronRight,
    ArrowDown
} from "lucide-react";
import ExtraServices from "./ExtraServices";
import { useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { useLanguage } from "@/Contexts/LanguageContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * BookingWidget Component
 * 
 * @returns {JSX.Element}
 */
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
    availability,
    setAvailability,
    rateMode,
    onRateModeChange
}) {
    // --- Context & Initialization ---
    const { t, locale } = useLanguage();
    const currency = car.price_details?.currency || '৳';
    
    // --- State: Transactional ---
    const [error, setError] = useState(null);

    // --- Logic: Availability Verification ---

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
            id="booking-console"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[4px] border border-gray-200 sticky top-24 shadow-sm font-sans"
        >
            {/* Header / Institutional Branding */}
            <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between bg-white rounded-t-[4px]">
                <div className="flex flex-col leading-none">
                    <div className="text-[10px] font-bold text-gray-400 mb-0.5 uppercase tracking-tighter">{t.details.daily_rate_label}</div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[18px] font-bold text-[#0a66c2]">{currency}{Number(car.price_details?.daily_rate || 0).toLocaleString()}</span>
                        <span className="text-[12px] text-gray-400 line-through font-medium">{currency}{(Number(car.price_details?.daily_rate || 0) * 1.25).toFixed(0).toLocaleString()}</span>
                    </div>
                </div>
                <div className="px-2 py-0.5 bg-blue-50 border border-blue-100 rounded-[2px] text-[9px] font-bold text-blue-600">
                    {t.details.live}
                </div>
            </div>

            <div className="p-3 space-y-3">
                
                {/* DEPLOYMENT MODE (Rental Type Sync) */}
                <div className="px-1">
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5 ml-1">
                         {t.details.booking_type}
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        {[
                            { period: t.details.daily, id: 'Daily', price: `${currency}${Number(car.price_details?.daily_rate || 0).toLocaleString()}` },
                            { period: t.details.weekly, id: 'Weekly', price: `${currency}${Number(car.price_details?.weekly_rate || 0).toLocaleString()}` },
                            { period: t.details.monthly, id: 'Monthly', price: `${currency}${Number(car.price_details?.monthly_rate || 0).toLocaleString()}` },
                        ].map((type) => (
                            <button
                                key={type.id}
                                onClick={() => onRateModeChange(type.id)}
                                className={`py-1.5 px-1 rounded-[4px] border transition-all flex flex-col items-center gap-0 ${
                                    rateMode === type.id
                                        ? "bg-blue-50 border-[#0a66c2] text-[#0a66c2] shadow-sm"
                                        : "bg-white border-gray-200 text-gray-700 hover:border-gray-200"
                                }`}
                            >
                                <span className="text-[9px] font-semibold opacity-70 uppercase">{type.period}</span>
                                <span className="text-[12px] font-bold">{type.price}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* LOGISTICS SECTION */}
                <div className="space-y-2">
                    
                    <div className="grid grid-cols-2 gap-2">
                         <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-500 ml-1">
                                {t.details.pickup_label}
                            </label>
                            <div className="relative group/select">
                                <select
                                    value={selectedLocation.pickup}
                                    onChange={(e) => {
                                        setSelectedLocation((prev) => ({
                                            ...prev,
                                            pickup: e.target.value,
                                        }));
                                        setAvailability(null);
                                    }}
                                    className="w-full h-9 pl-2 pr-6 bg-white border border-gray-200 rounded-[4px] text-[12px] font-medium text-gray-900 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition-all cursor-pointer appearance-none shadow-sm"
                                >
                                    {locations.map(loc => <option key={loc.id} value={loc.name}>{loc.name}</option>)}
                                </select>
                            </div>
                         </div>
                         
                         <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-500 ml-1">
                                {t.details.dropoff_label}
                            </label>
                            <div className="relative group/select">
                                <select
                                    value={selectedLocation.dropoff}
                                    onChange={(e) =>
                                        setSelectedLocation((prev) => ({
                                            ...prev,
                                            dropoff: e.target.value,
                                        }))
                                    }
                                    className="w-full h-9 pl-2 pr-6 bg-white border border-gray-200 rounded-[4px] text-[12px] font-medium text-gray-900 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition-all cursor-pointer appearance-none shadow-sm"
                                >
                                    {locations.map(loc => <option key={loc.id} value={loc.name}>{loc.name}</option>)}
                                    <option value="Custom Drop-off">{t.details.custom_dropoff_label}</option>
                                </select>
                            </div>
                         </div>
                    </div>
                </div>

                {/* TEMPORAL WINDOW SECTION */}
                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col space-y-1">
                            <label className="text-[11px] font-bold text-gray-500 ml-1">Start</label>
                            <div className="relative">
                                <DatePicker
                                    selected={bookingDates.pickup && bookingDates.pickupTime ? new Date(`${bookingDates.pickup}T${bookingDates.pickupTime}`) : null}
                                    onChange={(date) => {
                                        if (!date) return;
                                        const dateStr = format(date, "yyyy-MM-dd");
                                        const timeStr = format(date, "HH:mm");
                                        setBookingDates(prev => ({...prev, pickup: dateStr, pickupTime: timeStr}));
                                        setAvailability(null);
                                    }}
                                    showTimeSelect
                                    dateFormat="MMM d, HH:mm"
                                    minDate={new Date()}
                                    placeholderText={t.details.pickup_placeholder}
                                    className="w-full h-9 pl-8 pr-2 bg-white border border-gray-200 rounded-[4px] text-[12px] font-medium text-gray-900 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition-all cursor-pointer shadow-sm"
                                    wrapperClassName="w-full"
                                    popperClassName="!z-[9999]"
                                />
                                <CalendarIcon size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className="text-[11px] font-bold text-gray-500 ml-1">End</label>
                            <div className="relative">
                                <DatePicker
                                    selected={bookingDates.dropoff && bookingDates.dropoffTime ? new Date(`${bookingDates.dropoff}T${bookingDates.dropoffTime}`) : null}
                                    onChange={(date) => {
                                        if (!date) return;
                                        const dateStr = format(date, "yyyy-MM-dd");
                                        const timeStr = format(date, "HH:mm");
                                        setBookingDates(prev => ({...prev, dropoff: dateStr, dropoffTime: timeStr}));
                                        setAvailability(null);
                                    }}
                                    showTimeSelect
                                    dateFormat="MMM d, HH:mm"
                                    minDate={new Date()}
                                    placeholderText={t.details.return_placeholder}
                                    className="w-full h-9 pl-8 pr-2 bg-white border border-gray-200 rounded-[4px] text-[12px] font-medium text-gray-900 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition-all cursor-pointer shadow-sm"
                                    wrapperClassName="w-full"
                                    popperClassName="!z-[9999]"
                                />
                                <CalendarIcon size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ENHANCEMENTS & PRICING SECTION */}
                <div className="space-y-3">

                    <ExtraServices
                        selectedExtras={selectedExtras}
                        handleExtraServiceToggle={handleExtraServiceToggle}
                    />

                    {/* FINANCIAL MANIFEST */}
                    <div className="bg-white border border-gray-100 rounded-[4px] p-3 space-y-2">
                        <ManifestItem 
                            label={`${t.details.base_allocation} (${priceSummary.multiplier})`} 
                            val={`${currency}${(priceSummary.baseRate * priceSummary.multiplier).toLocaleString()}`} 
                        />
                        <ManifestItem label={t.details.institutional_insurance} val={`${currency}${priceSummary.insurance.toLocaleString()}`} />
                        <ManifestItem label={t.details.operational_fee || "System Fee"} val={`${currency}${priceSummary.serviceFee.toLocaleString()}`} />
                        {priceSummary.extras > 0 && <ManifestItem label={t.details.asset_enhancements} val={`${currency}${priceSummary.extras}`} />}
                        
                        <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                            <span className="text-[15px] font-bold text-gray-900">{t.details.total_price}</span>
                            <span className="text-[22px] font-bold text-[#0a66c2]">{currency}{priceSummary.total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* AVAILABILITY FEEDBACK & ACTION */}
                <div className="space-y-3 pt-2">
                    {availability === 'available' && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-[4px] text-green-700 text-[12px] font-bold animate-in fade-in slide-in-from-bottom-2">
                            <CheckCircle size={14} className="animate-bounce" />
                            {t.details.asset_active}
                        </div>
                    )}
                    {availability === 'busy' && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-[4px] text-red-700 text-[12px] font-bold animate-in fade-in slide-in-from-bottom-2">
                            <AlertCircle size={14} />
                            {t.details.conflict_detected}
                        </div>
                    )}
                    {error && (
                        <div className="text-red-500 text-[10px] font-bold text-center italic">{error}</div>
                    )}

                    {!availability || availability === 'busy' ? (
                        <button
                            onClick={checkAvailability}
                            disabled={availability === 'checking'}
                            className={`w-full py-2.5 rounded-[4px] text-[14px] font-bold transition-all flex items-center justify-center gap-2 ${
                                availability === 'checking'
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white transition-all active:scale-[0.98]"
                            }`}
                        >
                            {availability === 'checking' ? (
                                <>
                                    <div className="w-3 h-3 border-2 border-[#0a66c2]/30 border-t-[#0a66c2] rounded-full animate-spin" />
                                    {t.details.analyzing_status}
                                </>
                            ) : (
                                <>
                                    <Activity size={14} /> {t.details.check_availability}
                                </>
                            )}
                        </button>
                    ) : null}

                    <button
                        onClick={handleBookNow}
                        disabled={availability !== 'available'}
                        className={`w-full py-3 text-white text-[15px] font-bold rounded-[4px] transition-all flex items-center justify-center gap-2 ${
                            availability === 'available' 
                            ? "bg-[#0a66c2] hover:bg-[#084d92] shadow-md hover:shadow-lg" 
                            : "bg-gray-200 cursor-not-allowed text-gray-400"
                        }`}
                    >
                        {t.details.confirm_acquisition} <ArrowRight size={16} />
                    </button>
                    
                    <button className="w-full py-2 bg-gray-50 rounded-[4px] border border-gray-100 text-gray-500 text-[12px] font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                         <MapPin size={12} /> {t.details.sync_maps}
                    </button>
                    <style>
                    {`
                        .react-datepicker-wrapper { width: 100%; }
                        
                        /* Main Container Defaults */
                        .react-datepicker {
                            font-family: 'Inter', sans-serif !important;
                            border: 1px solid #e2e8f0 !important;
                            border-radius: 6px !important;
                            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
                            display: flex !important; /* Important for side-by-side time */
                            overflow: hidden !important;
                            background-color: white !important;
                        }

                        /* Header */
                        .react-datepicker__header {
                            background-color: #ffffff !important;
                            border-bottom: 1px solid #f1f5f9 !important;
                            padding-top: 12px !important;
                            padding-bottom: 12px !important;
                        }

                        .react-datepicker__current-month {
                            font-size: 14px !important;
                            font-weight: 700 !important;
                            color: #0f172a !important;
                            text-transform: uppercase !important;
                            letter-spacing: 0.5px !important;
                            margin-bottom: 4px !important;
                        }

                        .react-datepicker__day-name {
                            color: #94a3b8 !important;
                            font-size: 11px !important;
                            font-weight: 700 !important;
                            text-transform: uppercase !important;
                            margin: 6px !important;
                            width: 32px !important; 
                        }

                        /* Days Grid */
                        .react-datepicker__day {
                            font-size: 13px !important;
                            font-weight: 500 !important;
                            color: #334155 !important;
                            margin: 4px !important;
                            width: 32px !important;
                            height: 32px !important;
                            line-height: 32px !important;
                            border-radius: 6px !important;
                            transition: all 0.2s ease !important;
                        }

                        .react-datepicker__day:hover {
                            background-color: #f1f5f9 !important;
                            color: #0f172a !important;
                        }

                        .react-datepicker__day--selected, 
                        .react-datepicker__day--keyboard-selected {
                            background-color: #0a66c2 !important;
                            color: white !important;
                            font-weight: 700 !important;
                        }

                        /* Fix: Keep selected state blue on hover */
                        .react-datepicker__day--selected:hover,
                        .react-datepicker__day--keyboard-selected:hover {
                            background-color: #084d92 !important;
                            color: white !important;
                        }
                        
                        .react-datepicker__day--today {
                            font-weight: 900 !important;
                            color: #0a66c2 !important;
                            position: relative;
                        }
                        .react-datepicker__day--today::after {
                            content: '';
                            position: absolute;
                            bottom: 4px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 4px;
                            height: 4px;
                            border-radius: 50%;
                            background-color: currentColor;
                        }
                        
                        /* Fix: Ensure selected today text is white (not blue on blue) */
                        .react-datepicker__day--selected.react-datepicker__day--today,
                        .react-datepicker__day--keyboard-selected.react-datepicker__day--today {
                            color: white !important;
                        }
                        .react-datepicker__day--selected::after {
                            display: none;
                        }

                        /* Disabled Date Styling */
                        .react-datepicker__day--disabled {
                            color: #cbd5e1 !important;
                            cursor: not-allowed !important;
                            pointer-events: none !important; 
                            background-color: transparent !important;
                        }
                        .react-datepicker__day--disabled:hover {
                            background-color: transparent !important;
                             color: #cbd5e1 !important;
                        }
                        
                        /* Time Container */
                        .react-datepicker__time-container {
                            border-left: 1px solid #f1f5f9 !important;
                            width: 100px !important;
                            background: white !important;
                        }
                        
                        .react-datepicker__time-container .react-datepicker__time {
                            background: white !important;
                            border-radius: 0 !important; 
                        }

                        .react-datepicker__header--time { 
                            padding-bottom: 8px !important;
                            padding-left: 0 !important;
                            padding-right: 0 !important;
                        }

                        .react-datepicker-time__header {
                            font-size: 11px !important;
                            font-weight: 800 !important;
                            text-transform: uppercase !important;
                            color: #64748b !important;
                            margin-bottom: 25px !important;
                        }

                        .react-datepicker__time-list-item {
                            font-size: 12px !important;
                            height: auto !important;
                            padding: 8px 0 !important;
                            font-weight: 500 !important;
                            color: #475569 !important;
                            transition: all 0.2s !important;
                        }

                        .react-datepicker__time-list-item:hover {
                            background-color: #f8fafc !important;
                            color: #0f172a !important;
                        }

                        .react-datepicker__time-list-item--selected {
                            background-color: #0a66c2 !important;
                            color: white !important;
                            font-weight: 700 !important;
                        }
                        
                        /* Scrollbar for Time & Fixed Height */
                        .react-datepicker__time-list {
                            height: 240px !important; /* Matches approx height of calendar */
                            overflow-y: scroll !important;
                            padding-right: 0 !important;
                        }
                        
                        .react-datepicker__time-list::-webkit-scrollbar {
                            width: 4px;
                        }
                        .react-datepicker__time-list::-webkit-scrollbar-thumb {
                            background: #cbd5e1; 
                            border-radius: 4px;
                        }
                        .react-datepicker__time-list::-webkit-scrollbar-track {
                            background: transparent;
                        }

                        .react-datepicker-popper {
                            z-index: 9999 !important;
                            padding-top: 8px !important;
                        }
                        .react-datepicker__triangle {
                            display: none !important;
                        }

                        /* Navigation Buttons */
                        .react-datepicker__navigation {
                            top: 10px !important;
                            width: 26px !important;
                            height: 26px !important;
                            border-radius: 50% !important;
                            background: white !important;
                            border: 1px solid #e2e8f0 !important;
                            /* Flexbox Centering */
                            display: flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                            transition: all 0.2s !important;
                            padding: 0 !important; /* Clear padding */
                        }
                        .react-datepicker__navigation:hover {
                            background: #f8fafc !important;
                            border-color: #e2e8f0 !important;
                            transform: scale(1.05);
                        }
                        
                        .react-datepicker__navigation--previous {
                            left: 10px !important;
                        }
                        .react-datepicker__navigation--next {
                            right: 110px !important;
                        }

                        /* Navigation Icon Span (Wrapper) */
                        .react-datepicker__navigation-icon {
                            top: auto !important;
                            left: auto !important;
                            right: auto !important;
                            bottom: auto !important;
                            position: relative !important;
                            display: flex !important; /* Flex to center the ::before */
                            align-items: center !important;
                            justify-content: center !important;
                            width: 100% !important;
                            height: 100% !important;
                            text-indent: -9999px; /* Hide text */
                            margin: 0 !important;
                        }

                        /* Arrow Shape (The ::before) */
                        .react-datepicker__navigation-icon::before {
                            display: block !important;
                            content: "" !important;
                            border-color: #64748b !important;
                            border-style: solid !important;
                            border-width: 1.5px 1.5px 0 0 !important; /* Slightly thinner for elegance */
                            width: 6px !important;
                            height: 6px !important;
                            position: static !important; /* Reset absolute */
                            top: auto !important;
                            left: auto !important;
                            transform: none !important; /* Reset default transforms */
                        }
                        
                        /* Previous Arrow (Left) - Optical Correction */
                        .react-datepicker__navigation-icon--previous::before {
                            transform: rotate(225deg) !important;
                            margin-left: 3px !important; /* Nudge right to visually center < */
                        }
                        
                        /* Next Arrow (Right) - Optical Correction */
                        .react-datepicker__navigation-icon--next::before {
                            transform: rotate(45deg) !important;
                            margin-right: 3px !important; /* Nudge left to visually center > */
                        }
                    `}
                    </style>
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
