import React from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Input } from "@/Components/ui/Input";
import FileUpload from "@/Components/forms/FileUpload";
import { 
    Save, 
    ChevronLeft, 
    Loader2, 
    Info, 
    CheckCircle2, 
    Calendar, 
    History,
    ExternalLink,
    Plus,
    Layers,
    Pencil,
    Trash2
} from "lucide-react";

export default function CategoryEdit({ auth, category, parentCategories = [], subCategories = [] }) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        _method: "PUT",
        name: category.name || "",
        description: category.description || "",
        parent_id: category.parent_id || "",
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

            <div className="max-w-9xl mx-auto space-y-5">
                {/* LinkedIn-Style Header */}
                <div className="bg-white rounded-lg border border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("admin.category.index")}
                            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-all active:scale-95"
                        >
                            <ChevronLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-[20px] font-bold text-[#081621]">
                                Category Identity Hub
                            </h1>
                            <nav className="flex items-center gap-1.5 mt-0.5 text-[12px] text-[#00000099]">
                                <Link href={route('dashboard')} className="hover:text-[#0a66c2] hover:underline">Admin</Link>
                                <span>/</span>
                                <Link href={route('admin.category.index')} className="hover:text-[#0a66c2] hover:underline">Category Hierarchy</Link>
                                <span>/</span>
                                <span className="font-bold text-[#081621]">{category.name}</span>
                            </nav>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                         <button
                            onClick={handleSubmit}
                            disabled={processing}
                            className="h-10 px-8 text-[14px] font-bold text-white bg-[#0a66c2] hover:bg-[#004182] rounded-full transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 active:scale-95"
                        >
                            {processing ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <Save size={16} />
                            )}
                            Save Changes
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Side: Form Details */}
                    <div className="lg:col-span-9 space-y-5">
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-5 bg-[#0a66c2] rounded-full" />
                                    <h3 className="text-[14px] font-bold text-[#081621] uppercase tracking-wider">
                                        Core Specifications
                                    </h3>
                                </div>
                            </div>
                            
                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-bold text-[#666666] uppercase tracking-tight">Parent Segment</label>
                                            <select
                                                value={data.parent_id || ""}
                                                onChange={(e) => setData("parent_id", e.target.value)}
                                                className="w-full h-10 px-3 bg-[#f8f9fa] border border-gray-200 rounded-lg text-[14px] focus:ring-1 focus:ring-[#0a66c2] transition-all outline-none font-bold text-[#081621]"
                                            >
                                                <option value="">None (Top Level Root)</option>
                                                {parentCategories.map((parent) => (
                                                    <option key={parent.id} value={parent.id}>
                                                        {parent.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <Input
                                            label="Descriptor Name"
                                            placeholder="e.g. Luxury, SUV, Economy"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                            error={errors.name}
                                            className="h-10 text-[14px]"
                                        />
                                    </div>
                                    <FileUpload
                                        data={data}
                                        setData={setData}
                                        errors={errors}
                                        clearErrors={clearErrors}
                                        field="image"
                                        label="Visual Asset"
                                        initialData={category.icon}
                                        multiple={false}
                                    />
                                </div>

                                <Input
                                    label="Narrative Brief"
                                    placeholder="Briefly describe what makes this segment unique..."
                                    isTextArea={true}
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    error={errors.description}
                                    className="min-h-[120px] text-[14px] leading-relaxed"
                                />
                            </div>
                        </div>


                    </div>

                    {/* Right Side: Data Feed/Sidebar */}
                    <div className="lg:col-span-3 space-y-5 h-fit sticky top-20">
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                                <h3 className="text-[15px] font-bold text-[#081621]">Administrative Overview</h3>
                                <div className="px-2 py-0.5 bg-emerald-100 text-[#057642] text-[10px] font-bold rounded-full">Active</div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-[13px] text-[#666666]">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            <span>Created At</span>
                                        </div>
                                        <span className="text-[#081621] font-bold">{new Date(category.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="h-px bg-gray-50" />
                                    <div className="flex items-center justify-between text-[13px] text-[#666666]">
                                        <div className="flex items-center gap-2">
                                            <History size={14} />
                                            <span>Last Updated</span>
                                        </div>
                                        <span className="text-[#081621] font-bold">{new Date(category.updated_at).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-[#f8f9fa] rounded-lg border border-gray-100">
                                    <p className="text-[12px] text-[#666666] leading-relaxed font-medium">
                                        This record tracking ensures that all asset modifications are logged and displayed correctly across the website.
                                    </p>
                                </div>

                                <button className="w-full h-10 border border-[#0a66c2] text-[#0a66c2] text-[13px] font-bold rounded-full hover:bg-blue-50 transition-all flex items-center justify-center gap-2 active:scale-95">
                                    View Live Details
                                    <ExternalLink size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Status Guard */}
                         <div className="bg-[#004182] text-white rounded-lg p-6 shadow-md relative group overflow-hidden">
                             <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 transition-transform group-hover:scale-110">
                                <Info size={100} />
                             </div>
                             <div className="relative z-10">
                                <h4 className="text-[12px] font-black uppercase tracking-widest opacity-80 mb-2">Visibility Guard</h4>
                                <p className="text-[13px] font-medium leading-relaxed opacity-95">
                                    Modifying this identity will reflect across all linked vehicle dashboards and search results immediately.
                                </p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
