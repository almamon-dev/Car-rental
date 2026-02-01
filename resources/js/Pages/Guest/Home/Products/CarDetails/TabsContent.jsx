/**
 * Car Details - Content Tabs
 * 
 * Manages the multi-layered information architecture of the asset, including
 * technical specifications, high-fidelity features, and client auditing (reviews).
 * 
 * @author AL Mamon
 * @version 1.1.0
 */

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
} from "lucide-react";
import { useLanguage } from "@/Contexts/LanguageContext";
import { router, usePage, useForm } from "@inertiajs/react";

/**
 * TabsContent Component
 * 
 * @returns {JSX.Element}
 */
export default function TabsContent({
    car,
    activeTab,
    setActiveTab,
    activeFaqIndex,
    setActiveFaqIndex,
}) {
    // --- Context & Initialization ---
    const { t } = useLanguage();

    // --- Tab Configuration ---
    const tabs = [
        { id: "overview", label: t.details.tabs.overview },
        { id: "specs", label: t.details.tabs.specs },
        { id: "features", label: t.details.tabs.features },
        { id: "faq", label: t.details.tabs.faq },
        { id: "reviews", label: t.details.tabs.reviews },
        { id: "policies", label: t.details.tabs.policies }
    ];

    const specSections = [
        {
            category: t.details.gen_info,
            items: [
                { label: t.details.manufacturer, value: car.brand?.name || car.make },
                { label: t.details.model_ref, value: car.model },
                { label: t.details.production_year, value: car.year },
                { label: "Seats Capacity", value: `${car.seats || 5} Seats` },
                { label: t.details.asset_class, value: car.specifications?.vehicle_type || car.category?.name },
                { label: t.details.exterior_finish, value: car.specifications?.color },
            ]
        },
        {
            category: t.details.tech_perf,
            items: [
                { label: "Transmission", value: car.specifications?.transmission },
                { label: "Fuel System", value: car.specifications?.fuel_type },
                { label: "Mileage Range", value: car.specifications?.mileage },
                { label: "Engine Capacity", value: car.specifications?.engine_capacity },
                { label: "Steering Control", value: car.specifications?.steering },
            ]
        }
    ];

    return (
        <div className="bg-white rounded-xl overflow-hidden font-sans border border-gray-100 shadow-sm">
            {/* Modular Navigation (Star Tech Style) */}
            <div className="border-b border-gray-100 px-2 pt-1">
                <nav className="flex overflow-x-auto no-scrollbar gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-3 text-[14px] font-bold transition-all relative whitespace-nowrap border-b-2 ${
                                 activeTab === tab.id
                                     ? "border-[#0a66c2] text-[#0a66c2]"
                                     : "border-transparent text-gray-500 hover:text-[#0a66c2]"
                            }`}
                        >
                             {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-4">
                <AnimatePresence mode="wait">
                    
                    {/* --- OVERVIEW --- */}
                    {activeTab === "overview" && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div>
                                <h3 className="text-[18px] font-bold text-gray-900 mb-3">Vehicle Description</h3>
                                <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
                                    {car.description || `The ${car.make} ${car.model} is a premium vehicle designed for comfort and performance.`}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <OverviewModule Icon={Award} title="Verified Grade" sub="A-Tier Status" badge="Verified" />
                                <OverviewModule Icon={TrendingUp} title="High Demand" sub="Active Deployment" badge="Hot" />
                            </div>
                        </motion.div>
                    )}

                    {/* --- SPECIFICATION --- */}
                    {activeTab === "specs" && (
                        <motion.div
                            key="specs"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            {specSections.map((section, index) => (
                                <div key={index} className="overflow-hidden border border-gray-100 rounded-lg shadow-sm">
                                    <div className="bg-[#f2f4f8] px-4 py-2.5 border-b border-gray-100">
                                        <h4 className="text-[14px] font-bold text-[#0a66c2]">
                                            {section.category}
                                        </h4>
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {section.items.map((item, idx) => (
                                            <div key={idx} className="flex grid grid-cols-12 hover:bg-gray-50 transition-colors">
                                                <div className="col-span-5 px-4 py-3 bg-[#f8fafc] border-r border-gray-100">
                                                    <span className="text-[14px] font-semibold text-gray-500">{item.label}</span>
                                                </div>
                                                <div className="col-span-7 px-4 py-3">
                                                    <span className="text-[14px] font-bold text-gray-900">{item.value || 'N/A'}</span>
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
                                <div key={index} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-lg hover:border-[#0a66c2]/30 transition-all group shadow-sm">
                                    <div className="p-2 bg-blue-50 text-[#0a66c2] rounded-lg group-hover:bg-[#0a66c2] group-hover:text-white transition-all">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <div>
                                        <div className="text-[13px] font-bold text-gray-900 leading-tight">{feature.feature_name}</div>
                                        <div className="text-[11px] font-medium text-gray-400 capitalize">{car.category?.name} Feature</div>
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
                                    <div key={index} className="rounded-lg border border-gray-100 overflow-hidden shadow-sm">
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
                            className="space-y-8"
                        >
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <div>
                                    <h3 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide">{t.details.reviews_title}</h3>
                                    <div className="flex items-center gap-1 mt-1">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} size={12} className={s <= Math.round(car.average_rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
                                        ))}
                                        <span className="text-[12px] font-bold text-gray-500 ml-1">{car.average_rating} / 5.0</span>
                                        <span className="text-[12px] text-gray-400 ml-1">({car.reviews?.length || 0} reviews)</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="bg-[#0a66c2] text-white px-5 py-2 rounded-lg text-[13px] font-bold hover:bg-[#084d92] transition-all shadow-md active:scale-95"
                                >
                                    Write a Review
                                </button>
                            </div>

                            <div className="space-y-4">
                                {car.reviews && car.reviews.length > 0 ? car.reviews.map((review) => (
                                    <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm transition-all hover:shadow-md">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#f3f2ef] flex items-center justify-center border border-gray-100 overflow-hidden">
                                                    {review.user?.profile_photo_url ? (
                                                        <img src={review.user.profile_photo_url} alt={review.user.name} />
                                                    ) : (
                                                        <Users size={18} className="text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[14px] font-bold text-gray-900">{review.user?.name}</span>
                                                        {review.is_verified && (
                                                            <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold">
                                                                <BadgeCheck size={10} /> Verified
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-0.5">
                                                        {[1, 2, 3, 4, 5].map((s) => (
                                                            <Star key={s} size={10} className={s <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
                                                        ))}
                                                        <span className="text-[11px] text-gray-400 font-medium ml-2">{new Date(review.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <button 
                                                onClick={() => router.post(route('user.reviews.like', review.id), {}, { preserveScroll: true })}
                                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all ${review.is_liked ? 'bg-blue-50 border-blue-200 text-[#0a66c2]' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'}`}
                                            >
                                                <TrendingUp size={14} className={review.is_liked ? "fill-[#0a66c2]" : ""} />
                                                <span className="text-[13px] font-bold">{review.likes_count || 0}</span>
                                            </button>
                                        </div>
                                        <p className="text-[13.5px] text-gray-600 leading-relaxed font-medium pl-1">
                                            {review.comment}
                                        </p>
                                    </div>
                                )) : (
                                    <div className="py-12 text-center text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-xl">
                                        {t.details.no_reviews}
                                    </div>
                                )}
                            </div>

                            {/* Review Submission Form */}
                            <div id="review-form" className="mt-12 pt-10 border-t border-gray-100">
                                <h3 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide mb-6">Leave a Review</h3>
                                <div className="bg-[#f9f9f9] rounded-xl p-6 border border-gray-100 shadow-inner">
                                    <ReviewForm carId={car.id} />
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

