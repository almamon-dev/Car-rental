import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Settings, Save, Globe, Clock, ShieldCheck } from "lucide-react";
import SettingsTabs from "./Partials/SettingsTabs";

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
            <Head title="General Settings" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                {/* 1. Header (LinkedIn Style) */}
                <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm">
                    <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#f3f6f8] rounded flex items-center justify-center text-[#0a66c2]">
                                <Settings size={20} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[18px] font-semibold text-[#000000e6]">
                                    Settings Configuration
                                </h1>
                                <p className="text-[12px] text-[#00000099] mt-0.5 font-medium">
                                    Manage your platform's global identity and system behavior
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button 
                                onClick={handleSubmit}
                                disabled={processing}
                                className="h-8 px-5 bg-[#0a66c2] hover:bg-[#004182] text-white rounded-full font-bold text-[13px] transition-all flex items-center gap-2 shadow-sm active:scale-95 disabled:opacity-50"
                            >
                                <Save size={14} strokeWidth={3} />
                                Save Changes
                            </button>
                        </div>
                    </div>
                    
                    <div className="px-6 border-t border-[#f3f2ef]">
                        <SettingsTabs activeTab="general" />
                    </div>
                </div>

                {/* 2. Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Left Section: Settings Form */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm divide-y divide-[#f3f2ef]">
                            {/* Site Identity Section */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Globe size={16} className="text-[#0a66c2]" />
                                    Platform Identity
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Site Name</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.site_name}
                                                onChange={e => setData('site_name', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="e.g. Fleet Rentals"
                                            />
                                            {errors.site_name && <p className="text-red-600 text-[11px] mt-1 font-bold">{errors.site_name}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                                        <label className="text-[13px] font-bold text-[#00000099] mt-2">SEO Description</label>
                                        <div className="md:col-span-3">
                                            <textarea 
                                                rows="3"
                                                value={data.site_description}
                                                onChange={e => setData('site_description', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium resize-none"
                                                placeholder="Briefly describe your services..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Localization Section */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Clock size={16} className="text-[#0a66c2]" />
                                    Regional Configuration
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">System Timezone</label>
                                        <div className="md:col-span-3">
                                            <select 
                                                value={data.timezone}
                                                onChange={e => setData('timezone', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium appearance-none"
                                            >
                                                <option value="UTC">UTC (Universal Time)</option>
                                                <option value="Asia/Dhaka">Dhaka (GMT+6)</option>
                                                <option value="America/New_York">New York (EST)</option>
                                                <option value="Europe/London">London (GMT+0)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Currency Symbol</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.currency_symbol}
                                                onChange={e => setData('currency_symbol', e.target.value)}
                                                className="w-24 bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="$"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Tips & Info */}
                    <div className="lg:col-span-4 space-y-4 sticky top-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-4">
                            <h3 className="text-[13px] font-bold text-[#000000e6] mb-3 flex items-center gap-2">
                                <ShieldCheck size={16} className="text-[#0a66c2]" />
                                Admin Advice
                            </h3>
                            <p className="text-[12px] text-[#00000099] leading-relaxed font-medium">
                                These settings are applied globally across your rental network. Accurate timezone and currency settings are critical for correct booking logs and financial reporting.
                            </p>
                        </div>

                        <div className="bg-[#f3f6f8] rounded-lg border border-[#EBEBEB] p-4">
                             <p className="text-[11px] text-[#00000099] leading-relaxed">
                                 <strong>Tip:</strong> Use a concise SEO description (under 160 characters) to improve your search engine rankings and booking attraction.
                             </p>
                        </div>
                        
                         <div className="text-center opacity-40">
                             <span className="text-[10px] font-bold text-gray-500">Fleet Network © 2026</span>
                         </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
