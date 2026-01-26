import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { CreditCard, Save, Lock, LayoutPanelLeft, ShieldCheck } from "lucide-react";
import SettingsTabs from "./Partials/SettingsTabs";

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
            <Head title="SSLCommerz Settings" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                {/* Header */}
                <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm">
                    <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#f3f6f8] rounded flex items-center justify-center text-[#0a66c2]">
                                <CreditCard size={20} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[18px] font-semibold text-[#000000e6]">
                                    Payment Processing
                                </h1>
                                <p className="text-[12px] text-[#00000099] mt-0.5 font-medium">
                                    Manage your SSLCommerz gateway credentials and environment
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
                                Apply Settings
                            </button>
                        </div>
                    </div>
                    
                    <div className="px-6 border-t border-[#f3f2ef]">
                        <SettingsTabs activeTab="sslcommerz" />
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-8 space-y-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm divide-y divide-[#f3f2ef]">
                            {/* Environment Section */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <LayoutPanelLeft size={16} className="text-[#0a66c2]" />
                                    Operational Environment
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                    <label className="text-[13px] font-bold text-[#00000099]">Gateway Mode</label>
                                    <div className="md:col-span-3">
                                        <div className="flex bg-[#f3f6f8] p-1 rounded-lg w-fit">
                                            <button 
                                                type="button"
                                                onClick={() => setData('sslc_mode', 'sandbox')}
                                                className={`px-4 py-1.5 rounded text-[12px] font-bold transition-all ${data.sslc_mode === 'sandbox' ? 'bg-white text-[#0a66c2] shadow-sm' : 'text-gray-500 hover:bg-white/50'}`}
                                            >
                                                Sandbox
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={() => setData('sslc_mode', 'live')}
                                                className={`px-4 py-1.5 rounded text-[12px] font-bold transition-all ${data.sslc_mode === 'live' ? 'bg-[#0a66c2] text-white shadow-sm' : 'text-gray-500 hover:bg-white/50'}`}
                                            >
                                                Live
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Credentials Section */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Lock size={16} className="text-[#0a66c2]" />
                                    API Credentials
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Store ID</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.sslc_store_id}
                                                onChange={e => setData('sslc_store_id', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="Enter your Store ID"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Store Password</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="password" 
                                                value={data.sslc_store_password}
                                                onChange={e => setData('sslc_store_password', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="••••••••••••"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-4 sticky top-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-4">
                            <h3 className="text-[13px] font-bold text-[#000000e6] mb-3 flex items-center gap-2">
                                <ShieldCheck size={16} className="text-[#0a66c2]" />
                                Security Protocol
                            </h3>
                            <p className="text-[11px] text-[#00000099] leading-relaxed font-medium">
                                <strong>Live Mode Warning:</strong> Ensure your domain has an active SSL certificate before enabling Live mode. Transactions will fail in Live mode without HTTPS.
                            </p>
                        </div>
                        
                        <div className="bg-[#f3f6f8] rounded-lg border border-[#EBEBEB] p-4 text-center">
                             <span className="text-[11px] font-bold text-[#0a66c2] border-b border-[#0a66c2]/20 pb-0.5 cursor-pointer hover:border-[#0a66c2] transition-all">Support Gateway Documentation</span>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
