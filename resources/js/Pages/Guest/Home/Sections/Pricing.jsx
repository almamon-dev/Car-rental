/**
 * Pricing Architecture Component
 * 
 * Displays modular pricing plans for car rental services.
 * Features a high-density, institutional layout synchronized with the core design system.
 * 
 * @author AL Mamon
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";
import { Zap, Verified, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/Contexts/LanguageContext";

/**
 * Pricing Component
 * 
 * @returns {JSX.Element}
 */
export default function Pricing() {
    const { t } = useLanguage();

    return (
        <section className="py-6 bg-transparent overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- Section Header: Institutional Branding --- */}
                <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-5">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-3 bg-[#0a66c2] rounded-full" />
                            <span className="text-[10px] font-bold text-[#0a66c2] uppercase tracking-[0.2em]">
                                {t.home.pricing.arch}
                            </span>
                        </div>
                        <h2 className="text-[22px] font-bold text-[#000000e6] tracking-tight">
                            {t.home.pricing.title}
                        </h2>
                        <p className="text-[12.5px] text-gray-500 mt-1 font-medium italic">
                            {t.home.pricing.subtitle}
                        </p>
                    </div>

                    {/* Operational verification badge */}
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-100 shadow-sm text-[10px] font-bold text-[#0a66c2] uppercase tracking-widest leading-none">
                         <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                         {t.home.pricing.verified}
                    </div>
                </div>

                {/* --- Pricing Cards Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {t.home.pricing.plans.map((plan, index) => {
                        // Configuration for specific plan highlighting
                        const isRecommended = index === 1; // Highlight the Executive Plan
                        const tierId = index === 0 ? "Tier 1" : index === 1 ? "Tier 2" : index === 3 ? "Vault" : "Tier 3";
                        const price = index === 0 ? "299" : index === 1 ? "1299" : index === 2 ? "1599" : "Contact";

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -4 }}
                                className={`relative bg-white rounded-[12px] border ${
                                    isRecommended ? "border-[#0a66c2]/50 shadow-md ring-1 ring-[#0a66c2]/10" : "border-gray-200 shadow-sm"
                                } p-6 flex flex-col h-full group transition-all duration-300`}
                            >
                                {/* Plan Tier & Selection Metadata */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-black text-[#0a66c2] uppercase tracking-[0.2em]">
                                        {tierId}
                                    </span>
                                    {isRecommended && (
                                        <div className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-md">
                                            <ShieldCheck size={10} className="text-[#0a66c2]" />
                                            <span className="text-[9px] font-black text-[#0a66c2] uppercase">
                                                {t.home.pricing.recommended}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Plan Title & Summary */}
                                <div className="mb-6">
                                    <h3 className="text-[18px] font-bold text-gray-900 leading-tight mb-1">
                                        {plan.title}
                                    </h3>
                                    <p className="text-[12px] text-gray-400 font-medium leading-snug line-clamp-2">
                                        {plan.desc}
                                    </p>
                                </div>

                                {/* Pricing Numeric Display */}
                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-[28px] font-black text-gray-900 leading-none">
                                            {price !== "Contact" ? `$${price}` : t.home.pricing.request_quote}
                                        </span>
                                        {price !== "Contact" && (
                                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                                                {t.home.pricing.per_30_days}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Features Checklist Manifest */}
                                <div className="space-y-3 mb-8 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <div className="shrink-0 w-3.5 h-3.5 rounded-full bg-blue-50 flex items-center justify-center mt-0.5">
                                                 <Check size={10} className="text-[#0a66c2]" strokeWidth={3} />
                                            </div>
                                            <span className="text-[12px] font-bold text-gray-600 leading-tight">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Plan Action Call-to-Action */}
                                <div className="mt-auto">
                                    <button className={`w-full py-2.5 px-4 rounded-full font-bold text-[13px] transition-all duration-200 active:scale-[0.98] ${
                                        isRecommended 
                                            ? "bg-[#0a66c2] text-white hover:bg-[#004182] shadow-sm" 
                                            : "border border-[#0a66c2] text-[#0a66c2] hover:bg-[#f0f7ff] hover:shadow-[inset_0_0_0_1px_#0a66c2]"
                                    }`}>
                                        {price === "Contact" ? t.home.pricing.request_quote : t.home.pricing.acquire}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* --- Supplemental Trust Narrative Bar --- */}
                <div className="mt-8 py-4 px-6 bg-slate-100/50 rounded-[12px] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                     <div className="flex items-center gap-4">
                         {/* Social proof avatar stack */}
                         <div className="flex -space-x-2">
                             {[1,2,3].map(i => (
                                 <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                     <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Active User Portfolio" className="w-full h-full object-cover" />
                                 </div>
                             ))}
                         </div>
                         <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                             {t.home.pricing.joined_by}
                         </p>
                     </div>
                     <button className="flex items-center gap-1.5 text-[11px] font-black text-[#0a66c2] uppercase tracking-widest hover:underline">
                         {t.home.pricing.view_regional} <ArrowRight size={14} />
                     </button>
                </div>

            </div>
        </section>
    );
}

