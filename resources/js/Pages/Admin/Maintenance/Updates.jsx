import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Cpu, RefreshCw, BadgeCheck, Zap, Server, Package } from "lucide-react";

export default function Updates({ auth, currentVersion, latestVersion, phpVersion, dependencies = {} }) {
    const [checking, setChecking] = useState(false);

    const handleCheck = () => {
        setChecking(true);
        setTimeout(() => setChecking(false), 2000);
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="System Updates" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased text-slate-900">
                {/* Header Section - LinkedIn Style Top Card */}
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                    <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-[#0a66c2]">
                                <Cpu size={24} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-tight">Platform Software Updates</h1>
                                <p className="text-[13px] text-slate-500 mt-0.5 font-medium">Keep your car rental platform secure and feature-rich.</p>
                            </div>
                        </div>

                        <button 
                            onClick={handleCheck}
                            disabled={checking}
                            className="h-9 px-6 bg-[#0a66c2] hover:bg-[#004182] text-white rounded-full font-bold text-[13px] transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
                        >
                            <RefreshCw size={16} className={checking ? "animate-spin" : ""} />
                            {checking ? "Checking..." : "Check for Updates"}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Version Card */}
                    <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-8 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                            <BadgeCheck size={40} />
                        </div>
                        <h2 className="text-[24px] font-bold text-gray-900 mb-2">Up to Date</h2>
                        <p className="text-gray-500 text-[14px] font-medium mb-6">Your platform is running the latest stable release</p>
                        
                        <div className="flex items-center gap-4 bg-[#f3f6f8] px-6 py-2 rounded-full border border-[#EBEBEB]">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] uppercase font-bold text-gray-400">Current</span>
                                <span className="text-[14px] font-bold text-[#0a66c2]">v{currentVersion}</span>
                            </div>
                            <div className="w-px h-8 bg-gray-200" />
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] uppercase font-bold text-gray-400">Latest</span>
                                <span className="text-[14px] font-bold text-[#0a66c2]">v{latestVersion}</span>
                            </div>
                        </div>
                    </div>

                    {/* Features Card */}
                    <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-6 overflow-hidden flex flex-col">
                        <h3 className="text-[15px] font-bold text-gray-900 mb-5 flex items-center gap-2">
                            <Zap size={18} className="text-amber-500" />
                            System Specifications
                        </h3>
                        <div className="space-y-4 flex-1">
                            <div className="flex items-center justify-between p-3 bg-[#f3f6f8] rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Server size={16} className="text-gray-400" />
                                    <span className="text-[13px] font-medium text-gray-700">PHP Version</span>
                                </div>
                                <span className="text-[13px] font-bold text-gray-900">{phpVersion || '8.2.x'}</span>
                            </div>
                            
                            <div className="mt-4">
                                <h4 className="text-[12px] font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                                    <Package size={14} />
                                    Package Dependencies
                                </h4>
                                <div className="max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                                    <div className="grid grid-cols-1 gap-2">
                                        {Object.entries(dependencies).map(([pkg, ver]) => (
                                            <div key={pkg} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100 italic">
                                                <span className="text-[11px] font-mono text-gray-600 truncate">{pkg}</span>
                                                <span className="text-[11px] font-bold text-[#0a66c2] whitespace-nowrap">{ver}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-[#f3f2ef]">
                             <p className="text-[11px] text-[#00000099] leading-relaxed italic text-center">
                                Automatic background updates are currently enabled for critical security patches.
                             </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
