/**
 * Admin - Create Location
 * 
 * Interface for adding new business locations or rental hubs.
 * Supports both single and batch entry modes.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React, { useState } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Input } from "@/Components/ui/Input";
import {
    Save,
    ChevronLeft,
    Loader2,
    Plus,
    Trash2,
    Layers,
    MapPin,
    CheckCircle2,
    Globe,
    ShieldCheck,
    Database,
    Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * LocationCreate Component
 */
export default function LocationCreate({ auth }) {
    const [isBatchMode, setIsBatchMode] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        locations: [
            { name: "", city: "", status: 1 },
        ],
    });

    const handleInputChange = (index, field, value) => {
        const updated = [...data.locations];
        updated[index][field] = value;
        setData("locations", updated);
    };

    const addLocationRow = () => {
        setData("locations", [
            ...data.locations,
            { name: "", city: "", status: 1 },
        ]);
    };

    const removeLocationRow = (index) => {
        const updated = [...data.locations];
        updated.splice(index, 1);
        setData("locations", updated);
        if (updated.length === 0) setIsBatchMode(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.locations.store"));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Add New Location | Admin Panel" />

            <div className="max-w-full mx-auto space-y-6">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-[#191919]">
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
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Location Setup</span>
                                </div>
                                <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                                    {isBatchMode ? "Batch Location Entry" : "Add New Location"}
                                </h1>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsBatchMode(!isBatchMode);
                                    if (isBatchMode) {
                                        setData("locations", [data.locations[0]]);
                                    }
                                }}
                                className={`h-10 flex items-center gap-2.5 px-5 rounded-xl border text-[12px] font-bold transition-all tracking-wide ${
                                    isBatchMode
                                        ? "bg-blue-50 text-[#0a66c2] border-blue-100 shadow-sm"
                                        : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                }`}
                            >
                                <Layers size={14} strokeWidth={2.5} />
                                {isBatchMode ? "Single Mode" : "Batch Mode"}
                            </button>

                            <div className="w-px h-6 bg-slate-200 mx-1 hidden md:block" />

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
                                Save Location
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- FORM --- */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-9 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {data.locations.map((location, index) => (
                                <motion.div
                                    key={index}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
                                >
                                    <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0a66c2] shadow-sm font-bold text-[12px]">
                                                {index + 1}
                                            </div>
                                            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                                {isBatchMode ? `Entry #${index + 1}` : "Primary Information"}
                                            </h3>
                                        </div>
                                        {isBatchMode && data.locations.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeLocationRow(index)}
                                                className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <Input
                                                label="Location Name *"
                                                placeholder="e.g. Downtown Office"
                                                value={location.name}
                                                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                                                error={errors[`locations.${index}.name`]}
                                                className="h-11 text-[14px] font-bold text-slate-700"
                                                labelClassName="text-[11px] font-bold uppercase tracking-wider text-slate-400"
                                            />
                                            <Input
                                                label="City *"
                                                placeholder="e.g. Dhaka"
                                                value={location.city}
                                                onChange={(e) => handleInputChange(index, "city", e.target.value)}
                                                error={errors[`locations.${index}.city`]}
                                                className="h-11 text-[14px] font-bold text-slate-700"
                                                labelClassName="text-[11px] font-bold uppercase tracking-wider text-slate-400"
                                            />
                                        </div>
                                        
                                        <div className="flex flex-col justify-center gap-4 p-6 bg-slate-50/50 rounded-xl border border-slate-100 group relative overflow-hidden">
                                            <div className="flex items-center justify-between relative z-10">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm transition-all duration-300 ${
                                                        location.status 
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
                                                        checked={!!location.status}
                                                        onChange={(e) => handleInputChange(index, "status", e.target.checked ? 1 : 0)}
                                                    />
                                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm peer-checked:bg-emerald-500 peer-checked:after:border-transparent"></div>
                                                </label>
                                            </div>
                                            <Activity size={80} className="absolute -right-4 -bottom-4 text-slate-200/10 rotate-12" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isBatchMode && (
                            <motion.button
                                type="button"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={addLocationRow}
                                className="w-full py-8 border-2 border-dashed border-slate-200 bg-white rounded-xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-[#0a66c2] hover:text-[#0a66c2] hover:bg-blue-50/10 transition-all group shadow-sm active:scale-[0.99]"
                            >
                                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-[#0a66c2]/10 transition-colors">
                                    <Plus size={20} strokeWidth={2.5} />
                                </div>
                                <div className="text-center">
                                    <span className="text-[11px] font-bold uppercase tracking-wider block mb-1">Add Another Row</span>
                                    <span className="text-[10px] font-semibold text-slate-300">Expand your entry list</span>
                                </div>
                            </motion.button>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
                        
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
                            <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <Database size={16} className="text-[#0a66c2]" />
                                Entry Details
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl relative overflow-hidden group">
                                    <p className="text-[12px] text-slate-600 leading-relaxed font-semibold italic relative z-10">
                                        {isBatchMode 
                                            ? "Batch mode allows adding multiple locations at once for faster setup."
                                            : "Enter the name and city of the location to add it to the system."}
                                    </p>
                                    <Globe size={60} className="absolute -right-4 -bottom-4 text-slate-200/20 group-hover:rotate-12 transition-transform duration-700" />
                                </div>
                                
                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between items-center text-[12px]">
                                        <span className="font-bold text-slate-400 uppercase tracking-wider">Entries</span>
                                        <span className="font-bold text-slate-700">{data.locations.length} Items</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[12px]">
                                        <span className="font-bold text-slate-400 uppercase tracking-wider">Mode</span>
                                        <span className="font-bold text-[#0a66c2] uppercase tracking-wider">{isBatchMode ? "Batch" : "Single"}</span>
                                    </div>
                                    <div className="h-px bg-slate-50" />
                                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-wider">
                                        <ShieldCheck size={14} strokeWidth={2.5} />
                                        Data Protection On
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl shadow-xl p-6 relative overflow-hidden group">
                           <div className="relative z-10">
                                <h4 className="text-white font-bold text-[13px] mb-2 uppercase tracking-wider">Quick Note</h4>
                                <p className="text-slate-400 text-[12px] mb-4 font-semibold leading-relaxed italic border-l-2 border-[#0a66c2] pl-3">
                                    "Provide accurate city names to help customers find your cars easily."
                                </p>
                           </div>
                           <MapPin size={80} className="absolute -right-6 -bottom-6 text-white/[0.03] rotate-12 transition-transform duration-700" />
                        </div>

                         <div className="text-center pt-4">
                             <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider border-t border-slate-100 pt-4 block">Admin Panel © 2026</span>
                         </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
