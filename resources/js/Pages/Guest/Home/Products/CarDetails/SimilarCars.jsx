/**
 * Car Details - Similar Asset Recommendations
 * 
 * Provides a curated rail of related vehicles based on technical specifications
 * or category proximity, ensuring continuous engagement within the asset ecosystem.
 * 
 * @author AL Mamon
 * @version 1.0.0
 */

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
 * SimilarCars Component
 * 
 * @param {Object} props
 * @param {Array} props.cars - Recommended asset collection
 * @returns {JSX.Element}
 */
export default function SimilarCars({ cars = [] }) {
    // --- Context & Initialization ---
    const { t } = useLanguage();
    
    // --- Logic: Data Normalization ---
    // Fallback to dummy data only if no real cars are provided
    const displayCars = cars.length > 0 ? cars : similarCars;

    return (
        <section className="bg-white py-12 font-sans">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                             <span className="text-[11px] font-black text-[#0a66c2] uppercase tracking-widest leading-none">{t.details.similar_cars.recommended}</span>
                        </div>
                        <h2 className="text-[24px] font-bold text-gray-900 leading-none">
                            {t.details.similar_cars.title} <span className="text-[#0a66c2]">{t.details.similar_cars.accent}</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 hover:text-[#0a66c2] transition-all active:scale-95">
                            <ArrowLeft size={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 hover:text-[#0a66c2] transition-all active:scale-95">
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>

                {/* --- GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {displayCars.map((car) => {
                        // Reconcile DB Model vs Dummy Data
                        const dailyRate = car.price_details?.daily_rate || Number(String(car.price || 0).replace(/,/g, ''));
                        const carImage = car.images?.[0] ? `/${car.images[0].file_path}` : car.image;
                        const carName = car.brand?.name ? `${car.brand.name} ${car.model}` : car.name;
                        const carSlug = car.slug;

                        return (
                            <div
                                key={car.id}
                                className="bg-[#f8f9fa] rounded-[4px] border border-gray-200/100 hover:border-gray-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 flex flex-col h-full relative overflow-hidden group"
                            >
                                 {/* Badge */}
                                <div className="absolute top-0 left-0 z-20">
                                    <div className="bg-[#0a66c2] text-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
                                        {t.listing.save}: ৳{Math.floor(dailyRate * 0.2).toLocaleString()}
                                    </div>
                                </div>

                                {/* Image Area */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-gray-50 border-b border-gray-100/50">
                                    <img
                                        src={carImage}
                                        alt={carName}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                {/* Content Area */}
                                <div className="p-5 flex flex-col flex-1">
                                    {/* Title */}
                                    <h3 className="text-[16px] font-extrabold text-[#111827] mb-4 line-clamp-1 group-hover:text-[#0a66c2] transition-colors">
                                        <Link href={route('car.details', carSlug)}>
                                            {carName}
                                        </Link>
                                    </h3>

                                    {/* Technical Specs Grid */}
                                    <div className="space-y-2.5 mb-5">
                                        <div className="flex items-center justify-between text-[13px]">
                                            <div className="flex items-center gap-2 text-gray-500 font-medium">
                                                <Activity size={14} className="text-[#0a66c2]" />
                                                <span>{t.listing.ops_range}</span>
                                            </div>
                                            <span className="font-bold text-gray-900">{car.specifications?.mileage || '13 km/L'}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[13px]">
                                            <div className="flex items-center gap-2 text-gray-500 font-medium">
                                                <Settings size={14} className="text-[#0a66c2]" />
                                                <span>{t.listing.transmission}</span>
                                            </div>
                                            <span className="font-bold text-gray-900">{car.specifications?.transmission || car.transmission || 'Automatic'}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[13px]">
                                            <div className="flex items-center gap-2 text-gray-500 font-medium">
                                                <Fuel size={14} className="text-[#0a66c2]" />
                                                <span>{t.listing.fuel_type}</span>
                                            </div>
                                            <span className="font-bold text-gray-900">{car.specifications?.fuel_type || car.fuel_type || 'Petrol'}</span>
                                        </div>
                                    </div>

                                    {/* Key Highlights */}
                                    {car.features && car.features.length > 0 && (
                                        <div className="mb-6">
                                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2.5">{t.listing.key_highlights}</h4>
                                            <ul className="space-y-1.5">
                                                {car.features.slice(0, 3).map((feat, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-[13px] font-semibold text-[#334155]">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0a66c2]" />
                                                        {feat.feature_name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="mt-auto border-t border-gray-100 pt-4 space-y-4">
                                        {/* Price Block */}
                                        <div className="flex items-baseline justify-center gap-2">
                                            <span className="text-[20px] font-black text-[#0a66c2]">
                                                ৳{dailyRate.toLocaleString()}
                                            </span>
                                            <span className="text-[13px] font-medium text-gray-400 line-through decoration-gray-300">
                                                ৳{Math.floor(dailyRate * 1.25).toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Action Button */}
                                        <Link
                                            href={route('car.details', carSlug)}
                                            className="w-full py-2.5 rounded-[4px] border border-[#0a66c2] text-[#0a66c2] bg-white hover:bg-[#0a66c2] hover:text-white transition-all duration-300 text-[14px] font-bold text-center block"
                                        >
                                            {t.listing.view_details}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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
                    background-color: #0a66c2;
                    border-color: #0a66c2;
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
