import { motion } from "framer-motion";
import {
    MapPin,
    Star,
    CheckCircle2,
    ArrowLeft,
    ArrowRight,
    Search,
    ChevronRight,
    ShieldCheck,
    Heart
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
                            className="bg-white rounded overflow-hidden shadow-sm border border-gray-200 group transition-all duration-300 flex flex-col h-full relative"
                        >
                            {/* --- PREMIUM BADGE --- */}
                            <div className="absolute top-2 left-0 z-10">
                                <div className="bg-[#6e2594] text-white px-3 py-0.5 text-[11px] font-bold rounded-r-full shadow-sm">
                                    Save: ${Math.floor(Math.random() * 500) + 100}
                                </div>
                            </div>

                            {/* Save Badge Sync */}
                            <div className="absolute top-2 left-0 z-10">
                                <div className="bg-[#6e2594] text-white px-2.5 py-0.5 text-[10px] font-bold rounded-r-full shadow-sm">
                                    Save: ${Math.floor(Math.random() * 500) + 100}
                                </div>
                            </div>

                            {/* Cinematic Media Layer */}
                            <div className="relative aspect-[16/10] overflow-hidden bg-gray-50/50">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                />
                                
                                <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-y-[-5px] group-hover:translate-y-0 duration-300">
                                    <Heart size={15} />
                                </button>

                                {!car.isAvailable && (
                                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-md border border-white/10">
                                        Occupied
                                    </div>
                                )}
                            </div>

                            {/* Institutional Data Content */}
                            <div className="p-4 flex flex-col flex-1 border-t border-gray-50 text-left">
                                <div className="mb-4">
                                    <h3 className="text-[14px] font-bold text-gray-800 group-hover:text-[#0a66c2] transition-colors leading-tight line-clamp-2">
                                        {car.name}
                                    </h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <MapPin size={10} className="text-blue-500" />
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{car.location}</span>
                                    </div>
                                </div>

                                <ul className="space-y-1 text-[12.5px] text-gray-500 mb-4 list-none p-0">
                                    <li className="flex items-start gap-2">
                                        <span className="text-gray-300 transform translate-y-[2px]">•</span>
                                        <span>Brand: <span className="text-gray-700 font-medium">{car.brand || 'Asset'}</span></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-gray-300 transform translate-y-[2px]">•</span>
                                        <span>Verify: <span className="text-gray-700 font-medium">Certified Asset</span></span>
                                    </li>
                                </ul>

                                <div className="mt-auto border-t border-gray-100 pt-3 text-center">
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <span className="text-[17px] font-bold text-[#0a66c2]">${car.price}</span>
                                        <span className="text-[12px] text-gray-400 line-through font-medium leading-none">
                                            ${(Number(String(car.price).replace(/,/g, '')) + 200).toLocaleString()}
                                        </span>
                                    </div>
                                    
                                    <button
                                        disabled={!car.isAvailable}
                                        className={`w-full py-[5px] rounded-full border border-[#0a66c2] text-[#0a66c2] text-[14px] font-semibold transition-all flex items-center justify-center gap-1 ${
                                            car.isAvailable
                                                ? "hover:bg-[#f0f7ff] hover:shadow-[inset_0_0_0_1px_#0a66c2] active:scale-[0.98]"
                                                : "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100 opacity-50"
                                        }`}
                                    >
                                        {car.isAvailable ? "View Details" : "Protocol Busy"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
