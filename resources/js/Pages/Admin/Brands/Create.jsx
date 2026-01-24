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
            <div className="max-w-full mx-auto space-y-4 font-sans antialiased text-[#191919]">
                {/* LinkedIn-Inspired Header */}
                <div className="bg-white rounded-t-lg border border-gray-200 border-b-0 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("admin.brands.index")}
                            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-all active:scale-95"
                        >
                            <ChevronLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-[18px] font-semibold text-[#000000e6]">
                                {isMultiMode ? "Bulk Add Brands" : "Create New Brand"}
                            </h1>
                            <nav className="flex items-center gap-1.5 mt-0.5 text-[12px] text-[#00000099]">
                                <Link href={route('dashboard')} className="hover:text-[#0a66c2] hover:underline">Admin</Link>
                                <span>/</span>
                                <Link href={route('admin.brands.index')} className="hover:text-[#0a66c2] hover:underline">Brands</Link>
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
                                     // logic if needed
                                } else {
                                     setData("brands", [data.brands[0]]);
                                }
                            }}
                            className={`h-8 flex items-center gap-2 px-4 rounded-full border text-[13px] font-semibold transition-all active:scale-95 ${
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
                            onClick={(e) => {
                                e.preventDefault();
                                post(route("admin.brand.store"));
                            }}
                            disabled={processing}
                            className="h-8 px-5 text-[13px] font-semibold text-white bg-[#0a66c2] hover:bg-[#004182] rounded-full transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                        >
                            {processing ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : (
                                <Save size={14} />
                            )}
                            Save Brand
                        </button>
                    </div>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        post(route("admin.brand.store"));
                    }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                    {/* Left Column: Form Cards */}
                    <div className="lg:col-span-9 space-y-4">
                        {data.brands.map((brand, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-400"
                            >
                                <div className="px-6 py-3 border-b border-gray-100 bg-[#f8f9fa]/50 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-4 bg-[#0a66c2] rounded-full" />
                                        <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                                            {isMultiMode ? `Brand Entry #${index + 1}` : "Primary Information"}
                                        </h3>
                                    </div>
                                    {isMultiMode && data.brands.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeRow(index)}
                                            className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded-full hover:bg-red-50"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>

                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                    <Input
                                        label="Brand Name *"
                                        placeholder="e.g. Toyota"
                                        value={brand.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        error={errors[`brands.${index}.name`]}
                                        className="h-10 text-[13px]"
                                        labelClassName="text-[12px]"
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
                                        errors={errors}
                                        clearErrors={clearErrors}
                                        field={`brands.${index}.logo`}
                                        label="Brand Logo"
                                    />
                                </div>
                            </div>
                        ))}

                        {isMultiMode && (
                            <button
                                type="button"
                                onClick={addRow}
                                className="w-full py-6 border-2 border-dashed border-gray-200 bg-white rounded-lg flex flex-col items-center justify-center gap-2 text-[#00000099] hover:border-[#0a66c2] hover:text-[#0a66c2] hover:bg-blue-50/20 transition-all group shadow-sm active:scale-[0.99]"
                            >
                                <div className="p-1.5 bg-gray-50 rounded-full group-hover:bg-[#0a66c2]/10 transition-colors">
                                    <Plus size={20} />
                                </div>
                                <span className="text-[11px] font-bold uppercase tracking-widest">Append Another Brand</span>
                            </button>
                        )}
                    </div>

                    {/* Right Column: Info Card */}
                    <div className="lg:col-span-3 space-y-4 h-fit sticky top-20">
                        {/* Status/Overview Card */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                            <h3 className="text-[13px] font-semibold text-[#000000e6] mb-3">Brand Manifest</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg">
                                    <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                                        {isMultiMode 
                                            ? "Bulk creation allows for rapid fleet expansion."
                                            : "Add a main manufacturer. Brands are critical for vehicle categorization."}
                                    </p>
                                </div>
                                <div className="border-t border-gray-50 pt-3 flex justify-between items-center text-[11px]">
                                    <span className="font-semibold text-gray-400">ENTRIES</span>
                                    <span className="font-bold text-gray-900">{data.brands.length}</span>
                                </div>
                                 <div className="flex justify-between items-center text-[11px]">
                                    <span className="font-semibold text-gray-400">MODE</span>
                                    <span className="font-bold text-[#0a66c2] uppercase">{isMultiMode ? "BULK" : "SINGLE"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
