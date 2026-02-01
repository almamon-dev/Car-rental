/**
 * Admin - System Performance
 * 
 * Provides tools for clearing caches and optimizing application speed.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { 
    Zap, 
    Trash2, 
    RefreshCw, 
    Layers, 
    Map, 
    FileCode, 
    Terminal, 
    CheckCircle2, 
    AlertCircle,
    Cpu,
    Activity,
    ShieldCheck,
    Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Optimize Component
 */
export default function Optimize({ auth }) {
    const { flash } = usePage().props;
    const [running, setRunning] = useState(null);

    const handleRunOptimize = (type) => {
        setRunning(type);
        
        router.post(route('admin.maintenance.optimize.run'), { type }, {
            preserveScroll: true,
            onFinish: () => {
                setRunning(null);
            }
        });
    };

    const tools = [
        {
            id: 'optimize',
            title: 'Full Optimization',
            description: 'Optimizes configuration, routes, and views all at once for maximum website speed.',
            icon: Zap,
            action: 'Run All',
            color: 'text-amber-500 bg-amber-50',
            border: 'border-amber-100 shadow-amber-100/20'
        },
        {
            id: 'cache_clear',
            title: 'Clear Cache',
            description: 'Clears the application cache, including your custom data and database results.',
            icon: Trash2,
            action: 'Clear Cache',
            color: 'text-rose-500 bg-rose-50',
            border: 'border-rose-100 shadow-rose-100/20'
        },
        {
            id: 'config_cache',
            title: 'Cache Config',
            description: 'Speeds up the loading of configuration files by combining them into one file.',
            icon: Layers,
            action: 'Cache Config',
            color: 'text-[#0a66c2] bg-blue-50',
            border: 'border-blue-100 shadow-blue-100/20'
        },
        {
            id: 'route_cache',
            title: 'Cache Routes',
            description: 'Creates a pre-compiled list of all website URLs to make page changes faster.',
            icon: Map,
            action: 'Cache Routes',
            color: 'text-emerald-500 bg-emerald-50',
            border: 'border-emerald-100 shadow-emerald-100/20'
        },
        {
            id: 'view_clear',
            title: 'Clear Views',
            description: 'Clears pre-rendered page templates. Useful if you see old design changes.',
            icon: FileCode,
            action: 'Clear Views',
            color: 'text-slate-500 bg-slate-50',
            border: 'border-slate-100'
        }
    ];

    return (
        <AdminLayout user={auth.user}>
            <Head title="Performance | Admin Panel" />

            <div className="max-w-full mx-auto space-y-6">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-[#191919]">
                    <div className="px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a66c2] shadow-sm border border-slate-100">
                                <Cpu size={28} strokeWidth={2} />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-3 bg-[#0a66c2] rounded-full" />
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Platform Health</span>
                                </div>
                                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                                    Optimize Performance
                                </h1>
                                <p className="text-[14px] text-slate-500 font-medium italic">
                                    Improve speed and clear temporary data to keep your platform running smoothly.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 text-[11px] font-bold uppercase tracking-widest">
                            <Activity size={12} strokeWidth={3} className="animate-pulse" />
                            System Active
                        </div>
                    </div>
                </div>

                {/* --- TOOLS GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
                    <AnimatePresence mode="popLayout">
                        {tools.map((tool, index) => {
                            const Icon = tool.icon;
                            return (
                                <motion.div 
                                    key={tool.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col h-full group overflow-hidden"
                                >
                                    <div className="p-8 flex-1 space-y-5">
                                        <div className={`w-12 h-12 ${tool.color} ${tool.border} rounded-xl flex items-center justify-center border transition-transform duration-500`}>
                                            <Icon size={22} strokeWidth={2} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-[16px] font-bold text-slate-800">{tool.title}</h3>
                                            <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                                                {tool.description}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                        <button 
                                            onClick={() => handleRunOptimize(tool.id)}
                                            disabled={running}
                                            className={`h-11 px-6 rounded-xl font-bold text-[12px] transition-all flex items-center gap-2 group-active:scale-95
                                                ${running === tool.id 
                                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                                                    : 'bg-slate-900 text-white shadow-md hover:bg-black'}`}
                                        >
                                            {running === tool.id ? (
                                                <RefreshCw size={14} className="animate-spin" />
                                            ) : (
                                                <Zap size={14} />
                                            )}
                                            {running === tool.id ? 'Loading...' : tool.action}
                                        </button>
                                        
                                        {tool.id === 'optimize' && (
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#0a66c2] uppercase tracking-wider">
                                                <ShieldCheck size={12} />
                                                Suggested
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* Tip Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-xl h-full"
                    >
                         <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-[#0a66c2] rounded-xl text-white shadow-lg shadow-[#0a66c2]/20 border border-white/10">
                                    <Lock size={20} strokeWidth={2} />
                                </div>
                                <h4 className="text-[15px] font-bold text-white">Performance Tip</h4>
                            </div>
                            
                            <p className="text-[14px] text-slate-400 leading-relaxed font-medium italic border-l-2 border-[#0a66c2] pl-4">
                                "Clearing caches after an update or code change ensures that your customers always see the latest version of your website without any glitches."
                            </p>
                            
                            <div className="pt-4">
                                <span className="inline-flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                    System Core v1.2
                                </span>
                            </div>
                         </div>

                         <div className="pt-8 text-center">
                             <span className="text-[9px] font-bold text-slate-700 uppercase tracking-[0.2em] block border-t border-slate-800 pt-6">Last optimized Oct 2026</span>
                         </div>
                    </motion.div>
                </div>
            </div>
        </AdminLayout>
    );
}
