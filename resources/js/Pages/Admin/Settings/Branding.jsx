/**
 * Admin - Branding Settings
 * 
 * Manages the visual identity of the platform, including logo, favicon, and colors.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { 
    Palette, 
    Save, 
    Upload, 
    X, 
    ImageIcon, 
    ShieldCheck, 
    Zap, 
    Activity, 
    Globe, 
    Cpu,
    Eye
} from "lucide-react";
import SettingsTabs from "./Partials/SettingsTabs";
import { motion, AnimatePresence } from "framer-motion";

/**
 * BrandingSettings Component
 */
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
            <Head title="Branding Settings | Admin Panel" />

            <div className="max-w-full mx-auto space-y-6">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-[#191919]">
                    <div className="px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a66c2] shadow-sm border border-slate-100">
                                <Palette size={28} strokeWidth={2} />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-3 bg-[#0a66c2] rounded-full" />
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Visual Identity</span>
                                </div>
                                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                                    Branding Settings
                                </h1>
                                <p className="text-[14px] text-slate-500 font-medium italic">
                                    Upload your logos and choose your brand colors for the entire platform.
                                </p>
                            </div>
                        </div>

                        <button 
                            onClick={handleSubmit}
                            disabled={processing}
                            className="h-11 px-8 bg-[#0a66c2] hover:bg-[#084d92] text-white rounded-xl font-bold text-[13px] transition-all flex items-center gap-2 shadow-md shadow-[#0a66c2]/10 disabled:opacity-50"
                        >
                            <Save size={18} />
                            Save Branding
                        </button>
                    </div>
                    
                    <div className="px-6 border-t border-slate-50 bg-slate-50/20">
                        <SettingsTabs activeTab="branding" />
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
                            {/* Logo Section */}
                            <div className="p-8 space-y-8">
                                <div className="flex items-center gap-3">
                                    <ImageIcon size={18} className="text-[#0a66c2]" />
                                    <h3 className="text-[14px] font-bold text-slate-800">Logo & Icons</h3>
                                </div>
                                
                                <div className="space-y-10">
                                    {/* Site Logo */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                                        <div className="space-y-1 pt-2">
                                            <label className="text-[13px] font-semibold text-slate-500 block">Website Logo</label>
                                            <p className="text-[11px] text-slate-400">Used in header and emails.</p>
                                        </div>
                                        <div className="md:col-span-3">
                                            <AnimatePresence mode="wait">
                                                {previews.site_logo ? (
                                                    <motion.div 
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="relative group w-fit border border-slate-100 rounded-2xl p-6 bg-slate-50/50"
                                                    >
                                                        <img 
                                                            src={previews.site_logo} 
                                                            alt="Site Logo" 
                                                            className="h-14 w-auto object-contain"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFile('site_logo')}
                                                            className="absolute -top-3 -right-3 bg-white text-rose-500 rounded-full w-8 h-8 flex items-center justify-center shadow-md border border-slate-100 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </motion.div>
                                                ) : (
                                                    <div 
                                                        onClick={() => document.getElementById('site_logo_upload').click()}
                                                        className="cursor-pointer group border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center hover:border-[#0a66c2] hover:bg-blue-50/20 transition-all"
                                                    >
                                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4 text-[#0a66c2]">
                                                            <Upload size={22} />
                                                        </div>
                                                        <p className="text-[14px] font-bold text-slate-800 mb-1">Click to Upload Logo</p>
                                                        <p className="text-[11px] text-slate-400 font-medium">SVG, PNG or JPG (Recommended: 300x80px)</p>
                                                        <input 
                                                            id="site_logo_upload" 
                                                            type="file" 
                                                            className="hidden" 
                                                            onChange={(e) => handleFileChange(e, 'site_logo')}
                                                        />
                                                    </div>
                                                )}
                                            </AnimatePresence>
                                            {errors.site_logo && (
                                                <p className="text-rose-600 text-[11px] mt-3 font-bold">{errors.site_logo}</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Favicon */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start pt-8 border-t border-slate-50">
                                        <div className="space-y-1 pt-2">
                                            <label className="text-[13px] font-semibold text-slate-500 block">Favicon</label>
                                            <p className="text-[11px] text-slate-400">The icon shown in browser tabs.</p>
                                        </div>
                                        <div className="md:col-span-3">
                                            <AnimatePresence mode="wait">
                                                {previews.favicon ? (
                                                    <motion.div 
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="relative group w-fit border border-slate-100 rounded-xl p-4 bg-slate-50/50"
                                                    >
                                                        <img 
                                                            src={previews.favicon} 
                                                            alt="Favicon" 
                                                            className="h-10 w-10 object-contain"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFile('favicon')}
                                                            className="absolute -top-2 -right-2 bg-white text-rose-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md border border-slate-100 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </motion.div>
                                                ) : (
                                                    <div 
                                                        onClick={() => document.getElementById('favicon_upload').click()}
                                                        className="cursor-pointer group border-2 border-dashed border-slate-100 rounded-xl p-6 text-center hover:border-[#0a66c2] hover:bg-blue-50/20 transition-all"
                                                    >
                                                        <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center mx-auto mb-2 text-[#0a66c2]">
                                                            <Activity size={18} />
                                                        </div>
                                                        <p className="text-[13px] font-bold text-slate-800">Upload Favicon</p>
                                                        <p className="text-[10px] text-slate-400">(32x32px or 64x64px)</p>
                                                        <input 
                                                            id="favicon_upload" 
                                                            type="file" 
                                                            className="hidden" 
                                                            onChange={(e) => handleFileChange(e, 'favicon')}
                                                        />
                                                    </div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Color Section */}
                            <div className="p-8 space-y-8">
                                <div className="flex items-center gap-3">
                                    <Palette size={18} className="text-[#0a66c2]" />
                                    <h3 className="text-[14px] font-bold text-slate-800">Brand Colors</h3>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                                        <label className="text-[13px] font-semibold text-slate-500">Primary Color</label>
                                        <div className="md:col-span-3 flex items-center gap-4">
                                            <div className="relative group">
                                                <input 
                                                    type="color" 
                                                    value={data.primary_color}
                                                    onChange={e => setData('primary_color', e.target.value)}
                                                    className="w-12 h-12 rounded-xl border-0 cursor-pointer overflow-hidden p-0 absolute inset-0 opacity-0 z-10"
                                                />
                                                <div 
                                                    className="w-12 h-12 rounded-xl border border-slate-200 shadow-md"
                                                    style={{ backgroundColor: data.primary_color }}
                                                />
                                            </div>
                                            <input 
                                                type="text" 
                                                value={data.primary_color}
                                                onChange={e => setData('primary_color', e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`)}
                                                className="w-40 bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-xl py-3 px-5 text-[14px] text-slate-900 outline-none transition-all font-mono font-bold uppercase"
                                                placeholder="#0a66c2"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                                        <label className="text-[13px] font-semibold text-slate-500">Secondary Color</label>
                                        <div className="md:col-span-3 flex items-center gap-4">
                                            <div className="relative group">
                                                <input 
                                                    type="color" 
                                                    value={data.secondary_color}
                                                    onChange={e => setData('secondary_color', e.target.value)}
                                                    className="w-12 h-12 rounded-xl border-0 cursor-pointer overflow-hidden p-0 absolute inset-0 opacity-0 z-10"
                                                />
                                                <div 
                                                    className="w-12 h-12 rounded-xl border border-slate-200 shadow-md"
                                                    style={{ backgroundColor: data.secondary_color }}
                                                />
                                            </div>
                                            <input 
                                                type="text" 
                                                value={data.secondary_color}
                                                onChange={e => setData('secondary_color', e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`)}
                                                className="w-40 bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-xl py-3 px-5 text-[14px] text-slate-900 outline-none transition-all font-mono font-bold uppercase"
                                                placeholder="#FF6B35"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Preview Sidebar */}
                    <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                        
                        <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                                <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                                    <Eye size={16} className="text-[#0a66c2]" />
                                    Live Preview
                                </h3>
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            </div>
                            <div className="p-6 space-y-6 bg-slate-50/50">
                                
                                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-lg">
                                    <div className="h-3 bg-slate-100 border-b border-slate-200 flex items-center px-3 gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                    </div>
                                    <div className="p-4 border-b border-slate-50 flex items-center justify-between">
                                        {previews.site_logo ? (
                                            <img src={previews.site_logo} className="h-5 w-auto" alt="Logo" />
                                        ) : (
                                            <div className="h-4 w-16 bg-slate-100 rounded-full"></div>
                                        )}
                                        <div className="flex gap-2">
                                            <div className="h-1.5 w-4 bg-slate-100 rounded-full"></div>
                                            <div className="h-1.5 w-4 bg-slate-100 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="p-10 bg-slate-50 flex flex-col gap-4 items-center justify-center relative">
                                        <button 
                                            className="px-6 py-2.5 rounded-xl text-[11px] font-bold text-white shadow-sm transition-all"
                                            style={{ backgroundColor: data.primary_color }}
                                        >
                                            Sign Up Now
                                        </button>
                                        <span 
                                            className="text-[11px] font-bold uppercase tracking-wider"
                                            style={{ color: data.secondary_color }}
                                        >
                                            Premium Offer
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <p className="text-[12px] text-slate-600 leading-relaxed font-medium italic">
                                        "A consistent brand design helps customers recognize your business and build trust."
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
                           <div className="relative z-10 space-y-3">
                                <div className="flex items-center gap-2">
                                    <Zap size={16} className="text-[#0a66c2]" />
                                    <h4 className="text-[13px] font-bold">Quick Tip</h4>
                                </div>
                                <p className="text-[13px] font-medium leading-relaxed text-slate-400">
                                    Use clear, high-quality images for your logo. We recommend using SVG format for the best results on all screens.
                                </p>
                           </div>
                           <Palette size={100} className="absolute -right-8 -bottom-8 text-white/[0.02] rotate-12" />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
