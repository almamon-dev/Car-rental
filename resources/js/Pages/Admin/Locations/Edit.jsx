import React from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Input } from "@/Components/ui/Input";
import { Save, ChevronLeft, Loader2, MapPin, CheckCircle2 } from "lucide-react";

export default function LocationEdit({ auth, location }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        name: location.name || "",
        city: location.city || "",
        status: location.status ? 1 : 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.locations.update", location.id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <div className="max-w-9xl mx-auto space-y-5">
                {/* LinkedIn-Style Header */}
                <div className="bg-white rounded-lg border border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("admin.locations.index")}
                            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-all active:scale-95"
                        >
                            <ChevronLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-[20px] font-bold text-[#081621]">
                                Branch Identity Hub
                            </h1>
                            <nav className="flex items-center gap-1.5 mt-0.5 text-[12px] text-[#00000099]">
                                <Link href={route('dashboard')} className="hover:text-[#0a66c2] hover:underline">Admin</Link>
                                <span>/</span>
                                <Link href={route('admin.locations.index')} className="hover:text-[#0a66c2] hover:underline">Branch Management</Link>
                                <span>/</span>
                                <span className="font-bold text-[#081621]">{location.name}</span>
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
                            
                            <form onSubmit={handleSubmit} className="p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <Input
                                            label="Branch Name"
                                            placeholder="e.g. Banani Showroom"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                            error={errors.name}
                                            className="h-10 text-[14px]"
                                        />
                                        <Input
                                            label="City / Region"
                                            placeholder="e.g. Dhaka"
                                            value={data.city}
                                            onChange={(e) => setData("city", e.target.value)}
                                            error={errors.city}
                                            className="h-10 text-[14px]"
                                        />
                                    </div>
                                    
                                    <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-xl border border-gray-100 group h-fit">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                                data.status 
                                                    ? "bg-emerald-100 text-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.1)]" 
                                                    : "bg-gray-200 text-gray-500"
                                            }`}>
                                                <CheckCircle2 size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-[14px] font-bold text-gray-900 transition-colors group-hover:text-[#0a66c2]">Operational</h4>
                                                <p className="text-[11px] text-gray-500 font-medium">Ready for inventory</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={!!data.status}
                                                onChange={(e) => setData("status", e.target.checked ? 1 : 0)}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Side: Data Feed/Sidebar */}
                    <div className="lg:col-span-3 space-y-5 h-fit sticky top-20">
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                                <h3 className="text-[15px] font-bold text-[#081621]">Administrative Overview</h3>
                                <div className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${data.status ? 'bg-emerald-100 text-[#057642]' : 'bg-gray-100 text-gray-500'}`}>
                                    {data.status ? 'Active' : 'Inactive'}
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-[13px] text-[#666666]">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} />
                                            <span>Created At</span>
                                        </div>
                                        <span className="text-[#081621] font-bold">{new Date(location.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="h-px bg-gray-50" />
                                    <div className="flex items-center justify-between text-[13px] text-[#666666]">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} />
                                            <span>Last Updated</span>
                                        </div>
                                        <span className="text-[#081621] font-bold">{new Date(location.updated_at).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-[#f8f9fa] rounded-lg border border-gray-100">
                                    <p className="text-[12px] text-[#666666] leading-relaxed font-medium">
                                        Efficient location management ensures accurate asset tracking and better regional accessibility.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Status Guard */}
                         <div className="bg-[#004182] text-white rounded-lg p-6 shadow-md relative group overflow-hidden">
                             <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 transition-transform group-hover:scale-110">
                                <MapPin size={100} />
                             </div>
                             <div className="relative z-10">
                                <h4 className="text-[12px] font-black uppercase tracking-widest opacity-80 mb-2">Visibility Guard</h4>
                                <p className="text-[13px] font-medium leading-relaxed opacity-95">
                                    Modifying this branch identity will reflect across all linked vehicle dashboards and search results immediately.
                                </p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
