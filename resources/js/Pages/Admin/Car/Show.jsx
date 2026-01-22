import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { 
    ChevronLeft, 
    Edit2, 
    Calendar, 
    Gauge, 
    Fuel, 
    Settings2, 
    ShieldCheck, 
    FileText, 
    HelpCircle, 
    CheckCircle2, 
    LayoutDashboard,
    Camera,
    DollarSign,
    Car as CarIcon,
    ArrowRight,
    Search,
    MapPin,
    Hash,
    Layers,
    Clock,
    User,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/Tabs";

export default function Show({ car }) {
    const [activeTab, setActiveTab] = useState("essentials");

    const InfoRow = ({ label, value, icon: Icon, color = "blue" }) => (
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-50 transition-all hover:bg-slate-50/50 group">
            <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                color === 'blue' ? 'bg-blue-50 text-blue-500 group-hover:bg-[#0a66c2] group-hover:text-white' : 
                color === 'emerald' ? 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white' :
                'bg-slate-100 text-slate-500 group-hover:bg-slate-500 group-hover:text-white'
            }`}>
                {Icon && <Icon size={16} strokeWidth={2.5} />}
            </div>
            <div className="min-w-0">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</span>
                <span className="block text-[14px] font-bold text-slate-700 truncate capitalize">{value || 'N/A'}</span>
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <Head title={`${car.make} ${car.model} Details`} />

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Unified Header - Exactly like Create/Edit */}
                <div className="px-8 py-5 border-b border-gray-100 bg-white flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("admin.cars.index")}
                            className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-[18px] font-semibold text-gray-900 leading-tight">
                                {car.make} <span className="text-[#0a66c2]">{car.model}</span>
                            </h1>
                            <p className="text-[13px] text-gray-500 font-medium mt-0.5 tracking-widest uppercase">
                                UNIT IDENTITY & SPECIFICATIONS
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={route("admin.cars.edit", car.id)}
                            className="px-6 py-2 text-[13px] font-semibold text-white bg-[#0a66c2] hover:bg-[#004182] rounded-full transition-all shadow-sm flex items-center gap-2"
                        >
                            <Edit2 size={16} />
                            Edit Listing
                        </Link>
                    </div>
                </div>

                {/* 2-Column Grid Layout - Same as Create/Edit form area */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Comprehensive Data Sections */}
                    <div className="lg:col-span-8 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col">
                            {/* Tabs Navigation Header - Styled exactly like Create */}
                            <div className="px-8 pt-6 border-b border-gray-100 overflow-x-auto bg-slate-50/30">
                                <TabsList className="w-full justify-start space-x-10 border-b-0 min-w-max bg-transparent h-auto p-0">
                                    <TabsTrigger 
                                        value="essentials" 
                                        className="pb-4 text-[12px] font-black tracking-widest flex items-center gap-2.5 transition-all border-b-2 border-transparent data-[state=active]:border-[#0a66c2] data-[state=active]:text-[#0a66c2] data-[state=active]:bg-blue-50/50 text-slate-400 hover:text-slate-600 rounded-none bg-transparent shadow-none px-6 uppercase"
                                    >
                                        <LayoutDashboard size={14} />
                                        ESSENTIALS
                                    </TabsTrigger>
                                    <TabsTrigger 
                                        value="technical" 
                                        className="pb-4 text-[12px] font-black tracking-widest flex items-center gap-2.5 transition-all border-b-2 border-transparent data-[state=active]:border-[#0a66c2] data-[state=active]:text-[#0a66c2] data-[state=active]:bg-blue-50/50 text-slate-400 hover:text-slate-600 rounded-none bg-transparent shadow-none px-6 uppercase"
                                    >
                                        <Settings2 size={14} />
                                        TECHNICAL
                                    </TabsTrigger>
                                    <TabsTrigger 
                                        value="media" 
                                        className="pb-4 text-[12px] font-black tracking-widest flex items-center gap-2.5 transition-all border-b-2 border-transparent data-[state=active]:border-[#0a66c2] data-[state=active]:text-[#0a66c2] data-[state=active]:bg-blue-50/50 text-slate-400 hover:text-slate-600 rounded-none bg-transparent shadow-none px-6 uppercase"
                                    >
                                        <Camera size={14} />
                                        MEDIA
                                    </TabsTrigger>
                                    <TabsTrigger 
                                        value="admin" 
                                        className="pb-4 text-[12px] font-black tracking-widest flex items-center gap-2.5 transition-all border-b-2 border-transparent data-[state=active]:border-[#0a66c2] data-[state=active]:text-[#0a66c2] data-[state=active]:bg-blue-50/50 text-slate-400 hover:text-slate-600 rounded-none bg-transparent shadow-none px-6 uppercase"
                                    >
                                        <ShieldCheck size={14} />
                                        ADMINISTRATION
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <div className="flex-1 p-8 h-auto space-y-12">
                                {/* Essentials Content */}
                                <TabsContent value="essentials" className="mt-0 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <section>
                                        <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                            CORE IDENTIFICATION
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <InfoRow label="Make / Manufacturer" value={car.make} icon={Search} />
                                            <InfoRow label="Model Designation" value={car.model} icon={Layers} />
                                            <InfoRow label="Vehicle Brand" value={car.brand?.name} icon={Hash} />
                                            <InfoRow label="Market Category" value={car.category?.name} icon={MapPin} />
                                            <InfoRow label="Production Year" value={car.year} icon={Calendar} />
                                            <InfoRow label="Rental Model" value={car.rental_type} icon={Clock} />
                                        </div>
                                    </section>

                                    <section className="border-t border-slate-100 pt-10">
                                        <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                            PRICING ARCHITECTURE
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50">
                                                <span className="block text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Daily Cycle</span>
                                                <span className="text-xl font-black text-blue-700 font-mono">{car.price_details?.currency || '$'}{Number(car.price_details?.daily_rate || 0).toLocaleString()}</span>
                                            </div>
                                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Security Deposit</span>
                                                <span className="text-xl font-black text-slate-700 font-mono">{car.price_details?.currency || '$'}{Number(car.price_details?.security_deposit || 0).toLocaleString()}</span>
                                            </div>
                                            <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100/50">
                                                <span className="block text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">Applied Tax</span>
                                                <span className="text-xl font-black text-emerald-700 font-mono">{car.price_details?.tax_percentage || 0}%</span>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="border-t border-slate-100 pt-10">
                                        <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                            PUBLIC DESCRIPTION
                                        </h3>
                                        <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                                            <p className="text-[13px] text-slate-600 font-medium leading-relaxed italic">
                                                {car.description || "No specific narrative provided for this vehicle."}
                                            </p>
                                        </div>
                                    </section>
                                </TabsContent>

                                {/* Technical Content */}
                                <TabsContent value="technical" className="mt-0 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <section>
                                        <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                            TECHNICAL SPECIFICATIONS
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <InfoRow label="Transmission" value={car.specifications?.transmission} icon={Settings2} />
                                            <InfoRow label="Fuel Configuration" value={car.specifications?.fuel_type} icon={Fuel} />
                                            <InfoRow label="Distance Travelled" value={car.specifications?.mileage ? `${car.specifications.mileage} KM` : null} icon={Gauge} />
                                            <InfoRow label="Steering Orientation" value={car.specifications?.steering} icon={CarIcon} />
                                            <InfoRow label="Power Capacity" value={car.specifications?.engine_capacity} icon={Gauge} />
                                            <InfoRow label="Exterior Finish" value={car.specifications?.color} icon={Layers} />
                                        </div>
                                    </section>

                                    <section className="border-t border-slate-100 pt-12">
                                        <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                            PREMIUM FEATURES
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {car.features?.map((f, i) => (
                                                <div key={i} className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg text-[11px] font-black border border-emerald-100 uppercase tracking-tight">
                                                    <CheckCircle2 size={12} />
                                                    {f.feature_name}
                                                </div>
                                            ))}
                                            {(!car.features || car.features.length === 0) && (
                                                <span className="text-sm text-slate-400 font-medium italic">No specific features logged.</span>
                                            )}
                                        </div>
                                    </section>
                                </TabsContent>

                                {/* Media Content */}
                                <TabsContent value="media" className="mt-0 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <section>
                                        <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                            VISUAL ASSETS
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {car.images?.map((img, i) => (
                                                <div key={i} className="aspect-square bg-slate-50 rounded-lg border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                                                    <img src={`/${img.file_path}`} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                            {(!car.images || car.images.length === 0) && (
                                                <div className="col-span-full py-16 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 rounded-xl">
                                                    <Camera size={48} strokeWidth={1} className="mb-4" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">No Gallery Assets Found</span>
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                </TabsContent>

                                {/* Administration Content */}
                                <TabsContent value="admin" className="mt-0 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <section>
                                        <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                            LEGAL COMPLIANCE
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <InfoRow label="License Plate" value={car.police_documents?.registration_number} icon={ShieldCheck} color="emerald" />
                                            <InfoRow label="Chassis / VIN" value={car.police_documents?.chassis_number} icon={FileText} />
                                            <InfoRow label="Engine Identity" value={car.police_documents?.engine_number} icon={Settings2} />
                                            <InfoRow label="Tax Token Validity" value={car.police_documents?.tax_token_expiry} icon={Calendar} />
                                            <InfoRow label="Fitness Expiry" value={car.police_documents?.fitness_expiry} icon={Calendar} />
                                        </div>
                                    </section>

                                    <section className="border-t border-slate-100 pt-12">
                                        <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                            CUSTOMER INTELLIGENCE (FAQ)
                                        </h3>
                                        <div className="space-y-4">
                                            {car.faqs?.map((faq, i) => (
                                                <div key={i} className="bg-slate-50/50 p-5 rounded-lg border border-slate-100">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <HelpCircle size={14} className="text-[#0a66c2]" />
                                                        <span className="text-[13px] font-black text-slate-800 uppercase tracking-tight">{faq.question}</span>
                                                    </div>
                                                    <p className="text-[13px] text-slate-500 font-medium pl-7 leading-relaxed">{faq.answer}</p>
                                                </div>
                                            ))}
                                            {(!car.faqs || car.faqs.length === 0) && (
                                                <div className="py-10 text-center border-2 border-dashed border-slate-50 rounded-lg">
                                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">No FAQs Defined</span>
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>

                    {/* Right Column: Sticky Management Sidebar */}
                    <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
                        {/* Status Card */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#0a66c2]/5 rounded-full -mr-12 -mt-12" />
                            <h3 className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-4">Publishing Status</h3>
                            <div className={`p-4 rounded-sm border flex items-center justify-between transition-all ${
                                car.status === 'available' 
                                ? 'bg-emerald-50 border-emerald-100 shadow-sm' 
                                : 'bg-slate-50 border-slate-100 shadow-sm'
                            }`}>
                                <div className="space-y-1">
                                    <span className={`block text-[14px] font-black uppercase tracking-tight transition-colors ${car.status === 'available' ? 'text-emerald-700' : 'text-slate-600'}`}>
                                        {car.status === 'available' ? 'Active Unit' : 'Draft Entry'}
                                    </span>
                                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Visibility Mode</span>
                                </div>
                                <div className={`w-3 h-3 rounded-full ${car.status === 'available' ? 'bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20' : 'bg-slate-300 ring-4 ring-slate-100'}`} />
                            </div>
                        </div>

                        {/* Quick Metrics Card */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                            <h3 className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-4">Inventory Summary</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-2 border-b border-slate-50">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">Active Image Count</span>
                                    <span className="text-sm font-black text-slate-800">{car.images?.length || 0} Assets</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-slate-50">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">Registry Number</span>
                                    <span className="text-sm font-black text-slate-800 truncate max-w-[150px]">{car.police_documents?.registration_number || 'N/A'}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-slate-50">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">Last Data Update</span>
                                    <span className="text-sm font-black text-slate-800">{new Date(car.updated_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">Data Quality</span>
                                    <div className="flex gap-1">
                                        {[1,2,3,4,5].map(i => <div key={i} className={`w-2 h-1.5 rounded-full ${i <= 3 ? 'bg-[#0a66c2]' : 'bg-slate-100'}`} />)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Administrative Footprint */}
                        <div className="bg-slate-900 rounded-lg p-6 text-white shadow-xl shadow-slate-200">
                             <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400">
                                    <CheckCircle2 size={20} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xs font-black uppercase tracking-wider text-blue-100/60">Data Verified</h4>
                                    <span className="block text-sm font-black text-white">System Validated</span>
                                </div>
                             </div>
                             <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-6">
                                This vehicle record has been processed by the marketplace audit system. All provided technical and pricing data is logged for transaction integrity.
                             </p>
                             <button className="w-full py-3 bg-[#0a66c2] hover:bg-blue-700 transition-colors rounded-lg text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/40">
                                Generate Full Report
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
