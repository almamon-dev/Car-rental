import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import {
    ChevronLeft,
    ChevronRight,
    Heart,
    MapPin,
    Star,
    ArrowRight,
} from "lucide-react";
import { Skeleton } from "@/Components/ui/Skeleton";

import "swiper/css";
import "swiper/css/navigation";

import { Link } from "@inertiajs/react";

export default function RecommendedCars({ cars = [] }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // If no cars passed, we can show a placeholder or nothing
    if (!cars || cars.length === 0) return null;

    return (
        <section className="py-12 lg:py-16 overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- COMPACT EXECUTIVE HEADER (MATCH SYNC) --- */}
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-5">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-3 bg-[#0a66c2] rounded-full" />
                            <span className="text-[10px] font-bold text-[#0a66c2]">Institutional Matrix</span>
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
                        loop={cars.length > 6}
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
                        {isLoading 
                            ? [...Array(4)].map((_, i) => (
                                <SwiperSlide key={`skel-${i}`}>
                                    <CarSkeleton />
                                </SwiperSlide>
                              ))
                            : cars.map((car, i) => (
                            <SwiperSlide key={i}>
                                <div
                                    className="bg-white rounded-[12px] border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full group transition-all duration-300 hover:-translate-y-1 hover:shadow-md relative"
                                >
                                    {/* Save Badge Sync */}
                                    <div className="absolute top-2 left-0 z-10">
                                        <div className="bg-[#6e2594] text-white px-2.5 py-0.5 text-[10px] font-bold rounded-r-full shadow-sm">
                                            Save: ${Math.floor(Math.random() * 500) + 100}
                                        </div>
                                    </div>
                                    {/* --- MEDIA (EXACT SYNC - 16:10) --- */}
                                    <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden">
                                        <img
                                            src={car.images && car.images.length > 0 ? `/${car.images[0].file_path}` : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800"}
                                            alt={`${car.make} ${car.model}`}
                                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                                        />
                                        
                                        {/* Status Badge Sync */}
                                        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                                             <div className="bg-white/95 px-2 py-0.5 rounded-md text-[9px] font-bold text-gray-900 border border-gray-100 shadow-sm flex items-center gap-1.5">
                                                 <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                                                 {car.status === 'available' ? 'Certified' : car.status}
                                             </div>
                                        </div>

                                        <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-y-[-5px] group-hover:translate-y-0 duration-300">
                                            <Heart size={15} />
                                        </button>

                                        {/* Light Overlay & Center Action */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a66c2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/10 backdrop-blur-[2px]">
                                            <div className="w-10 h-10 rounded-full bg-white/95 flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-500 shadow-lg">
                                                <ArrowRight size={18} className="text-[#0a66c2]" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- CONTENT SECTION --- */}
                                    <div className="p-4 flex flex-col flex-1 border-t border-gray-50 text-left">
                                        <div className="mb-4">
                                            <h4 className="text-[14px] font-bold text-gray-800 hover:text-[#0a66c2] transition-colors leading-tight line-clamp-2">
                                                {car.brand?.name || car.make} {car.model} {car.year}
                                            </h4>
                                        </div>

                                        <ul className="space-y-1 text-[12.5px] text-gray-500 mb-4 list-none p-0">
                                            <li className="flex items-start gap-2">
                                                <span className="text-gray-300 transform translate-y-[2px]">•</span>
                                                <span>Category: <span className="text-gray-700 font-medium">{car.category?.name || 'Asset'}</span></span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-gray-300 transform translate-y-[2px]">•</span>
                                                <span>Transmission: <span className="text-gray-700 font-medium">{car.specifications?.transmission || 'Auto'}</span></span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-gray-300 transform translate-y-[1px]">•</span>
                                                <span>Fuel Type: <span className="text-gray-700 font-medium">{car.specifications?.fuel_type || 'N/A'}</span></span>
                                            </li>
                                        </ul>

                                        <div className="mt-auto border-t border-gray-100 pt-3 text-center">
                                            <div className="flex items-center justify-center gap-2 mb-3">
                                                <span className="text-[17px] font-bold text-[#0a66c2]">${Number(car.price_details?.daily_rate || 0).toLocaleString()}</span>
                                                <span className="text-[13px] text-gray-400 line-through font-medium leading-none">${(Number(car.price_details?.daily_rate || 0) + 500).toLocaleString()}</span>
                                            </div>
                                            
                                            <Link 
                                                href={route('car.details', car.id)}
                                                className="w-full py-[5px] inline-block px-4 rounded-full border border-[#0a66c2] text-[#0a66c2] text-[14px] font-semibold hover:bg-[#f0f7ff] hover:shadow-[inset_0_0_0_1px_#0a66c2] transition-all duration-200 active:scale-[0.98]"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .swiper-slide {
                    height: auto !important;
                }
            ` }} />
        </section>
    );
}

const CarSkeleton = () => (
    <div className="bg-white rounded-[12px] border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
        <Skeleton className="aspect-[16/10] rounded-none" />
        <div className="p-4 flex flex-col flex-1">
            <Skeleton className="h-4 rounded w-3/4 mb-4" />
            <div className="space-y-3 mb-6">
                <Skeleton className="h-3 rounded w-1/2" />
                <Skeleton className="h-3 rounded w-2/3" />
            </div>
            <div className="mt-auto pt-3 border-t border-gray-100 flex justify-center">
                <Skeleton className="h-5 rounded w-1/4" />
            </div>
        </div>
        <div className="px-4 pb-4 mt-auto">
            <Skeleton className="h-8 rounded-full w-full" />
        </div>
    </div>
);

const SpecItem = ({ val, label }) => (
    <div className="flex flex-col items-start leading-none">
        <span className="text-[11px] font-bold text-gray-900 truncate mb-0.5">{val}</span>
        <span className="text-[8px] font-bold text-gray-400">{label}</span>
    </div>
);
