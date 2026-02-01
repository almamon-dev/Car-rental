/**
 * Operational Features Section
 * 
 * Showcases the key service highlights and advantages of the car rental platform.
 * Features a high-premium "Manifest" style layout with LinkedIn-inspired aesthetics.
 * 
 * @author AL Mamon
 * @version 1.0.0
 */

import React from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Truck,
    Headphones,
    CircleDollarSign,
    Zap,
    CarFront,
    ArrowUpRight,
    CheckCircle2,
    Activity
} from "lucide-react";
import { useLanguage } from "@/Contexts/LanguageContext";

/**
 * FeatureItem Component
 * Renders an individual feature entry with icon, title, and description.
 * 
 * @param {Object} props
 * @param {React.ElementType} props.icon - Lucide icon component
 * @param {string} props.title - Feature title
 * @param {string} props.description - Short feature description
 * @param {number} props.index - Index for staggered animation timing
 * @returns {JSX.Element}
 */
const FeatureItem = ({ icon: Icon, title, description, index }) => {
    const { t } = useLanguage();
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative py-4 border-b border-gray-50 last:border-0 hover:bg-slate-50/50 px-4 -mx-4 transition-all duration-300 rounded-lg cursor-default"
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                    {/* Feature Icon Wrapper */}
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-gray-400 group-hover:bg-[#0a66c2]/10 group-hover:text-[#0a66c2] transition-colors flex-shrink-0 mt-0.5">
                        <Icon size={20} strokeWidth={1.5} />
                    </div>
                    {/* Content */}
                    <div>
                        <h4 className="text-[15px] font-bold text-gray-900 leading-none mb-1.5 group-hover:text-[#0a66c2] transition-colors">
                            {title}
                        </h4>
                        <p className="text-[12px] text-gray-400 font-medium leading-relaxed max-w-[200px]">
                            {description}
                        </p>
                    </div>
                </div>
                {/* Secondary Status Visuals */}
                <div className="flex flex-col items-end gap-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600">
                        <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                        {t.home.features_section.verified}
                    </div>
                    <ArrowUpRight size={14} className="text-[#0a66c2]" />
                </div>
            </div>
        </motion.div>
    );
};

/**
 * CarRentalFeatures Component
 * Main section container that assembles the feature manifest.
 * 
 * @returns {JSX.Element}
 */
const CarRentalFeatures = () => {
    const { t } = useLanguage();
    
    // Icon mapping for dynamic content from translation file
    const icons = [ShieldCheck, Truck, Headphones, CircleDollarSign, Zap, CarFront];
    const features = t.home.features_section.items.map((item, idx) => ({
        ...item,
        icon: icons[idx]
    }));

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto font-sans relative overflow-hidden">
            {/* Subtle background decorative element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/30 -skew-x-12 translate-x-1/2 -z-10" />

            <div className="grid lg:grid-cols-12 gap-16 items-start">
                
                {/* --- LEFT SIDE: Title & Narrative Showcase --- */}
                <div className="lg:col-span-12 xl:col-span-5 pt-4">
                    <div className="max-w-md mb-12">
                        {/* Operational Status Tag */}
                        <div className="flex items-center gap-3 mb-6">
                            <Activity size={16} className="text-[#0a66c2]" />
                            <span className="text-[11px] font-bold text-[#0a66c2]">
                                {t.home.features_section.operational}
                            </span>
                        </div>
                        
                        {/* Main Typography Header */}
                        <h2 className="text-[36px] md:text-[48px] font-extrabold text-gray-900 leading-[1.05] mb-6 tracking-tighter">
                            {t.home.features_section.title_p1} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a66c2] to-blue-400">
                                {t.home.features_section.title_accent}
                            </span> <br />
                            {t.home.features_section.title_p2}
                        </h2>
                        
                        {/* Narrative Description */}
                        <p className="text-gray-500 text-[15px] leading-relaxed font-medium border-l-2 border-[#0a66c2]/20 pl-6">
                            {t.home.features_section.desc}
                        </p>
                    </div>

                    {/* Dynamic Image Showcase with Backdrop Effects */}
                    <div className="relative group">
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-1/2 bg-[#0a66c2]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        
                        <motion.img
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            src="images/Category/car.png"
                            alt="Premium Vehicle Portfolio"
                            className="w-full h-auto drop-shadow-2xl brightness-105 group-hover:scale-[1.02] transition-transform duration-700 relative z-10"
                        />
                        
                        {/* Floating Status Badge */}
                        <div className="absolute bottom-4 left-0 bg-white/80 backdrop-blur-md px-4 py-2 rounded-lg border border-gray-100 shadow-sm flex items-center gap-3 z-20">
                             <div className="flex flex-col">
                                 <span className="text-[9px] font-bold text-gray-400">
                                     {t.home.features_section.status}
                                 </span>
                                 <span className="text-[13px] font-black text-gray-900">
                                     {t.home.features_section.operational_100}
                                 </span>
                             </div>
                             <CheckCircle2 size={16} className="text-green-500" />
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SIDE: Detailed Feature Index --- */}
                <div className="lg:col-span-12 xl:col-span-7 pt-4">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                         <h3 className="text-[18px] font-bold text-gray-900">
                             {t.home.features_section.manifest}
                         </h3>
                         <span className="text-[11px] font-bold text-gray-400">
                             {t.home.features_section.ref}
                         </span>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
                        {features.map((f, index) => (
                            <FeatureItem
                                key={index}
                                icon={f.icon}
                                title={f.title}
                                description={f.description}
                                index={index}
                            />
                        ))}
                    </div>
                    
                    {/* Enterprise Trust Section */}
                    <div className="mt-12 p-6 rounded-2xl bg-slate-50/50 border border-slate-100/50 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex flex-col">
                            <span className="text-[11px] font-black text-[#0a66c2] mb-1">
                                {t.home.features_section.partnership_scale}
                            </span>
                            <span className="text-[20px] font-bold text-gray-900">
                                12,500+ <span className="text-[14px] text-gray-400 font-medium">
                                    {t.home.features_section.enterprise_clients}
                                </span>
                            </span>
                        </div>
                        <div className="flex gap-6 grayscale opacity-40 items-center">
                             <span className="text-[16px] font-black italic tracking-tighter">FINANCE</span>
                             <div className="w-[1px] h-6 bg-gray-200" />
                             <span className="text-[16px] font-black italic tracking-tighter">CORP-NET</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CarRentalFeatures;

