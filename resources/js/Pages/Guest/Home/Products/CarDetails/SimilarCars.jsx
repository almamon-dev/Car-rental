import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import {
    MapPin,
    Star,
    CheckCircle2,
    ArrowLeft,
    ArrowRight,
    Search,
    ChevronRight,
    ShieldCheck,
    Heart,
    Activity,
    Settings,
    Fuel
} from "lucide-react";
import { similarCars } from "./data";
import { useLanguage } from "@/Contexts/LanguageContext";

/**
 * INSTITUTIONAL RECOMMENDATION RAIL (LINKEDIN MASTER STYLE SYNC)
 * 
 * Philosophy:
 * - High Density: Tighter cards and shrunken metadata.
 * - Style Match: LinkedIn Primary Button protocol and rounded-12 modular cards.
 * - Institutional: Focused on verified status and professional deployment rates.
 */

export default function SimilarCars() {
    const { t } = useLanguage();
    return (
        <section className="bg-white py-12  font-sans">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                             <span className="text-[11px] font-black text-[#3749bb] uppercase tracking-widest leading-none">Recommended</span>
                        </div>
                        <h2 className="text-[24px] font-bold text-gray-900 leading-none">
                            Similar <span className="text-[#3749bb]">Cars</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 hover:text-[#3749bb] transition-all active:scale-95">
                            <ArrowLeft size={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 hover:text-[#3749bb] transition-all active:scale-95">
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>

                {/* --- GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {similarCars.map((car) => (
                        <div
                            key={car.id}
                            className="bg-[#f8f9fa] rounded-[4px] border border-gray-200/100 hover:border-gray-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 flex flex-col h-full relative overflow-hidden group"
                        >
                             {/* Badge */}
                            <div className="absolute top-0 left-0 z-20">
                                <div className="bg-[#3749bb] text-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
                                    SAVE: ৳{(Number(String(car.price).replace(/,/g, '')) * 0.2).toLocaleString()}
                                </div>
                            </div>

                            {/* Image Area */}
                            <div className="relative aspect-[16/10] overflow-hidden bg-gray-50 border-b border-gray-100/50">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Content Area */}
                            <div className="p-5 flex flex-col flex-1">
                                {/* Title */}
                                <h3 className="text-[16px] font-extrabold text-[#111827] mb-4 line-clamp-1 group-hover:text-[#3749bb] transition-colors">
                                    <Link href={route('car.details', car.slug)}>
                                        {car.name}
                                    </Link>
                                </h3>

                                {/* Technical Specs Grid */}
                                <div className="space-y-2.5 mb-5">
                                    <div className="flex items-center justify-between text-[13px]">
                                        <div className="flex items-center gap-2 text-gray-500 font-medium">
                                            <Activity size={14} className="text-[#3749bb]" />
                                            <span>{t.listing.ops_range}</span>
                                        </div>
                                        <span className="font-bold text-gray-900">{car.specifications?.mileage || '13 km/L (Combined)'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[13px]">
                                        <div className="flex items-center gap-2 text-gray-500 font-medium">
                                            <Settings size={14} className="text-[#3749bb]" />
                                            <span>{t.listing.transmission}</span>
                                        </div>
                                        <span className="font-bold text-gray-900">{car.specifications?.transmission || 'Automatic'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[13px]">
                                        <div className="flex items-center gap-2 text-gray-500 font-medium">
                                            <Fuel size={14} className="text-[#3749bb]" />
                                            <span>{t.listing.energy_arch}</span>
                                        </div>
                                        <span className="font-bold text-gray-900">{car.specifications?.fuel_type || 'Electric'}</span>
                                    </div>
                                </div>

                                {/* Key Highlights */}
                                {car.features && car.features.length > 0 && (
                                    <div className="mb-6">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2.5">Key Highlights</h4>
                                        <ul className="space-y-1.5">
                                            {car.features.slice(0, 3).map((feat, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-[13px] font-semibold text-[#334155]">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#3749bb]" />
                                                    {feat.feature_name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="mt-auto border-t border-gray-100 pt-4 space-y-4">
                                    {/* Price Block */}
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="text-[20px] font-black text-[#3749bb]">
                                            ৳{car.price}
                                        </span>
                                        <span className="text-[13px] font-medium text-gray-400 line-through decoration-gray-300">
                                            ৳{(Number(String(car.price).replace(/,/g, '')) * 1.25).toLocaleString()}
                                        </span>
                                    </div>

                                    {/* Action Button */}
                                    <Link
                                        href={route('car.details', car.slug)}
                                        className="w-full py-2.5 rounded-[4px] border border-[#3749bb] text-[#3749bb] bg-white hover:bg-[#3749bb] hover:text-white transition-all duration-300 text-[14px] font-bold text-center block"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-checkbox {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 14px;
                    height: 14px;
                    border: 1px solid #bdc3c7;
                    border-radius: 2px;
                    background-color: #fff;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    position: relative;
                }
                .custom-checkbox:checked {
                    background-color: #3749bb;
                    border-color: #3749bb;
                }
                .custom-checkbox:checked::after {
                    content: "";
                    position: absolute;
                    left: 4px;
                    top: 1px;
                    width: 4px;
                    height: 7px;
                    border: solid white;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                }
            ` }} />
        </section>
    );
}

const CartIcon = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
); 

const ListSpec = ({ Icon, label, val }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Icon size={12} className="text-gray-400" />
            <span className="text-[12px] font-medium text-gray-500">{label}</span>
        </div>
        <span className="text-[12px] font-bold text-gray-800">{val}</span>
    </div>
);
