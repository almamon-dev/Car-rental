import React, { useState, useEffect } from "react";
import { Zap, Verified, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

/**
 * INSTITUTIONAL PRICING ARCHITECTURE (LINKEDIN MASTER STYLE SYNC)
 * 
 * Philosophy:
 * - Style Match: 1:1 synchronization with Category.jsx and Cars.jsx.
 * - High Density: Tighter vertical spacing and compact module cards.
 * - Technical Integrity: Clear pricing tiers without bulky tech-startup gradients.
 * - Palette: #f3f2ef/40 background, pure white modular cards, #0a66c2 accents.
 */

const pricingData = [
    {
        title: "Standard Plan",
        id: "Tier 1",
        price: "299",
        description: "Essential mobility for short-term professional deployment.",
        features: [
            "Standard Asset Allocation",
            "Institutional Insurance (Base)",
            "Terminal Pickup Required",
            "24/7 Roadside Support",
            "GPS Telematics Integration",
            "Standard Extending Window",
        ],
        isRecommended: false,
    },
    {
        title: "Executive Plan",
        id: "Tier 2",
        price: "1299",
        description: "Priority access for high-frequency executive transit.",
        features: [
            "Premium Asset Allocation",
            "Comprehensive Coverage (T2)",
            "On-Demand Doorstep Delivery",
            "Priority Roadside Support",
            "Full VIP Support Console",
            "Flexible Extension Protocol",
        ],
        isRecommended: true,
    },
    {
        title: "Enterprise Plan",
        id: "Tier 3",
        price: "1599",
        description: "Scaling mobility solutions for large-scale institutional networks.",
        features: [
            "Elite Asset Allocation Only",
            "Full Liability Protection (Institutional)",
            "Global Deployment Console",
            "Dedicated Account Manager",
            "Enhanced Fleet Telematics",
            "Custom Operational Protocol",
        ],
        isRecommended: false,
    },
    {
        title: "Custom Protocol",
        id: "Vault",
        price: "Contact",
        description: "Bespoke fleet management for unique operational requirements.",
        features: [
            "Tailored Fleet Sourcing",
            "Specific Risk Underwriting",
            "Institutional Member Rates",
            "No Commitment Deployment",
            "Refundable Member Deposit",
            "Direct API Integration",
        ],
        isRecommended: false,
    },
];

export default function Pricing() {
    return (
        <section className="py-6 bg-transparent overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- COMPACT EXECUTIVE HEADER (MATCH SYNC) --- */}
                <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-5">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-3 bg-[#0a66c2] rounded-full" />
                            <span className="text-[10px] font-bold text-[#0a66c2] uppercase tracking-[0.2em]">Financial Architecture</span>
                        </div>
                        <h2 className="text-[22px] font-bold text-[#000000e6] tracking-tight">
                            Institutional <span className="text-[#0a66c2]">Pricing Models</span>
                        </h2>
                        <p className="text-[12.5px] text-gray-500 mt-1 font-medium italic">Standardized mobility tiers for secure asset acquisition and deployment.</p>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-100 shadow-sm text-[10px] font-bold text-[#0a66c2] uppercase tracking-widest leading-none">
                         <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                         Rates Verified
                    </div>
                </div>

                {/* --- PRICING GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pricingData.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -4 }}
                            className={`relative bg-white rounded-[12px] border ${
                                plan.isRecommended ? "border-[#0a66c2]/50 shadow-md ring-1 ring-[#0a66c2]/10" : "border-gray-200 shadow-sm"
                            } p-6 flex flex-col h-full group transition-all duration-300`}
                        >
                            {/* Tier Identifier */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black text-[#0a66c2] uppercase tracking-[0.2em]">{plan.id}</span>
                                {plan.isRecommended && (
                                    <div className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-md">
                                        <ShieldCheck size={10} className="text-[#0a66c2]" />
                                        <span className="text-[9px] font-black text-[#0a66c2] uppercase">Recommended</span>
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <h3 className="text-[18px] font-bold text-gray-900 leading-tight mb-1">{plan.title}</h3>
                                <p className="text-[12px] text-gray-400 font-medium leading-snug line-clamp-2">{plan.description}</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-[28px] font-black text-gray-900 leading-none">
                                        {plan.price !== "Contact" ? `$${plan.price}` : plan.price}
                                    </span>
                                    {plan.price !== "Contact" && (
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">/ 30 Days</span>
                                    )}
                                </div>
                            </div>

                            {/* Features Manifest (Icon-Free Style) */}
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

                            {/* LinkedIn Primary Button Protocol */}
                            <div className="mt-auto">
                                <button className={`w-full py-2.5 px-4 rounded-full font-bold text-[13px] transition-all duration-200 active:scale-[0.98] ${
                                    plan.isRecommended 
                                        ? "bg-[#0a66c2] text-white hover:bg-[#004182] shadow-sm" 
                                        : "border border-[#0a66c2] text-[#0a66c2] hover:bg-[#f0f7ff] hover:shadow-[inset_0_0_0_1px_#0a66c2]"
                                }`}>
                                    {plan.price === "Contact" ? "Request Quote" : "Acquire Protocol"}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- ADDITIONAL INFO BAR --- */}
                <div className="mt-8 py-4 px-6 bg-slate-100/50 rounded-[12px] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                     <div className="flex items-center gap-4">
                         <div className="flex -space-x-2">
                             {[1,2,3].map(i => (
                                 <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                     <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover" />
                                 </div>
                             ))}
                         </div>
                         <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Joined by 3,400+ Institutional Members</p>
                     </div>
                     <button className="flex items-center gap-1.5 text-[11px] font-black text-[#0a66c2] uppercase tracking-widest hover:underline">
                         View Regional Pricing Models <ArrowRight size={14} />
                     </button>
                </div>

            </div>
        </section>
    );
}
