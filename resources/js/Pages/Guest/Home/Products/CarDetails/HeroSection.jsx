/**
 * Car Details - Hero Section
 * 
 * Displays core asset identifying information, including VIN, model details,
 * and high-frequency engagement actions (share, favorite).
 * 
 * @author AL Mamon
 * @version 1.0.0
 */

import { Star, Heart, Share2, Verified, MapPin, Activity, Award, Check, ArrowRight, ChevronRight, Loader2, ShieldCheck, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/Contexts/LanguageContext";

/**
 * HeroSection Component
 * 
 * @param {Object} props
 * @param {Object} props.car - Asset data model
 * @param {boolean} props.isBookmarked - Bookmark status
 * @param {Function} props.setIsBookmarked - Bookmark state setter
 * @param {Function} props.handleBookNow - Initiation protocol
 * @param {string} props.availability - Asset availability status
 * @returns {JSX.Element}
 */
export default function HeroSection({
    car,
    isBookmarked,
    setIsBookmarked,
    handleBookNow,
    availability
}) {
    // --- Context & Initialization ---
    const { t } = useLanguage();

    // --- State: UI & Engagement ---
    const [isShared, setIsShared] = useState(false);
    const [liveUsers, setLiveUsers] = useState(4);
    const [isChecking, setIsChecking] = useState(false);
    const [dates, setDates] = useState({ pickup: "", dropoff: "" });

    // --- Effects: Live Telemetry Simulation ---

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
                                <span className="text-[#0a66c2]">#CAR-{car.id}</span>
                             </div>
                             <h1 className="text-[24px] md:text-[30px] font-bold text-[#0a66c2] leading-tight">
                                {car.make} {car.model} {car.year}
                             </h1>
                             
                            <div className="flex flex-wrap gap-2 mt-3">
                                <div className="bg-[#f8fafc] px-3 py-1.5 rounded-lg flex items-center gap-2 border border-gray-100 hover:border-[#0a66c2]/20 transition-all font-sans shadow-sm">
                                    <span className="text-[12px] text-gray-500">{t.details.base_rate}: </span>
                                    <span className="text-[13px] font-bold text-gray-900">{car.price_details?.currency || '৳'}{Number(car.price_details?.daily_rate || 0).toLocaleString()}</span>
                                </div>
                                <div className="bg-[#f8fafc] px-2.5 py-1.5 rounded-lg border border-gray-100 flex items-center gap-2 font-sans shadow-sm">
                                    <span className="text-[12px] text-gray-500">{t.details.brand}: </span>
                                    <span className="text-[13px] font-bold text-gray-900">{car.brand?.name || car.make}</span>
                                </div>
                                <div className="bg-[#f8fafc] px-2.5 py-1.5 rounded-lg border border-gray-100 flex items-center gap-2 font-sans shadow-sm">
                                    <span className="text-[12px] text-gray-500">{t.details.category}: </span>
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

                    {/* Actions: Favorite & Share (LinkedIn Style) */}
                    <div className="flex items-center gap-3 pt-1">
                        <button 
                            onClick={() => setIsBookmarked(!isBookmarked)}
                            className={`
                                flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-[14px] transition-all border 
                                ${isBookmarked 
                                    ? "bg-[#0a66c2]/10 text-[#0a66c2] border-[#0a66c2]" 
                                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                                }
                            `}
                        >
                            <Heart size={18} className={isBookmarked ? "fill-current" : ""} />
                            <span>{isBookmarked ? t.details.favorited : t.details.favorite}</span>
                        </button>

                        <button 
                            onClick={copyProtocol}
                            className={`
                                flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-[14px] transition-all border bg-white shadow-sm
                                ${isShared
                                    ? "text-green-600 border-green-600 bg-green-50"
                                    : "text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                                }
                            `}
                        >
                            {isShared ? <Check size={18} /> : <Share2 size={18} />}
                            <span>{isShared ? t.details.copied : t.details.share}</span>
                        </button>
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
