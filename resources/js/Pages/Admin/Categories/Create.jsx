import React, { useState } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Input } from "@/Components/ui/Input";
import FileUpload from "@/Components/forms/FileUpload";
import {
    Save,
    ChevronLeft,
    XCircle,
    Loader2,
    Info,
    Image as ImageIcon,
    Plus,
    Trash2,
    Layers,
} from "lucide-react";

export default function CategoryCreate({ auth }) {
    const [isMultiMode, setIsMultiMode] = useState(false);

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        categories: [
            { name: "", description: "", image: null, status: "available" },
        ],
    });

    const Label = ({ children }) => (
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
            {children}
        </label>
    );

    const handleInputChange = (index, field, value) => {
        const updated = [...data.categories];
        updated[index][field] = value;
        setData("categories", updated);
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
        post(route("admin.categories.store"));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Create Category | Admin Dashboard" />

            <div className="bg-[#FDFDFD] min-h-screen pb-20 font-sans">
                {/* Header - Simple & Clean */}
                <div className="bg-white border-b border-gray-100 px-8 py-6">
                    <div className="flex justify-between items-center mx-auto">
                        <div>
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">
                                <span>Taxonomy</span>
                            </div>
                            <h1 className="text-xl font-black text-slate-900 tracking-tight">
                                {isMultiMode
                                    ? "Bulk Create Categories"
                                    : "Create New Category"}
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Multi-Mode Toggle Button */}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsMultiMode(!isMultiMode);
                                    if (isMultiMode)
                                        setData("categories", [
                                            data.categories[0],
                                        ]);
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${
                                    isMultiMode
                                        ? "bg-slate-900 text-white border-slate-900"
                                        : "bg-white text-slate-500 border-slate-200 hover:border-slate-900"
                                }`}
                            >
                                <Layers size={14} />
                                {isMultiMode ? "Single Mode" : "Multi Mode"}
                            </button>

                            <Link
                                href={route("admin.category.index")}
                                className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest"
                            >
                                <ChevronLeft size={16} /> BACK
                            </Link>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-8 py-10"
                >
                    {/* Left Column - Main Content Area */}
                    <div className="lg:col-span-8 space-y-6">
                        {data.categories.map((category, index) => (
                            <div
                                key={index}
                                className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm relative"
                            >
                                {isMultiMode && (
                                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-50">
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                            Category #{index + 1}
                                        </span>
                                        {data.categories.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeCategoryRow(index)
                                                }
                                                className="text-slate-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <Info
                                                size={18}
                                                className="text-slate-400"
                                            />
                                            <Label>General Information</Label>
                                        </div>

                                        <Input
                                            label="Category Name *"
                                            placeholder="e.g. Luxury Sedans"
                                            value={category.name}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            error={
                                                errors[
                                                    `categories.${index}.name`
                                                ]
                                            }
                                            className="border-blue-200 focus:border-slate-900 transition-all"
                                        />

                                        <div className="space-y-1.5">
                                            <Label>Description</Label>
                                            <textarea
                                                className="w-full min-h-[140px] border border-blue-200 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition bg-white placeholder:text-slate-300"
                                                placeholder="Describe the category..."
                                                value={category.description}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        index,
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <ImageIcon
                                                size={18}
                                                className="text-slate-400"
                                            />
                                            <Label>Category Icon</Label>
                                        </div>
                                        <FileUpload
                                            data={category}
                                            setData={(field, value) =>
                                                handleInputChange(
                                                    index,
                                                    field,
                                                    value
                                                )
                                            }
                                            errors={errors}
                                            clearErrors={clearErrors}
                                            field="image"
                                            label="Upload Category Image"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isMultiMode && (
                            <button
                                type="button"
                                onClick={addCategoryRow}
                                className="w-full py-5 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center gap-2 text-slate-400 font-bold text-[10px] hover:border-slate-900 hover:text-slate-900 transition-all uppercase tracking-[0.2em] bg-white"
                            >
                                <Plus size={16} />
                                Add Another Entry
                            </button>
                        )}
                    </div>

                    {/* Right Column - Actions (Fixed/Sticky) */}
                    <div className="lg:col-span-4">
                        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm sticky top-6">
                            <h4 className="font-bold text-slate-800 text-sm tracking-tight mb-1">
                                Finish Process
                            </h4>
                            <p className="text-slate-400 text-[10px] uppercase tracking-wider font-medium mb-6">
                                {isMultiMode
                                    ? "Bulk Save Categories"
                                    : "Confirm Category"}
                            </p>

                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex items-center justify-center gap-2 px-2 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black disabled:opacity-50 transition-all text-[10px] uppercase tracking-widest shadow-sm"
                                >
                                    {processing ? (
                                        <Loader2
                                            size={14}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <Save size={14} />
                                    )}
                                    {processing
                                        ? "Saving..."
                                        : isMultiMode
                                        ? `Create ${data.categories.length} Categories`
                                        : "Create Category"}
                                </button>

                                <Link
                                    href={route("admin.category.index")}
                                    className="w-full flex items-center justify-center gap-2 px-2 py-4 bg-white text-slate-400 font-bold border border-slate-100 rounded-xl hover:bg-slate-50 hover:text-red-500 transition-all text-[10px] uppercase tracking-widest"
                                >
                                    <XCircle size={14} />
                                    Discard
                                </Link>
                            </div>

                            {isMultiMode && (
                                <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                    <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mb-2">
                                        Bulk Info
                                    </p>
                                    <p className="text-[11px] text-blue-400 leading-relaxed">
                                        You are currently creating multiple
                                        categories at once. Ensure each entry
                                        has a unique name.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
