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
    Info
} from "lucide-react";
import { features, specifications, reviews, faqs } from "./data";

/**
 * INSTITUTIONAL DATA MANIFEST (LINKEDIN MASTER STYLE SYNC)
 * 
 * Philosophy:
 * - High Density: Tighter navigation and compact module presentation.
 * - Style Match: 11px uppercase labels, 12px-14px bold content.
 * - Interaction: Integrated search-style breadcrumbs or clean tab indicators.
 */

export default function TabsContent({
    activeTab,
    setActiveTab,
    activeFaqIndex,
    setActiveFaqIndex,
}) {
    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "specs", label: "Manifest" },
        { id: "features", label: "Assets" },
        { id: "reviews", label: "Audits" },
        { id: "policies", label: "Protocols" }
    ];

    return (
        <div className="bg-white rounded-[12px] overflow-hidden font-sans">
            {/* Modular Navigation */}
            <div className="border-b border-gray-100 bg-slate-50/20">
                <nav className="flex overflow-x-auto scrollbar-hide px-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-3.5 text-[12px] font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
                                activeTab === tab.id
                                    ? "text-[#0a66c2]"
                                    : "text-gray-400 hover:text-gray-900"
                            }`}
                        >
                             {tab.label}
                             {activeTab === tab.id && (
                                 <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0a66c2] rounded-t-full" />
                             )}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-6">
                <AnimatePresence mode="wait">
                    
                    {/* --- OVERVIEW MANIFEST --- */}
                    {activeTab === "overview" && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1 h-3 bg-[#0a66c2] rounded-full" />
                                <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-widest">About This Asset</h3>
                            </div>
                            
                            <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
                                The BMW M8 Competition defines the strategic intersection of track-oriented performance and executive grand touring. 
                                Equipped with a 4.4L V8 M TwinPower Turbo engine, this unit delivers precision-engineered dynamics for Tier-1 mobility requirements.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                <OverviewModule Icon={Award} title="Verified Tier-1" sub="Audited Asset Quality" badge="Success" />
                                <OverviewModule Icon={TrendingUp} title="Active Deployment" sub="High Network Priority" badge="Popular" />
                            </div>
                        </motion.div>
                    )}

                    {/* --- TECHNICAL MANIFEST (SPECS) --- */}
                    {activeTab === "specs" && (
                        <motion.div
                            key="specs"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-8"
                        >
                            {specifications.map((section, index) => (
                                <div key={index} className="space-y-3">
                                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0a66c2]" />
                                        {section.category} Archive
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {section.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-gray-100/50 rounded-lg hover:border-[#0a66c2]/20 transition-all group">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-gray-300 group-hover:text-[#0a66c2] transition-colors">{item.icon}</span>
                                                    <span className="text-[12px] font-bold text-gray-600 uppercase tracking-tighter">{item.label}</span>
                                                </div>
                                                <span className="text-[13px] font-black text-gray-900">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* --- ASSET MATRIX (FEATURES) --- */}
                    {activeTab === "features" && (
                        <motion.div
                            key="features"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
                        >
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg hover:border-[#0a66c2]/30 transition-all cursor-crosshair">
                                    <div className="p-1.5 bg-blue-50 text-[#0a66c2] rounded-[4px]">
                                        {feature.icon}
                                    </div>
                                    <div className="leading-tight">
                                        <div className="text-[12px] font-bold text-gray-900">{feature.label}</div>
                                        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">System {feature.category}</div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* --- AUDIT FEED (REVIEWS) --- */}
                    {activeTab === "reviews" && (
                        <motion.div
                            key="reviews"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-2">
                                     <div className="bg-[#0a66c2] p-1.5 rounded-sm"><Verified size={14} className="text-white" /></div>
                                     <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-widest">Institutional Audit Feedback</h3>
                                </div>
                                <button className="text-[11px] font-black text-[#0a66c2] uppercase tracking-widest hover:underline">Submit Audit Report</button>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {reviews.map((review) => (
                                    <div key={review.id} className="bg-slate-50/50 border border-gray-100 rounded-[12px] p-5 hover:bg-white transition-all">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 border border-white shadow-sm overflow-hidden">
                                                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-[13px] font-black text-gray-900">{review.name}</h4>
                                                        {review.verified && <BadgeCheck size={14} className="text-[#0a66c2]" />}
                                                    </div>
                                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md border border-gray-100">
                                                <Star size={10} fill="#0a66c2" className="text-[#0a66c2]" />
                                                <span className="text-[10px] font-black text-gray-900">{review.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-[12px] text-gray-600 font-medium leading-relaxed italic border-l-2 border-gray-200 pl-4">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* --- COMPLIANCE PROTOCOLS (POLICIES) --- */}
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
                                    title="Deployment Policies" 
                                    items={["Minimum operative age: 25", "V-Grade Security License", "Tier-1 Asset Escrow REQUIRED"]} 
                                    variant="blue"
                                />
                                <ProtocolBox 
                                    Icon={FileText} 
                                    title="Administrative Documentation" 
                                    items={["Executive Rental Agreement", "Protocol-B Manifest", "Audit Access Log"]} 
                                    variant="gray"
                                />
                            </div>

                            {/* FAQ Section Sync */}
                            <div className="pt-6 border-t border-gray-100">
                                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Frequently Referenced Protocols</h4>
                                <div className="space-y-2">
                                    {faqs.map((faq, index) => (
                                        <div key={index} className="rounded-lg border border-gray-100 overflow-hidden">
                                            <button
                                                onClick={() => setActiveFaqIndex(activeFaqIndex === index ? null : index)}
                                                className="w-full flex items-center justify-between p-3.5 text-left bg-white hover:bg-slate-50 transition-colors"
                                            >
                                                <span className="text-[12px] font-bold text-gray-800">{faq.q}</span>
                                                <ChevronRight size={14} className={`text-gray-300 transition-transform ${activeFaqIndex === index ? "rotate-90" : ""}`} />
                                            </button>
                                            <AnimatePresence>
                                                {activeFaqIndex === index && (
                                                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                                                        <div className="px-4 pb-4 pt-0 text-[12px] text-gray-500 font-medium leading-relaxed bg-slate-50/30">
                                                            {faq.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const OverviewModule = ({ Icon, title, sub, badge }) => (
    <div className="flex items-center gap-3 p-3 bg-[#f3f7fb]/60 border border-transparent hover:border-[#0a66c2]/20 rounded-xl transition-all">
        <div className="p-2 bg-white text-[#0a66c2] rounded-lg shadow-sm">
            <Icon size={18} />
        </div>
        <div>
            <div className="text-[13px] font-bold text-gray-900">{title}</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest uppercase">{sub}</div>
        </div>
        {badge && <div className="ml-auto text-[8px] font-black text-[#0a66c2] border border-[#0a66c2]/30 px-1.5 py-0.5 rounded-full uppercase">{badge}</div>}
    </div>
);

const ProtocolBox = ({ Icon, title, items, variant }) => (
    <div className={`rounded-xl p-5 border ${variant === "blue" ? "bg-blue-50/50 border-blue-100/50" : "bg-slate-50/50 border-gray-100"}`}>
        <h4 className="font-bold text-gray-900 text-[13px] mb-4 flex items-center gap-2 uppercase tracking-wide">
            <Icon size={16} className={variant === "blue" ? "text-[#0a66c2]" : "text-gray-400"} /> 
            {title}
        </h4>
        <ul className="space-y-2.5">
            {items.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-[12px] font-medium text-gray-600">
                    <CheckCircle2 size={12} className="text-[#0a66c2]/40" /> {item}
                </li>
            ))}
        </ul>
    </div>
);
