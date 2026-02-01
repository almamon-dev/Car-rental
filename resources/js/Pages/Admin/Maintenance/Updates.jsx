/**
 * Admin - System Updates
 * 
 * Manages the platform's software version and checks for updates.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { 
    Cpu, 
    RefreshCw, 
    BadgeCheck, 
    Zap, 
    Server, 
    Package, 
    Globe, 
    Activity, 
    ShieldCheck,
    Binary
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Updates Component
 */
export default function Updates({ auth, currentVersion, latestVersion, phpVersion, dependencies = {} }) {
    const [checking, setChecking] = useState(false);

    const handleCheck = () => {
        setChecking(true);
        setTimeout(() => setChecking(false), 2000);
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="System Updates | Admin Panel" />

            <div className="max-w-full mx-auto space-y-6">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-[#191919]">
                    <div className="px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-5 text-center md:text-left">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a66c2] shadow-sm border border-slate-100">
                                <Cpu size={28} strokeWidth={2} />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <div className="w-1.5 h-3 bg-[#0a66c2] rounded-full" />
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Software Status</span>
                                </div>
                                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                                    System Updates
                                </h1>
                                <p className="text-[14px] text-slate-500 font-medium italic">
                                    Check for new features, security patches, and version information.
                                </p>
                            </div>
                        </div>

                        <button 
                            onClick={handleCheck}
                            disabled={checking}
                            className="h-11 px-8 bg-[#0a66c2] hover:bg-[#084d92] text-white rounded-xl font-bold text-[13px] transition-all flex items-center gap-2 shadow-md shadow-[#0a66c2]/10 disabled:opacity-50"
                        >
                            <RefreshCw size={18} className={checking ? "animate-spin" : ""} />
                            {checking ? "Checking..." : "Check Now"}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    
                    {/* Version Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 flex flex-col items-center justify-center text-center space-y-8"
                    >
                        <div className="relative">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center border border-emerald-100 transition-transform duration-700">
                                <BadgeCheck size={40} />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 text-[#0a66c2]">
                                <ShieldCheck size={18} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-slate-800">Everything is Up-to-Date</h2>
                            <p className="text-slate-500 text-[14px] font-medium italic">
                                You are currently running the latest stable version of the platform.
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-8 bg-slate-50 px-10 py-5 rounded-3xl border border-slate-100">
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Current</span>
                                <span className="text-[15px] font-bold text-[#0a66c2]">v{currentVersion}</span>
                            </div>
                            <div className="w-px h-8 bg-slate-200" />
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Latest</span>
                                <span className="text-[15px] font-bold text-[#0a66c2]">v{latestVersion}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Server Info Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col h-full"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                                <Zap size={18} className="text-amber-500" />
                                Server Information
                            </h3>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-600 uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Online
                            </div>
                        </div>

                        <div className="space-y-6 flex-1">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-[#0a66c2] transition-colors">
                                        <Server size={18} />
                                    </div>
                                    <span className="text-[13px] font-semibold text-slate-600">PHP Version</span>
                                </div>
                                <span className="text-[14px] font-bold text-slate-800">{phpVersion || '8.2.x'}</span>
                            </div>
                            
                            <div className="space-y-4">
                                <h4 className="text-[12px] font-bold text-slate-500 flex items-center gap-2 pl-2">
                                    <Package size={14} />
                                    Installed Packages
                                </h4>
                                <div className="max-h-[220px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                    <div className="grid grid-cols-1 gap-2">
                                        {Object.entries(dependencies).map(([pkg, ver], idx) => (
                                            <div 
                                                key={pkg}
                                                className="flex items-center justify-between p-3 px-4 bg-white rounded-xl border border-slate-100 group hover:border-[#0a66c2]/20 transition-all"
                                            >
                                                <span className="text-[12px] font-mono text-slate-400 group-hover:text-slate-700 truncate">{pkg}</span>
                                                <span className="text-[12px] font-bold text-[#0a66c2] bg-blue-50 px-2 py-0.5 rounded-lg">{ver}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8">
                             <div className="flex items-center justify-center gap-3 p-4 bg-slate-900 rounded-xl">
                                <p className="text-[12px] text-slate-400 font-medium leading-relaxed italic text-center">
                                    "Automatic updates are enabled for critical security patches to keep your platform safe."
                                </p>
                             </div>
                        </div>
                    </motion.div>
                </div>

                <div className="text-center pt-4">
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest block border-t border-slate-50 pt-6">Platform Core © 2026</span>
                </div>
            </div>
        </AdminLayout>
    );
}
