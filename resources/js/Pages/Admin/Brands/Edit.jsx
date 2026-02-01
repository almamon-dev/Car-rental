/**
 * Admin - Edit Brand
 * 
 * Interface for modifying existing car manufacturers/brands.
 * Manages brand identity, status, and logo.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Input } from "@/Components/ui/Input";
import FileUpload from "@/Components/forms/FileUpload";
import { 
    Save, 
    ChevronLeft, 
    Loader2, 
    BadgeCheck, 
    Calendar, 
    History, 
    Activity, 
    ShieldCheck, 
    Database 
} from "lucide-react";
import { motion } from "framer-motion";

/**
 * BrandEdit Component
 */
export default function BrandEdit({ auth, brand }) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        _method: "PUT",
        name: brand?.name || "",
        logo: null, 
        is_active: brand?.is_active ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.brands.update", brand.id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Edit Brand | ${brand?.name}`} />

            <div className="max-w-full mx-auto space-y-6 text-[#191919]">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route("admin.brands.index")}
                                className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl text-slate-400 hover:text-[#0a66c2] transition-all border border-slate-100"
                            >
                                <ChevronLeft size={20} strokeWidth={2.5} />
                            </Link>
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-3 bg-[#0a66c2] rounded-full" />
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Brand Manager</span>
                                </div>
                                <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                                    Update Brand Profile
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href={route("admin.brands.index")}
                                className="px-5 py-2 text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-all"
                            >
                                Discard Changes
                            </Link>
                            <button
                                onClick={handleSubmit}
                                disabled={processing}
                                className="h-10 px-6 text-[12px] font-bold text-white bg-[#0a66c2] hover:bg-[#084d92] rounded-xl transition-all flex items-center gap-2 shadow-md shadow-[#0a66c2]/10 active:scale-95 disabled:opacity-50"
                            >
                                {processing ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <Save size={16} strokeWidth={2} />
                                )}
                                Update Brand
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- FORM --- */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-9 space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
                        >
                             <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/30 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#0a66c2]/5 flex items-center justify-center text-[#0a66c2]">
                                    <BadgeCheck size={18} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    Manufacturer Information
                                </h3>
                            </div>
                            
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                <div className="space-y-10">
                                    <Input
                                        label="Brand Name"
                                        placeholder="e.g. Mercedes-Benz"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        error={errors.name}
                                        className="h-11 font-bold text-[14px] text-slate-700"
                                    />

                                    <div className="space-y-3">
                                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                                            Availability Status
                                        </label>
                                        <div className="flex items-center p-1.5 bg-slate-50 rounded-xl border border-slate-100 max-w-sm">
                                            <button
                                                type="button"
                                                onClick={() => setData("is_active", true)}
                                                className={`flex-1 py-2 px-4 rounded-lg text-[12px] font-bold uppercase tracking-wider transition-all ${
                                                    data.is_active
                                                    ? "bg-white text-[#0a66c2] shadow-sm border border-blue-50"
                                                    : "text-slate-400 hover:text-slate-600 bg-transparent"
                                                }`}
                                            >
                                                Active
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setData("is_active", false)}
                                                className={`flex-1 py-2 px-4 rounded-lg text-[12px] font-bold uppercase tracking-wider transition-all ${
                                                    !data.is_active
                                                    ? "bg-white text-slate-700 shadow-sm border border-slate-200"
                                                    : "text-slate-400 hover:text-slate-600 bg-transparent"
                                                }`}
                                            >
                                                Inactive
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <FileUpload
                                        data={data}
                                        setData={setData}
                                        errors={errors}
                                        clearErrors={clearErrors}
                                        field="logo"
                                        label="Brand Logo"
                                        initialData={brand?.logo}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-3 space-y-6 sticky top-24">
                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="p-5 border-b border-slate-50 bg-slate-50/20 flex items-center justify-between">
                                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status Information</h3>
                                <div className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-lg border ${brand.is_active ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                    {brand.is_active ? 'Online' : 'Offline'}
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className={`p-4 border rounded-xl shadow-inner ${brand.is_active ? 'bg-blue-50/10 border-blue-50' : 'bg-slate-50 border-slate-100'}`}>
                                    <p className={`text-[12px] leading-relaxed font-semibold italic ${brand.is_active ? 'text-[#0a66c2]' : 'text-slate-400'}`}>
                                        "This brand is currently <strong>{brand.is_active ? 'visible' : 'hidden'}</strong> in the customer vehicle search filters."
                                    </p>
                                </div>
                                <div className="space-y-4 pt-2">
                                    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 pl-1">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            <span>Created On</span>
                                        </div>
                                        <span className="text-slate-700">{new Date(brand.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="h-px bg-slate-50" />
                                    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 pl-1">
                                        <div className="flex items-center gap-2">
                                            <History size={14} />
                                            <span>Last Updated</span>
                                        </div>
                                        <span className="text-slate-700">{new Date(brand.updated_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                         <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl relative group overflow-hidden">
                             <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={18} className="text-[#0a66c2]" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Note</span>
                                </div>
                                <p className="text-[13px] font-semibold leading-relaxed italic text-slate-300">
                                    "Changes to the brand logo or name will update all existing car listings for this brand instantly."
                                </p>
                             </div>
                             <Database size={120} className="absolute -right-8 -bottom-8 p-4 text-white/[0.03] rotate-12" />
                        </div>

                         <div className="pt-4 text-center">
                             <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider border-t border-slate-100 pt-4 block">Admin Panel © 2026</span>
                         </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
