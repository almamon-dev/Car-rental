import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight, Quote, Star, Verified, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/Components/ui/Skeleton";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// testimonials removed from here, now using translations from context
const testimonialsImages = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
];

import { useLanguage } from "@/Contexts/LanguageContext";

export default function ClientsFeedback() {
    const { t } = useLanguage();
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="py-12 lg:py-16 bg-[#f3f2ef]/40 font-sans relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* --- EXECUTIVE HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-gray-200 pb-6 gap-4">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#0a66c2]" />
                            <span className="text-[10px] font-bold text-[#0a66c2]">{t.home.feedback.reputation}</span>
                        </div>
                        <h2 className="text-[26px] font-bold text-gray-900 tracking-tight leading-tight">
                            {t.home.feedback.title}
                        </h2>
                        <p className="text-[13px] text-gray-500 mt-2 font-medium leading-relaxed italic">{t.home.feedback.subtitle}</p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex gap-2">
                        <button
                            ref={prevRef}
                            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#0a66c2] hover:text-white transition-all duration-300 shadow-sm disabled:opacity-50"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            ref={nextRef}
                            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#0a66c2] hover:text-white transition-all duration-300 shadow-sm disabled:opacity-50"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* --- FEEDBACK SLIDER --- */}
                <div className="relative">
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white rounded-[16px] border border-gray-100 p-6 flex flex-col h-full shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Skeleton className="w-12 h-12 rounded-full" />
                                        <div className="flex-1">
                                            <Skeleton className="h-4 w-1/2 mb-2 rounded" />
                                            <Skeleton className="h-3 w-1/3 rounded" />
                                        </div>
                                    </div>
                                    <div className="space-y-3 flex-1 mb-6">
                                        <Skeleton className="h-3 w-full rounded" />
                                        <Skeleton className="h-3 w-full rounded" />
                                        <Skeleton className="h-3 w-2/3 rounded" />
                                    </div>
                                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <Skeleton className="h-3 w-1/4 rounded" />
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map(s => <Skeleton key={s} className="w-3 h-3 rounded-full" />)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Swiper
                            modules={[Navigation, Autoplay, Pagination]}
                            spaceBetween={24}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{ delay: 6000, disableOnInteraction: false }}
                            breakpoints={{
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            onSwiper={(swiper) => {
                                setTimeout(() => {
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    swiper.params.navigation.nextEl = nextRef.current;
                                    swiper.navigation.init();
                                    swiper.navigation.update();
                                });
                            }}
                            className="feedback-swiper !pb-12"
                        >
                            {t.home.feedback.testimonials.map((item, index) => (
                                <SwiperSlide key={index} className="h-auto">
                                    <div className="bg-white rounded-[16px] border border-gray-200 p-6 flex flex-col h-full transition-all duration-300 hover:shadow-md hover:border-[#0a66c2]/20 group relative overflow-hidden">
                                        
                                        {/* Pure Cinematic Quote Mark */}
                                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
                                            <Quote size={80} strokeWidth={1} />
                                        </div>
                                        {/* User Metadata Profile */}
                                        <div className="flex items-center gap-3 mb-6 relative">
                                            <div className="relative">
                                                <img 
                                                    src={testimonialsImages[index % testimonialsImages.length]} 
                                                    alt={item.name} 
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-gray-100"
                                                />
                                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                                    <Verified size={14} className="text-[#0a66c2] fill-[#0a66c2]/10" />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-[14px] font-bold text-gray-900 tracking-tight">{item.name}</h4>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[11px] font-bold text-[#0a66c2]">{item.company}</span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                    <span className="text-[11px] text-gray-500 font-medium">{item.role}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Narrative Content */}
                                        <div className="flex-1 mb-6 relative">
                                            <p className="text-[14px] leading-relaxed text-gray-600 font-medium italic group-hover:text-gray-900 transition-colors duration-300">
                                                "{item.content}"
                                            </p>
                                        </div>

                                        {/* Operational Rating Meter */}
                                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <Activity size={12} className="text-[#0a66c2]" />
                                                <span className="text-[10px] font-bold text-gray-400">{t.home.feedback.verification}</span>
                                            </div>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .feedback-swiper .swiper-pagination-bullet {
                    background: #0a66c2 !important;
                    opacity: 0.1;
                    width: 6px;
                    height: 6px;
                    transition: all 0.3s ease;
                }
                .feedback-swiper .swiper-pagination-bullet-active {
                    opacity: 1;
                    width: 20px;
                    border-radius: 4px;
                }
            ` }} />
        </section>
    );
}
