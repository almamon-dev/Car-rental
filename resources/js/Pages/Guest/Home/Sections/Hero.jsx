import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { 
    Search, 
    MapPin, 
    ChevronDown, 
    ChevronRight,
    Car
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/Components/ui/DropdownMenu";

import { useLanguage } from "@/Contexts/LanguageContext";

export default function Hero({ locations }) {
    const { t } = useLanguage();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleSearch = () => {
        const params = {};
        if (searchQuery) params.search = searchQuery;
        if (selectedLocation) params.location = selectedLocation.id;
        
        router.get(route('car.list'), params);
    };

    return (
        <section className="w-full bg-transparent pt-4 pb-8 lg:pt-8 lg:pb-12 relative overflow-hidden font-sans">
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
                            <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">{t.hero.status}</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[32px] sm:text-[42px] font-black leading-[1.1] text-gray-900 mb-6 tracking-tight"
                        >
                            {t.hero.title}
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-[16px] text-gray-500 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10"
                        >
                            {t.hero.subtitle}
                        </motion.p>

                        {/* --- MASTER-GRADE LINKEDIN SEARCH BAR --- */}
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative max-w-[620px] mx-auto lg:mx-0"
                        >
                            <div className={`group relative flex flex-col sm:flex-row items-stretch sm:items-center bg-[#edf3f8] hover:bg-[#e4ebf2] rounded-2xl transition-all duration-300 border border-transparent ${
                                isSearchFocused ? "bg-white !border-[#0a66c2] ring-[4px] ring-blue-100 shadow-xl scale-[1.01]" : ""
                            }`}>
                                <div className="flex-1 flex items-stretch min-w-0">
                                    {/* Brand Search Component */}
                                    <div className="flex-1 flex items-center gap-3 px-5 py-4 cursor-text border-b sm:border-b-0 sm:border-r border-gray-300/40">
                                        <Search 
                                            size={20} 
                                            className={`transition-colors duration-300 ${isSearchFocused ? "text-[#0a66c2]" : "text-gray-500"}`} 
                                        />
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <label className="text-[10px] font-black text-[#0a66c2] leading-none mb-1.5 uppercase tracking-widest opacity-80">{t.hero.find_vehicle}</label>
                                            <input 
                                                type="text" 
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="e.g. BMW, Mercedes..." 
                                                onFocus={() => setIsSearchFocused(true)}
                                                onBlur={() => setIsSearchFocused(false)}
                                                className="bg-transparent border-none outline-none p-0 text-[15px] font-bold text-gray-900 placeholder:text-gray-400 focus:ring-0 w-full"
                                            />
                                        </div>
                                    </div>

                                    {/* Location Search Component */}
                                    <div className="flex-1 flex items-center gap-3 px-5 py-4">
                                        <MapPin size={20} className="text-gray-400" />
                                        <div className="flex flex-col flex-1 min-w-0 text-left">
                                            <label className="text-[10px] font-black text-gray-400 leading-none mb-1.5 uppercase tracking-widest opacity-80">{t.hero.pickup_location}</label>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="h-auto p-0 border-none bg-transparent flex items-center justify-between w-full hover:bg-transparent focus:ring-0">
                                                    <span className={`text-[15px] font-bold truncate ${selectedLocation ? "text-gray-900" : "text-gray-400"}`}>
                                                        {selectedLocation ? selectedLocation.name : t.hero.select_branch}
                                                    </span>
                                                    <ChevronDown size={14} className="text-gray-400 ml-1 shrink-0" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-[240px] mt-2 shadow-2xl rounded-xl border-gray-100 bg-white/95 backdrop-blur-md">
                                                    <DropdownMenuItem 
                                                        onClick={() => setSelectedLocation(null)}
                                                        active={!selectedLocation}
                                                        className="font-bold text-[13px]"
                                                    >
                                                        {t.hero.all_locations}
                                                    </DropdownMenuItem>
                                                    {locations?.map((loc) => (
                                                        <DropdownMenuItem
                                                            key={loc.id}
                                                            onClick={() => setSelectedLocation(loc)}
                                                            active={selectedLocation?.id === loc.id}
                                                            className="font-bold text-[13px]"
                                                        >
                                                            {loc.name}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </div>

                                {/* LinkedIn Primary Button Sync */}
                                <div className="p-2 sm:pr-2 sm:pl-1">
                                    <button 
                                        onClick={handleSearch}
                                        className="w-full sm:w-auto bg-[#0a66c2] hover:bg-[#004182] text-white px-8 py-3.5 rounded-xl font-black text-[14px] transition-all flex items-center justify-center gap-2 active:scale-[0.97] shadow-lg shadow-blue-500/20 uppercase tracking-wider"
                                    >
                                        <span>{t.hero.explore_now}</span>
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
                                <span>{t.hero.explore_all}</span>
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
                                <span className="text-[11px] font-bold text-gray-900">{t.hero.featured}: BMW M8</span>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
