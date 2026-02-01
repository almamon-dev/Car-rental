/**
 * Error - 404 Page Not Found
 * 
 * Institutional-grade error boundary for non-existent routes, 
 * providing navigation recovery and support redirection.
 * 
 * @author AL Mamon
 * @version 1.1.0
 */

import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, MessageSquare, ShieldAlert, ChevronRight, Activity } from "lucide-react";

/**
 * Error404 Component
 * 
 * @returns {JSX.Element}
 */
export default function Error404() {
    /**
     * Recovery Protocol: Logic to return to previous state or home
     */
    const handleGoBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            router.visit("/");
        }
    };

    return (
        <>
            <Head title="404 - Resource Not Found | EliteFleet" />

            <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6 font-sans overflow-hidden">
                <div className="max-w-xl w-full text-center relative">
                    
                    {/* --- DECORATIVE BACKGROUND ASSET --- */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03] select-none pointer-events-none">
                        <h1 className="text-[25rem] font-black tracking-tighter">404</h1>
                    </div>

                    {/* --- ERROR IDENTIFIER --- */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 inline-flex flex-col items-center"
                    >
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-[#0a66c2] mb-6">
                            <ShieldAlert size={32} strokeWidth={1.5} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
                                Resource <span className="text-[#0a66c2]">Not Found</span>
                            </h2>
                            <div className="flex items-center justify-center gap-2">
                                <Activity size={12} className="text-[#0a66c2]" />
                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Error Code: 404_DEPLOYMENT_FAILURE</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- NARRATIVE --- */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4 mb-12"
                    >
                        <p className="text-lg text-gray-600 font-medium">
                            The requested tactical resource could not be localized.
                        </p>
                        <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                            It appears the path you're attempting to access has been decommissioned 
                            or resides outside our current operational parameters.
                        </p>
                    </motion.div>

                    {/* --- RECOVERY ACTIONS --- */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
                    >
                        <button
                            onClick={handleGoBack}
                            className="flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98] shadow-sm group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            Return to Previous
                        </button>
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-3 bg-[#0a66c2] text-white font-bold py-4 rounded-xl hover:bg-[#084d92] transition-all active:scale-[0.98] shadow-md shadow-[#0a66c2]/20"
                        >
                            <Home size={18} />
                            Base Dashboard
                        </Link>
                    </motion.div>

                    {/* --- SUPPORT REDIRECTS --- */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="pt-8 border-t border-gray-100 flex flex-wrap justify-center gap-x-8 gap-y-4"
                    >
                        <Link 
                            href={route('help.center')} 
                            className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#0a66c2] transition-colors group"
                        >
                            <MessageSquare size={14} />
                            Help Center
                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </Link>
                        <Link 
                            href={route('contact')} 
                            className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#0a66c2] transition-colors group"
                        >
                            <ShieldAlert size={14} />
                            Report Breach
                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </Link>
                    </motion.div>

                </div>
            </div>
        </>
    );
}
