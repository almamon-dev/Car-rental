import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowRight, Layers, Star, Info,Link } from "lucide-react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";

/**
 * LINKEDIN SHORT-CARD CATEGORY SLIDER
 * 
 * Design Philosophy:
 * - Professional Modules: Cards reflect the LinkedIn "People you may know" or "Interest" units.
 * - Concise Typography: Small, high-contrast text with tight leading.
 * - Action-First: Clear, repetitive interaction points (LinkedIn "Connect" style buttons).
 * - High-End Minimal: No shadows, light borders, subtle hover transitions.
 */
export default function CategorySlider() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [isInit, setIsInit] = useState(false);

    useEffect(() => {
        setIsInit(true);
    }, []);

    return (
        <section className="w-full bg-[#f3f2ef]/70 py-12 lg:py-20 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                
                {/* --- PROFESSIONAL HEADER --- */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-[20px] font-bold text-[#000000e6] leading-tight">
                            Explore Vehicle Categories
                        </h2>
                        <p className="text-[13px] text-gray-500 mt-1">Based on your professional travel needs</p>
                    </div>

                    {/* Minimalist Controls */}
                    <div className="flex gap-1.5">
                        <button
                            ref={prevRef}
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            ref={nextRef}
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* --- SHORT CARD SLIDER: CONFINED WITHIN 7XL --- */}
                <div className="relative group/swiper overflow-hidden">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={12}
                        slidesPerView={1.2}
                        loop={true}
                        speed={500}
                        autoplay={{ delay: 6000, disableOnInteraction: false }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onSwiper={(swiper) => {
                            if (prevRef.current && nextRef.current) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        }}
                        breakpoints={{
                            480: { slidesPerView: 2.2 },
                            768: { slidesPerView: 3.2 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 5 },
                        }}
                        className="w-full"
                    >
                        {categories.map((cat, i) => (
                            <SwiperSlide key={i}>
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="bg-white rounded-[12px] border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full group"
                                >
                                    {/* --- ULTRA-COMPACT CINEMATIC MEDIA --- */}
                                    <div className="relative aspect-[21/9] bg-gray-900 overflow-hidden">
                                        <motion.img
                                            src={cat.img}
                                            alt={cat.name}
                                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
                                            whileHover={{ 
                                                scale: 1.2,
                                                x: [0, -5, 5, 0], // Subtle cinematic vibration/shift
                                            }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                        
                                        {/* Interactivity: Dynamic Light Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a66c2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        
                                        {/* Quick Link Badge */}
                                        <div className="absolute top-2 right-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg">
                                                <Star size={10} className="text-[#0a66c2] fill-[#0a66c2]" />
                                            </div>
                                        </div>

                                        {/* Center Action (Super Interactive) */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/10 backdrop-blur-[2px]">
                                            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-500">
                                                <ArrowRight size={18} className="text-[#0a66c2]" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- COMPACT PROFESSIONAL CONTENT --- */}
                                    <div className="p-4 flex flex-col items-center text-center flex-1">
                                        <div className="mb-1 w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#0a66c2] -mt-10 relative z-10 border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.06)] group-hover:border-[#0a66c2] transition-colors duration-500">
                                            <Layers size={20} />
                                        </div>
                                        
                                        <h4 className="text-[14px] font-bold text-gray-900 mb-0.5 mt-2 transition-colors duration-300 group-hover:text-[#0a66c2]">
                                            {cat.name}
                                        </h4>
                                        <div className="flex items-center gap-1.5 mb-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[11px] font-bold text-gray-400">
                                                {cat.count} Active Units
                                            </span>
                                        </div>
                                        
                                        <p className="text-[12px] text-gray-400 line-clamp-2 leading-relaxed mb-4 group-hover:text-gray-500 transition-colors">
                                            {cat.description}
                                        </p>

                                        {/* Authentic LinkedIn Style Secondary Button */}
                                        <div className="mt-auto w-full">
                                            <button className="w-full py-[5px] px-4 rounded-full border border-[#0a66c2] text-[#0a66c2] text-[14px] font-semibold hover:bg-[#f0f7ff] hover:shadow-[inset_0_0_0_1px_#0a66c2] transition-all duration-200 active:scale-[0.98]">
                                                View Collection
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx global>{`
                .swiper-slide {
                    height: auto !important;
                }
            `}</style>
        </section>
    );
}

const categories = [
    {
        name: "Luxury Sedan",
        count: "24",
        img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
        description: "Premium comfort and refined engineering for corporate travel.",
    },
    {
        name: "Sports Fleet",
        count: "12",
        img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
        description: "High-performance prestige for an unmatched driving experience.",
    },
    {
        name: "Executive SUVs",
        count: "48",
        img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
        description: "Robust, versatile, and commanding presence across any terrain.",
    },
    {
        name: "Electric Innovation",
        count: "18",
        img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800",
        description: "Silent luxury and sustainable performance for the modern leader.",
    },
    {
        name: "Convertible Select",
        count: "10",
        img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800",
        description: "Open-air freedom meets executive class for premium getaways.",
    },
    {
        name: "Minivan Executive",
        count: "15",
        img: "https://images.unsplash.com/photo-1517672791490-32b95141f283?w=800",
        description: "Spacious luxury for team transit and group executive roadshows.",
    },
    {
        name: "Compact Premium",
        count: "30",
        img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800",
        description: "Agile, efficient, yet uncompromising on premium materials and tech.",
    }
];
