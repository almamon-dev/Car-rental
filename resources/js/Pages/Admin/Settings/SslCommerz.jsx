/**
 * Admin - Payment Settings (SSLCommerz)
 * 
 * Manages the SSLCommerz payment gateway configuration.
 * Handles environment switching and API credentials.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { CreditCard, Save, Lock, LayoutPanelLeft, ShieldCheck, Loader2 } from "lucide-react";
import SettingsTabs from "./Partials/SettingsTabs";
import { motion } from "framer-motion";

/**
 * SslCommerzSettings Component
 */
export default function SslCommerzSettings({ auth, settings = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        group: 'sslcommerz',
        sslc_store_id: settings.sslc_store_id || "",
        sslc_store_password: settings.sslc_store_password || "",
        sslc_mode: settings.sslc_mode || "sandbox",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Payment Settings | Admin Panel" />

            <div className="max-w-full mx-auto space-y-6 text-[#191919]">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a66c2] shadow-sm border border-slate-100">
                                <CreditCard size={28} strokeWidth={2} />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-3 bg-[#0a66c2] rounded-full" />
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Payment Gateway</span>
                                </div>
                                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                                    SSLCommerz Settings
                                </h1>
                                <p className="text-[14px] text-slate-500 font-medium italic">
                                    Configure your payment processing credentials and environment.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button 
                                onClick={handleSubmit}
                                disabled={processing}
                                className="h-11 px-8 bg-[#0a66c2] hover:bg-[#084d92] text-white rounded-xl font-bold text-[13px] transition-all flex items-center gap-2 shadow-md shadow-[#0a66c2]/10 disabled:opacity-50 active:scale-95"
                            >
                                {processing ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    <Save size={18} />
                                )}
                                Save Settings
                            </button>
                        </div>
                    </div>
                    
                    <div className="px-6 border-t border-slate-50 bg-slate-50/20">
                        <SettingsTabs activeTab="sslcommerz" />
                    </div>
                </div>

                {/* --- CONTENT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-8 space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-50 overflow-hidden"
                        >
                            {/* Environment Section */}
                            <div className="p-8 space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#0a66c2]/5 flex items-center justify-center text-[#0a66c2]">
                                        <LayoutPanelLeft size={18} />
                                    </div>
                                    <h3 className="text-[14px] font-bold text-slate-800">
                                        Gateway Environment
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                    <label className="text-[13px] font-semibold text-slate-500">Gateway Mode</label>
                                    <div className="md:col-span-3">
                                        <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-100 w-fit">
                                            <button 
                                                type="button"
                                                onClick={() => setData('sslc_mode', 'sandbox')}
                                                className={`px-6 py-2 rounded-lg text-[12px] font-bold transition-all ${data.sslc_mode === 'sandbox' ? 'bg-white text-[#0a66c2] shadow-sm border border-blue-50' : 'text-slate-400 hover:text-slate-600'}`}
                                            >
                                                Sandbox
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={() => setData('sslc_mode', 'live')}
                                                className={`px-6 py-2 rounded-lg text-[12px] font-bold transition-all ${data.sslc_mode === 'live' ? 'bg-[#0a66c2] text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                            >
                                                Live
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Credentials Section */}
                            <div className="p-8 space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#0a66c2]/5 flex items-center justify-center text-[#0a66c2]">
                                        <Lock size={18} />
                                    </div>
                                    <h3 className="text-[14px] font-bold text-slate-800">
                                        API Credentials
                                    </h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-semibold text-slate-500">Store ID</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.sslc_store_id}
                                                onChange={e => setData('sslc_store_id', e.target.value)}
                                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-xl py-3 px-5 text-[14px] text-slate-900 outline-none transition-all font-semibold"
                                                placeholder="Enter your Store ID"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-semibold text-slate-500">Store Password</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="password" 
                                                value={data.sslc_store_password}
                                                onChange={e => setData('sslc_store_password', e.target.value)}
                                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-xl py-3 px-5 text-[14px] text-slate-900 outline-none transition-all font-semibold"
                                                placeholder="••••••••••••"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-4 space-y-6 sticky top-24">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                                <ShieldCheck size={18} className="text-[#0a66c2]" />
                                Security Note
                            </h3>
                            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                                <p className="text-[12px] text-amber-700 leading-relaxed font-semibold italic">
                                    "Ensure your domain has an active SSL certificate before enabling Live mode. Transactions will fail in Live mode without HTTPS."
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden group">
                           <div className="relative z-10 space-y-3">
                                <h4 className="text-[14px] font-bold text-white">Developer Help</h4>
                                <p className="text-[13px] font-medium leading-relaxed text-slate-400 italic">
                                    Need help with integration? Check the official documentation for advanced configuration.
                                </p>
                                <button className="text-[11px] font-bold text-[#0a66c2] uppercase tracking-wider hover:text-white transition-all pt-2">
                                    View Documentation →
                                </button>
                           </div>
                           <Lock size={100} className="absolute -right-8 -bottom-8 text-white/[0.03] rotate-12 transition-transform duration-700 group-hover:scale-110" />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
