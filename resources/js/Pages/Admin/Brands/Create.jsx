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

export default function BrandCreate({ auth }) {
    const [isMultiMode, setIsMultiMode] = useState(false);
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        brands: [{ name: "", logo: null }],
    });

    const handleInputChange = (index, field, value) => {
        const updated = [...data.brands];
        updated[index][field] = value;
        setData("brands", updated);
    };

    const addRow = () =>
        setData("brands", [...data.brands, { name: "", logo: null }]);
    const removeRow = (index) => {
        const updated = data.brands.filter((_, i) => i !== index);
        setData("brands", updated);
        if (updated.length === 0) setIsMultiMode(false);
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Create Brand" />
            <div className="bg-[#FDFDFD] min-h-screen pb-20 font-sans">
                <div className="bg-white border-b border-gray-100 px-8 py-6">
                    <div className="flex justify-between items-center mx-auto">
                        <h1 className="text-xl font-black text-slate-900 tracking-tight">
                            {isMultiMode
                                ? "Bulk Create Brands"
                                : "Create New Brand"}
                        </h1>
                        <Link
                            href={route("admin.brands.index")}
                            className="relative group flex items-center justify-end"
                        >
                            <span className="absolute right-12 text-slate-500 font-bold text-[10px] uppercase tracking-widest opacity-100 transition-all z-20">
                                Go Back
                            </span>
                            <div className="flex items-center justify-center bg-white border border-slate-200 text-slate-500 h-10 w-10 group-hover:w-36 group-hover:bg-slate-900 group-hover:text-white rounded-full transition-all shadow-sm relative z-10">
                                <ChevronLeft
                                    size={18}
                                    className="absolute right-2.5"
                                />
                            </div>
                        </Link>
                    </div>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        post(route("admin.brand.store"));
                    }}
                    className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-8 py-10"
                >
                    <div className="lg:col-span-8 space-y-6">
                        {data.brands.map((brand, index) => (
                            <div
                                key={index}
                                className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm relative"
                            >
                                {isMultiMode && (
                                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-50">
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                            Brand #{index + 1}
                                        </span>
                                        {data.brands.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeRow(index)}
                                                className="text-slate-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Input
                                        label="Brand Name *"
                                        value={brand.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        error={errors[`brands.${index}.name`]}
                                    />
                                    <FileUpload
                                        data={brand}
                                        setData={(_, val) =>
                                            handleInputChange(
                                                index,
                                                "logo",
                                                val
                                            )
                                        }
                                        field={`brands.${index}.logo`}
                                        label="Upload Logo"
                                    />
                                </div>
                            </div>
                        ))}
                        {isMultiMode && (
                            <button
                                type="button"
                                onClick={addRow}
                                className="w-full py-5 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center gap-2 text-slate-400 font-bold text-[10px] hover:border-slate-900 hover:text-slate-900 transition-all uppercase tracking-[0.2em] bg-white"
                            >
                                <Plus size={16} /> Add Another Brand
                            </button>
                        )}
                    </div>

                    <div className="lg:col-span-4">
                        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm sticky top-6">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm tracking-tight mb-1">
                                        Process
                                    </h4>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsMultiMode(!isMultiMode);
                                        if (isMultiMode)
                                            setData("brands", [data.brands[0]]);
                                    }}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                                        isMultiMode
                                            ? "bg-slate-900 text-white"
                                            : "bg-slate-50 text-slate-500"
                                    }`}
                                >
                                    <Layers size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">
                                        {isMultiMode ? "Multi" : "Single"}
                                    </span>
                                </button>
                            </div>
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
                                        ? `Create ${data.brands.length} Brands`
                                        : "Create Brand"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
