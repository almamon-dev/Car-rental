/**
 * Brand Slider Component
 * 
 * Displays a carousel of automotive brands available on the platform.
 * Includes dynamic routing, loading skeletons, and interactive hover states.
 * 
 * @author AL Mamon
 * @version 1.0.0
 */

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowRight, Star, Car, Zap, Award, Shield, Sparkles, Crown, Gem, Rocket, Target, TrendingUp } from "lucide-react";
import { Skeleton } from "@/Components/ui/Skeleton";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Link } from "@inertiajs/react";

// Import Swiper-specific styling
import "swiper/css";
import "swiper/css/navigation";

/**
 * Generate a unique color for each brand based on its name
 * @param {string} brandName - The name of the brand
 * @returns {string} Hex color code without #
 */
const getBrandColor = (brandName) => {
    const colors = [
        '0a66c2', // LinkedIn Blue
        '1877f2', // Facebook Blue
        'ea4335', // Google Red
        '34a853', // Google Green
        'fbbc05', // Google Yellow
        '4285f4', // Google Blue
        '7c3aed', // Purple
        'ec4899', // Pink
        '06b6d4', // Cyan
        'f59e0b', // Amber
        '10b981', // Emerald
        '8b5cf6', // Violet
        'f97316', // Orange
        '14b8a6', // Teal
        '6366f1', // Indigo
    ];
    
    // Simple hash function to get consistent color for same brand
    let hash = 0;
    for (let i = 0; i < brandName.length; i++) {
        hash = brandName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
};

/**
 * Get a unique icon for each brand based on its name
 * @param {string} brandName - The name of the brand
 * @returns {React.Component} Lucide icon component
 */
const getBrandIcon = (brandName) => {
    const icons = [Car, Zap, Award, Shield, Sparkles, Crown, Gem, Rocket, Target, TrendingUp];
    
    // Simple hash function to get consistent icon for same brand
    let hash = 0;
    for (let i = 0; i < brandName.length; i++) {
        hash = brandName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return icons[Math.abs(hash) % icons.length];
};

/**
 * BrandSlider Component
 * 
 * @param {Object} props
 * @param {Array} props.brands - List of manufacturer objects (name, slug, logo, cars_count)
 * @returns {JSX.Element}
 */
export default function BrandSlider({ brands = [] }) {
    const { t } = useLanguage();
    
    // --- Refs and State ---
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Managed dehydration delay to ensure smooth visual transitions
     */
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="w-full bg-transparent py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                
                {/* --- Section Header: Typography & Navigation --- */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-[22px] font-bold text-[#081621] leading-tight">
                            {t.home.brands.title}
                        </h2>
                        <p className="text-[13px] text-[#666666] mt-1">
                            {t.home.brands.subtitle}
                        </p>
                    </div>

                    {/* Minimalist Slide Controls */}
                    <div className="flex gap-1.5">
                        <button
                            ref={prevRef}
                            aria-label="Previous Brand"
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            ref={nextRef}
                            aria-label="Next Brand"
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* --- Main Sliding Component --- */}
                <div className="relative group/swiper overflow-hidden">
                    {isLoading ? (
                        /* Pre-rendered loading skeletons */
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="bg-white rounded-[12px] border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
                                    <Skeleton className="aspect-[21/9] rounded-none" />
                                    <div className="p-4 flex flex-col items-center text-center">
                                        <Skeleton className="w-12 h-12 rounded-xl -mt-10 mb-2 shadow-sm" />
                                        <Skeleton className="h-4 w-3/4 rounded" />
                                        <Skeleton className="h-3 w-1/2 mt-2 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Dynamic Swiper Carousel */
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={12}
                            slidesPerView={1.2}
                            loop={brands.length > 8}
                            speed={500}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            onSwiper={(swiper) => {
                                // Explicitly connect navigation buttons to swiper instance
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
                                    <Link
                                        href={route('car.list', { brand: brand.slug })}
                                        className="bg-white rounded-[12px] border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full group hover:-translate-y-1 transition-all duration-300 hover:shadow-md block"
                                    >
                                        {/* Brand Media Layer */}
                                        <div className="relative aspect-[21/9] bg-gray-900 overflow-hidden">
                                            <img
                                                src={brand.logo ? `/${brand.logo}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(brand.name)}&size=800&background=${getBrandColor(brand.name)}&color=fff&bold=true&format=svg`}
                                                alt={`Browse ${brand.name} fleet`}
                                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-tr from-[#0a66c2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            
                                            {/* Centered CTA Micro-Interaction */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/10 backdrop-blur-[2px]">
                                                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-500">
                                                    <ArrowRight size={18} className="text-[#0a66c2]" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Manufacturer Specification Content */}
                                        <div className="p-4 flex flex-col items-center text-center flex-1">
                                            {/* Floating Logo Badge */}
                                            <div className="mb-1 w-12 h-12 rounded-xl bg-white flex items-center justify-center -mt-10 relative z-10 border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.06)] group-hover:border-[#0a66c2] transition-colors duration-500 p-2">
                                                {brand.logo ? (
                                                    <img 
                                                        src={`/${brand.logo}`}
                                                        className="w-full h-full object-contain"
                                                        alt={`${brand.name} Emblem`}
                                                    />
                                                ) : (
                                                    React.createElement(getBrandIcon(brand.name), {
                                                        size: 24,
                                                        style: { color: `#${getBrandColor(brand.name)}` },
                                                        strokeWidth: 2.5
                                                    })
                                                )}
                                            </div>
                                            {/* Identity & Status */}
                                            <h3 className="text-[14px] font-bold text-[#000000e6] mb-0.5 line-clamp-1 group-hover:text-[#0a66c2] transition-colors">
                                                {brand.name}
                                            </h3>
                                            <div className="text-[11px] text-gray-500 font-medium">
                                                {brand.cars_count || 0} {t.home.brands.units_available}
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>

            {/* Injected Swiper Logic Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                .swiper-slide {
                    height: auto !important;
                }
            ` }} />
        </section>
    );
}

