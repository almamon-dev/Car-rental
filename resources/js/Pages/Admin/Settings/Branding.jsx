import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Palette, Save, Upload, X, Image as ImageIcon } from "lucide-react";
import SettingsTabs from "./Partials/SettingsTabs";

export default function BrandingSettings({ auth, settings: rawSettings = {} }) {
    const { props } = usePage();
    const settings = props.settings || rawSettings;

    const { data, setData, post, processing, errors } = useForm({
        group: 'branding',
        site_logo: null, 
        favicon: null,
        primary_color: settings.primary_color || "#0a66c2",
        secondary_color: settings.secondary_color || "#ff6b35",
    });

    const [previews, setPreviews] = useState({
        site_logo: settings.site_logo || null,
        favicon: settings.favicon || null,
    });

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setData(field, file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviews(prev => ({...prev, [field]: e.target.result}));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveFile = (field) => {
        setData(field, null);
        setPreviews(prev => ({...prev, [field]: null}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
            forceFormData: true,
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
                                <div className="space-y-6">
                                    {/* Site Logo */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                                        <div className="mt-2 text-right md:text-left">
                                            <label className="text-[13px] font-bold text-[#00000099] block">Site Logo</label>
                                            <span className="text-[11px] text-gray-400">Used in header & emails</span>
                                        </div>
                                        <div className="md:col-span-3">
                                            {previews.site_logo ? (
                                                <div className="relative group w-fit border border-gray-100 rounded-lg p-2 bg-gray-50/50">
                                                    <img 
                                                        src={previews.site_logo} 
                                                        alt="Site Logo" 
                                                        className="h-16 w-auto object-contain rounded"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveFile('site_logo')}
                                                        className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1 shadow-md hover:bg-red-50 transition-all border border-gray-100 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div 
                                                    onClick={() => document.getElementById('site_logo_upload').click()}
                                                    className="cursor-pointer group border-2 border-dashed border-slate-200 rounded-lg p-6 py-8 text-center hover:border-[#0a66c2] hover:bg-[#f8fbff] transition-all bg-slate-50/30"
                                                >
                                                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-3 text-[#0a66c2] group-hover:scale-110 transition-transform">
                                                        <Upload size={20} strokeWidth={2.5} />
                                                    </div>
                                                    <p className="text-[13px] text-slate-700 font-semibold mb-1">Click to upload logo</p>
                                                    <p className="text-[11px] text-slate-400">SVG, PNG, JPG (max 2MB)</p>
                                                    <input 
                                                        id="site_logo_upload" 
                                                        type="file" 
                                                        className="hidden" 
                                                        accept="image/*"
                                                        onChange={(e) => handleFileChange(e, 'site_logo')}
                                                    />
                                                </div>
                                            )}
                                            {errors.site_logo && (
                                                <p className="text-red-500 text-xs mt-2">{errors.site_logo}</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Favicon */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start pt-4 border-t border-dashed border-gray-100">
                                        <div className="mt-2 text-right md:text-left">
                                            <label className="text-[13px] font-bold text-[#00000099] block">Favicon</label>
                                            <span className="text-[11px] text-gray-400">Browser tab icon</span>
                                        </div>
                                        <div className="md:col-span-3">
                                            {previews.favicon ? (
                                                <div className="relative group w-fit border border-gray-100 rounded-lg p-2 bg-gray-50/50">
                                                    <img 
                                                        src={previews.favicon} 
                                                        alt="Favicon" 
                                                        className="h-10 w-10 object-contain rounded"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveFile('favicon')}
                                                        className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1 shadow-md hover:bg-red-50 transition-all border border-gray-100 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div 
                                                    onClick={() => document.getElementById('favicon_upload').click()}
                                                    className="cursor-pointer group border-2 border-dashed border-slate-200 rounded-lg p-4 py-6 text-center hover:border-[#0a66c2] hover:bg-[#f8fbff] transition-all bg-slate-50/30"
                                                >
                                                    <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-2 text-[#0a66c2] group-hover:scale-110 transition-transform">
                                                        <ImageIcon size={18} strokeWidth={2.5} />
                                                    </div>
                                                    <p className="text-[12px] text-slate-700 font-semibold mb-0.5">Upload Favicon</p>
                                                    <p className="text-[10px] text-slate-400">ICO, PNG 32x32px</p>
                                                    <input 
                                                        id="favicon_upload" 
                                                        type="file" 
                                                        className="hidden" 
                                                        accept="image/*"
                                                        onChange={(e) => handleFileChange(e, 'favicon')}
                                                    />
                                                </div>
                                            )}
                                             {errors.favicon && (
                                                <p className="text-red-500 text-xs mt-2">{errors.favicon}</p>
                                            )}
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
                                            <div className="relative group">
                                                <input 
                                                    type="color" 
                                                    value={data.primary_color}
                                                    onChange={e => setData('primary_color', e.target.value)}
                                                    className="w-10 h-10 rounded-lg border-0 cursor-pointer overflow-hidden p-0 absolute inset-0 opacity-0 z-10"
                                                />
                                                <div 
                                                    className="w-10 h-10 rounded-lg border border-gray-200 shadow-sm"
                                                    style={{ backgroundColor: data.primary_color }}
                                                />
                                            </div>
                                            <input 
                                                type="text" 
                                                value={data.primary_color}
                                                onChange={e => setData('primary_color', e.target.value)}
                                                className="w-32 bg-[#f3f6f8] border-none rounded py-2 px-3 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-mono font-medium uppercase"
                                                placeholder="#0a66c2"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Secondary Color</label>
                                        <div className="md:col-span-3 flex items-center gap-3">
                                            <div className="relative group">
                                                <input 
                                                    type="color" 
                                                    value={data.secondary_color}
                                                    onChange={e => setData('secondary_color', e.target.value)}
                                                    className="w-10 h-10 rounded-lg border-0 cursor-pointer overflow-hidden p-0 absolute inset-0 opacity-0 z-10"
                                                />
                                                <div 
                                                    className="w-10 h-10 rounded-lg border border-gray-200 shadow-sm"
                                                    style={{ backgroundColor: data.secondary_color }}
                                                />
                                            </div>
                                            <input 
                                                type="text" 
                                                value={data.secondary_color}
                                                onChange={e => setData('secondary_color', e.target.value)}
                                                className="w-32 bg-[#f3f6f8] border-none rounded py-2 px-3 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-mono font-medium uppercase"
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
                            <h3 className="text-[13px] font-bold text-[#000000e6] mb-3">Live Preview</h3>
                            <div className="space-y-4">
                                
                                {/* Header Preview */}
                                <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
                                    <div className="h-2 bg-gray-100 border-b border-gray-200 flex items-center px-2 gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                                        {previews.site_logo ? (
                                            <img src={previews.site_logo} className="h-5 w-auto" alt="Logo" />
                                        ) : (
                                            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                                        )}
                                        <div className="flex gap-2">
                                            <div className="h-2 w-8 bg-gray-100 rounded"></div>
                                            <div className="h-2 w-8 bg-gray-100 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50 flex flex-col gap-2 items-center justify-center h-24">
                                        <button 
                                            className="px-4 py-1.5 rounded text-[10px] font-bold text-white shadow-sm"
                                            style={{ backgroundColor: data.primary_color }}
                                        >
                                            Primary Action
                                        </button>
                                        <span 
                                            className="text-[10px] font-bold"
                                            style={{ color: data.secondary_color }}
                                        >
                                            Secondary Text
                                        </span>
                                    </div>
                                </div>

                                <div className="p-3 bg-blue-50/50 rounded border border-blue-100">
                                    <p className="text-[11px] text-blue-700">
                                        Uploading a new logo will update the header of your public website and admin panel immediately after saving.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#f3f6f8] rounded-lg border border-[#EBEBEB] p-4">
                            <p className="text-[11px] text-[#00000099] leading-relaxed">
                                <strong>Tip:</strong> For best results, upload a logo with a transparent background (PNG or SVG). Recommended height is 40-60px.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
