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
    Activity,
    Settings,
    Fuel,
    Users
} from "lucide-react";
import { Skeleton } from "@/Components/ui/Skeleton";

import "swiper/css";
import "swiper/css/navigation";

import { Link } from "@inertiajs/react";

import { useLanguage } from "@/Contexts/LanguageContext";

export default function RecommendedCars({ cars = [] }) {
    const { t } = useLanguage();
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
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                             <span className="text-[11px] font-black text-[#3749bb] uppercase tracking-widest leading-none">
                                 {t.home.recommended.matrix}
                             </span>
                        </div>
                        <h2 className="text-[24px] font-bold text-gray-900 leading-none">
                            {t.home.recommended.curated} <span className="text-[#3749bb]">{t.home.recommended.selections}</span>
                        </h2>
                        <p className="text-[12.5px] text-gray-500 mt-2 font-medium italic">{t.home.recommended.subtitle}</p>
                    </div>

                    {/* Minimalist Controls */}
                    <div className="flex gap-1.5">
                        <button
                            ref={prevRef}
                            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#3749bb] transition-all active:scale-95"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            ref={nextRef}
                            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#3749bb] transition-all active:scale-95"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* --- CARDS SLIDER --- */}
                <div className="relative group/swiper">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={14}
                        slidesPerView={1.2}
                        loop={false}
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
                                    className="bg-white rounded-[4px] border border-gray-200 overflow-hidden flex flex-col h-full group transition-all duration-300 relative"
                                >
                                    {/* --- SAVE BADGE --- */}
                                    <div className="absolute top-2 left-2 z-10">
                                        <div className="bg-[#3749bb] text-white px-2 py-0.5 text-[10px] font-black rounded-[2px] shadow-sm uppercase tracking-tighter">
                                            {t.listing.save}: {car.price_details?.currency || '৳'}{Math.floor(Number(car.price_details?.daily_rate || 0) * 0.2).toLocaleString()}
                                        </div>
                                    </div>

                                    {/* --- MEDIA --- */}
                                    <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden">
                                        <img
                                            src={car.images && car.images.length > 0 ? `/${car.images[0].file_path}` : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800"}
                                            alt={`${car.make} ${car.model}`}
                                            className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                                        />
                                        
                                        <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500">
                                            <Heart size={15} />
                                        </button>
                                    </div>

                                    {/* --- CONTENT SECTION --- */}
                                    <div className="p-4 flex flex-col flex-1 border-gray-50 text-left">
                                        <div className="mb-4">
                                            <h4 className="text-[14px] font-bold text-gray-900 group-hover:text-[#3749bb] transition-colors leading-tight line-clamp-2">
                                                <Link href={car.slug ? `${route('car.details', car.slug)}` : '#'}>
                                                    {car.brand?.name || car.make} {car.model} {car.year}
                                                </Link>
                                            </h4>
                                        </div>

                                        {/* Specs List */}
                                        <div className="space-y-1.5 mb-5 border-t border-gray-100 pt-3">
                                            <ListSpec Icon={Activity} label={t.listing.ops_range} val={car.specifications?.mileage || 'N/A'} />
                                            <ListSpec Icon={Settings} label={t.listing.transmission} val={car.specifications?.transmission || car.transmission || 'Auto'} />
                                            <ListSpec Icon={Fuel} label={car.specifications?.fuel_type || car.fuel_type || t.listing.fuel_type} val={car.specifications?.fuel_type || car.fuel_type || 'N/A'} />
                                            <ListSpec Icon={Users} label="Seats" val={`${car.seats || 5} Seats`} />
                                            <ListSpec Icon={MapPin} label="Branch" val={car.location?.name || 'Main Hub'} />
                                        </div>

                                        {/* Key Highlights */}
                                        <div className="mb-5">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter block mb-2 leading-none">Key Highlights</span>
                                            <div className="grid grid-cols-1 gap-1">
                                                {(car.features && car.features.length > 0 ? car.features.slice(0, 3).map(f => f.feature_name) : ['360° Camera', 'Adaptive Cruise Control', 'Heated Seats']).map((highlight, idx) => (
                                                    <div key={idx} className="flex items-center gap-1.5">
                                                         <div className="w-1 h-1 rounded-full bg-[#3749bb]" />
                                                         <span className="text-[11px] font-bold text-gray-600 line-clamp-1">{highlight}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-auto border-t border-gray-100 pt-3 text-center">
                                            <div className="flex items-center justify-center gap-2 mb-3">
                                                <span className="text-[16px] font-black text-[#3749bb]">{car.price_details?.currency || '৳'}{Number(car.price_details?.daily_rate || 0).toLocaleString()}</span>
                                                <span className="text-[12px] text-gray-400 line-through font-bold leading-none">{car.price_details?.currency || '৳'}{(Number(car.price_details?.daily_rate || 0) * 1.25).toFixed(0).toLocaleString()}</span>
                                            </div>
                                            
                                            <Link 
                                                href={car.slug ? `${route('car.details', car.slug)}` : '#'}
                                                className={`w-full py-1.5 inline-block px-4 rounded-[4px] border border-[#3749bb] text-[#3749bb] text-[13px] font-bold hover:bg-[#3749bb] hover:text-white transition-all duration-200 active:scale-[0.98] ${!car.slug ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                                            >
                                                {t.listing.view_details || 'View Details'}
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
                .custom-checkbox {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 14px;
                    height: 14px;
                    border: 1px solid #bdc3c7;
                    border-radius: 2px;
                    background-color: #fff;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    position: relative;
                }
                .custom-checkbox:checked {
                    background-color: #3749bb;
                    border-color: #3749bb;
                }
                .custom-checkbox:checked::after {
                    content: "";
                    position: absolute;
                    left: 4px;
                    top: 1px;
                    width: 4px;
                    height: 7px;
                    border: solid white;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                }
            ` }} />
        </section>
    );
}

const CartIcon = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

const CarSkeleton = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-full shadow-sm">
        <Skeleton className="aspect-[16/10] rounded-none" />
        <div className="p-5 flex flex-col flex-1">
            <Skeleton className="h-5 rounded-[2px] w-3/4 mb-4" />
            <div className="space-y-3 mb-6">
                <Skeleton className="h-3 rounded-[2px] w-full" />
                <Skeleton className="h-3 rounded-[2px] w-full" />
                <Skeleton className="h-3 rounded-[2px] w-full" />
            </div>
            <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col items-center gap-4">
                <Skeleton className="h-6 rounded-[2px] w-1/2" />
                <Skeleton className="h-10 rounded-[4px] w-full" />
            </div>
        </div>
    </div>
);

const ListSpec = ({ Icon, label, val }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Icon size={14} className="text-[#3749bb]/70" />
            <span className="text-[13px] font-medium text-gray-500">{label}</span>
        </div>
        <span className="text-[13px] font-bold text-gray-900">{val}</span>
    </div>
);
