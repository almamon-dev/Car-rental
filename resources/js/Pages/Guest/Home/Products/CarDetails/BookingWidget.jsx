import { motion } from "framer-motion";
import {
    MapPin,
    CheckCircle2,
    ShieldCheck,
    Clock as ClockIcon,
    Calendar,
    ArrowRight,
    Settings2,
    Activity
} from "lucide-react";
import ExtraServices from "./ExtraServices";

/**
 * ACQUISITION CONSOLE (LINKEDIN MASTER STYLE SYNC)
 * 
 * Philosophy:
 * - High Density: Compressed inputs and shrunken typography.
 * - Modular Card: Pure white, 1px gray border, 12px rounded.
 * - Institutional: Focused on logistics and verified pricing.
 */

export default function BookingWidget({
    selectedLocation,
    setSelectedLocation,
    bookingDates,
    setBookingDates,
    priceSummary,
    selectedExtras,
    handleExtraServiceToggle,
    handleBookNow,
}) {
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
                    <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest">
                        Acquisition Console
                    </h3>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-gray-100 text-[10px] font-bold text-green-600">
                    <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    SECURE
                </div>
            </div>

            <div className="p-5 space-y-6">
                
                {/* DEPLOYMENT MODE (Rental Type Sync) */}
                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
                         Deployment Configuration
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { period: "Daily", price: "$380" },
                            { period: "Weekly", price: "$2,240" },
                            { period: "Fleet", price: "Custom" },
                        ].map((type) => (
                            <button
                                key={type.period}
                                className={`py-3 px-1 rounded-[8px] border transition-all ${
                                    type.period === "Daily"
                                        ? "bg-blue-50/50 border-[#0a66c2] text-[#0a66c2]"
                                        : "bg-white border-gray-200 text-gray-400 hover:border-gray-300"
                                }`}
                            >
                                <div className="text-[12px] font-bold">{type.period}</div>
                                <div className="text-[10px] font-black mt-1 uppercase tracking-tight">{type.price}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* LOGISTICS (Locations) */}
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                         <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <Activity size={10} className="text-[#0a66c2]" />
                                Origin Terminal
                            </label>
                            <select
                                value={selectedLocation.pickup}
                                onChange={(e) =>
                                    setSelectedLocation((prev) => ({
                                        ...prev,
                                        pickup: e.target.value,
                                    }))
                                }
                                className="w-full h-10 px-3 bg-[#f3f7fb]/50 border border-gray-200 rounded-[6px] text-[13px] font-bold text-gray-900 focus:border-[#0a66c2] outline-none transition-all"
                            >
                                <option>Executive Terminal</option>
                                <option>Financial District Port</option>
                                <option>Gateway International</option>
                            </select>
                         </div>
                         
                         <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <MapPin size={10} className="text-blue-400" />
                                Destination
                            </label>
                            <select
                                value={selectedLocation.dropoff}
                                onChange={(e) =>
                                    setSelectedLocation((prev) => ({
                                        ...prev,
                                        dropoff: e.target.value,
                                    }))
                                }
                                className="w-full h-10 px-3 bg-[#f3f7fb]/50 border border-gray-200 rounded-[6px] text-[13px] font-bold text-gray-900 focus:border-[#0a66c2] outline-none transition-all"
                            >
                                <option>Corporate Plaza</option>
                                <option>Return to Origin</option>
                                <option>Custom Drop-off</option>
                            </select>
                         </div>
                    </div>
                </div>

                {/* TEMPORAL WINDOW (Dates & Times) */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Deployment Start</label>
                        <input
                            type="date"
                            value={bookingDates.pickup}
                            className="w-full h-9 px-2 bg-white border border-gray-200 rounded-[4px] text-[12px] font-bold text-gray-900 outline-none"
                        />
                         <input
                            type="time"
                            value={bookingDates.pickupTime}
                            className="w-full h-9 px-2 bg-white border border-gray-200 rounded-[4px] text-[12px] font-bold text-gray-900 outline-none mt-1"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Deployment End</label>
                        <input
                            type="date"
                            value={bookingDates.dropoff}
                            className="w-full h-9 px-2 bg-white border border-gray-200 rounded-[4px] text-[12px] font-bold text-gray-900 outline-none"
                        />
                         <input
                            type="time"
                            value={bookingDates.dropoffTime}
                            className="w-full h-9 px-2 bg-white border border-gray-200 rounded-[4px] text-[12px] font-bold text-gray-900 outline-none mt-1"
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
                    <ManifestItem label="Base Allocation (4 Days)" val={`$${priceSummary.baseRate}`} />
                    <ManifestItem label="Institutional Insurance" val={`$${priceSummary.insurance}`} />
                    <ManifestItem label="Operational Fee" val={`$${priceSummary.serviceFee}`} />
                    {priceSummary.extras > 0 && <ManifestItem label="Asset Enhancements" val={`$${priceSummary.extras}`} />}
                    
                    <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                         <span className="text-[14px] font-bold text-gray-900 uppercase tracking-widest">Total Liability</span>
                         <span className="text-[20px] font-black text-[#0a66c2]">${priceSummary.total}</span>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="space-y-2">
                    <button
                        onClick={handleBookNow}
                        className="w-full py-2.5 bg-[#0a66c2] text-white text-[14px] font-bold rounded-full hover:bg-[#004182] transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
                    >
                        Confirm Acquisition <ArrowRight size={16} />
                    </button>
                    <button className="w-full py-2 rounded-full border border-gray-200 text-gray-500 text-[12px] font-bold hover:bg-gray-50 transition-all">
                        Synchronize to Calendar
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
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
        <span className="text-[12px] font-black text-gray-900">{val}</span>
    </div>
);

const MetricItem = ({ Icon, label }) => (
    <div className="flex flex-col items-center">
        <Icon size={14} className="text-[#0a66c2] mb-1" />
        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
    </div>
);
