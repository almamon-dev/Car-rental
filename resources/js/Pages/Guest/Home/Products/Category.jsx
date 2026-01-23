import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowRight, Layers, Star } from "lucide-react";
import { Skeleton } from "@/Components/ui/Skeleton";

import "swiper/css";
import "swiper/css/navigation";

import { Link } from "@inertiajs/react";

export default function CategorySlider({ categories = [] }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="w-full bg-transparent py-6">
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
                    {isLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="bg-white rounded-[12px] border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
                                    <Skeleton className="aspect-[21/9] rounded-none" />
                                    <div className="p-4 flex flex-col items-center text-center">
                                        <Skeleton className="w-12 h-12 rounded-xl -mt-10 mb-2" />
                                        <Skeleton className="h-4 w-3/4 rounded" />
                                        <Skeleton className="h-3 w-1/2 mt-2 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={12}
                            slidesPerView={1.2}
                            loop={categories.length > 5}
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
                                    <Link
                                        href={route('car.list', { category: cat.slug })}
                                        className="bg-white rounded-[12px] border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full group hover:-translate-y-1 transition-all duration-300 hover:shadow-md block"
                                    >
                                        {/* --- ULTRA-COMPACT CINEMATIC MEDIA --- */}
                                        <div className="relative aspect-[21/9] bg-gray-900 overflow-hidden">
                                            <img
                                                src={cat.icon ? `/${cat.icon}` : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800"}
                                                alt={cat.name}
                                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                                            />
                                            
                                            <div className="absolute inset-0 bg-gradient-to-tr from-[#0a66c2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            
                                            <div className="absolute top-2 right-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg">
                                                    <Star size={10} className="text-[#0a66c2] fill-[#0a66c2]" />
                                                </div>
                                            </div>

                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/10 backdrop-blur-[2px]">
                                                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-500">
                                                    <ArrowRight size={18} className="text-[#0a66c2]" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* --- COMPACT PROFESSIONAL CONTENT --- */}
                                        <div className="p-4 flex flex-col items-center text-center flex-1">
                                            <div className="mb-1 w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#0a66c2] -mt-10 relative z-10 border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.06)] group-hover:border-[#0a66c2] transition-colors duration-500">
                                                <Layers size={20} strokeWidth={1.5} />
                                            </div>
                                            <h3 className="text-[14px] font-bold text-[#000000e6] mb-0.5 line-clamp-1 group-hover:text-[#0a66c2] transition-colors uppercase tracking-tight">
                                                {cat.name}
                                            </h3>
                                            <div className="text-[11px] text-gray-500 font-medium tracking-tight">
                                                {cat.cars_count || 0} Assets
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
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
