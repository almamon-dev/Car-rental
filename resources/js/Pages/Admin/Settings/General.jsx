/**
 * Admin - General Settings
 * 
 * Manages basic website information like name, description, and currency.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { 
    Settings, 
    Save, 
    Globe, 
    Clock, 
    ShieldCheck, 
    Activity, 
    Database, 
    Zap,
    Cpu
} from "lucide-react";
import SettingsTabs from "./Partials/SettingsTabs";
import { motion } from "framer-motion";

/**
 * GeneralSettings Component
 */
export default function GeneralSettings({ auth, settings = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        group: 'general',
        site_name: settings.site_name || "",
        site_description: settings.site_description || "",
        timezone: settings.timezone || "UTC",
        currency_symbol: settings.currency_symbol || "$",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="General Settings | Admin Panel" />

            <div className="max-w-full mx-auto space-y-6">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-[#191919]">
                    <div className="px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-5">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a66c2] shadow-sm border border-slate-100">
                                <Settings size={28} strokeWidth={2} />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <div className="w-1.5 h-3 bg-[#0a66c2] rounded-full" />
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Configuration</span>
                                </div>
                                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                                    General Settings
                                </h1>
                                <p className="text-[14px] text-slate-500 font-medium italic">
                                    Configure your website's main identity and regional preferences.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button 
                                onClick={handleSubmit}
                                disabled={processing}
                                className="h-11 px-8 bg-[#0a66c2] hover:bg-[#084d92] text-white rounded-xl font-bold text-[13px] transition-all flex items-center gap-2 shadow-md shadow-[#0a66c2]/10 disabled:opacity-50"
                            >
                                <Save size={18} />
                                Save Changes
                            </button>
                        </div>
                    </div>
                    
                    <div className="px-6 border-t border-slate-50 bg-slate-50/20">
                        <SettingsTabs activeTab="general" />
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
                            {/* Website Info */}
                            <div className="p-8 space-y-8">
                                <div className="flex items-center gap-3">
                                    <Globe size={18} className="text-[#0a66c2]" />
                                    <h3 className="text-[14px] font-bold text-slate-800">
                                        Website Information
                                    </h3>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-semibold text-slate-500">Website Name</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.site_name}
                                                onChange={e => setData('site_name', e.target.value)}
                                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-xl py-3 px-5 text-[14px] text-slate-900 outline-none transition-all font-semibold"
                                                placeholder="e.g. EliteFleet Car Rental"
                                            />
                                            {errors.site_name && <p className="text-rose-600 text-[11px] mt-2 font-bold">{errors.site_name}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                                        <div className="pt-3">
                                            <label className="text-[13px] font-semibold text-slate-500">SEO Description</label>
                                        </div>
                                        <div className="md:col-span-3">
                                            <textarea 
                                                rows="4"
                                                value={data.site_description}
                                                onChange={e => setData('site_description', e.target.value)}
                                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-xl py-4 px-5 text-[14px] text-slate-900 outline-none transition-all font-semibold resize-none italic"
                                                placeholder="Write a short description of your website for search engines..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Regional Settings */}
                            <div className="p-8 space-y-8">
                                <div className="flex items-center gap-3">
                                    <Clock size={18} className="text-[#0a66c2]" />
                                    <h3 className="text-[14px] font-bold text-slate-800">
                                        Regional Settings
                                    </h3>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-semibold text-slate-500">Timezone</label>
                                        <div className="md:col-span-3">
                                            <select 
                                                value={data.timezone}
                                                onChange={e => setData('timezone', e.target.value)}
                                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-xl py-3 px-5 text-[14px] text-slate-900 outline-none transition-all font-semibold cursor-pointer"
                                            >
                                                <option value="UTC">UTC (Universal Time)</option>
                                                <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                                                <option value="America/New_York">America/New_York (EST)</option>
                                                <option value="Europe/London">Europe/London (GMT)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-semibold text-slate-500">Currency Symbol</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.currency_symbol}
                                                onChange={e => setData('currency_symbol', e.target.value)}
                                                className="w-20 bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-xl py-3 px-5 text-[14px] text-slate-900 outline-none transition-all font-bold text-center"
                                                placeholder="$"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Tip Sidebar */}
                    <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                        <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6"
                        >
                            <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                                <ShieldCheck size={18} className="text-[#0a66c2]" />
                                Settings Tip
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 relative overflow-hidden group">
                                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium italic relative z-10">
                                        "Updating your website name and description will help your business appear correctly on search engines and social media."
                                    </p>
                                    <Database size={60} className="absolute -right-4 -bottom-4 text-[#0a66c2]/10" />
                                </div>
                                <div className="h-px bg-slate-50" />
                                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                                    <Zap size={18} className="text-amber-600" />
                                    <p className="text-[12px] font-bold text-amber-700">Settings affect the whole site</p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
                           <div className="relative z-10 space-y-3">
                                <h4 className="text-[14px] font-bold text-white">Need help?</h4>
                                <p className="text-[13px] font-medium leading-relaxed text-slate-400">
                                    If you are unsure about these settings, please contact support before making major changes.
                                </p>
                           </div>
                           <Settings size={100} className="absolute -right-8 -bottom-8 text-white/[0.03] rotate-12" />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
