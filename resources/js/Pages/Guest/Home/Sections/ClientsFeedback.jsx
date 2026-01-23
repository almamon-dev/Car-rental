import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight, Quote, Star, Verified, Activity } from "lucide-react";
import { motion } from "framer-motion";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * CLIENT FEEDBACK DIRECTORY (LINKEDIN MASTER STYLE SYNC)
 * 
 * Philosophy:
 * - Style Match: Exact synchronization with Category.jsx and Cars.jsx.
 * - Modular Content: High-density testimonial cards with professional profiles.
 * - Narrative Integrity: Medium-weight italics for content, precise metadata for users.
 * - Palette: #f3f2ef/40 section background, pure white modular cards.
 */

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Procurement Lead",
        company: "Nexus Global",
        content: "The institutional workflow was remarkably efficient. All Tier-1 assets were delivered precisely according to our executive itinerary.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        rating: 5,
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Logistics Director",
        company: "Horizon Tech",
        content: "High-fidelity performance metrics. The BMW M8 deployment exceeded our operational standards for executive mobility.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        rating: 5,
    },
    {
        id: 3,
        name: "Emma Williams",
        role: "Strategic Consultant",
        company: "Veridian Group",
        content: "Direct manufacturer integration ensures zero logistical friction. A standardized benchmark for premium mobility solutions.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
        rating: 5,
    },
    {
        id: 4,
        name: "David Smith",
        role: "Operations Manager",
        company: "Stellar Logistics",
        content: "Transparent pricing protocols and verified asset status. The digital manifest system provides full operational transparency.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        rating: 5,
    },
];

export default function ClientsFeedback() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [isInit, setIsInit] = useState(false);

    useEffect(() => {
        setIsInit(true);
    }, []);

    return (
        <section className="py-4 bg-transparent overflow-hidden font-sans relative">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- ULTRA-COMPACT EXECUTIVE HEADER --- */}
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-3 bg-[#0a66c2] rounded-full" />
                            <span className="text-[9px] font-bold text-[#0a66c2] uppercase tracking-[0.2em]">Validated Feedback</span>
                        </div>
                        <h2 className="text-[20px] font-bold text-[#000000e6] tracking-tight">
                            Performance <span className="text-[#0a66c2]">Analytics</span>
                        </h2>
                    </div>

                    {/* Minimalist Controls */}
                    <div className="flex gap-1.5">
                        <button
                            ref={prevRef}
                            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            ref={nextRef}
                            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                <div className="relative group/swiper">
                    <Swiper
                        modules={[Navigation, Autoplay, Pagination]}
                        spaceBetween={14}
                        slidesPerView={1}
                        loop={true}
                        speed={800}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{
                            clickable: true,
                            el: ".custom-feedback-pagination",
                        }}
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
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="!pb-10"
                    >
                        {testimonials.map((item) => (
                            <SwiperSlide key={item.id} className="h-auto">
                                <motion.div 
                                    whileHover={{ y: -3 }}
                                    className="bg-white rounded-[12px] p-5 h-full border border-gray-200 flex flex-col relative group transition-all duration-300 shadow-sm"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex text-[#0a66c2] gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={10}
                                                    fill={i < item.rating ? "currentColor" : "none"}
                                                    className={i < item.rating ? "text-[#0a66c2]" : "text-gray-100"}
                                                />
                                            ))}
                                        </div>
                                        <Quote size={20} className="text-gray-50 rotate-180" />
                                    </div>

                                    <p className="text-[13px] text-gray-600 italic leading-relaxed mb-6 flex-1 font-medium">
                                        "{item.content}"
                                    </p>

                                    <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                                        <div className="shrink-0 w-9 h-9 rounded-full overflow-hidden border border-gray-100 p-0.5">
                                            <img
                                                src={item.avatar}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-900 text-[13px] leading-tight truncate">
                                                {item.name}
                                            </h4>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <span className="text-[9px] text-[#0a66c2] font-black uppercase tracking-tight truncate">
                                                    {item.role}
                                                </span>
                                                <div className="w-0.5 h-0.5 rounded-full bg-gray-200 shrink-0" />
                                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tight truncate">
                                                    {item.company}
                                                </span>
                                            </div>
                                        </div>
                                        <Verified size={12} className="text-blue-400 shrink-0" />
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="flex justify-center mt-0">
                        <div className="custom-feedback-pagination !static !w-auto flex gap-1"></div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-feedback-pagination .swiper-pagination-bullet {
                    width: 5px;
                    height: 5px;
                    background: #e2e8f0;
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                .custom-feedback-pagination .swiper-pagination-bullet-active {
                    background: #0a66c2 !important;
                    width: 14px;
                    border-radius: 3px;
                }
                .swiper-slide {
                    height: auto !important;
                }
            `}</style>
        </section>
    );
}
