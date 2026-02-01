/**
 * Admin - Create Category
 * 
 * Interface for adding new car categories to the system.
 * Allows organizing cars into hierarchical segments.
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
    Info,
    CheckCircle2,
    Database,
    ShieldCheck,
    Activity,
    Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CategoryCreate Component
 */
export default function CategoryCreate({ auth, parentCategories = [] }) {
    const [isBatchMode, setIsBatchMode] = useState(false);

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        categories: [
            { name: "", description: "", image: null, parent_id: "", status: "available" },
        ],
    });

    const handleInputChange = (index, field, value) => {
        const updated = [...data.categories];
        updated[index][field] = value;
        setData("categories", updated);
        
        const errorKey = `categories.${index}.${field}`;
        if (errors[errorKey]) clearErrors(errorKey);
    };

    const addCategoryRow = () => {
        setData("categories", [
            ...data.categories,
            { name: "", description: "", image: null, status: "available", parent_id: "" },
        ]);
    };

    const removeCategoryRow = (index) => {
        const updated = [...data.categories];
        updated.splice(index, 1);
        setData("categories", updated);
        if (updated.length === 0) setIsBatchMode(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.category.store"));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Create Category | Admin Panel" />

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
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Category Setup</span>
                                </div>
                                <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                                    {isBatchMode ? "Batch Category Entry" : "Create New Category"}
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                             <button
                                type="button"
                                onClick={() => {
                                    setIsBatchMode(!isBatchMode);
                                    if (isBatchMode) {
                                         setData("categories", [data.categories[0]]);
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
                                Save Category
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- FORM --- */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-9 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {data.categories.map((category, index) => (
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
                                                <Database size={16} strokeWidth={2.5} />
                                            </div>
                                            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                                {isBatchMode ? `Entry #${index + 1}` : "Category Information"}
                                            </h3>
                                        </div>
                                        {isBatchMode && data.categories.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeCategoryRow(index)}
                                                className="text-slate-300 hover:text-red-500 transition-all p-2 rounded-lg hover:bg-red-50 active:scale-90"
                                            >
                                                <Trash2 size={18} strokeWidth={2.5} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="space-y-2 text-left">
                                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">Parent Category</label>
                                                <select
                                                    value={category.parent_id || ""}
                                                    onChange={(e) => handleInputChange(index, "parent_id", e.target.value)}
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
                                                placeholder="e.g. Luxury Cars, SUVs"
                                                value={category.name}
                                                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                                                error={errors[`categories.${index}.name`]}
                                                className="h-11 font-bold text-[14px] text-slate-700"
                                            />
                                            <Input
                                                label="Description"
                                                placeholder="Describe this category..."
                                                isTextArea={true}
                                                value={category.description}
                                                onChange={(e) => handleInputChange(index, "description", e.target.value)}
                                                error={errors[`categories.${index}.description`]}
                                                className="min-h-[140px] text-[14px] leading-relaxed font-semibold text-slate-600"
                                            />
                                        </div>
                                        <div>
                                            <FileUpload
                                                data={category}
                                                setData={(_, value) => handleInputChange(index, "image", value)}
                                                errors={errors}
                                                clearErrors={clearErrors}
                                                field={`categories.${index}.image`}
                                                label="Category Image"
                                                multiple={false}
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
                                onClick={addCategoryRow}
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
                                <Info size={16} className="text-[#0a66c2]" />
                                Organization Note
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="w-10 h-10 rounded-lg bg-[#0a66c2]/10 flex items-center justify-center text-[#0a66c2] shrink-0">
                                        <Briefcase size={20} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[13px] font-bold text-slate-800 leading-none">Grouping</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Quick Setup</p>
                                    </div>
                                </div>
                                <p className="text-[12px] text-slate-500 font-semibold leading-relaxed italic px-1">
                                    "Proper categories help customers find specific car types much faster."
                                </p>
                                <div className="h-px bg-slate-50" />
                                <div className="flex justify-between items-center px-1">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
                                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-lg">
                                        <CheckCircle2 size={12} strokeWidth={2.5} />
                                        Ready
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
