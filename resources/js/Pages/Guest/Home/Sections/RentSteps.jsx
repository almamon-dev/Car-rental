/**
 * Rent Steps Section Component
 * 
 * Illustrates the procedural steps for renting a vehicle through the platform.
 * Features an institutional, high-density layout with technical status indicators.
 * 
 * @author AL Mamon
 * @version 1.0.0
 */

import React from "react";
import { Calendar, MapPin, Car, Zap, Activity, ShieldCheck, ArrowRight, Verified } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/Contexts/LanguageContext";

/**
 * RentStepsSection Component
 * 
 * @returns {JSX.Element}
 */
export default function RentStepsSection() {
    const { t } = useLanguage();

    /**
     * Procedural steps data structure
     * Mapping localized content to appropriate Lucide icons
     */
    const steps = [
        {
            id: "01",
            title: t.home.rent_steps.step1_title,
            label: t.home.rent_steps.step1_label,
            description: t.home.rent_steps.step1_desc,
            icon: <Calendar size={18} />,
        },
        {
            id: "02",
            title: t.home.rent_steps.step2_title,
            label: t.home.rent_steps.step2_label,
            description: t.home.rent_steps.step2_desc,
            icon: <MapPin size={18} />,
        },
        {
            id: "03",
            title: t.home.rent_steps.step3_title,
            label: t.home.rent_steps.step3_label,
            description: t.home.rent_steps.step3_desc,
            icon: <ShieldCheck size={18} />,
        },
    ];

    /**
     * Performance and scale statistics
     */
    const stats = [
        { label: t.home.stats.members, value: "3.4K+" },
        { label: t.home.stats.assets, value: "612" },
        { label: t.home.stats.hubs, value: "145" },
        { label: t.home.stats.reliability, value: "100%" },
    ];

    return (
        <section className="py-4 bg-transparent overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- Section Header: Protocol Branding --- */}
                <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-5">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-3 bg-[#0a66c2] rounded-full" />
                            <span className="text-[10px] font-bold text-[#0a66c2] uppercase tracking-[0.2em]">
                                {t.home.rent_steps.protocol}
                            </span>
                        </div>
                        <h2 className="text-[22px] font-bold text-[#000000e6] tracking-tight">
                            {t.home.rent_steps.title}
                        </h2>
                        <p className="text-[12.5px] text-gray-500 mt-1 font-medium italic">
                            {t.home.rent_steps.subtitle}
                        </p>
                    </div>
                    {/* Real-time sync status indicator */}
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-100 shadow-sm text-[10px] font-bold text-[#0a66c2] uppercase tracking-widest leading-none">
                         <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                         {t.home.rent_steps.active}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-10 xl:gap-14 mb-14">
                    {/* --- Left Column: Abstract Vehicle Visualization --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-[40%] relative"
                    >
                        <div className="absolute inset-0 bg-[#0a66c2]/5 blur-[60px] rounded-full -z-10" />
                        <div className="relative">
                             <img
                                src="images/Category/car.png"
                                alt="High-Performance Elite Vehicle"
                                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                            />
                            {/* Visual confirmation badge */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/95 px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm whitespace-nowrap">
                                 <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest">
                                     {t.home.rent_steps.digital_sync}
                                 </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- Right Column: Interactive Step Modules --- */}
                    <div className="w-full lg:w-[60%] grid grid-cols-1 gap-2.5">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ x: 6 }}
                                className="group flex items-center gap-4 bg-white p-3.5 rounded-[12px] border border-gray-200 shadow-sm hover:border-[#0a66c2]/30 transition-all duration-300 relative"
                            >
                                {/* Active hover background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0a66c2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[12px]" />

                                {/* Icon Graphic with Transition Effects */}
                                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#f3f7fb] flex items-center justify-center text-[#0a66c2] group-hover:bg-[#0a66c2] group-hover:text-white transition-all duration-500 shadow-inner overflow-hidden relative z-10">
                                    {step.icon}
                                </div>
                                
                                {/* Step Meta Information */}
                                <div className="flex-1 relative z-10">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <span className="text-[9px] font-black text-[#0a66c2] uppercase tracking-[0.1em]">{step.id}</span>
                                        <div className="w-0.5 h-0.5 rounded-full bg-gray-200" />
                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.1em]">{step.label}</span>
                                    </div>
                                    <h3 className="text-[15px] font-bold text-gray-900 leading-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-[12px] text-gray-500 leading-snug line-clamp-1 mt-0.5">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Interactive Indicator */}
                                <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pr-2">
                                     <ArrowRight size={16} className="text-[#0a66c2]" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- Footer Component: Institutional Scale Statistics --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 px-4 rounded-[20px] bg-white border border-gray-100 shadow-sm relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#0a66c2]/5 to-transparent pointer-events-none" />
                    
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center relative">
                            <h4 className="text-[22px] md:text-[26px] font-black text-[#000000e6] tracking-tighter leading-none mb-1">
                                {stat.value}
                            </h4>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}

