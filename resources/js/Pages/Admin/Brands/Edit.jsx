import React from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Input } from "@/Components/ui/Input";
import FileUpload from "@/Components/forms/FileUpload";
import { Save, ChevronLeft, XCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function BrandEdit({ auth, brand }) {
    // 1. Initialize form with brand data
    // _method: "PUT" is required for Laravel to handle files via POST
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        _method: "PUT",
        name: brand?.name || "",
        logo: null, // New file selected by user
        is_active: brand?.is_active ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Use post() because standard PUT doesn't support multipart/form-data in PHP
        post(route("admin.brands.update", brand.id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Edit Brand | ${brand?.name}`} />

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Header Section */}
                <div className="px-8 py-5 border-b border-gray-100 bg-white flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("admin.brands.index")}
                            className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-[18px] font-semibold text-gray-900 leading-tight">
                                Update Brand Listing
                            </h1>
                            <p className="text-[13px] text-gray-500 font-medium mt-0.5 tracking-widest">
                                Editing {brand.name} • Internal ID #{brand.id}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={route("admin.brands.index")}
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
                            {processing ? "Updating..." : "Update Brand"}
                        </button>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                    {/* Left Column: Form Details */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm relative animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="flex items-center gap-2 mb-8">
                                <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">
                                    General Information
                                </h3>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 items-start">
                                <div className="space-y-8">
                                    <Input
                                        label="Brand Name *"
                                        placeholder="e.g. BMW, Mercedes, Toyota"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        error={errors.name}
                                    />

                                    {/* Status Selection */}
                                    <div className="space-y-4">
                                        <label className="text-[12px] font-bold text-gray-900 tracking-tight block">
                                            Status & Visibility
                                        </label>
                                        <div className="flex items-center gap-3 p-1.5 bg-gray-50 rounded-xl border border-gray-100">
                                            <button
                                                type="button"
                                                onClick={() => setData("is_active", true)}
                                                className={`flex-1 py-2.5 px-4 rounded-lg text-[13px] font-semibold transition-all ${
                                                    data.is_active
                                                    ? "bg-white text-[#0a66c2] shadow-sm border border-gray-200"
                                                    : "text-gray-500 hover:text-gray-700"
                                                }`}
                                            >
                                                Active
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setData("is_active", false)}
                                                className={`flex-1 py-2.5 px-4 rounded-lg text-[13px] font-semibold transition-all ${
                                                    !data.is_active
                                                    ? "bg-white text-red-600 shadow-sm border border-gray-200"
                                                    : "text-gray-500 hover:text-gray-700"
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
                        </div>
                    </div>

                    {/* Right Column: Info Card */}
                    <div className="lg:col-span-4 sticky top-8">
                        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                            <h3 className="text-[13px] font-bold text-gray-900 tracking-tight mb-6">SUMMARY</h3>
                            <div className="space-y-5">
                                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-lg">
                                    <p className="text-[12px] text-emerald-700 leading-relaxed font-medium">
                                        This brand is currently <strong>{brand.is_active ? 'Visible' : 'Hidden'}</strong> on the public website. Changing the status will immediately affect all associated vehicles.
                                    </p>
                                </div>
                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        <span>Created On</span>
                                        <span className="text-gray-900">{new Date(brand.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="h-[1px] bg-gray-100" />
                                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        <span>Last Updated</span>
                                        <span className="text-gray-900">{new Date(brand.updated_at).toLocaleDateString()}</span>
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
