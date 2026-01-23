import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Verified } from "lucide-react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";

/**
 * TRUSTED BRANDS SLIDER (CATEGORY STYLE SYNC)
 * 
 * Design Philosophy:
 * - Style Match: Exact typography and interaction logic from Category.jsx.
 * - Cinematic Hover: Vibration/Shift effect + Center Backdrop-blur action.
 * - Concise Typography: 14px bold titles, 12px leading-relaxed subtext.
 * - LinkedIn Palette: #f3f2ef section, white modular cards, precise typography.
 */

const brands = [
    {
        name: "Porsche",
        cars: 12,
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Porsche_logo.svg",
        img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
        description: "German engineering excellence in performance assets."
    },
    {
        name: "BMW",
        cars: 48,
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
        img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
        description: "The definitive standard for executive luxury mobility."
    },
    {
        name: "Mercedes",
        cars: 35,
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Benz_logo.svg",
        img: "https://images.unsplash.com/photo-1541443131876-44b035dd1c51?w=800",
        description: "Uncompromising comfort and prestige for global leaders."
    },
    {
        name: "Tesla",
        cars: 24,
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
        img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800",
        description: "Next-generation energy and innovation in travel."
    },
    {
        name: "Audi",
        cars: 30,
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg",
        img: "https://images.unsplash.com/photo-1603584173870-7f3bc1707294?w=800",
        description: "Sophisticated technology meets sleek professional design."
    },
    {
        name: "Lexus",
        cars: 20,
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Lexus_logo.svg",
        img: "https://images.unsplash.com/photo-1542362567-b05503f3f5f4?w=800",
        description: "Refined hybrid performance and institutional reliability."
    }
];

export default function TrustedBrands() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [isInit, setIsInit] = useState(false);

    useEffect(() => {
        setIsInit(true);
    }, []);

    return (
        <section className="w-full bg-[#f3f2ef]/40 py-12 lg:py-16 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- PROFESSIONAL HEADER --- */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Verified size={14} className="text-[#0a66c2]" />
                            <span className="text-[10px] font-bold text-[#0a66c2] uppercase tracking-[0.2em]">Authorized Fleet</span>
                        </div>
                        <h2 className="text-[20px] font-bold text-[#000000e6] leading-tight">
                            World-Class Trusted Brands
                        </h2>
                        <p className="text-[13px] text-gray-500 mt-1">Directly integrated with elite automotive manufacturers</p>
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

                {/* --- BRAND SLIDER: CATEGORY STYLE SYNC --- */}
                <div className="relative group/swiper">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={12}
                        slidesPerView={1.2}
                        loop={true}
                        speed={500}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
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
                        {brands.map((brand, i) => (
                            <SwiperSlide key={i}>
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="bg-white rounded-[12px] border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full group"
                                >
                                    {/* --- CINEMATIC MEDIA (CATEGORY STYLE) --- */}
                                    <div className="relative aspect-[16/9] bg-gray-900 overflow-hidden">
                                        <motion.img
                                            src={brand.img}
                                            alt={brand.name}
                                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
                                            whileHover={{ 
                                                scale: 1.25,
                                                x: [0, -5, 5, 0], // Vibration Sync
                                            }}
                                            transition={{ duration: 1.2, ease: "easeOut" }}
                                        />
                                        
                                        {/* Style Match Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a66c2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/10 backdrop-blur-[2px]">
                                            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-500">
                                                <ArrowRight size={18} className="text-[#0a66c2]" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- COMPACT PROFESSIONAL CONTENT (CATEGORY STYLE) --- */}
                                    <div className="p-4 flex flex-col items-center text-center flex-1">
                                        {/* Floating Logo Box (Floating Symbol Match) */}
                                        <div className="mb-1 w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2.5 -mt-10 relative z-10 border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.06)] group-hover:border-[#0a66c2] transition-colors duration-500">
                                            <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        </div>
                                        
                                        <h4 className="text-[14px] font-bold text-gray-900 mb-0.5 mt-2 transition-colors duration-300 group-hover:text-[#0a66c2]">
                                            {brand.name} Fleet
                                        </h4>
                                        <div className="flex items-center gap-1.5 mb-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[11px] font-bold text-gray-400">
                                                {brand.cars} Verified Units
                                            </span>
                                        </div>
                                        
                                        <p className="text-[12px] text-gray-400 line-clamp-2 leading-relaxed mb-4 group-hover:text-gray-500 transition-colors">
                                            {brand.description}
                                        </p>

                                        {/* Action Button: Exact Style Match */}
                                        <div className="mt-auto w-full">
                                            <button className="w-full py-[5px] px-4 rounded-full border border-[#0a66c2] text-[#0a66c2] text-[14px] font-semibold hover:bg-[#f0f7ff] hover:shadow-[inset_0_0_0_1px_#0a66c2] transition-all duration-200 active:scale-[0.98]">
                                                View Brand
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
