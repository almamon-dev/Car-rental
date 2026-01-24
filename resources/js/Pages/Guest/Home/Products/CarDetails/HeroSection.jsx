import { Star, Heart, Share2, Verified, MapPin, Activity, Award, Check, ArrowRight, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/Contexts/LanguageContext";

/**
 * EXECUTIVE ASSET HEADER (STAR TECH INSPIRED)
 * 
 * Philosophy:
 * - High Density: Tighter vertical and horizontal spacing for professional efficiency.
 * - Modular Content: Information grouped into clear, high-contrast containers.
 * - Palette: Pure white cards, #0a66c2 primary accents, subtle gray borders.
 */

export default function HeroSection({
    car,
    isBookmarked,
    setIsBookmarked,
    handleBookNow,
    availability
}) {
    const { t } = useLanguage();
    const [isShared, setIsShared] = useState(false);
    const [liveUsers, setLiveUsers] = useState(4);

    useEffect(() => {
        const interval = setInterval(() => {
            setLiveUsers(prev => Math.max(2, Math.min(12, prev + (Math.random() > 0.5 ? 1 : -1))));
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const copyProtocol = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
    };

    return (
        <section className="w-full bg-white pt-6 pb-4  font-sans">
            <div className="max-w-7xl mx-auto px-4">
                
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1 space-y-4">
                        {/* Title & Path */}
                        <div className="space-y-1">
                              <div className="flex items-center gap-2 text-[12px] text-gray-500 font-semibold mb-2">
                                <span>{t.details.asset_ref}</span>
                                <ChevronRight size={10} />
                                <span className="text-[#3749bb]">#CAR-{car.id}</span>
                             </div>
                             <h1 className="text-[24px] md:text-[30px] font-bold text-[#3749bb] leading-tight">
                                {car.make} {car.model} {car.year}
                             </h1>
                             
                             <div className="flex flex-wrap gap-2 mt-3">
                                <div className="bg-[#f8fafc] px-3 py-1.5 rounded-lg flex items-center gap-2 border border-gray-100 hover:border-[#3749bb]/20 transition-all font-sans shadow-sm">
                                    <span className="text-[12px] text-gray-500">{t.details.base_rate}: </span>
                                    <span className="text-[13px] font-bold text-gray-900">{car.price_details?.currency || '৳'}{Number(car.price_details?.daily_rate || 0).toLocaleString()}</span>
                                </div>
                                <div className="bg-[#f8fafc] px-2.5 py-1.5 rounded-lg border border-gray-100 flex items-center gap-2 font-sans shadow-sm">
                                    <span className="text-[12px] text-gray-500">Brand: </span>
                                    <span className="text-[13px] font-bold text-gray-900">{car.brand?.name || car.make}</span>
                                </div>
                                <div className="bg-[#f8fafc] px-2.5 py-1.5 rounded-lg border border-gray-100 flex items-center gap-2 font-sans shadow-sm">
                                    <span className="text-[12px] text-gray-500">Category: </span>
                                    <span className="text-[13px] font-bold text-gray-900">{car.category?.name}</span>
                                </div>
                             </div>
                        </div>

                        {/* Specs Chips */}
                        <div className="flex flex-wrap gap-1.5">
                            <SmallInfoBadge val={car.specifications?.transmission || "Auto"} />
                            <SmallInfoBadge val={car.specifications?.fuel_type || "Hybrid"} />
                            <SmallInfoBadge val={car.specifications?.engine_capacity || "V8"} />
                        </div>
                    </div>

                    {/* Right Side Info Box */}
                    <div className="w-full md:w-[280px] bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-5 shadow-lg">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-[14px]">
                                <span className="text-gray-500 font-semibold">Price</span>
                                <span className="text-[#ef4444] font-bold text-[16px]">{car.price_details?.currency || '৳'}{Number(car.price_details?.daily_rate || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-[14px]">
                                <span className="text-gray-500 font-semibold">Status</span>
                                <span className={`font-bold ${availability === 'available' ? 'text-green-600' : 'text-amber-600'}`}>
                                    {availability === 'available' ? 'Available' : 'Checking...'}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                             <button 
                                onClick={handleBookNow}
                                className="flex-1 bg-[#3749bb] text-white py-2.5 rounded-lg text-[14px] font-bold hover:bg-[#2b3a95] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
                             >
                                Reserve Now
                             </button>
                             <button 
                                onClick={() => setIsBookmarked(!isBookmarked)}
                                className={`w-11 h-11 flex items-center justify-center rounded-lg border transition-all ${isBookmarked ? 'bg-red-50 border-red-200 text-red-500 shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100'}`}
                             >
                                <Heart size={18} fill={isBookmarked ? "currentColor" : "none"} />
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const SmallInfoBadge = ({ val }) => (
    <div className="bg-[#f8fafc] border border-gray-100 px-4 py-2 rounded-lg shadow-sm">
        <div className="text-[13px] font-bold text-gray-700">{val}</div>
    </div>
);
