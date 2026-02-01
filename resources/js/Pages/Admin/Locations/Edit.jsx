/**
 * Admin - Edit Location
 * 
 * Interface for modifying existing rental hubs and business locations.
 * Manages location identity and availability status.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Input } from "@/Components/ui/Input";
import { 
    Save, 
    ChevronLeft, 
    Loader2, 
    MapPin, 
    CheckCircle2,
    Activity,
    Globe,
    ShieldCheck,
    Database
} from "lucide-react";
import { motion } from "framer-motion";

/**
 * LocationEdit Component
 */
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
            <Head title={`Edit Location | ${location.name}`} />

            <div className="max-w-full mx-auto space-y-6 text-[#191919]">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route("admin.locations.index")}
                                className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl text-slate-400 hover:text-[#0a66c2] transition-all border border-slate-100"
                            >
                                <ChevronLeft size={20} strokeWidth={2.5} />
                            </Link>
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-3 bg-[#0a66c2] rounded-full" />
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Edit Hub Details</span>
                                </div>
                                <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                                    Update Location Details
                                </h1>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <Link
                                href={route("admin.locations.index")}
                                className="px-5 py-2 text-[13px] font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all"
                            >
                                Discard Changes
                            </Link>
                            <button
                                onClick={handleSubmit}
                                disabled={processing}
                                className="h-10 px-6 text-[12px] font-bold text-white bg-[#0a66c2] hover:bg-[#084d92] rounded-xl transition-all flex items-center gap-2 shadow-md shadow-[#0a66c2]/10 active:scale-95 disabled:opacity-50"
                            >
                                {processing ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <Save size={16} strokeWidth={2} />
                                )}
                                Update Location
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-8 space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
                        >
                            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/30 flex items-center gap-3">
                                <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    Location Information
                                </h3>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                    <div className="space-y-6">
                                        <Input
                                            label="Location Name"
                                            placeholder="e.g. Downtown Office"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                            error={errors.name}
                                            className="h-11 text-[14px] font-bold text-slate-700"
                                            labelClassName="text-[11px] font-bold uppercase tracking-wider text-slate-400"
                                        />
                                        <Input
                                            label="City"
                                            placeholder="e.g. Dhaka"
                                            value={data.city}
                                            onChange={(e) => setData("city", e.target.value)}
                                            error={errors.city}
                                            className="h-11 text-[14px] font-bold text-slate-700"
                                            labelClassName="text-[11px] font-bold uppercase tracking-wider text-slate-400"
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col justify-center gap-4 p-6 bg-slate-50/50 rounded-xl border border-slate-100 group relative overflow-hidden">
                                        <div className="flex items-center justify-between relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm transition-all duration-300 ${
                                                    data.status 
                                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                                                        : "bg-white text-slate-300 border-slate-200"
                                                }`}>
                                                    <CheckCircle2 size={24} strokeWidth={2.5} />
                                                </div>
                                                <div>
                                                    <h4 className="text-[14px] font-bold text-slate-800 tracking-tight">Active Status</h4>
                                                    <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Show in frontend</p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={!!data.status}
                                                    onChange={(e) => setData("status", e.target.checked ? 1 : 0)}
                                                />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm peer-checked:bg-emerald-500 peer-checked:after:border-transparent"></div>
                                            </label>
                                        </div>
                                        <Activity size={80} className="absolute -right-4 -bottom-4 text-slate-200/10 rotate-12" />
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                        
                        {/* System Details */}
                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="p-5 border-b border-slate-50 flex items-center justify-between">
                                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">System Log</h3>
                                <div className={`px-2.5 py-0.5 text-[10px] font-bold rounded-lg uppercase tracking-wider border ${data.status ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                                    {data.status ? 'Active' : 'Inactive'}
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-wider">
                                            <Database size={14} />
                                            <span>Record ID</span>
                                        </div>
                                        <span className="text-slate-700 font-bold tracking-tight">#{location.id.toString().padStart(5, '0')}</span>
                                    </div>
                                    <div className="h-px bg-slate-50" />
                                    <div className="flex items-center justify-between text-[11px]">
                                        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-wider">
                                            <Globe size={14} />
                                            <span>Created At</span>
                                        </div>
                                        <span className="text-slate-700 font-bold tracking-tight">{new Date(location.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="h-px bg-slate-50" />
                                    <div className="flex items-center justify-between text-[11px]">
                                        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-wider">
                                            <Activity size={14} />
                                            <span>Last Updated</span>
                                        </div>
                                        <span className="text-slate-700 font-bold tracking-tight">{new Date(location.updated_at).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-blue-50/30 rounded-xl border border-blue-100 relative overflow-hidden group">
                                    <p className="text-[12px] text-[#0a66c2] leading-relaxed font-semibold italic relative z-10">
                                        Updates to this location will take effect immediately across all vehicle search filters.
                                    </p>
                                    <ShieldCheck size={40} className="absolute -right-2 -bottom-2 text-[#0a66c2]/10 group-hover:scale-110 transition-transform duration-700" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl relative group overflow-hidden">
                             <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12 transition-transform group-hover:scale-110 duration-1000">
                                <MapPin size={120} />
                             </div>
                             <div className="relative z-10">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#0a66c2] mb-3">Notice</h4>
                                <p className="text-[13px] font-semibold leading-relaxed text-slate-300 italic">
                                    "Changes to the location identity will update all associated records in the system."
                                </p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
