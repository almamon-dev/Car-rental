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
    CheckCircle2
} from "lucide-react";

export default function CategoryCreate({ auth, parentCategories = [] }) {
    const [isMultiMode, setIsMultiMode] = useState(false);

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        categories: [
            { name: "", description: "", image: null, parent_id: "", status: "available" },
        ],
    });

    const handleInputChange = (index, field, value) => {
        const updated = [...data.categories];
        updated[index][field] = value;
        setData("categories", updated);
        
        // Clear errors if they exist for this specific field
        const errorKey = `categories.${index}.${field}`;
        if (errors[errorKey]) clearErrors(errorKey);
    };

    const addCategoryRow = () => {
        setData("categories", [
            ...data.categories,
            { name: "", description: "", image: null, status: "available" },
        ]);
    };

    const removeCategoryRow = (index) => {
        const updated = [...data.categories];
        updated.splice(index, 1);
        setData("categories", updated);
        if (updated.length === 0) setIsMultiMode(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.category.store"));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Create Category | Admin" />

            <div className="max-w-9xl mx-auto space-y-4">
                {/* LinkedIn-Inspired Header */}
                <div className="bg-white rounded-t-lg border border-gray-200 border-b-0 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("admin.category.index")}
                            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-all active:scale-95"
                        >
                            <ChevronLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-[20px] font-semibold text-[#000000e6]">
                                {isMultiMode ? "Bulk Add Categories" : "Create New Category"}
                            </h1>
                            <nav className="flex items-center gap-1.5 mt-0.5 text-[12px] text-[#00000099]">
                                <Link href={route('dashboard')} className="hover:text-[#0a66c2] hover:underline">Admin</Link>
                                <span>/</span>
                                <Link href={route('admin.category.index')} className="hover:text-[#0a66c2] hover:underline">Category Hierarchy</Link>
                                <span>/</span>
                                <span className="font-semibold text-gray-900">Create</span>
                            </nav>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                         <button
                            type="button"
                            onClick={() => {
                                setIsMultiMode(!isMultiMode);
                                if (!isMultiMode) {
                                     // When enabling multi-mode, keep current data but wrap it
                                     // (Logic already handled by structure, but we might want to reset)
                                } else {
                                     setData("categories", [data.categories[0]]);
                                }
                            }}
                            className={`h-8 flex items-center gap-2 px-4 rounded-full border text-[14px] font-semibold transition-all active:scale-95 ${
                                isMultiMode
                                    ? "bg-[#0a66c2] text-white border-[#0a66c2] hover:bg-[#004182]"
                                    : "bg-white text-[#00000099] border-[#00000099] hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            <Layers size={14} />
                            {isMultiMode ? "Multiple Mode" : "Single Mode"}
                        </button>

                        <div className="w-[1px] h-6 bg-gray-200 mx-1 hidden sm:block" />

                        <button
                            onClick={handleSubmit}
                            disabled={processing}
                            className="h-8 px-5 text-[14px] font-semibold text-white bg-[#0a66c2] hover:bg-[#004182] rounded-full transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                        >
                            {processing ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : (
                                <Save size={14} />
                            )}
                            Save Category
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-9 space-y-4">
                        {data.categories.map((category, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-400"
                            >
                                <div className="px-6 py-3 border-b border-gray-100 bg-[#f8f9fa]/50 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-4 bg-[#0a66c2] rounded-full" />
                                        <h3 className="text-[14px] font-bold text-gray-700 uppercase tracking-wider">
                                            {isMultiMode ? `Category Item #${index + 1}` : "Primary Information"}
                                        </h3>
                                    </div>
                                    {isMultiMode && data.categories.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeCategoryRow(index)}
                                            className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-6">
                                        <div className="space-y-2 text-left">
                                            <label className="text-[13px] font-bold text-gray-700 uppercase tracking-tight">Parent Category</label>
                                            <select
                                                value={category.parent_id || ""}
                                                onChange={(e) => handleInputChange(index, "parent_id", e.target.value)}
                                                className="w-full h-10 px-3 bg-[#f8f9fa] border border-gray-200 rounded-lg text-[14px] focus:ring-1 focus:ring-[#0a66c2] transition-all outline-none"
                                            >
                                                <option value="">None (Top Level)</option>
                                                {parentCategories.map((parent) => (
                                                    <option key={parent.id} value={parent.id}>
                                                        {parent.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <Input
                                            label="Name"
                                            placeholder="e.g. Luxury, SUV, Economy"
                                            value={category.name}
                                            onChange={(e) => handleInputChange(index, "name", e.target.value)}
                                            error={errors[`categories.${index}.name`]}
                                            className="h-10 text-[14px]"
                                        />
                                        <Input
                                            label="Brief Description"
                                            placeholder="Enter context for this category..."
                                            isTextArea={true}
                                            value={category.description}
                                            onChange={(e) => handleInputChange(index, "description", e.target.value)}
                                            error={errors[`categories.${index}.description`]}
                                            className="min-h-[120px] text-[14px] leading-relaxed"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <FileUpload
                                            data={category}
                                            setData={(_, value) => handleInputChange(index, "image", value)}
                                            errors={errors}
                                            clearErrors={clearErrors}
                                            field={`categories.${index}.image`}
                                            label="Identity Asset"
                                            multiple={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isMultiMode && (
                            <button
                                type="button"
                                onClick={addCategoryRow}
                                className="w-full py-6 border-2 border-dashed border-gray-200 bg-white rounded-lg flex flex-col items-center justify-center gap-2 text-[#00000099] hover:border-[#0a66c2] hover:text-[#0a66c2] hover:bg-blue-50/20 transition-all group shadow-sm active:scale-[0.99]"
                            >
                                <div className="p-2 bg-gray-50 rounded-full group-hover:bg-[#0a66c2]/10 transition-colors">
                                    <Plus size={20} />
                                </div>
                                <span className="text-[12px] font-bold uppercase tracking-widest">Append Another Category</span>
                            </button>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-3 space-y-4 h-fit sticky top-20">
                        {/* Status/Overview Card */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                            <h3 className="text-[14px] font-semibold text-[#000000e6] mb-4">Inventory Manifest</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-[#f8f9fa] rounded-lg border border-gray-100">
                                    <div className="w-10 h-10 rounded bg-[#0a66c2]/10 flex items-center justify-center text-[#0a66c2]">
                                        <Info size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-semibold text-gray-900 leading-none">Category Policy</p>
                                        <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-tight font-black">Segmenting Logic</p>
                                    </div>
                                </div>
                                <div className="p-3 text-[12px] text-[#00000099] leading-relaxed">
                                    Categorizing your elite fleet helps users navigate through your inventory with surgical precision. Each category acts as a landing experience.
                                </div>
                                <div className="border-t border-gray-50 pt-3 flex justify-between items-center text-[12px]">
                                    <span className="font-semibold text-gray-400">STATUS</span>
                                    <span className="flex items-center gap-1.5 font-bold text-[#057642]">
                                        <CheckCircle2 size={12} strokeWidth={3} />
                                        READ TO SYNC
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
