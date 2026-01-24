import { Star, Heart, Share2, Verified, MapPin, Activity, Award, Check, ArrowRight  } from "lucide-react";
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
        <section className="w-full bg-white pt-24 pb-10 border-b border-gray-200 font-sans group/hero">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- LIVE STATUS BAR --- */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    <div className="flex items-center gap-2 bg-[#f3f7fb] px-3.5 py-1.5 rounded-[4px] border border-[#0a66c2]/10 transition-all shadow-sm">
                         <Activity size={12} className="text-[#0a66c2]" />
                         <span className="text-[10px] font-bold text-[#0a66c2]">
                             {liveUsers} {t.details.live_members}
                         </span>
                         <div className="flex -space-x-1.5 ml-2">
                             {[1,2,3].map(i => (
                                 <div key={i} className="w-4 h-4 rounded-full border border-white bg-gray-200" />
                             ))}
                         </div>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-1.5 rounded-[4px] border border-gray-100 transition-all shadow-sm">
                         <Award size={12} className="text-amber-600" />
                         <span className="text-[10px] font-bold text-gray-600">
                             {t.details.tier1_grade}
                         </span>
                    </div>

                    <div className="flex items-center gap-2 bg-green-50 px-3.5 py-1.5 rounded-[4px] border border-green-100 transition-all shadow-sm">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                         <span className="text-[10px] font-bold text-green-700">
                             {t.details.available_deployment}
                         </span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                             <div className="flex items-center gap-2 mb-1">
                                <span className="text-[11px] font-bold text-[#0a66c2] border-b-2 border-[#0a66c2]/20 pb-0.5">{t.details.asset_ref}: #CAR-{car.id}</span>
                             </div>
                             <h1 className="text-[32px] md:text-[40px] font-bold text-gray-900 leading-[1.2]">
                                {car.make} <span className="text-[#0a66c2]">{car.model}</span>
                                <span className="text-[18px] text-gray-400 font-medium ml-2 italic">({car.year})</span>
                             </h1>
                             <div className="flex flex-wrap items-center gap-5 mt-4">
                                  <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-[6px] shadow-sm hover:border-[#0a66c2]/30 transition-all group/loc">
                                      <MapPin size={14} className="text-gray-400 group-hover/loc:text-[#0a66c2] transition-colors" />
                                      <span className="text-[13px] font-bold text-gray-600">{car.location ? `${car.location.name}, ${car.location.city}` : t.details.not_assigned}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                      <div className="flex gap-0.5">
                                          {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i <= 4 ? "#0a66c2" : "none"} className={i <= 4 ? "text-[#0a66c2]" : "text-gray-200"} />)}
                                      </div>
                                      <span className="text-[13px] font-bold text-gray-900">4.9</span>
                                      <span className="text-[11px] font-medium text-gray-400">({124} {t.details.audits})</span>
                                  </div>
                             </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <SmallInfoBadge label={t.details.transmission} val={car.specifications?.transmission || "Auto"} />
                            <SmallInfoBadge label={t.details.energy_arch} val={car.specifications?.fuel_type || "Hybrid"} />
                            <SmallInfoBadge label={t.details.power_unit} val={car.specifications?.engine_capacity || "V8"} />
                            <SmallInfoBadge label={t.details.cabin_capacity} val={t.details.cabin_capacity_val} />
                        </div>
                    </div>

                    <div className="w-full md:w-[360px] bg-[#f9f9f9] border border-gray-200 rounded-[12px] p-6 shadow-sm flex flex-col gap-6">
                        <div className="flex justify-between items-start">
                             <div>
                                <span className="text-[11px] font-bold text-gray-400">{t.details.base_rate}</span>
                                <div className="flex items-baseline gap-1 mt-1">
                                    <span className="text-[28px] font-bold text-gray-900">{car.price_details?.currency || '৳'}{Number(car.price_details?.daily_rate || 0).toLocaleString()}</span>
                                    <span className="text-[13px] font-medium text-gray-400">{t.details.net}</span>
                                </div>
                             </div>
                             <div className="flex gap-2">
                                 <button 
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-[8px] border transition-all ${
                                        isBookmarked ? "bg-red-50 border-red-200 text-red-500" : "bg-white border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500"
                                    } shadow-sm`}
                                 >
                                    <Heart size={18} fill={isBookmarked ? "currentColor" : "none"} />
                                 </button>
                                 <button 
                                    onClick={copyProtocol}
                                    className="w-10 h-10 flex items-center justify-center rounded-[8px] bg-white border border-gray-200 text-gray-400 hover:border-[#0a66c2] hover:text-[#0a66c2] transition-all shadow-sm"
                                 >
                                    {isShared ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
                                 </button>
                             </div>
                        </div>

                        <button 
                            onClick={handleBookNow}
                            className="w-full bg-[#0a66c2] text-white py-3.5 rounded-[8px] text-[15px] font-bold hover:bg-[#004182] transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                        >
                            <span>{t.details.initiate_booking}</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="flex items-center justify-center gap-2 mt-1">
                            <Verified size={14} className="text-blue-500" />
                            <span className="text-[11px] font-medium text-gray-500">{t.details.insurance_coverage}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const SmallInfoBadge = ({ label, val }) => (
    <div className="bg-white border border-gray-100 p-3 rounded-[8px] shadow-sm hover:border-[#0a66c2]/20 transition-all">
        <div className="text-[10px] font-medium text-gray-400 mb-1">{label}</div>
        <div className="text-[13px] font-bold text-gray-900">{val}</div>
    </div>
);
