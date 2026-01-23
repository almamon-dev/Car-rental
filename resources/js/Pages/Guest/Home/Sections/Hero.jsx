import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { 
    Search, 
    MapPin, 
    ChevronRight, 
    Car
} from "lucide-react";

/**
 * REFINED PROFESSIONAL HERO (Ultra-Minimal Right Side)
 * 
 * Philosophy:
 * - Left-side focus: Narrative, Search, and Brand Quick-Links.
 * - Right-side minimalism: Clean, un-cluttered image presentation.
 * - LinkedIn-level density: Small text, tight spacing.
 */
export default function Hero() {
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <section className="w-full bg-transparent pt-8 pb-8 lg:pt-14 lg:pb-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                    
                    {/* --- LEFT: Narrative, Search & Brands --- */}
                    <div className="w-full lg:w-[620px] shrink-0 text-center lg:text-left">
                        
                        {/* Status Line */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center lg:justify-start gap-2 mb-4"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-[12px] font-bold text-gray-500">Online: 12 Elite Cars</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[32px] sm:text-[42px] font-bold leading-[1.2] text-gray-900 mb-4"
                        >
                            Professional car rentals for your <span className="text-[#0a66c2]">next journey</span>.
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-[15px] text-gray-500 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8"
                        >
                            Premium executive rentals for global leaders. Experience seamless on-demand delivery and 24/7 concierge support.
                        </motion.p>

                        {/* --- MASTER-GRADE LINKEDIN SEARCH BAR --- */}
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative max-w-[580px] mx-auto lg:mx-0"
                        >
                            <div className={`group relative flex items-center bg-[#edf3f8] hover:bg-[#e4ebf2] rounded-xl transition-all duration-300 border border-transparent ${
                                isSearchFocused ? "bg-white !border-[#0a66c2] ring-[4px] ring-blue-100 shadow-lg scale-[1.01]" : ""
                            }`}>
                                <div className="flex-1 flex items-center min-w-0">
                                    {/* Brand Search Component */}
                                    <div className="flex-1 flex items-center gap-3 px-4 py-3.5 cursor-text">
                                        <Search 
                                            size={18} 
                                            className={`transition-colors duration-300 ${isSearchFocused ? "text-[#0a66c2]" : "text-gray-500"}`} 
                                        />
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <label className="text-[10px] font-bold text-[#0a66c2] leading-none mb-1 opacity-90">Find Vehicle</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. BMW, Mercedes..." 
                                                onFocus={() => setIsSearchFocused(true)}
                                                onBlur={() => setIsSearchFocused(false)}
                                                className="bg-transparent border-none outline-none p-0 text-[15px] font-semibold text-gray-900 placeholder:text-gray-400 focus:ring-0 w-full"
                                            />
                                        </div>
                                    </div>

                                    {/* Subtle Vertical Divider */}
                                    <div className="h-8 w-[1px] bg-gray-300/40" />

                                    {/* Location Search Component (Hidden on small screens for purity) */}
                                    <div className="hidden sm:flex flex-1 items-center gap-3 px-4 py-3.5 cursor-text">
                                        <MapPin size={18} className="text-gray-400" />
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <label className="text-[10px] font-bold text-gray-400 leading-none mb-1 opacity-90">Pick-up</label>
                                            <input 
                                                type="text" 
                                                placeholder="Selection Location" 
                                                onFocus={() => setIsSearchFocused(true)}
                                                onBlur={() => setIsSearchFocused(false)}
                                                className="bg-transparent border-none outline-none p-0 text-[15px] font-semibold text-gray-900 placeholder:text-gray-400 focus:ring-0 w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* LinkedIn Primary Button Sync */}
                                <div className="pr-1.5 pl-1">
                                    <button className="bg-[#0a66c2] hover:bg-[#004182] text-white px-7 py-2.5 rounded-full font-bold text-[14px] transition-all flex items-center gap-2 active:scale-[0.98]">
                                        <span>Search Assets</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>


                        {/* --- MINI BRAND TAGS (TABS) --- */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 flex flex-wrap justify-center lg:justify-start gap-2.5"
                        >
                            {["BMW", "Mercedes", "Audi", "Porsche", "Tesla", "Lexus"].map(brand => (
                                <button 
                                    key={brand}
                                    className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] font-bold text-gray-600 hover:border-[#0a66c2] hover:text-[#0a66c2] transition-all shadow-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#0a66c2]" />
                                    {brand}
                                </button>
                            ))}
                            <Link href={route('car.list')} className="px-3 py-1.5 text-[12px] font-bold text-[#0a66c2] flex items-center gap-1 hover:underline">
                                <span>Explore All</span>
                                <ChevronRight size={14} />
                            </Link>
                        </motion.div>
                    </div>

                    {/* --- RIGHT: PURE IMAGE MINIMALISM --- */}
                    <div className="w-full lg:flex-1 relative">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-2xl bg-white">
                                <img 
                                    src="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop" 
                                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-1000"
                                    alt="Luxury Vehicle"
                                />
                            </div>
                            
                            {/* Minimalism: Just one very discreet car label */}
                            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm flex items-center gap-2">
                                <Car size={14} className="text-[#0a66c2]" />
                                <span className="text-[11px] font-bold text-gray-900">Featured: BMW M8</span>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
