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
        post(route("admin.category.store"));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Create Category | Admin Dashboard" />

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Header Section */}
                <div className="px-8 py-5 border-b border-gray-100 bg-white flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("admin.category.index")}
                            className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-[18px] font-semibold text-gray-900 leading-tight">
                                Create Category Listing
                            </h1>
                            <p className="text-[13px] text-gray-500 font-medium mt-0.5 tracking-widest">
                                {isMultiMode ? "Bulk Creation Mode" : "Vehicle Segmentation Management"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setIsMultiMode(!isMultiMode);
                                if (isMultiMode) setData("categories", [data.categories[0]]);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-[13px] font-semibold ${
                                isMultiMode
                                    ? "bg-slate-900 text-white border-slate-900"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                            }`}
                        >
                            <Layers size={16} />
                            {isMultiMode ? "Multi Mode" : "Single Mode"}
                        </button>

                        <div className="h-6 w-[1px] bg-gray-200 mx-1" />

                        <Link
                            href={route("admin.category.index")}
                            className="px-5 py-2 text-[13px] font-semibold text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                        >
                            Discard
                        </Link>
                        <button
                            onClick={handleSubmit}
                            disabled={processing}
                            className="px-6 py-2 text-[13px] font-semibold text-white bg-[#0a66c2] hover:bg-[#004182] rounded-full transition-all shadow-sm flex items-center gap-2"
                        >
                            {processing ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <Save size={16} />
                            )}
                            {processing ? "Saving..." : "Create Category"}
                        </button>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                    {/* Left Column: Form Cards */}
                    <div className="lg:col-span-8 space-y-8">
                        {data.categories.map((category, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm relative animate-in fade-in slide-in-from-bottom-4 duration-500"
                            >
                                {isMultiMode && (
                                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                            <span className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">
                                                Category Entry #{index + 1}
                                            </span>
                                        </div>
                                        {data.categories.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeCategoryRow(index)}
                                                className="text-gray-400 hover:text-red-500 transition-colors bg-gray-50 hover:bg-red-50 p-2 rounded-full"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 items-start">
                                    <div className="space-y-8">
                                        <Input
                                            label="Category Name *"
                                            placeholder="e.g. Luxury, SUV, Economy"
                                            value={category.name}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            error={errors[`categories.${index}.name`]}
                                        />
                                        <Input
                                            label="Description"
                                            placeholder="Brief description of this vehicle segment..."
                                            isTextArea={true}
                                            value={category.description}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            error={errors[`categories.${index}.description`]}
                                            className="min-h-[140px]"
                                        />
                                    </div>
                                    <div className="space-y-6">
                                        <FileUpload
                                            data={category}
                                            setData={(field, value) =>
                                                handleInputChange(
                                                    index,
                                                    "image",
                                                    value
                                                )
                                            }
                                            errors={errors}
                                            clearErrors={clearErrors}
                                            field={`categories.${index}.image`}
                                            label="Category Image"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isMultiMode && (
                            <button
                                type="button"
                                onClick={addCategoryRow}
                                className="w-full py-8 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 text-gray-400 font-bold text-[12px] hover:border-[#0a66c2] hover:text-[#0a66c2] hover:bg-blue-50/30 transition-all uppercase tracking-widest bg-white"
                            >
                                <div className="p-2 bg-gray-50 rounded-full group-hover:bg-[#0a66c2]/10">
                                    <Plus size={24} />
                                </div>
                                Add Another Entry
                            </button>
                        )}
                    </div>

                    {/* Right Column: Info Card */}
                    <div className="lg:col-span-4 sticky top-8">
                        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                            <h3 className="text-[13px] font-bold text-gray-900 tracking-tight mb-6">INFORMATION</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-lg">
                                    <p className="text-[12px] text-blue-700 leading-relaxed font-medium">
                                        {isMultiMode 
                                            ? "Bulk creation allows you to add multiple vehicle categories at once. Ensure each category has a distinctive name and representative image."
                                            : "Define a new category to group your vehicles. Categories help customers filter and find the right vehicle for their needs."}
                                    </p>
                                </div>
                                <div className="space-y-3 pt-4">
                                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        <span>Total Entries</span>
                                        <span className="text-gray-900">{data.categories.length}</span>
                                    </div>
                                    <div className="h-[1px] bg-gray-100" />
                                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        <span>Mode</span>
                                        <span className="text-[#0a66c2]">{isMultiMode ? "BULK" : "SINGLE"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
