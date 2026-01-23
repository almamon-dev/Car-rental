import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, Share2, Verified, MapPin, Activity, Users, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * EXECUTIVE ASSET HEADER (INTERACTIVE MASTER SYNC)
 * 
 * Philosophy:
 * - Real-time Feedback: Integrated "live activity" indicators and success toasts.
 * - Style Match: 11px uppercase badges, blue vertical accents, and high-density typography.
 * - Micro-Interactions: Dynamic link copying and metric expansion on hover.
 */

export default function HeroSection({
    isBookmarked,
    setIsBookmarked,
    handleBookNow,
}) {
    const [isShared, setIsShared] = useState(false);
    const [liveUsers, setLiveUsers] = useState(4);

    // Simulate multi-user activity (LinkedIn Style FOMO)
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
                <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 bg-[#f3f7fb] px-3 py-1.5 rounded-full border border-[#0a66c2]/10"
                    >
                         <Users size={12} className="text-[#0a66c2]" />
                         <span className="text-[10px] font-black text-[#0a66c2] uppercase tracking-[0.1em]">
                             {liveUsers} members viewing this protocol
                         </span>
                         <div className="flex -space-x-1.5 ml-2">
                             {[1,2,3].map(i => (
                                 <div key={i} className="w-4 h-4 rounded-full border border-white bg-gray-200" />
                             ))}
                         </div>
                    </motion.div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                             <div className="bg-[#0a66c2]/10 px-3 py-1 rounded-md flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0a66c2] animate-pulse" />
                                <span className="text-[10px] font-black text-[#0a66c2] uppercase tracking-[0.2em]">Live Inventory: Verified</span>
                             </div>
                             <div className="flex items-center gap-1.5 text-gray-400">
                                <Verified size={14} className="text-blue-400" />
                                <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400">Institutional Asset</span>
                             </div>
                        </div>

                        <div>
                             <h1 className="text-[32px] sm:text-[40px] font-black text-[#000000e6] leading-tight tracking-tighter">
                                BMW M8 <span className="text-[#0a66c2]">Competition</span>
                             </h1>
                             <div className="flex items-center gap-4 mt-2">
                                 <motion.div 
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-1.5 border-r border-gray-100 pr-4 cursor-pointer"
                                 >
                                     <div className="bg-gray-100 p-1 rounded-sm text-gray-600 group-hover/hero:bg-[#0a66c2]/10 group-hover/hero:text-[#0a66c2] transition-colors">
                                         <Activity size={12} />
                                     </div>
                                     <span className="text-[13px] font-bold text-gray-600">Performance Luxury</span>
                                 </motion.div>
                                 <div className="flex items-center gap-1.5">
                                     <MapPin size={14} className="text-blue-500" />
                                     <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Financial District, Miami</span>
                                 </div>
                             </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                        <div className="flex items-center gap-2">
                             <div className="bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 flex items-center gap-2 group/audit cursor-help">
                                <Star size={12} fill="#0a66c2" className="text-[#0a66c2] group-hover/audit:scale-125 transition-transform" />
                                <span className="text-[12px] font-black text-gray-900">4.9</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none border-l border-gray-200 pl-2">Reliability Consensus</span>
                             </div>
                             
                             <button 
                                onClick={() => setIsBookmarked(!isBookmarked)}
                                className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all ${
                                    isBookmarked ? "bg-red-50 border-red-100 text-red-500" : "bg-white border-gray-200 text-gray-400 hover:text-red-500"
                                } shadow-sm active:scale-95`}
                             >
                                <Heart size={16} fill={isBookmarked ? "currentColor" : "none"} />
                             </button>

                             <div className="relative">
                                 <button 
                                    onClick={copyProtocol}
                                    className={`w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 transition-all shadow-sm ${
                                        isShared ? "text-green-500 border-green-200 bg-green-50" : "text-gray-400 hover:text-[#0a66c2]"
                                    }`}
                                 >
                                    {isShared ? <Check size={16} /> : <Share2 size={16} />}
                                 </button>
                                 <AnimatePresence>
                                     {isShared && (
                                         <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute bottom-full mb-3 right-0 whitespace-nowrap bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl"
                                         >
                                             Link Copied to Clipboard
                                         </motion.div>
                                     )}
                                 </AnimatePresence>
                             </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="text-right leading-none">
                                <div className="text-[24px] font-black text-gray-900">$380</div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Acquisition Reserve</div>
                            </div>
                            <button 
                                onClick={handleBookNow}
                                className="px-8 py-2.5 rounded-full bg-[#0a66c2] text-white text-[14px] font-bold hover:bg-[#004182] transition-all hover:shadow-[0_4px_12px_rgba(10,102,194,0.3)] active:scale-[0.98]"
                            >
                                Initiate Secure Acquisition
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 pb-2">
                    <FeatureBadge label="Series" val="2023 Edition" pulse />
                    <FeatureBadge label="Trans" val="M-Steptronic" />
                    <FeatureBadge label="Power" val="617 HP" />
                    <FeatureBadge label="Grid" val="AWD Pro" />
                    <FeatureBadge label="Manifest" val="Full Service" />
                    <FeatureBadge label="Security" val="Tier 2 Plus" color="text-green-600" />
                </div>
            </div>
        </section>
    );
}

const FeatureBadge = ({ label, val, pulse, color }) => (
    <motion.div 
        whileHover={{ y: -3, backgroundColor: "#fff" }}
        className="bg-[#f3f7fb]/50 border border-transparent hover:border-[#0a66c2]/20 p-3 rounded-lg transition-all group cursor-default"
    >
        <div className="flex items-center justify-between mb-1">
            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.15em]">{label}</label>
            {pulse && <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />}
        </div>
        <span className={`text-[12px] font-bold ${color || "text-gray-900"} group-hover:text-[#0a66c2] transition-colors`}>{val}</span>
    </motion.div>
);
