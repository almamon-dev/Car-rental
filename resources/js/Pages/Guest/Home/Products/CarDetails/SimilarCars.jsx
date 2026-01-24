import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import {
    MapPin,
    Star,
    CheckCircle2,
    ArrowLeft,
    ArrowRight,
    Search,
    ChevronRight,
    ShieldCheck,
    Heart,
    Activity,
    Settings,
    Fuel
} from "lucide-react";
import { similarCars } from "./data";
import { useLanguage } from "@/Contexts/LanguageContext";

/**
 * INSTITUTIONAL RECOMMENDATION RAIL (LINKEDIN MASTER STYLE SYNC)
 * 
 * Philosophy:
 * - High Density: Tighter cards and shrunken metadata.
 * - Style Match: LinkedIn Primary Button protocol and rounded-12 modular cards.
 * - Institutional: Focused on verified status and professional deployment rates.
 */

export default function SimilarCars() {
    const { t } = useLanguage();
    return (
        <section className="bg-[#f3f2ef]/40 py-16 border-t border-gray-200 font-sans">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-5">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-3 bg-[#0a66c2] rounded-full" />
                            <span className="text-[10px] font-bold text-[#0a66c2] uppercase tracking-[0.2em]">{t.details.similar_cars.recommended}</span>
                        </div>
                        <h2 className="text-[22px] font-bold text-[#000000e6] tracking-tight">
                            {t.details.similar_cars.title} <span className="text-[#0a66c2]">{t.details.similar_cars.accent}</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 hover:text-[#0a66c2] hover:border-[#0a66c2] transition-all shadow-sm active:scale-95">
                            <ArrowLeft size={16} />
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 hover:text-[#0a66c2] hover:border-[#0a66c2] transition-all shadow-sm active:scale-95">
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {/* --- GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {similarCars.map((car) => (
                        <div
                            key={car.id}
                            className="bg-white rounded-[12px] border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full group transition-all duration-300 relative"
                        >
                            {/* --- SAVE BADGE (RIBBON STYLE) --- */}
                            <div className="absolute top-3 left-0 z-10">
                                <div className="bg-[#0a66c2] text-white px-4 py-1 text-[12px] font-bold rounded-r-full shadow-md tracking-wide">
                                    {t.details.similar_cars.save}: ৳{(Number(String(car.price).replace(/,/g, '')) * 0.2).toLocaleString()}
                                </div>
                            </div>

                            {/* Media Layer */}
                            <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                                />
                                
                                <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-sm opacity-0 group-hover:opacity-100 duration-300">
                                    <Heart size={15} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col flex-1 text-left">
                                <div className="mb-4">
                                    <h3 className="text-[14px] font-bold text-gray-800 group-hover:text-[#0a66c2] transition-colors leading-tight line-clamp-2">
                                        {car.name}
                                    </h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <MapPin size={10} className="text-gray-400" />
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{car.location}</span>
                                    </div>
                                </div>

                                {/* Specs List */}
                                <div className="space-y-1.5 mb-5 border-t border-gray-50 pt-3">
                                    <ListSpec Icon={Activity} label={t.listing.ops_range} val={car.specifications?.mileage || 'N/A'} />
                                    <ListSpec Icon={Settings} label={t.listing.transmission} val={car.specifications?.transmission || 'Auto'} />
                                    <ListSpec Icon={Fuel} label={t.listing.energy_arch} val={car.specifications?.fuel_type || 'N/A'} />
                                </div>

                                {/* Key Highlights */}
                                {car.features && car.features.length > 0 && (
                                    <div className="mb-5">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">{t.listing.key_highlights}</span>
                                        <div className="grid grid-cols-1 gap-1">
                                            {car.features.slice(0, 3).map((feat, idx) => (
                                                <div key={idx} className="flex items-center gap-1.5">
                                                     <div className="w-1 h-1 rounded-full bg-[#0a66c2]" />
                                                     <span className="text-[11px] font-bold text-gray-600 line-clamp-1">{feat.feature_name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-auto border-t border-gray-100 pt-3 text-center">
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <span className="text-[17px] font-bold text-[#0a66c2]">৳{car.price}</span>
                                        <span className="text-[12px] text-gray-400 line-through font-medium leading-none">
                                            ৳{(Number(String(car.price).replace(/,/g, '')) * 1.25).toLocaleString()}
                                        </span>
                                    </div>
                                    
                                    <Link
                                        href={`${route('car.details', car.slug)}#${Array.from({length:250}, () => 'abcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 36))).join('')}`}
                                        className={`w-full py-[5px] rounded-full border border-[#0a66c2] text-[#0a66c2] text-[14px] font-semibold transition-all flex items-center justify-center gap-1 ${
                                            car.isAvailable
                                                ? "hover:bg-[#f0f7ff] hover:shadow-[inset_0_0_0_1px_#0a66c2] active:scale-[0.98]"
                                                : "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100 opacity-50"
                                        }`}
                                    >
                                        {car.isAvailable ? t.listing.view_details : t.details.similar_cars.protocol_busy}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const ListSpec = ({ Icon, label, val }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Icon size={12} className="text-gray-400" />
            <span className="text-[12px] font-medium text-gray-500">{label}</span>
        </div>
        <span className="text-[12px] font-bold text-gray-800">{val}</span>
    </div>
);
