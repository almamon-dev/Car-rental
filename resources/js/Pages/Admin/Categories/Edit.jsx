import React from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Input } from "@/Components/ui/Input";
import FileUpload from "@/Components/forms/FileUpload";
import { Save, ChevronLeft, XCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CategoryEdit({ auth, category }) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        _method: "PUT",
        name: category.name || "",
        description: category.description || "",
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.category.update", category.id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Edit Category | ${category.name}`} />

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
                                Update Category listing
                            </h1>
                            <p className="text-[13px] text-gray-500 font-medium mt-0.5 tracking-widest">
                                Editing {category.name} • Internal ID #{category.id}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
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
                            {processing ? "Updating..." : "Update Category"}
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
                                        label="Category Name *"
                                        placeholder="e.g. Luxury, SUV, Economy"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        error={errors.name}
                                    />
                                    <Input
                                        label="Description"
                                        placeholder="Brief description of this vehicle segment..."
                                        isTextArea={true}
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        error={errors.description}
                                        className="min-h-[140px]"
                                    />
                                </div>
                                <div className="space-y-6">
                                    <FileUpload
                                        data={data}
                                        setData={setData}
                                        errors={errors}
                                        clearErrors={clearErrors}
                                        field="image"
                                        label="Category Image"
                                        initialData={category.icon}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Info Card) */}
                    <div className="lg:col-span-4 sticky top-8">
                        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                            <h3 className="text-[13px] font-bold text-gray-900 tracking-tight mb-6">SUMMARY</h3>
                            <div className="space-y-5">
                                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-lg">
                                    <p className="text-[12px] text-emerald-700 leading-relaxed font-medium">
                                        Properly categorized vehicles receive 40% higher engagement. Updating the description helps users understand the segment better.
                                    </p>
                                </div>
                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        <span>Created On</span>
                                        <span className="text-gray-900">{new Date(category.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="h-[1px] bg-gray-100" />
                                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        <span>Last Updated</span>
                                        <span className="text-gray-900">{new Date(category.updated_at).toLocaleDateString()}</span>
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
