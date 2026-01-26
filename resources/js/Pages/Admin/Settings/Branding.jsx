import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Palette, Save, Upload, X } from "lucide-react";
import SettingsTabs from "./Partials/SettingsTabs";

export default function BrandingSettings({ auth, settings = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        group: 'branding',
        site_logo: settings.site_logo || null,
        favicon: settings.favicon || null,
        primary_color: settings.primary_color || "#0a66c2",
        secondary_color: settings.secondary_color || "#ff6b35",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Branding Settings" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                {/* Header */}
                <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm">
                    <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#f3f6f8] rounded flex items-center justify-center text-[#0a66c2]">
                                <Palette size={20} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[18px] font-semibold text-[#000000e6]">
                                    Brand Identity
                                </h1>
                                <p className="text-[12px] text-[#00000099] mt-0.5 font-medium">
                                    Customize your platform's visual appearance and brand assets
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
                        <SettingsTabs activeTab="branding" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Left Section */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm divide-y divide-[#f3f2ef]">
                            
                            {/* Logo & Favicon */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4">Brand Assets</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                                        <label className="text-[13px] font-bold text-[#00000099] mt-2">Site Logo</label>
                                        <div className="md:col-span-3">
                                            <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-[#0a66c2] transition-colors">
                                                <Upload size={32} className="mx-auto text-slate-400 mb-2" />
                                                <p className="text-[12px] text-slate-600 font-medium">Click to upload logo</p>
                                                <p className="text-[11px] text-slate-400 mt-1">PNG, JPG up to 2MB</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                                        <label className="text-[13px] font-bold text-[#00000099] mt-2">Favicon</label>
                                        <div className="md:col-span-3">
                                            <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-[#0a66c2] transition-colors">
                                                <Upload size={32} className="mx-auto text-slate-400 mb-2" />
                                                <p className="text-[12px] text-slate-600 font-medium">Click to upload favicon</p>
                                                <p className="text-[11px] text-slate-400 mt-1">ICO, PNG 32x32px</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Brand Colors */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4">Brand Colors</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Primary Color</label>
                                        <div className="md:col-span-3 flex items-center gap-3">
                                            <input 
                                                type="color" 
                                                value={data.primary_color}
                                                onChange={e => setData('primary_color', e.target.value)}
                                                className="w-16 h-10 rounded border border-slate-200 cursor-pointer"
                                            />
                                            <input 
                                                type="text" 
                                                value={data.primary_color}
                                                onChange={e => setData('primary_color', e.target.value)}
                                                className="flex-1 bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="#0a66c2"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Secondary Color</label>
                                        <div className="md:col-span-3 flex items-center gap-3">
                                            <input 
                                                type="color" 
                                                value={data.secondary_color}
                                                onChange={e => setData('secondary_color', e.target.value)}
                                                className="w-16 h-10 rounded border border-slate-200 cursor-pointer"
                                            />
                                            <input 
                                                type="text" 
                                                value={data.secondary_color}
                                                onChange={e => setData('secondary_color', e.target.value)}
                                                className="flex-1 bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="#ff6b35"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="lg:col-span-4 space-y-4 sticky top-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-4">
                            <h3 className="text-[13px] font-bold text-[#000000e6] mb-3">Color Preview</h3>
                            <div className="space-y-3">
                                <div 
                                    className="h-20 rounded-lg flex items-center justify-center text-white font-bold text-[14px]"
                                    style={{ backgroundColor: data.primary_color }}
                                >
                                    Primary Color
                                </div>
                                <div 
                                    className="h-20 rounded-lg flex items-center justify-center text-white font-bold text-[14px]"
                                    style={{ backgroundColor: data.secondary_color }}
                                >
                                    Secondary Color
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#f3f6f8] rounded-lg border border-[#EBEBEB] p-4">
                            <p className="text-[11px] text-[#00000099] leading-relaxed">
                                <strong>Tip:</strong> Choose colors that represent your brand identity. Primary color is used for buttons and links, while secondary color is used for accents.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
