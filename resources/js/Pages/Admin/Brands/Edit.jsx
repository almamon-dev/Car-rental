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

            <div className="bg-[#FDFDFD] min-h-screen pb-20 font-sans">
                {/* Header Section */}
                <div className="bg-white border-b border-gray-100 px-8 py-6">
                    <div className="flex justify-between items-center mx-auto">
                        <div>
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">
                                <span>Catalogue</span>
                            </div>
                            <h1 className="text-xl font-black text-slate-900 tracking-tight">
                                Edit Brand
                            </h1>
                        </div>

                        <Link href={route("admin.brands.index")}>
                            <motion.div
                                initial="rest"
                                whileHover="hover"
                                animate="rest"
                                className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-[20px] cursor-pointer overflow-hidden relative shadow-sm"
                            >
                                <motion.div
                                    variants={{
                                        rest: { scale: 0, opacity: 0 },
                                        hover: { scale: 1.5, opacity: 1 },
                                    }}
                                    className="absolute inset-0 bg-black rounded-full -z-10"
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                />
                                <motion.span
                                    variants={{ rest: { x: 0 }, hover: { x: -2 } }}
                                    className="text-white font-bold text-[10px] uppercase tracking-widest"
                                >
                                    Go Back
                                </motion.span>
                                <motion.div
                                    variants={{ rest: { x: 0 }, hover: { x: 2 } }}
                                    className="flex items-center justify-center bg-white/10 rounded-full p-1"
                                >
                                    <ChevronLeft size={14} className="text-white" />
                                </motion.div>
                            </motion.div>
                        </Link>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-8 py-10"
                >
                    {/* Left Column: Form Details */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm relative">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                <div className="space-y-6">
                                    <Input
                                        label="Brand Name *"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        error={errors.name}
                                    />

                                    {/* Status Selection */}
                                    <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">
                                            Brand Visibility
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setData("is_active", true)}
                                                className={`flex-1 py-3 px-4 rounded-xl border text-[11px] font-bold uppercase tracking-wider transition-all ${
                                                    data.is_active
                                                    ? "bg-white border-green-500 text-green-600 shadow-sm"
                                                    : "bg-transparent border-slate-200 text-slate-400 hover:border-slate-300"
                                                }`}
                                            >
                                                Active
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setData("is_active", false)}
                                                className={`flex-1 py-3 px-4 rounded-xl border text-[11px] font-bold uppercase tracking-wider transition-all ${
                                                    !data.is_active
                                                    ? "bg-white border-red-500 text-red-600 shadow-sm"
                                                    : "bg-transparent border-slate-200 text-slate-400 hover:border-slate-300"
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

                    {/* Right Column: Sidebar Actions */}
                    <div className="lg:col-span-4">
                        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm sticky top-6">
                            <div className="mb-6">
                                <h4 className="font-bold text-slate-800 text-sm tracking-tight mb-1">
                                    Update Details
                                </h4>
                                <p className="text-slate-400 text-[10px] uppercase tracking-wider font-medium">
                                    Save brand information
                                </p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex items-center justify-center gap-2 px-2 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black disabled:opacity-50 transition-all text-[10px] uppercase tracking-widest shadow-sm"
                                >
                                    {processing ? (
                                        <Loader2 size={14} className="animate-spin" />
                                    ) : (
                                        <Save size={14} />
                                    )}
                                    {processing ? "Saving Changes..." : "Update Brand"}
                                </button>

                                <Link
                                    href={route("admin.brands.index")}
                                    className="w-full flex items-center justify-center gap-2 px-2 py-4 bg-white text-slate-400 font-bold border border-slate-100 rounded-xl hover:bg-slate-50 hover:text-red-500 transition-all text-[10px] uppercase tracking-widest"
                                >
                                    <XCircle size={14} /> Discard Changes
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
