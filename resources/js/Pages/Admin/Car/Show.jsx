import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { 
    ChevronLeft, 
    Edit, 
    Check,
    Calendar,
    Settings2,
    Shield,
    Hash,
    Layers,
    LayoutDashboard,
    Clock,
    DollarSign,
    FileText,
    Fuel,
    Gauge,
    Car as CarIcon,
    CheckCircle2,
    ShieldCheck,
    HelpCircle
} from "lucide-react";

export default function Show({ car }) {
    const DetailGroup = ({ title, children, className = "" }) => (
        <div className={`space-y-4 ${className}`}>
            <h4 className="text-[14px] font-semibold text-[#191919] flex items-center gap-2">
                <div className="w-1 h-4 bg-[#0a66c2] rounded-full"></div>
                {title}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {children}
            </div>
        </div>
    );

    const DetailCard = ({ label, value, icon: Icon }) => (
        <div className="p-3.5 rounded-lg border border-gray-100 bg-white hover:border-[#0a66c2]/30 hover:shadow-sm transition-all group">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-gray-50 text-gray-500 group-hover:text-[#0a66c2] group-hover:bg-[#0a66c2]/5 transition-colors">
                        {Icon && <Icon size={16} strokeWidth={2} />}
                    </div>
                    <span className="text-[12px] font-medium text-[#666666] truncate">{label}</span>
                </div>
                <span className="text-[14px] font-semibold text-[#191919] pl-1 block truncate" title={value}>
                    {value || <span className="text-gray-400 font-normal text-[13px]">--</span>}
                </span>
            </div>
        </div>
    );

    return (
        <AdminLayout user={car.user}>
            <Head title={`${car.make} ${car.model} | Admin`} />

            <div className="max-w-9xl mx-auto">
                {/* Header Section - Minimal */}
                <div className="mb-6 bg-white rounded-lg border border-[#e0e0e0] shadow-sm overflow-hidden">
                    <div className="px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route("admin.cars.index")}
                                className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                <ChevronLeft size={20} strokeWidth={2.5} />
                            </Link>
                            <div>
                                <h1 className="text-[18px] font-bold text-[#191919] leading-tight">
                                    {car.make} {car.model}
                                </h1>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <Link
                                href={route("admin.cars.edit", car.id)}
                                className="px-5 py-1.5 text-[14px] font-semibold text-white bg-[#0a66c2] hover:bg-[#004182] rounded-full transition-all shadow-sm flex items-center gap-2"
                            >
                                <Edit size={16} strokeWidth={2.5} />
                                Edit Listing
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Column (Main Content) - Compact View */}
                    <div className="lg:col-span-8 bg-white rounded-lg border border-[#e0e0e0] shadow-sm p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {/* Car Details Card */}
                             <div className="p-3 rounded-xl border border-blue-100 bg-blue-50/10">
                                <h4 className="text-[12px] font-black text-[#191919] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <div className="p-1 rounded bg-blue-100 text-[#0a66c2]">
                                        <LayoutDashboard size={12} strokeWidth={2.5} />
                                    </div>
                                    CORE IDENTITY
                                </h4>
                                <ul className="space-y-2">
                                     <li className="flex items-center justify-between text-[12px]">
                                        <span className="text-gray-500 font-medium">Brand</span>
                                        <span className="font-bold text-gray-900">{car.brand?.name}</span>
                                     </li>
                                     <li className="flex items-center justify-between text-[12px]">
                                        <span className="text-gray-500 font-medium">Model</span>
                                        <span className="font-bold text-gray-900">{car.model}</span>
                                     </li>
                                     <li className="flex items-center justify-between text-[12px]">
                                        <span className="text-gray-500 font-medium">Make</span>
                                        <span className="font-bold text-gray-900">{car.make}</span>
                                     </li>
                                     <li className="flex items-center justify-between text-[12px]">
                                        <span className="text-gray-500 font-medium">Category</span>
                                        <span className="font-bold text-gray-900">{car.category?.name}</span>
                                     </li>
                                     <li className="flex items-center justify-between text-[12px]">
                                        <span className="text-gray-500 font-medium">Year</span>
                                        <span className="font-bold text-gray-900">{car.year}</span>
                                     </li>
                                     <li className="flex items-center justify-between text-[12px]">
                                        <span className="text-gray-500 font-medium">Rental Type</span>
                                        <span className="font-bold text-gray-900 uppercase">{car.rental_type}</span>
                                     </li>
                                </ul>
                             </div>

                             {/* Pricing Card */}
                             <div className="p-3 rounded-xl border border-gray-200 bg-white">
                                <h4 className="text-[12px] font-black text-[#191919] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <div className="p-1 rounded bg-gray-100 text-gray-600">
                                        <DollarSign size={12} strokeWidth={2.5} />
                                    </div>
                                    FINANCIALS
                                </h4>
                                <ul className="space-y-2">
                                     <li className="flex items-center justify-between text-[12px]">
                                        <span className="text-gray-500 font-medium">Daily Rate</span>
                                        <span className="font-bold text-[#0a66c2]">{car.price_details?.currency || '$'} {Number(car.price_details?.daily_rate || 0).toLocaleString()}</span>
                                     </li>
                                     <li className="flex items-center justify-between text-[12px]">
                                        <span className="text-gray-500 font-medium">Weekly Rate</span>
                                        <span className="font-bold text-gray-900">{car.price_details?.weekly_rate ? `${car.price_details?.currency || '$'} ${Number(car.price_details?.weekly_rate).toLocaleString()}` : <span className="text-gray-300">--</span>}</span>
                                     </li>
                                     <li className="flex items-center justify-between text-[12px]">
                                        <span className="text-gray-500 font-medium">Monthly Rate</span>
                                        <span className="font-bold text-gray-900">{car.price_details?.monthly_rate ? `${car.price_details?.currency || '$'} ${Number(car.price_details?.monthly_rate).toLocaleString()}` : <span className="text-gray-300">--</span>}</span>
                                     </li>
                                     <li className="flex items-center justify-between text-[12px]">
                                        <span className="text-gray-500 font-medium">Security Deposit</span>
                                        <span className="font-bold text-gray-900">{car.price_details?.currency || '$'} {Number(car.price_details?.security_deposit || 0).toLocaleString()}</span>
                                     </li>
                                     <li className="flex items-center justify-between text-[12px]">
                                        <span className="text-gray-500 font-medium">Tax Rate</span>
                                        <span className="font-bold text-gray-900">{car.price_details?.tax_percentage || 0}%</span>
                                     </li>
                                </ul>
                             </div>
                        
                             {/* Description - Full Width */}
                             <div className="md:col-span-2 p-3 rounded-xl border border-gray-200 bg-gray-50/50">
                                 <h4 className="text-[12px] font-black text-[#191919] uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <div className="p-1 rounded bg-gray-200 text-gray-600">
                                        <FileText size={12} strokeWidth={2.5} />
                                    </div>
                                    VEHICLE NARRATIVE
                                 </h4>
                                 <p className="text-[12px] text-gray-600 leading-relaxed whitespace-pre-wrap pl-7">
                                     {car.description || "No description provided."}
                                 </p>
                             </div>

                            {/* Technical Specs Card */}
                            <div className="p-3 rounded-xl border border-gray-200 bg-white">
                                <h4 className="text-[12px] font-black text-[#191919] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <div className="p-1 rounded bg-gray-100 text-gray-600">
                                        <Settings2 size={12} strokeWidth={2.5} />
                                    </div>
                                    TECHNICAL SPECS
                                </h4>
                                <ul className="space-y-2">
                                     <li className="flex items-center gap-2 text-[12px]">
                                        <CheckCircle2 size={14} className="text-[#0a66c2]" />
                                        <span className="text-gray-500 font-medium">Transmission:</span>
                                        <span className="font-bold text-gray-900 ml-auto">{car.specifications?.transmission || '--'}</span>
                                     </li>
                                     <li className="flex items-center gap-2 text-[12px]">
                                        <CheckCircle2 size={14} className="text-[#0a66c2]" />
                                        <span className="text-gray-500 font-medium">Fuel Type:</span>
                                        <span className="font-bold text-gray-900 ml-auto">{car.specifications?.fuel_type || '--'}</span>
                                     </li>
                                     <li className="flex items-center gap-2 text-[12px]">
                                        <CheckCircle2 size={14} className="text-[#0a66c2]" />
                                        <span className="text-gray-500 font-medium">Mileage:</span>
                                        <span className="font-bold text-gray-900 ml-auto">{car.specifications?.mileage || '--'}</span>
                                     </li>
                                     <li className="flex items-center gap-2 text-[12px]">
                                        <CheckCircle2 size={14} className="text-[#0a66c2]" />
                                        <span className="text-gray-500 font-medium">Steering:</span>
                                        <span className="font-bold text-gray-900 ml-auto">{car.specifications?.steering || '--'}</span>
                                     </li>
                                     <li className="flex items-center gap-2 text-[12px]">
                                        <CheckCircle2 size={14} className="text-[#0a66c2]" />
                                        <span className="text-gray-500 font-medium">Engine:</span>
                                        <span className="font-bold text-gray-900 ml-auto">{car.specifications?.engine_capacity || '--'}</span>
                                     </li>
                                     <li className="flex items-center gap-2 text-[12px]">
                                        <CheckCircle2 size={14} className="text-[#0a66c2]" />
                                        <span className="text-gray-500 font-medium">Color:</span>
                                        <span className="font-bold text-gray-900 ml-auto">{car.specifications?.color || '--'}</span>
                                     </li>
                                </ul>
                            </div>

                            {/* Legal Documents Card - Matching Reference Style closely */}
                            <div className="p-3 rounded-xl border border-gray-200 bg-white">
                                <h4 className="text-[12px] font-black text-[#191919] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <div className="p-1 rounded bg-gray-100 text-gray-600">
                                        <ShieldCheck size={12} strokeWidth={2.5} />
                                    </div>
                                    COMPLIANCE & DOCUMENTS
                                </h4>
                                <ul className="space-y-2">
                                     <li className="flex items-center gap-2 text-[12px]">
                                        <CheckCircle2 size={14} className="text-[#0a66c2]" />
                                        <span className="text-gray-600 font-medium">Registration:</span>
                                        <span className="font-bold text-gray-900 ml-auto">{car.police_documents?.registration_number || <span className="text-red-400">Missing</span>}</span>
                                     </li>
                                     <li className="flex items-center gap-2 text-[12px]">
                                        <CheckCircle2 size={14} className="text-[#0a66c2]" />
                                        <span className="text-gray-600 font-medium">Chassis No:</span>
                                        <span className="font-bold text-gray-900 ml-auto">{car.police_documents?.chassis_number || '--'}</span>
                                     </li>
                                     <li className="flex items-center gap-2 text-[12px]">
                                        <CheckCircle2 size={14} className="text-[#0a66c2]" />
                                        <span className="text-gray-600 font-medium">Engine No:</span>
                                        <span className="font-bold text-gray-900 ml-auto">{car.police_documents?.engine_number || '--'}</span>
                                     </li>
                                     <li className="flex items-center gap-2 text-[12px]">
                                        <CheckCircle2 size={14} className="text-[#0a66c2]" />
                                        <span className="text-gray-600 font-medium">Tax Token:</span>
                                        <span className="font-bold text-gray-900 ml-auto">{car.police_documents?.tax_token_expiry || '--'}</span>
                                     </li>
                                     <li className="flex items-center gap-2 text-[12px]">
                                        <CheckCircle2 size={14} className="text-[#0a66c2]" />
                                        <span className="text-gray-600 font-medium">Fitness:</span>
                                        <span className="font-bold text-gray-900 ml-auto">{car.police_documents?.fitness_expiry || '--'}</span>
                                     </li>
                                </ul>
                            </div>

                            {/* Features - Full Width */}
                            <div className="md:col-span-2 p-3 rounded-xl border border-gray-200 bg-white">
                                <h4 className="text-[12px] font-black text-[#191919] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <div className="p-1 rounded bg-gray-100 text-gray-600">
                                        <Settings2 size={12} strokeWidth={2.5} />
                                    </div>
                                    FEATURE SET
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {car.features?.length > 0 ? (
                                        car.features.map((feature, i) => (
                                            <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-gray-200 bg-gray-50 text-[#191919] text-[11px] font-semibold">
                                                <Check size={10} className="text-[#057642]" strokeWidth={4} />
                                                {feature.feature_name}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 text-[12px] italic">No specific features logged.</span>
                                    )}
                                </div>
                            </div>

                            {/* Media Section - Full Width */}
                            <div className="md:col-span-2 p-3 rounded-xl border border-gray-200 bg-white">
                                <h4 className="text-[12px] font-black text-[#191919] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <div className="p-1 rounded bg-gray-100 text-gray-600">
                                        <Layers size={12} strokeWidth={2.5} />
                                    </div>
                                    GALLERY
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {car.images?.length > 0 ? (
                                        car.images.map((img, i) => (
                                            <div key={i} className="group relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-all">
                                                <img 
                                                    src={`/${img.file_path}`} 
                                                    alt={`Car image ${i+1}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-6 text-center text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                            No images available
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* FAQ Section - Full Width */}
                            <div className="md:col-span-2 p-3 rounded-xl border border-gray-200 bg-white">
                                <h4 className="text-[12px] font-black text-[#191919] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <div className="p-1 rounded bg-gray-100 text-gray-600">
                                        <HelpCircle size={12} strokeWidth={2.5} />
                                    </div>
                                    FREQUENTLY ASKED QUESTIONS
                                </h4>
                                <div className="space-y-2">
                                    {car.faqs?.length > 0 ? (
                                        car.faqs.map((faq, i) => (
                                            <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                                <h5 className="text-[12px] font-bold text-[#191919] mb-1 flex items-start gap-1.5">
                                                     <span className="text-[#0a66c2]">Q.</span>
                                                     {faq.question}
                                                </h5>
                                                <p className="text-[12px] text-gray-600 pl-4 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-gray-400 text-[12px] italic">No FAQs available</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sticky Sidebar) */}
                    <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-6">
                        <div className="bg-white border border-[#e0e0e0] rounded-lg shadow-sm p-5">
                            <h3 className="text-[14px] font-semibold text-[#191919] mb-4">Listing Status</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[14px] text-[#666666] font-medium">Availability</span>
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[13px] font-semibold ${
                                        car.status === 'available' 
                                            ? 'bg-[#057642]/10 text-[#057642]' 
                                            : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${car.status === 'available' ? 'bg-[#057642]' : 'bg-gray-500'}`} />
                                        {car.status === 'available' ? 'Live' : 'Draft'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[14px] text-[#666666] font-medium">Internal ID</span>
                                    <span className="text-[13px] text-[#191919] font-mono">#{car.id}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[14px] text-[#666666] font-medium">Created</span>
                                    <span className="text-[13px] text-[#191919]">{new Date(car.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-[#e0e0e0] rounded-lg shadow-sm p-5">
                            <h3 className="text-[14px] font-semibold text-[#191919] mb-4">Inventory Summary</h3>
                            <div className="space-y-3">
                                {[
                                    { label: "Assets", value: `${car.images?.length || 0} Images` },
                                    { label: "Specs", value: "Complete" },
                                    { label: "Docs", value: car.police_documents ? "Verified" : "Pending" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 last:pb-0">
                                        <span className="text-[13px] font-medium text-[#666666]">{item.label}</span>
                                        <span className="text-[13px] font-semibold text-[#191919]">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
