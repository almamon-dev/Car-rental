/**
 * Guest - Categories Index
 * 
 * Displays a grid of available asset categories, providing a high-level 
 * entry point for marketplace discovery based on vehicle classification.
 * 
 * @author AL Mamon
 * @version 1.1.0
 */

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { ArrowRight, Tag, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Categories Index Component
 * 
 * @param {Object} props
 * @param {Array} props.categories - Collection of asset categories
 * @returns {JSX.Element}
 */
export default function Index({ categories }) {
    return (
        <UserLayout>
            <Head title="Vehicle Categories | EliteFleet" />
            
            <div className="bg-[#f8f9fa] py-16 md:py-24 font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    
                    {/* --- HEADER: INSTITUTIONAL CONTEXT --- */}
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4"
                        >
                            <ShieldCheck size={14} className="text-[#0a66c2]" />
                            <span className="text-[11px] font-black text-[#0a66c2] uppercase tracking-widest">Marketplace Discovery</span>
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-none">
                            Explore by <span className="text-[#0a66c2]">Category</span>
                        </h1>
                        <p className="text-gray-500 text-lg font-medium leading-relaxed">
                            Navigate our institutional-grade fleet through specialized classifications. 
                            From executive mobility to performance deployment, find your perfect asset.
                        </p>
                    </div>

                    {/* --- GRID: CATEGORY MANIFEST --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link 
                                    href={route('car.list', { category: category.slug })}
                                    className="group block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Media Stage */}
                                    <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                                         {category.image ? (
                                            <img 
                                                src={`/storage/${category.image}`} 
                                                alt={category.name} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                            />
                                         ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                <Tag size={48} className="text-gray-200 group-hover:text-[#0a66c2] transition-colors duration-500" />
                                            </div>
                                         )}
                                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                         
                                         {/* Inventory Badge */}
                                         <div className="absolute top-4 right-4">
                                             <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-white shadow-sm flex items-center gap-1.5">
                                                 <Activity size={10} className="text-[#0a66c2]" />
                                                 <span className="text-[10px] font-bold text-gray-900">{category.cars_count} Active</span>
                                             </div>
                                         </div>
                                    </div>

                                    {/* Identification Module */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0a66c2] transition-colors tracking-tight">
                                            {category.name}
                                        </h3>
                                        <p className="text-[14px] text-gray-500 font-medium line-clamp-2 leading-relaxed h-[40px]">
                                            {category.description || `High-performance selection of verified ${category.name} vehicles for various deployment scenarios.`}
                                        </p>
                                        
                                        <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                                            <span className="text-[13px] font-bold text-[#0a66c2] flex items-center gap-1.5">
                                                View Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#0a66c2] group-hover:text-white transition-all transform group-hover:rotate-45">
                                                <Tag size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* --- FALLBACK: EMPTY STATE --- */}
                    {categories.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm"
                        >
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Tag size={40} className="text-gray-200" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Inventory Sync Pending</h3>
                            <p className="text-gray-500 font-medium">Our marketplace catalog is currently being updated. Please check back shortly.</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}
