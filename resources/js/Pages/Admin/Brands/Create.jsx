/**
 * Admin - Create Brand
 * 
 * Interface for adding new car manufacturers/brands to the system.
 * Supports both single and batch entry modes with logo uploads.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React, { useState } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Input } from "@/Components/ui/Input";
import FileUpload from "@/Components/forms/FileUpload";
import {
    Save,
    ChevronLeft,
    Loader2,
    Plus,
    Trash2,
    Layers,
    BadgeCheck,
    Database,
    ShieldCheck,
    Briefcase,
    Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * BrandCreate Component
 */
export default function BrandCreate({ auth }) {
    const [isBatchMode, setIsBatchMode] = useState(false);

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        brands: [{ name: "", logo: null }],
    });

    const handleInputChange = (index, field, value) => {
        const updated = [...data.brands];
        updated[index][field] = value;
        setData("brands", updated);
        
        const errorKey = `brands.${index}.${field}`;
        if (errors[errorKey]) clearErrors(errorKey);
    };

    const addRow = () => setData("brands", [...data.brands, { name: "", logo: null }]);
    
    const removeRow = (index) => {
        const updated = data.brands.filter((_, i) => i !== index);
        setData("brands", updated);
        if (updated.length === 0) setIsBatchMode(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.brands.store"));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Add New Brand | Admin Panel" />

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
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Brand Setup</span>
                                </div>
                                <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                                    {isBatchMode ? "Batch Brand Entry" : "Add New Brand"}
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                             <button
                                type="button"
                                onClick={() => {
                                    setIsBatchMode(!isBatchMode);
                                    if (isBatchMode) {
                                         setData("brands", [data.brands[0]]);
                                    }
                                }}
                                className={`h-10 flex items-center gap-2.5 px-6 rounded-xl border text-[12px] font-bold transition-all active:scale-95 ${
                                    isBatchMode
                                        ? "bg-blue-50 text-[#0a66c2] border-blue-100 shadow-sm"
                                        : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-900"
                                }`}
                            >
                                <Layers size={14} strokeWidth={2.5} />
                                {isBatchMode ? "Single Mode" : "Batch Mode"}
                            </button>

                            <div className="w-px h-6 bg-slate-100 mx-1 hidden md:block" />

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
                                Save Brand
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- FORM --- */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-9 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {data.brands.map((brand, index) => (
                                <motion.div
                                    key={index}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
                                >
                                    <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#0a66c2]/5 flex items-center justify-center text-[#0a66c2]">
                                                <BadgeCheck size={16} strokeWidth={2.5} />
                                            </div>
                                            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                                {isBatchMode ? `Entry #${index + 1}` : "Manufacturer Details"}
                                            </h3>
                                        </div>
                                        {isBatchMode && data.brands.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeRow(index)}
                                                className="text-slate-300 hover:text-red-500 transition-all p-2 rounded-lg hover:bg-red-50 active:scale-90"
                                            >
                                                <Trash2 size={18} strokeWidth={2.5} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                        <div className="space-y-6">
                                            <Input
                                                label="Brand Name"
                                                placeholder="e.g. Toyota, BMW"
                                                value={brand.name}
                                                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                                                error={errors[`brands.${index}.name`]}
                                                className="h-11 font-bold text-[14px] text-slate-700"
                                            />
                                            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                                <p className="text-[12px] text-slate-500 font-semibold leading-relaxed italic">
                                                    "Accurate brand names help customers filter cars more efficiently."
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <FileUpload
                                                data={brand}
                                                setData={(_, val) => handleInputChange(index, "logo", val)}
                                                errors={errors}
                                                clearErrors={clearErrors}
                                                field={`brands.${index}.logo`}
                                                label="Brand Logo"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isBatchMode && (
                            <motion.button
                                layout
                                type="button"
                                onClick={addRow}
                                className="w-full py-8 border-2 border-dashed border-slate-200 bg-white rounded-xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-[#0a66c2] hover:text-[#0a66c2] hover:bg-blue-50/10 transition-all group active:scale-[0.99]"
                            >
                                <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-[#0a66c2]/10 flex items-center justify-center transition-colors">
                                    <Plus size={24} strokeWidth={2.5} />
                                </div>
                                <span className="text-[12px] font-bold uppercase tracking-wider">Add Another Row</span>
                            </motion.button>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-3 space-y-6 sticky top-24">
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
                            <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <Activity size={16} className="text-[#0a66c2]" />
                                Entry Details
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="w-10 h-10 rounded-lg bg-[#0a66c2]/10 flex items-center justify-center text-[#0a66c2] shrink-0">
                                        <Briefcase size={20} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[13px] font-bold text-slate-800 leading-none">Entry Process</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Validation On</p>
                                    </div>
                                </div>
                                <div className="h-px bg-slate-50" />
                                <div className="space-y-3 px-1">
                                    <div className="flex justify-between items-center text-[12px]">
                                        <span className="font-bold text-slate-400 uppercase tracking-wider">Rows</span>
                                        <span className="font-bold text-slate-700">{data.brands.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[12px]">
                                        <span className="font-bold text-slate-400 uppercase tracking-wider">Mode</span>
                                        <span className="font-bold text-[#0a66c2] uppercase tracking-wider">{isBatchMode ? "Batch" : "Single"}</span>
                                    </div>
                                </div>
                                <div className="pt-2 border-t border-slate-50">
                                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-lg w-fit mx-auto">
                                        <ShieldCheck size={14} strokeWidth={2.5} />
                                        System Ready
                                    </span>
                                </div>
                            </div>
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
