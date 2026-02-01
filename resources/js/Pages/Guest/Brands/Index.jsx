/**
 * Guest - Brands Index
 * 
 * Displays a curated roster of automotive manufacturers, representing the 
 * world's finest automotive engineering and institutional-grade fleet partners.
 * 
 * @author AL Mamon
 * @version 1.1.0
 */

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { ArrowRight, Briefcase, Award, Globe, ShieldCheck, Car, Zap, Shield, Sparkles, Crown, Gem, Rocket, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Generate a unique color for each brand based on its name
 * @param {string} brandName - The name of the brand
 * @returns {string} Hex color code without #
 */
const getBrandColor = (brandName) => {
    const colors = [
        '0a66c2', // LinkedIn Blue
        '1877f2', // Facebook Blue
        'ea4335', // Google Red
        '34a853', // Google Green
        'fbbc05', // Google Yellow
        '4285f4', // Google Blue
        '7c3aed', // Purple
        'ec4899', // Pink
        '06b6d4', // Cyan
        'f59e0b', // Amber
        '10b981', // Emerald
        '8b5cf6', // Violet
        'f97316', // Orange
        '14b8a6', // Teal
        '6366f1', // Indigo
    ];
    
    // Simple hash function to get consistent color for same brand
    let hash = 0;
    for (let i = 0; i < brandName.length; i++) {
        hash = brandName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
};

/**
 * Get a unique icon for each brand based on its name
 * @param {string} brandName - The name of the brand
 * @returns {React.Component} Lucide icon component
 */
const getBrandIcon = (brandName) => {
    const icons = [Car, Zap, Award, Shield, Sparkles, Crown, Gem, Rocket, Target, TrendingUp];
    
    // Simple hash function to get consistent icon for same brand
    let hash = 0;
    for (let i = 0; i < brandName.length; i++) {
        hash = brandName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return icons[Math.abs(hash) % icons.length];
};

/**
 * Brands Index Component
 * 
 * @param {Object} props
 * @param {Array} props.brands - Collection of automotive brands
 * @returns {JSX.Element}
 */
export default function Index({ brands }) {
    return (
        <UserLayout>
            <Head title="Premium Manufacturers | EliteFleet" />
            
            <div className="bg-[#f8f9fa] py-16 md:py-24 font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    
                    {/* --- HEADER: BRAND NARRATIVE --- */}
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4"
                        >
                            <Award size={14} className="text-[#0a66c2]" />
                            <span className="text-[11px] font-black text-[#0a66c2] uppercase tracking-widest">Finest Engineering</span>
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-none">
                            Premium <span className="text-[#0a66c2]">Manufacturers</span>
                        </h1>
                        <p className="text-gray-500 text-lg font-medium leading-relaxed">
                            Selection from the world's most prestigious automotive houses. 
                            Our partners represent the pinnacle of safety, performance, and craftsmanship.
                        </p>
                    </div>

                    {/* --- GRID: MANUFACTURER ROSTER --- */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                        {brands.map((brand, index) => (
                            <motion.div
                                key={brand.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.04 }}
                            >
                                <Link 
                                    href={route('car.list', { brand: brand.slug })}
                                    className="group relative bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 aspect-square overflow-hidden"
                                >
                                    {/* Brand Logo Container */}
                                    <div className="w-16 h-16 sm:w-24 sm:h-24 mb-6 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-110">
                                         {brand.logo ? (
                                            <img 
                                                src={`/storage/${brand.logo}`} 
                                                alt={brand.name} 
                                                className="w-full h-full object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500" 
                                            />
                                         ) : (
                                            React.createElement(getBrandIcon(brand.name), {
                                                size: 64,
                                                style: { color: `#${getBrandColor(brand.name)}` },
                                                strokeWidth: 1.5,
                                                className: "opacity-70 group-hover:opacity-100 transition-all duration-500"
                                            })
                                         )}
                                    </div>
                                    
                                    {/* Brand Information */}
                                    <div className="text-center relative z-10">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#0a66c2] transition-colors leading-tight">
                                            {brand.name}
                                        </h3>
                                        <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full group-hover:bg-blue-50 group-hover:text-[#0a66c2] transition-all uppercase tracking-tighter">
                                            <Globe size={10} />
                                            {brand.cars_count} Active Models
                                        </div>
                                    </div>

                                    {/* Hover Enhancement: Indicator */}
                                    <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                        <ArrowRight size={16} className="text-[#0a66c2]" />
                                    </div>

                                    {/* Subtle Background Accent */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:to-blue-50/50 transition-all duration-500" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* --- FALLBACK: EMPTY MANIFEST --- */}
                    {brands.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm"
                        >
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
                                <Briefcase size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Network Expansion Active</h3>
                            <p className="text-gray-500 font-medium">We are currently onboarding new manufacturing partners. Stay tuned for updates.</p>
                        </motion.div>
                    )}

                    {/* --- TRUST FOOTER: INSTITUTIONAL QUALITY --- */}
                    <div className="mt-16 pt-16 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-[#0a66c2]">
                                <ShieldCheck size={24} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900">Verified Partnerships</h4>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">Direct collaboration with global manufacturers ensures asset authenticity and maintenance standards.</p>
                        </div>
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-[#0a66c2]">
                                <Award size={24} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900">Premium Curation</h4>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">Only manufacturers meeting our strict safety and performance protocols are admitted to the EliteFleet ecosystem.</p>
                        </div>
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-[#0a66c2]">
                                <Globe size={24} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900">Global Coverage</h4>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">Access to diverse engineering philosophies, from German precision to Japanese reliability.</p>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
