import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Search, Save, TrendingUp, BarChart3 } from "lucide-react";
import SettingsTabs from "./Partials/SettingsTabs";

export default function SeoSettings({ auth, settings = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        group: 'seo',
        meta_keywords: settings.meta_keywords || "",
        google_analytics_id: settings.google_analytics_id || "",
        facebook_pixel_id: settings.facebook_pixel_id || "",
        google_tag_manager_id: settings.google_tag_manager_id || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="SEO & Analytics Settings" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm">
                    <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#f3f6f8] rounded flex items-center justify-center text-[#0a66c2]">
                                <TrendingUp size={20} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[18px] font-semibold text-[#000000e6]">SEO & Analytics</h1>
                                <p className="text-[12px] text-[#00000099] mt-0.5 font-medium">
                                    Optimize search rankings and track visitor behavior
                                </p>
                            </div>
                        </div>

                        <button 
                            onClick={handleSubmit}
                            disabled={processing}
                            className="h-8 px-5 bg-[#0a66c2] hover:bg-[#004182] text-white rounded-full font-bold text-[13px] transition-all flex items-center gap-2 shadow-sm active:scale-95 disabled:opacity-50"
                        >
                            <Save size={14} strokeWidth={3} />
                            Save Changes
                        </button>
                    </div>
                    
                    <div className="px-6 border-t border-[#f3f2ef]">
                        <SettingsTabs activeTab="seo" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-8 space-y-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm divide-y divide-[#f3f2ef]">
                            
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Search size={16} className="text-[#0a66c2]" />
                                    Search Engine Optimization
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                                        <label className="text-[13px] font-bold text-[#00000099] mt-2">Meta Keywords</label>
                                        <div className="md:col-span-3">
                                            <textarea 
                                                rows="3"
                                                value={data.meta_keywords}
                                                onChange={e => setData('meta_keywords', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium resize-none"
                                                placeholder="car rental, vehicle rental, rent a car"
                                            />
                                            <p className="text-[11px] text-slate-500 mt-1">Separate keywords with commas</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <BarChart3 size={16} className="text-[#0a66c2]" />
                                    Analytics & Tracking
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Google Analytics ID</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.google_analytics_id}
                                                onChange={e => setData('google_analytics_id', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Facebook Pixel ID</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.facebook_pixel_id}
                                                onChange={e => setData('facebook_pixel_id', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="123456789012345"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Google Tag Manager</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.google_tag_manager_id}
                                                onChange={e => setData('google_tag_manager_id', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="GTM-XXXXXXX"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-4 sticky top-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-4">
                            <h3 className="text-[13px] font-bold text-[#000000e6] mb-3">SEO Best Practices</h3>
                            <ul className="space-y-2 text-[12px] text-[#00000099]">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Use relevant, specific keywords</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Track user behavior with analytics</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Monitor conversion rates</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#f3f6f8] rounded-lg border border-[#EBEBEB] p-4">
                            <p className="text-[11px] text-[#00000099] leading-relaxed">
                                <strong>Tip:</strong> Add tracking codes to monitor visitor behavior and improve your marketing strategy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
