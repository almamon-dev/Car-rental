import { motion, AnimatePresence } from "framer-motion";
import {
    Star,
    BadgeCheck,
    CheckCircle2,
    ShieldCheck,
    FileText,
    Download,
    ChevronRight,
    Award,
    TrendingUp,
    Shield,
    Activity,
    Zap,
    Verified,
    Info,
    Fuel,
    Clock,
    Users,
    Settings,
    MapPin,
    Eye
} from "lucide-react";

/**
 * INSTITUTIONAL DATA MANIFEST (STAR TECH INSPIRED)
 */

import { useLanguage } from "@/Contexts/LanguageContext";

export default function TabsContent({
    car,
    activeTab,
    setActiveTab,
    activeFaqIndex,
    setActiveFaqIndex,
}) {
    const { t } = useLanguage();
    const tabs = [
        { id: "overview", label: t.details.tabs.overview },
        { id: "specs", label: t.details.tabs.specs },
        { id: "features", label: t.details.tabs.features },
        { id: "faq", label: t.details.tabs.faq },
        { id: "reviews", label: t.details.tabs.reviews },
        { id: "policies", label: t.details.tabs.policies }
    ];

    // Format specifications into sections for Star Tech style view
    const specSections = [
        {
            category: t.details.gen_info,
            items: [
                { label: t.details.manufacturer, value: car.brand?.name || car.make },
                { label: t.details.model_ref, value: car.model },
                { label: t.details.production_year, value: car.year },
                { label: t.details.asset_class, value: car.specifications?.vehicle_type || car.category?.name },
                { label: t.details.exterior_finish, value: car.specifications?.color },
            ]
        },
        {
            category: t.details.tech_perf,
            items: [
                { label: t.details.transmission_config, value: car.specifications?.transmission },
                { label: t.details.energy_arch_tech, value: car.specifications?.fuel_type },
                { label: t.details.ops_range_tech, value: car.specifications?.mileage },
                { label: t.details.power_unit_tech, value: car.specifications?.engine_capacity },
                { label: t.details.control_dynamics, value: car.specifications?.steering },
            ]
        }
    ];

    return (
        <div className="bg-white rounded-[12px] overflow-hidden font-sans border border-gray-100 shadow-sm">
            {/* Modular Navigation */}
            <div className="border-b border-gray-100 bg-[#f9f9f9]">
                <nav className="flex overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-8 py-4 text-[13px] font-bold transition-all relative whitespace-nowrap border-r border-gray-100 last:border-r-0 ${
                                activeTab === tab.id
                                    ? "bg-white text-[#0a66c2]"
                                    : "text-gray-500 hover:bg-white hover:text-gray-900"
                            }`}
                        >
                             {tab.label}
                             {activeTab === tab.id && (
                                 <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#0a66c2]" />
                             )}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-8">
                <AnimatePresence mode="wait">
                    
                    {/* --- OVERVIEW --- */}
                    {activeTab === "overview" && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            <div>
                                <h3 className="text-[18px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <div className="w-1.5 h-6 bg-[#0a66c2] rounded-full" />
                                    {t.details.overview.summary_title}
                                </h3>
                                <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
                                    {car.description || `The ${car.make} ${car.model} defines the strategic intersection of track-oriented performance and executive grand touring. Equipped with precision-engineered dynamics for Tier-1 mobility requirements.`}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <OverviewModule Icon={Award} title={t.details.overview.verified_title} sub={t.details.overview.verified_sub} badge="Verified" />
                                <OverviewModule Icon={TrendingUp} title={t.details.overview.demand_title} sub={`${car.faqs?.length || 0} ${t.details.overview.demand_sub}`} badge="Hot" />
                            </div>

                            <div className="bg-blue-50/30 p-6 rounded-[12px] border border-blue-100/50">
                                <h4 className="text-[12px] font-bold text-[#0a66c2] uppercase tracking-wide mb-4">{t.details.overview.highlights}</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <HighlightItem Icon={Settings} label={t.details.transmission} value={car.specifications?.transmission || 'N/A'} />
                                    <HighlightItem Icon={Fuel} label={t.details.energy_arch} value={car.specifications?.mileage || 'N/A'} />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* --- SPECIFICATION --- */}
                    {activeTab === "specs" && (
                        <motion.div
                            key="specs"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-8"
                        >
                            {specSections.map((section, index) => (
                                <div key={index} className="overflow-hidden border border-gray-100 rounded-[8px]">
                                    <div className="bg-[#f9f9f9] px-4 py-3 border-b border-gray-100">
                                        <h4 className="text-[12px] font-bold text-[#0a66c2] uppercase tracking-wide flex items-center gap-2">
                                            {section.category}
                                        </h4>
                                    </div>
                                    <div className="divide-y divide-gray-50">
                                        {section.items.map((item, idx) => (
                                            <div key={idx} className="flex grid grid-cols-12 hover:bg-gray-50 transition-colors">
                                                <div className="col-span-4 px-4 py-3 bg-gray-50/30 border-r border-gray-100">
                                                    <span className="text-[12px] font-bold text-gray-500 uppercase tracking-tight">{item.label}</span>
                                                </div>
                                                <div className="col-span-8 px-4 py-3">
                                                    <span className="text-[13px] font-bold text-gray-900">{item.value || 'N/A'}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* --- FEATURES --- */}
                    {activeTab === "features" && (
                        <motion.div
                            key="features"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                        >
                            {car.features && car.features.length > 0 ? car.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-[8px] hover:border-[#0a66c2]/30 transition-all group">
                                    <div className="p-2 bg-blue-50 text-[#0a66c2] rounded-[4px] group-hover:bg-[#0a66c2] group-hover:text-white transition-all">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <div>
                                        <div className="text-[13px] font-bold text-gray-900">{feature.feature_name}</div>
                                        <div className="text-[10px] font-medium text-gray-400 capitalize">{car.category?.name} Core</div>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full py-12 text-center text-gray-400 font-medium">{t.details.no_features}</div>
                            )}
                        </motion.div>
                    )}
                    {/* --- FAQ --- */}
                    {activeTab === "faq" && (
                        <motion.div
                            key="faq"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            <h3 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide mb-6">{t.details.faq_title}</h3>
                            <div className="space-y-3">
                                {car.faqs && car.faqs.length > 0 ? car.faqs.map((faq, index) => (
                                    <div key={index} className="rounded-[8px] border border-gray-100 overflow-hidden shadow-sm">
                                        <button
                                            onClick={() => setActiveFaqIndex(activeFaqIndex === index ? null : index)}
                                            className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-[#f9f9f9] transition-colors"
                                        >
                                            <span className="text-[13px] font-bold text-gray-800">{faq.question}</span>
                                            <ChevronRight size={14} className={`text-gray-400 transition-transform ${activeFaqIndex === index ? "rotate-90" : ""}`} />
                                        </button>
                                        <AnimatePresence>
                                            {activeFaqIndex === index && (
                                                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                                                    <div className="px-5 pb-5 pt-0 text-[13px] text-gray-500 font-medium leading-relaxed bg-[#f9f9f9]/50">
                                                        {faq.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )) : (
                                    <div className="text-gray-400 text-[13px] font-medium italic py-10 text-center border-2 border-dashed border-gray-100 rounded-xl">{t.details.no_faq}</div>
                                )}
                            </div>
                        </motion.div>
                    )}


                    {/* --- REVIEWS --- */}
                    {activeTab === "reviews" && (
                        <motion.div
                            key="reviews"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <h3 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide">{t.details.reviews_title}</h3>
                                <button className="bg-[#0a66c2] text-white px-4 py-1.5 rounded-[4px] text-[11px] font-bold uppercase tracking-wide hover:bg-[#004182] transition-all">{t.details.submit_audit}</button>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="py-12 text-center text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-xl">
                                    {t.details.no_reviews}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* --- POLICIES --- */}
                    {activeTab === "policies" && (
                        <motion.div
                            key="policies"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <ProtocolBox 
                                    Icon={ShieldCheck} 
                                    title={t.details.policies_title} 
                                    items={t.details.policies.requirements} 
                                    variant="blue"
                                />
                                <ProtocolBox 
                                    Icon={FileText} 
                                    title={t.details.admin_doc} 
                                    items={t.details.policies.admin} 
                                    variant="gray"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const HighlightItem = ({ Icon, label, value }) => (
    <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-[8px] shadow-sm">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#0a66c2]">
            <Icon size={20} />
        </div>
        <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">{label}</label>
            <div className="text-[15px] font-bold text-gray-900">{value}</div>
        </div>
    </div>
);

const OverviewModule = ({ Icon, title, sub, badge }) => (
    <div className="flex items-center gap-3 p-4 bg-[#f9f9f9] border border-gray-100 rounded-[8px] transition-all">
        <div className="p-2 bg-white text-[#0a66c2] rounded-lg shadow-sm">
            <Icon size={18} />
        </div>
        <div>
            <div className="text-[14px] font-bold text-gray-900">{title}</div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">{sub}</div>
        </div>
        {badge && <div className="ml-auto text-[9px] font-bold text-[#0a66c2] border border-[#0a66c2]/30 px-2 py-0.5 rounded-full uppercase">{badge}</div>}
    </div>
);

const ProtocolBox = ({ Icon, title, items, variant }) => (
    <div className={`rounded-[8px] p-6 border ${variant === "blue" ? "bg-blue-50/50 border-blue-100" : "bg-[#f9f9f9] border-gray-200"}`}>
        <h4 className="font-bold text-gray-900 text-[14px] mb-4 flex items-center gap-2 uppercase tracking-wide">
            <Icon size={16} className={variant === "blue" ? "text-[#0a66c2]" : "text-gray-400"} /> 
            {title}
        </h4>
        <ul className="space-y-3">
            {items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[13px] font-bold text-gray-600">
                    <CheckCircle2 size={14} className="text-[#0a66c2]" /> {item}
                </li>
            ))}
        </ul>
    </div>
);