function ReviewForm({ carId }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, reset, errors } = useForm({
        car_id: carId,
        rating: 5,
        comment: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!auth.user) {
            router.get(route('login'));
            return;
        }
        post(route('user.reviews.store'), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-[12px] font-bold text-gray-500 uppercase mb-2">Your Rating</label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setData('rating', star)}
                            className="transition-transform active:scale-90"
                        >
                            <Star 
                                size={24} 
                                className={star <= data.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                            />
                        </button>
                    ))}
                </div>
            </div>
            
            <div>
                <label className="block text-[12px] font-bold text-gray-500 uppercase mb-2">Your Review</label>
                <textarea
                    value={data.comment}
                    onChange={(e) => setData('comment', e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg p-4 text-[14px] font-medium focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none min-h-[120px] transition-all shadow-sm"
                    placeholder="Tell us about your experience with this vehicle..."
                />
                {errors.comment && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.comment}</p>}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="w-full sm:w-auto bg-[#0a66c2] text-white px-8 py-3 rounded-lg text-[14px] font-bold hover:bg-[#084d92] transition-all shadow-md disabled:opacity-50 active:scale-95"
            >
                {processing ? 'Submitting...' : 'Post Review'}
            </button>
        </form>
    );
}

const HighlightItem = ({ Icon, label, value }) => (
    <div className="flex items-center gap-4 p-4 bg-[#f2f4f8] border border-gray-100 rounded-[4px]">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0a66c2] shadow-sm">
            <Icon size={20} />
        </div>
        <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</label>
            <div className="text-[14px] font-bold text-gray-900">{value}</div>
        </div>
    </div>
);

const OverviewModule = ({ Icon, title, sub, badge }) => (
    <div className="flex items-center gap-3 p-4 bg-[#f8fafc] border border-gray-100 rounded-[6px] transition-all">
        <div className="p-2 bg-white text-[#0a66c2] rounded-full shadow-sm border border-gray-50">
            <Icon size={18} />
        </div>
        <div>
            <div className="text-[14px] font-bold text-gray-900 leading-tight">{title}</div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase">{sub}</div>
        </div>
        {badge && <div className="ml-auto text-[10px] font-bold text-[#0a66c2] border border-[#0a66c2]/20 px-2 py-0.5 rounded-[4px] bg-white uppercase tracking-tight">{badge}</div>}
    </div>
);

const ProtocolBox = ({ Icon, title, items, variant }) => (
    <div className={`rounded-xl p-5 border ${variant === "blue" ? "bg-blue-50/50 border-blue-100" : "bg-[#f9f9f9] border-gray-200 shadow-sm"}`}>
        <h4 className="font-bold text-gray-900 text-[15px] mb-4 flex items-center gap-2">
            <Icon size={16} className={variant === "blue" ? "text-[#0a66c2]" : "text-gray-400"} /> 
            {title}
        </h4>
        <ul className="space-y-3">
            {items.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[14px] font-medium text-gray-600">
                    <CheckCircle2 size={14} className="text-[#0a66c2]" /> {item}
                </li>
            ))}
        </ul>
    </div>
);
