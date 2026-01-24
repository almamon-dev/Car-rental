import React from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Input } from "@/Components/ui/Input";
import FileUpload from "@/Components/forms/FileUpload";
import { Save, ChevronLeft, XCircle, Loader2 } from "lucide-react";

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
                                Edit Brand Identity
                            </h1>
                            <nav className="flex items-center gap-1.5 mt-0.5 text-[12px] text-[#00000099]">
                                <Link href={route('dashboard')} className="hover:text-[#0a66c2] hover:underline">Admin</Link>
                                <span>/</span>
                                <Link href={route('admin.brands.index')} className="hover:text-[#0a66c2] hover:underline">Brands</Link>
                                <span>/</span>
                                <span className="font-semibold text-gray-900">{brand.name}</span>
                            </nav>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href={route("admin.brands.index")}
                            className="px-4 py-1.5 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200 rounded-full transition-all"
                        >
                            Discard Changes
                        </Link>
                        <button
                            onClick={handleSubmit}
                            disabled={processing}
                            className="h-8 px-5 text-[13px] font-semibold text-white bg-[#0a66c2] hover:bg-[#004182] rounded-full transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                        >
                            {processing ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : (
                                <Save size={14} />
                            )}
                            Save Changes
                        </button>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                    {/* Left Column: Form Details */}
                    <div className="lg:col-span-9 space-y-4">
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                             <div className="px-6 py-3 border-b border-gray-100 bg-[#f8f9fa]/50 flex items-center gap-2">
                                <div className="w-1 h-4 bg-[#0a66c2] rounded-full" />
                                <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                                    General Information
                                </h3>
                            </div>
                            
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                <div className="space-y-6">
                                    <Input
                                        label="Brand Name *"
                                        placeholder="e.g. BMW"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        error={errors.name}
                                        className="h-10 text-[13px]"
                                        labelClassName="text-[12px]"
                                    />

                                    {/* Status Selection */}
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-semibold text-gray-700 block">
                                            Status & Visibility
                                        </label>
                                        <div className="flex items-center p-1 bg-gray-100 rounded-lg max-w-sm">
                                            <button
                                                type="button"
                                                onClick={() => setData("is_active", true)}
                                                className={`flex-1 py-1.5 px-3 rounded-md text-[12px] font-bold transition-all shadow-sm ${
                                                    data.is_active
                                                    ? "bg-white text-[#0a66c2]"
                                                    : "text-gray-500 hover:text-gray-700 shadow-none bg-transparent"
                                                }`}
                                            >
                                                Active
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setData("is_active", false)}
                                                className={`flex-1 py-1.5 px-3 rounded-md text-[12px] font-bold transition-all shadow-sm ${
                                                    !data.is_active
                                                    ? "bg-white text-gray-700"
                                                    : "text-gray-500 hover:text-gray-700 shadow-none bg-transparent"
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
                    <div className="lg:col-span-3 space-y-4 h-fit sticky top-20">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                            <h3 className="text-[13px] font-semibold text-[#000000e6] mb-3">System Status</h3>
                            <div className="space-y-4">
                                <div className={`p-3 border rounded-lg ${brand.is_active ? 'bg-emerald-50/50 border-emerald-100' : 'bg-gray-50 border-gray-100'}`}>
                                    <p className={`text-[11px] leading-relaxed font-medium ${brand.is_active ? 'text-emerald-700' : 'text-gray-500'}`}>
                                        This brand is currently <strong>{Boolean(brand.is_active) ? 'Visible' : 'Hidden'}</strong> on the public website.
                                    </p>
                                </div>
                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        <span>Created</span>
                                        <span className="text-gray-900">{new Date(brand.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="h-[1px] bg-gray-100" />
                                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        <span>Updated</span>
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
