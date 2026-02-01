/**
 * Recommended Cars Slider Component
 * 
 * Displays a curated list of cars in a responsive swiper slider.
 * Includes skeletons for loading states and high-premium design elements.
 * 
 * @author AL Mamon
 * @version 1.0.0
 */

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

/**
 * RecommendedCars Component
 * 
 * @param {Object} props
 * @param {Array} props.cars - Array of car objects to display
 * @returns {JSX.Element|null}
 */
export default function RecommendedCars({ cars = [] }) {
    const { t } = useLanguage();
    
    // --- Navigation Refs ---
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    
    // --- State Management ---
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Simulation of data fetching delay for smooth UI transition
     */
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Safety check for empty car list
    if (!cars || cars.length === 0) return null;

    return (
        <section className="py-12 lg:py-16 overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- Section Header: Narrative & Controls --- */}
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
                        <p className="text-[12.5px] text-gray-500 mt-2 font-medium italic">
                            {t.home.recommended.subtitle}
                        </p>
                    </div>

                    {/* Minimalist Navigation Buttons */}
                    <div className="flex gap-1.5">
                        <button
                            ref={prevRef}
                            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#3749bb] transition-all active:scale-95"
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            ref={nextRef}
                            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#3749bb] transition-all active:scale-95"
                            aria-label="Next Slide"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* --- Swiper Slider Implementation --- */}
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
                            // Ensure navigation is initialized with the correct elements
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
                                <div className="bg-white rounded-[4px] border border-gray-200 overflow-hidden flex flex-col h-full group transition-all duration-300 relative">
                                    
                                    {/* --- Discount/Save Badge --- */}
                                    <div className="absolute top-2 left-2 z-10">
                                        <div className="bg-[#3749bb] text-white px-2 py-0.5 text-[10px] font-black rounded-[2px] shadow-sm uppercase tracking-tighter">
                                            {t.listing.save}: {car.price_details?.currency || '৳'}{Math.floor(Number(car.price_details?.daily_rate || 0) * 0.2).toLocaleString()}
                                        </div>
                                    </div>

                                    {/* --- Product Media Showcase --- */}
                                    <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden">
                                        <img
                                            src={car.images && car.images.length > 0 ? `/${car.images[0].file_path}` : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800"}
                                            alt={`${car.make} ${car.model}`}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                        />
                                        
                                        {/* Interaction: Wishlist/Like */}
                                        <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500">
                                            <Heart size={15} />
                                        </button>
                                    </div>

                                    {/* --- Product Content Information --- */}
                                    <div className="p-4 flex flex-col flex-1 border-gray-50 text-left">
                                        <div className="mb-4">
                                            <h4 className="text-[14px] font-bold text-gray-900 group-hover:text-[#3749bb] transition-colors leading-tight line-clamp-2">
                                                <Link href={car.slug ? `${route('car.details', car.slug)}` : '#'}>
                                                    {car.brand?.name || car.make} {car.model} {car.year}
                                                </Link>
                                            </h4>
                                        </div>

                                        {/* Core Specifications List */}
                                        <div className="space-y-1.5 mb-5 border-t border-gray-100 pt-3">
                                            <ListSpec Icon={Activity} label={t.listing.ops_range} val={car.specifications?.mileage || 'N/A'} />
                                            <ListSpec Icon={Settings} label={t.listing.transmission} val={car.specifications?.transmission || car.transmission || 'Auto'} />
                                            <ListSpec Icon={Fuel} label={car.specifications?.fuel_type || car.fuel_type || t.listing.fuel_type} val={car.specifications?.fuel_type || car.fuel_type || 'N/A'} />
                                            <ListSpec Icon={Users} label="Seats" val={`${car.seats || 5} Seats`} />
                                            <ListSpec Icon={MapPin} label="Branch" val={car.location?.name || 'Main Hub'} />
                                        </div>

                                        {/* Quick View: Highlighted Features */}
                                        <div className="mb-5 text-left">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter block mb-2 leading-none">Key Highlights</span>
                                            <div className="grid grid-cols-1 gap-1">
                                                {(car.features && car.features.length > 0 ? car.features.slice(0, 3).map(f => f.feature_name) : ['Premium Sound', 'Adaptive Cruise', 'Climate Control']).map((highlight, idx) => (
                                                    <div key={idx} className="flex items-center gap-1.5">
                                                         <div className="w-1 h-1 rounded-full bg-[#3749bb]" />
                                                         <span className="text-[11px] font-bold text-gray-600 line-clamp-1">{highlight}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Pricing & CTA Action */}
                                        <div className="mt-auto border-t border-gray-100 pt-3 text-center">
                                            <div className="flex items-center justify-center gap-2 mb-3">
                                                <span className="text-[16px] font-black text-[#3749bb]">
                                                    {car.price_details?.currency || '৳'}{Number(car.price_details?.daily_rate || 0).toLocaleString()}
                                                </span>
                                                <span className="text-[12px] text-gray-400 line-through font-bold leading-none">
                                                    {car.price_details?.currency || '৳'}{(Number(car.price_details?.daily_rate || 0) * 1.25).toFixed(0).toLocaleString()}
                                                </span>
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

            {/* Component Specific Global Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                .swiper-slide {
                    height: auto !important;
                }
            ` }} />
        </section>
    );
}

/**
 * CarSkeleton Component
 * Placeholder displayed while car data is loading
 * 
 * @returns {JSX.Element}
 */
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

/**
 * ListSpec Component
 * Small icon + label + value pair for car specifications
 * 
 * @param {Object} props
 * @param {React.ElementType} props.Icon - Lucide icon component
 * @param {string} props.label - Descriptive label
 * @param {string} props.val - Actual value to display
 * @returns {JSX.Element}
 */
const ListSpec = ({ Icon, label, val }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Icon size={14} className="text-[#3749bb]/70" />
            <span className="text-[13px] font-medium text-gray-500">{label}</span>
        </div>
        <span className="text-[13px] font-bold text-gray-900 truncate ml-2">{val}</span>
    </div>
);

