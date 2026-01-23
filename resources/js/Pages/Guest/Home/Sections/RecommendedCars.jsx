import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import {
    ChevronLeft,
    ChevronRight,
    Heart,
    MapPin,
    Star,
    Settings2,
    Gauge,
    Fuel,
    Calendar,
    ArrowRight,
    Verified,
    ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";

/**
 * RECOMMENDED ASSETS (LINKEDIN MASTER STYLE SYNC)
 * 
 * Philosophy:
 * - Style Match: 1:1 synchronization with Category.jsx and Cars.jsx.
 * - Cinematic Assets: 16:10 wide-angle vibration hover.
 * - Technical Integrity: Precise data manifest without bulky icons.
 * - Palette: #f3f2ef/40 section background, pure white modular cards.
 */

const dummyCars = [
    {
        id: 1,
        name: "BMW M8 Competition",
        brand: "BMW",
        price: 380,
        year: "2023",
        mileage: "1.2K KM",
        transmission: "M-Step",
        fuel: "Petrol",
        location: "Financial",
        rating: 5.0,
        img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
        status: "Certified",
    },
    {
        id: 2,
        name: "Porsche Taycan Turbo S",
        brand: "Porsche",
        price: 450,
        year: "2024",
        mileage: "240 KM",
        transmission: "Auto",
        fuel: "Electric",
        location: "Downtown",
        rating: 4.9,
        img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80",
        status: "Active",
    },
    {
        id: 3,
        name: "Audi RS e-tron GT",
        brand: "Audi",
        price: 410,
        year: "2024",
        mileage: "500 KM",
        transmission: "Auto",
        fuel: "Electric",
        location: "Gateway",
        rating: 5.0,
        img: "https://images.unsplash.com/photo-1603584173870-7f3bc1707294?auto=format&fit=crop&w=800&q=80",
        status: "Verified",
    },
    {
        id: 4,
        name: "Tesla Model S Plaid",
        brand: "Tesla",
        price: 260,
        year: "2024",
        mileage: "110 KM",
        transmission: "Auto",
        fuel: "Electric",
        location: "Tech Val",
        rating: 4.8,
        img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80",
        status: "Certified",
    },
    {
        id: 5,
        name: "Mercedes S-Class 500",
        brand: "Mercedes",
        price: 490,
        year: "2023",
        mileage: "2.1K KM",
        transmission: "9G-Tr",
        fuel: "Petrol",
        location: "Capital",
        rating: 4.7,
        img: "https://images.unsplash.com/photo-1541443131876-44b035dd1c51?auto=format&fit=crop&w=800&q=80",
        status: "Active",
    }
];

export default function RecommendedCars() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [isInit, setIsInit] = useState(false);

    useEffect(() => {
        setIsInit(true);
    }, []);

    return (
        <section className="py-12 lg:py-16 overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- COMPACT EXECUTIVE HEADER (MATCH SYNC) --- */}
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-5">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-3 bg-[#0a66c2] rounded-full" />
                            <span className="text-[10px] font-bold text-[#0a66c2] uppercase tracking-[0.2em]">Institutional Matrix</span>
                        </div>
                        <h2 className="text-[22px] font-bold text-[#000000e6] tracking-tight">
                            Personalized Asset <span className="text-[#0a66c2]">Suggestions</span>
                        </h2>
                        <p className="text-[12.5px] text-gray-500 mt-1 font-medium italic">High-fidelity recommendations based on your professional deployment history.</p>
                    </div>

                    {/* Minimalist Controls */}
                    <div className="flex gap-2">
                        <button
                            ref={prevRef}
                            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            ref={nextRef}
                            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* --- CARDS SLIDER --- */}
                <div className="relative group/swiper">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={14}
                        slidesPerView={1.2}
                        loop={true}
                        speed={600}
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
                        }}
                        className="w-full"
                    >
                        {dummyCars.map((car, i) => (
                            <SwiperSlide key={i}>
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="bg-white rounded-[12px] border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full group transition-all duration-300"
                                >
                                    {/* --- MEDIA (EXACT SYNC - 16:10) --- */}
                                    <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden">
                                        <motion.img
                                            src={car.img}
                                            alt={car.name}
                                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
                                            whileHover={{ 
                                                scale: 1.2,
                                                x: [0, -5, 5, 0], // Cinematic Vibration
                                            }}
                                            transition={{ duration: 1.2, ease: "easeOut" }}
                                        />
                                        
                                        {/* Status Badge Sync */}
                                        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                                             <div className="bg-white/95 px-2 py-0.5 rounded-md text-[9px] font-bold text-gray-900 border border-gray-100 shadow-sm flex items-center gap-1.5">
                                                 <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                                                 {car.status}
                                             </div>
                                        </div>

                                        <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 duration-300">
                                            <Heart size={14} />
                                        </button>

                                        {/* Light Overlay & Center Action */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a66c2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/10 backdrop-blur-[2px]">
                                            <div className="w-10 h-10 rounded-full bg-white/95 flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-500 shadow-lg">
                                                <ArrowRight size={18} className="text-[#0a66c2]" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- CONTENT (EXACT SYNC) --- */}
                                    <div className="p-4 flex flex-col items-center text-center flex-1">
                                        <div className="w-full mb-3">
                                            <h4 className="text-[14px] font-bold text-gray-900 mb-0.5 group-hover:text-[#0a66c2] transition-colors line-clamp-1">
                                                {car.name}
                                            </h4>
                                            <div className="flex items-center justify-center gap-1.5 uppercase tracking-widest text-[10px] font-bold text-gray-400">
                                                 <span>{car.brand}</span>
                                                 <div className="w-1 h-1 rounded-full bg-gray-200" />
                                                 <MapPin size={10} className="text-blue-500" />
                                                 <span>{car.location}</span>
                                            </div>
                                        </div>

                                        {/* TECHNICAL MANIFEST (COMPACT) */}
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 w-full py-3 border-y border-gray-50 mb-4 bg-slate-50/20 -mx-4 px-4">
                                            <SpecItem val={car.year} label="Series" />
                                            <SpecItem val={car.mileage} label="Mileage" />
                                            <SpecItem val={car.transmission} label="Trans" />
                                            <SpecItem val={car.fuel} label="Grade" />
                                        </div>

                                        {/* Pricing & CTA */}
                                        <div className="mt-auto w-full">
                                            <div className="flex items-center justify-between mb-3 px-1">
                                                <div className="flex flex-col items-start leading-none gap-1">
                                                    <span className="text-[16px] font-black text-gray-900">${car.price}</span>
                                                    <span className="text-[9px] text-gray-400 uppercase tracking-widest leading-none">per 24h</span>
                                                </div>
                                                <div className="flex items-center gap-0.5">
                                                     <Star size={10} fill="#0a66c2" className="text-[#0a66c2]" />
                                                     <span className="text-[10px] font-black text-gray-900">{car.rating}</span>
                                                </div>
                                            </div>
                                            
                                            {/* EXACT BUTTON STYLE MATCH */}
                                            <button className="w-full py-[6px] px-4 rounded-full border border-[#0a66c2] text-[#0a66c2] text-[13px] font-bold hover:bg-[#f0f7ff] hover:shadow-[inset_0_0_0_1px_#0a66c2] transition-all duration-200 active:scale-[0.98]">
                                                Acquire Profile
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

const SpecItem = ({ val, label }) => (
    <div className="flex flex-col items-start leading-none text-left">
        <span className="text-[11px] font-bold text-gray-900 truncate mb-0.5">{val}</span>
        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">{label}</span>
    </div>
);
