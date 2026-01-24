import React, { useState, useMemo } from "react";
import { ArrowRight, Verified, Search, HelpCircle, ShieldCheck, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ALTERNATIVE INTERACTIVE FAQ (EXECUTIVE SEARCH DIRECTORY)
 * 
 * Philosophy:
 * - Search-First: A professional utility with real-time filtering.
 * - Grid-Modular: Cards instead of a vertical list for a "Knowledge Base" feel.
 * - High Density: Compact typography and spatial efficiency.
 * - Style Sync: LinkedIn Light palette with #0a66c2 accents.
 */

// faqData removed from here, now using translations from context

import { useLanguage } from "@/Contexts/LanguageContext";

export default function FAQ() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [openId, setOpenId] = useState(null);

    const categories = [
        t.home.faq.categories.all, 
        t.home.faq.categories.requirements, 
        t.home.faq.categories.documents, 
        t.home.faq.categories.fleet, 
        t.home.faq.categories.billing, 
        t.home.faq.categories.logistics, 
        t.home.faq.categories.account
    ];

    const filteredFaqs = useMemo(() => {
        return t.home.faq.data.filter(faq => {
            const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === t.home.faq.categories.all || faq.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory, t]);

    return (
        <section className="py-6 bg-transparent overflow-hidden font-sans relative">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- COMPACT EXECUTIVE HEADER (SEARCH INTEGRATED) --- */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-3 bg-[#0a66c2] rounded-full" />
                            <span className="text-[10px] font-bold text-[#0a66c2] uppercase tracking-[0.2em]">{t.home.faq.support}</span>
                        </div>
                        <h2 className="text-[24px] font-bold text-[#000000e6] tracking-tight">
                            {t.home.faq.title}
                        </h2>
                    </div>

                    {/* LinkedIn Style Search Bar */}
                    <div className="relative w-full lg:w-[320px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text"
                            placeholder={t.home.faq.search_placeholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#edf3f8] border border-transparent focus:border-[#0a66c2] focus:bg-white rounded-[4px] text-[13px] font-medium text-gray-900 placeholder:text-gray-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* --- FILTER CHIPS (LINKEDIN STYLE) --- */}
                <div className="flex flex-wrap gap-2 mb-8">
                     {categories.map(cat => (
                         <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all border ${
                                activeCategory === cat 
                                    ? "bg-[#0a66c2] text-white border-[#0a66c2] shadow-sm" 
                                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                            }`}
                         >
                            {cat}
                         </button>
                     ))}
                </div>

                {/* --- INTERACTIVE GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <AnimatePresence mode="popLayout">
                        {filteredFaqs.map((faq) => (
                            <motion.div
                                layout
                                key={faq.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className={`group relative rounded-[8px] border p-4 transition-all duration-300 ${
                                    openId === faq.id 
                                        ? "border-[#0a66c2] bg-[#f3f7fb] ring-1 ring-[#0a66c2]/10" 
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                            >
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[9px] font-black text-[#0a66c2] uppercase tracking-widest">{faq.category}</span>
                                        <Info size={12} className="text-gray-300 group-hover:text-gray-400" />
                                    </div>
                                    
                                    <h3 className="text-[14px] font-bold text-[#000000e6] leading-snug pr-4 mb-2">
                                        {faq.question}
                                    </h3>

                                    <div className="mt-auto pt-2">
                                        <button 
                                            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                            className="text-[11px] font-black text-[#0a66c2] uppercase tracking-widest hover:underline flex items-center gap-1"
                                        >
                                            {openId === faq.id ? t.home.faq.minimize : t.home.faq.access}
                                            <ArrowRight size={12} className={`transition-transform duration-300 ${openId === faq.id ? "-rotate-90" : ""}`} />
                                        </button>
                                    </div>

                                    {/* Expansion Panel */}
                                    <AnimatePresence>
                                        {openId === faq.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-3 mt-3 border-t border-gray-200">
                                                    <p className="text-[12px] text-gray-500 font-medium leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* --- EMPTY STATE --- */}
                {filteredFaqs.length === 0 && (
                    <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[12px]">
                         <HelpCircle size={40} className="text-gray-200 mx-auto mb-4" />
                         <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">{t.home.faq.no_results}</p>
                    </div>
                )}

                {/* --- CONCIERGE ACCESS (SYNCED) --- */}
                <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-6 bg-slate-50 border border-gray-100 rounded-[8px]">
                     <div className="flex items-center gap-3">
                         <ShieldCheck size={16} className="text-[#0a66c2]" />
                         <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest leading-none">{t.home.faq.verification_level}</span>
                     </div>
                     <button className="py-1.5 px-6 rounded-full bg-[#0a66c2] text-white text-[12px] font-bold hover:bg-[#004182] transition-all shadow-sm">
                        {t.home.faq.contact_center}
                     </button>
                </div>

            </div>
        </section>
    );
}
