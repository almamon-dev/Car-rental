/**
 * Admin - Edit Category
 * 
 * Interface for modifying existing car categories.
 * Manages category details, hierarchy, and associated images.
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
    Info, 
    CheckCircle2, 
    Calendar, 
    History,
    ExternalLink,
    Plus,
    Layers,
    Pencil,
    Trash2,
    Database,
    ShieldCheck,
    Activity
} from "lucide-react";
import { motion } from "framer-motion";

/**
 * CategoryEdit Component
 */
export default function CategoryEdit({ auth, category, parentCategories = [], subCategories = [] }) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        _method: "PUT",
        name: category.name || "",
        description: category.description || "",
        parent_id: category.parent_id || "",
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.category.update", category.id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Edit Category | ${category.name}`} />

            <div className="max-w-full mx-auto space-y-6 text-[#191919]">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route("admin.category.index")}
                                className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl text-slate-400 hover:text-[#0a66c2] transition-all border border-slate-100"
                            >
                                <ChevronLeft size={20} strokeWidth={2.5} />
                            </Link>
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-3 bg-[#0a66c2] rounded-full" />
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Category Settings</span>
                                </div>
                                <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                                    Update Category Details
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleSubmit}
                                disabled={processing}
                                className="h-10 px-8 text-[12px] font-bold text-white bg-[#0a66c2] hover:bg-[#084d92] rounded-xl transition-all flex items-center gap-2 shadow-md shadow-[#0a66c2]/10 active:scale-95 disabled:opacity-50"
                            >
                                {processing ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <Save size={16} strokeWidth={2} />
                                )}
                                Update Category
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
                            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#0a66c2]/5 flex items-center justify-center text-[#0a66c2]">
                                        <Database size={16} strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                        Basic Information
                                    </h3>
                                </div>
                            </div>
                            
                            <div className="p-8 space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-8">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">Parent Category</label>
                                            <select
                                                value={data.parent_id || ""}
                                                onChange={(e) => setData("parent_id", e.target.value)}
                                                className="w-full h-11 px-4 bg-slate-50 border border-slate-100 rounded-xl text-[14px] font-bold text-slate-700 focus:bg-white focus:border-[#0a66c2]/30 focus:ring-4 focus:ring-[#0a66c2]/5 transition-all outline-none appearance-none cursor-pointer"
                                            >
                                                <option value="">None (Main Category)</option>
                                                {parentCategories.map((parent) => (
                                                    <option key={parent.id} value={parent.id}>
                                                        {parent.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <Input
                                            label="Category Name"
                                            placeholder="e.g. Luxury Cars"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                            error={errors.name}
                                            className="h-11 font-bold text-[14px] text-slate-700"
                                        />
                                    </div>
                                    <FileUpload
                                        data={data}
                                        setData={setData}
                                        errors={errors}
                                        clearErrors={clearErrors}
                                        field="image"
                                        label="Category Image"
                                        initialData={category.icon}
                                        multiple={false}
                                    />
                                </div>

                                <div className="pt-2 border-t border-slate-100">
                                    <Input
                                        label="Description"
                                        placeholder="Provide more context about this category..."
                                        isTextArea={true}
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        error={errors.description}
                                        className="min-h-[140px] text-[14px] leading-relaxed font-semibold text-slate-600"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-3 space-y-6 sticky top-24">
                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="p-5 border-b border-slate-50 bg-slate-50/20 flex items-center justify-between">
                                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Record Information</h3>
                                <div className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-emerald-100">Live</div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-wider">
                                            <Calendar size={14} />
                                            <span>Created On</span>
                                        </div>
                                        <span className="text-slate-700 font-bold">{new Date(category.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="h-px bg-slate-50" />
                                    <div className="flex items-center justify-between text-[11px]">
                                        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-wider">
                                            <History size={14} />
                                            <span>Last Updated</span>
                                        </div>
                                        <span className="text-slate-700 font-bold">{new Date(category.updated_at).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <p className="text-[12px] text-slate-500 font-semibold leading-relaxed italic px-1">
                                    "Updating this category will immediately affect all associated vehicles in the system."
                                </p>

                                <button type="button" className="w-full h-10 border border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 active:scale-95">
                                    View Live
                                    <ExternalLink size={14} strokeWidth={2} />
                                </button>
                            </div>
                        </div>

                         <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl relative group overflow-hidden">
                             <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={18} className="text-[#0a66c2]" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Check</span>
                                </div>
                                <p className="text-[13px] font-semibold leading-relaxed italic text-slate-300">
                                    "Structural modifications are validated before synchronization to ensure search accuracy."
                                </p>
                             </div>
                             <Layers size={120} className="absolute -right-8 -bottom-8 p-4 text-white/[0.03] rotate-12 transition-transform duration-700 group-hover:scale-110" />
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
