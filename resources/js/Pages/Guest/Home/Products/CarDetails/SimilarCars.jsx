import { motion } from "framer-motion";
import {
    MapPin,
    Star,
    CheckCircle2,
    ArrowLeft,
    ArrowRight,
    Search,
    ChevronRight,
    ShieldCheck
} from "lucide-react";
import { similarCars } from "./data";

/**
 * INSTITUTIONAL RECOMMENDATION RAIL (LINKEDIN MASTER STYLE SYNC)
 * 
 * Philosophy:
 * - High Density: Tighter cards and shrunken metadata.
 * - Style Match: LinkedIn Primary Button protocol and rounded-12 modular cards.
 * - Institutional: Focused on verified status and professional deployment rates.
 */

export default function SimilarCars() {
    return (
        <section className="bg-[#f3f2ef]/40 py-16 border-t border-gray-200 font-sans">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- COMPACT EXECUTIVE HEADER (MATCH SYNC) --- */}
                <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-5">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-3 bg-[#0a66c2] rounded-full" />
                            <span className="text-[10px] font-bold text-[#0a66c2] uppercase tracking-[0.2em]">Asset Recommendations</span>
                        </div>
                        <h2 className="text-[22px] font-bold text-[#000000e6] tracking-tight">
                            Similar <span className="text-[#0a66c2]">Institutional Fleet</span>
                        </h2>
                        <p className="text-[12.5px] text-gray-500 mt-1 font-medium italic">Discover alternative verified assets within your professional network.</p>
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

                {/* --- RECOMMENDATION GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {similarCars.map((car) => (
                        <motion.div
                            key={car.id}
                            whileHover={{ y: -4 }}
                            className="bg-white rounded-[12px] border border-gray-200 overflow-hidden shadow-sm group transition-all duration-300"
                        >
                            {/* Cinematic Media Layer */}
                            <div className="relative aspect-[16/9] overflow-hidden bg-gray-900">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                {!car.isAvailable && (
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-md border border-white/10">
                                        Occupied
                                    </div>
                                )}
                                <div className="absolute bottom-2 left-2">
                                    <div className="px-2 py-1 bg-[#0a66c2] text-white text-[9px] font-black uppercase tracking-widest rounded shadow-lg">
                                        {car.brand}
                                    </div>
                                </div>
                            </div>

                            {/* Institutional Data Content */}
                            <div className="p-4 flex flex-col h-full">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="space-y-0.5">
                                        <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-[#0a66c2] transition-colors leading-tight">
                                            {car.name}
                                        </h3>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={10} className="text-blue-500" />
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{car.location}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-gray-100">
                                        <Star size={10} fill="#0a66c2" className="text-[#0a66c2]" />
                                        <span className="text-[11px] font-black text-gray-900">{car.rating}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6 flex-1">
                                    <div className="flex flex-wrap gap-2">
                                        {car.features.slice(0, 2).map((feature, idx) => (
                                            <span
                                                key={idx}
                                                className="flex items-center gap-1 text-[11px] font-bold text-gray-500"
                                            >
                                                <div className="w-1 h-1 rounded-full bg-green-500" />
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-black text-gray-900">${car.price}</span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reserve Rate</span>
                                        </div>
                                        <div className="bg-[#f3f7fb] p-1.5 rounded-lg">
                                            <ShieldCheck size={14} className="text-[#0a66c2]" />
                                        </div>
                                    </div>
                                </div>

                                {/* LinkedIn Primary Button Protocol */}
                                <button
                                    disabled={!car.isAvailable}
                                    className={`w-full py-2 rounded-full font-bold text-[13px] transition-all flex items-center justify-center gap-1 ${
                                        car.isAvailable
                                            ? "bg-[#0a66c2] text-white hover:bg-[#004182] shadow-sm active:scale-[0.98]"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    {car.isAvailable
                                        ? "Initiate Profile"
                                        : "Protocol Busy"}
                                    {car.isAvailable && <ChevronRight size={14} />}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
