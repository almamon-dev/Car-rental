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
    CheckCircle2
} from "lucide-react";

export default function LocationCreate({ auth }) {
    const [isMultiMode, setIsMultiMode] = useState(false);

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
        if (updated.length === 0) setIsMultiMode(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.locations.store"));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Create Branch | Admin Dashboard" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased text-[#191919]">
                {/* LinkedIn-Inspired Header */}
                <div className="bg-white rounded-t-lg border border-gray-200 border-b-0 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("admin.locations.index")}
                            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-all active:scale-95"
                        >
                            <ChevronLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-[18px] font-semibold text-[#000000e6]">
                                {isMultiMode ? "Bulk Add Branches" : "Create New Branch"}
                            </h1>
                            <nav className="flex items-center gap-1.5 mt-0.5 text-[12px] text-[#00000099]">
                                <Link href={route('dashboard')} className="hover:text-[#0a66c2] hover:underline">Admin</Link>
                                <span>/</span>
                                <Link href={route('admin.locations.index')} className="hover:text-[#0a66c2] hover:underline">Branch Management</Link>
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
                                     // logic for enabling multi-mode
                                } else {
                                     setData("locations", [data.locations[0]]);
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
                            onClick={handleSubmit}
                            disabled={processing}
                            className="h-8 px-5 text-[13px] font-semibold text-white bg-[#0a66c2] hover:bg-[#004182] rounded-full transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                        >
                            {processing ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : (
                                <Save size={14} />
                            )}
                            Save Branch
                        </button>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                    {/* Left Column: Form Cards */}
                    <div className="lg:col-span-9 space-y-4">
                        {data.locations.map((location, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-400"
                            >
                                <div className="px-6 py-3 border-b border-gray-100 bg-[#f8f9fa]/50 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-4 bg-[#0a66c2] rounded-full" />
                                        <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                                            {isMultiMode ? `Branch Entry #${index + 1}` : "Primary Information"}
                                        </h3>
                                    </div>
                                    {isMultiMode && data.locations.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeLocationRow(index)}
                                            className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded-full hover:bg-red-50"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>

                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                    <div className="space-y-4">
                                        <Input
                                            label="Branch Name *"
                                            placeholder="e.g. Banani Showroom"
                                            value={location.name}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            error={errors[`locations.${index}.name`]}
                                            className="h-10 text-[13px]"
                                            labelClassName="text-[12px]"
                                        />
                                        <Input
                                            label="City / Region *"
                                            placeholder="e.g. Dhaka"
                                            value={location.city}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "city",
                                                    e.target.value
                                                )
                                            }
                                            error={errors[`locations.${index}.city`]}
                                            className="h-10 text-[13px]"
                                            labelClassName="text-[12px]"
                                        />
                                    </div>
                                    
                                    <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100 group">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                                location.status 
                                                    ? "bg-emerald-100 text-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.1)]" 
                                                    : "bg-gray-200 text-gray-500"
                                            }`}>
                                                <CheckCircle2 size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-[13px] font-bold text-gray-900 transition-colors group-hover:text-[#0a66c2]">Operational</h4>
                                                <p className="text-[11px] text-gray-500 font-medium">Ready for inventory</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={!!location.status}
                                                onChange={(e) => handleInputChange(index, "status", e.target.checked ? 1 : 0)}
                                            />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isMultiMode && (
                            <button
                                type="button"
                                onClick={addLocationRow}
                                className="w-full py-6 border-2 border-dashed border-gray-200 bg-white rounded-lg flex flex-col items-center justify-center gap-2 text-[#00000099] hover:border-[#0a66c2] hover:text-[#0a66c2] hover:bg-blue-50/20 transition-all group shadow-sm active:scale-[0.99]"
                            >
                                <div className="p-1.5 bg-gray-50 rounded-full group-hover:bg-[#0a66c2]/10 transition-colors">
                                    <Plus size={20} />
                                </div>
                                <span className="text-[11px] font-bold uppercase tracking-widest">Append Another Branch</span>
                            </button>
                        )}
                    </div>

                    {/* Right Column: Info Card */}
                    <div className="lg:col-span-3 space-y-4 h-fit sticky top-20">
                        {/* Status/Overview Card */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                            <h3 className="text-[13px] font-semibold text-[#000000e6] mb-3">Branch Manifest</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg">
                                    <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                                        {isMultiMode 
                                            ? "Bulk creation allows you to register multiple branches simultaneously."
                                            : "Add a main showroom or warehouse. These locations will be assigned to cars in your fleet."}
                                    </p>
                                </div>
                                <div className="border-t border-gray-50 pt-3 flex justify-between items-center text-[11px]">
                                    <span className="font-semibold text-gray-400">ENTRIES</span>
                                    <span className="font-bold text-gray-900">{data.locations.length}</span>
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
