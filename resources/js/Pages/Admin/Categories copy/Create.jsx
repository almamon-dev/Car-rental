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

            <div className="bg-[#FDFDFD] min-h-screen pb-20 font-sans">
                {/* Header: Ekhon sudhu Go Back button thakbe */}
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

                        <Link
                            href={route("admin.category.index")}
                            className="relative group flex items-center justify-end"
                        >
                            <span className="absolute right-12 whitespace-nowrap text-slate-500 font-bold text-[10px] uppercase tracking-widest opacity-100 group-hover:text-white transition-all duration-500 ease-in-out z-20 pointer-events-none">
                                Go Back
                            </span>
                            <div className="flex items-center justify-center bg-white border border-slate-200 text-slate-500 h-10 w-10 group-hover:w-36 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white rounded-full transition-all duration-500 ease-in-out shadow-sm overflow-hidden relative z-10">
                                <ChevronLeft
                                    size={18}
                                    className="absolute right-2.5 transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        </Link>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-8 py-10"
                >
                    {/* Left Column: Form Cards */}
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
                                        <Input
                                            label="Category Name *"
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
                                        />
                                        <Input
                                            label="Description"
                                            isTextArea={true}
                                            value={category.description}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            error={
                                                errors[
                                                    `categories.${index}.description`
                                                ]
                                            }
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
                                <Plus size={16} /> Add Another Entry
                            </button>
                        )}
                    </div>

                    {/* Right Column: Sidebar Actions */}
                    <div className="lg:col-span-4">
                        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm sticky top-6">
                            {/* Header Section: Text on Left, Switch on Right */}
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm tracking-tight mb-1">
                                        Finish Process
                                    </h4>
                                    <p className="text-slate-400 text-[10px] uppercase tracking-wider font-medium">
                                        {isMultiMode
                                            ? "Bulk Save Categories"
                                            : "Confirm Category"}
                                    </p>
                                </div>

                                {/* Compact Multi Mode Switch */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsMultiMode(!isMultiMode);
                                        if (isMultiMode)
                                            setData("categories", [
                                                data.categories[0],
                                            ]);
                                    }}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 ${
                                        isMultiMode
                                            ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                                            : "bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-200"
                                    }`}
                                    title={
                                        isMultiMode
                                            ? "Switch to Single Mode"
                                            : "Switch to Multi Mode"
                                    }
                                >
                                    <Layers
                                        size={14}
                                        className={
                                            isMultiMode
                                                ? "text-white"
                                                : "text-slate-400"
                                        }
                                    />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">
                                        {isMultiMode ? "Multi" : "Single"}
                                    </span>
                                    {/* Visual Toggle Indicator */}
                                    <div
                                        className={`w-6 h-3 rounded-full relative transition-colors ml-1 ${
                                            isMultiMode
                                                ? "bg-green-500"
                                                : "bg-slate-300"
                                        }`}
                                    >
                                        <div
                                            className={`absolute top-0.5 w-2 h-2 bg-white rounded-full transition-all ${
                                                isMultiMode
                                                    ? "right-0.5"
                                                    : "left-0.5"
                                            }`}
                                        />
                                    </div>
                                </button>
                            </div>

                            {/* Action Buttons: Full Width */}
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
                                    <XCircle size={14} /> Discard
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
