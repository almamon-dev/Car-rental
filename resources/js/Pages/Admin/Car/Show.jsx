/**
 * Admin - Car Details
 * 
 * Provides a detailed view of a specific car in the inventory.
 * Covers identity, pricing, technical specs, and registration info.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React from "react";
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
    HelpCircle,
    Activity,
    Database,
    ImageIcon,
    ShieldAlert
} from "lucide-react";
import { motion } from "framer-motion";

/**
 * Car Detail Show Component
 */
export default function Show({ car }) {
    const specs = car.specifications || {};
    const pricing = car.price_details || car.priceDetails || {};
    const docs = car.police_documents || car.policeDocuments || {};

    return (
        <AdminLayout user={car.user}>
            <Head title={`${car.make} ${car.model} | Car Details`} />

            <div className="max-w-full mx-auto space-y-6">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-[#191919]">
                    <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route("admin.cars.index")}
                                className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl text-slate-400 hover:text-[#0a66c2] transition-all border border-slate-100"
                            >
                                <ChevronLeft size={20} strokeWidth={2.5} />
                            </Link>
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-3 bg-[#0a66c2] rounded-full" />
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Fleet Inventory</span>
                                </div>
                                <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                                    {car.make} {car.model}
                                </h1>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <Link
                                href={route("admin.cars.edit", car.id)}
                                className="px-6 py-2.5 text-[13px] font-bold text-white bg-[#0a66c2] hover:bg-[#084d92] rounded-xl transition-all shadow-md shadow-[#0a66c2]/10 flex items-center gap-2"
                            >
                                <Edit size={16} strokeWidth={2} />
                                Edit Car Details
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 {/* Identity Details */}
                                 <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-5 rounded-2xl border border-blue-100 bg-blue-50/20"
                                >
                                    <div className="flex items-center justify-between mb-5">
                                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                            <Database size={15} className="text-[#0a66c2]" />
                                            General Info
                                        </h4>
                                        <span className="text-[10px] font-bold text-[#0a66c2] bg-white px-2 py-0.5 rounded-lg border border-blue-100 uppercase">Verified</span>
                                    </div>
                                    <ul className="space-y-3">
                                         <ListItem label="Brand" value={car.brand?.name} />
                                         <ListItem label="Model" value={car.model} />
                                         <ListItem label="Manufacturer" value={car.make} />
                                         <ListItem label="Category" value={car.category?.name} />
                                         <ListItem label="Year" value={car.year} />
                                         <ListItem label="Rental Type" value={car.rental_type} highlight />
                                    </ul>
                                 </motion.div>

                                 {/* Pricing Details */}
                                 <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="p-5 rounded-2xl border border-slate-100 bg-white"
                                >
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                                        <Activity size={15} className="text-emerald-500" />
                                        Pricing Plan
                                    </h4>
                                    <ul className="space-y-3">
                                         <ListItem label="Daily Rate" value={`৳${Number(pricing.daily_rate || 0).toLocaleString()}`} bold />
                                         <ListItem label="Weekly Rate" value={pricing.weekly_rate ? `৳${Number(pricing.weekly_rate).toLocaleString()}` : 'N/A'} />
                                         <ListItem label="Monthly Rate" value={pricing.monthly_rate ? `৳${Number(pricing.monthly_rate).toLocaleString()}` : 'N/A'} />
                                         <ListItem label="Security Deposit" value={`৳${Number(pricing.security_deposit || 0).toLocaleString()}`} />
                                         <ListItem label="Tax Percentage" value={`${pricing.tax_percentage || 0}%`} />
                                    </ul>
                                 </motion.div>
                            
                                 {/* Description */}
                                 <motion.div 
                                     initial={{ opacity: 0 }}
                                     animate={{ opacity: 1 }}
                                     transition={{ delay: 0.2 }}
                                     className="md:col-span-2 p-5 rounded-2xl border border-slate-100 bg-slate-50/30"
                                 >
                                     <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <FileText size={15} className="text-[#0a66c2]" />
                                        Description / Information
                                     </h4>
                                     <p className="text-[14px] text-slate-600 leading-relaxed whitespace-pre-wrap pl-6 italic font-medium">
                                         "{car.description || "No description provided for this vehicle listing."}"
                                     </p>
                                 </motion.div>

                                {/* Technical Specs */}
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="p-5 rounded-2xl border border-slate-100 bg-white"
                                >
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                                        <Settings2 size={15} className="text-slate-500" />
                                        Technical Details
                                    </h4>
                                    <ul className="space-y-3">
                                         <TechnicalItem icon={Gauge} label="Transmission" value={specs.transmission} />
                                         <TechnicalItem icon={Fuel} label="Fuel Type" value={specs.fuel_type} />
                                         <TechnicalItem icon={Activity} label="Mileage" value={specs.mileage} />
                                         <TechnicalItem icon={LayoutDashboard} label="Steering" value={specs.steering} />
                                         <TechnicalItem icon={Settings2} label="Engine Capacity" value={specs.engine_capacity} />
                                         <TechnicalItem icon={ShieldCheck} label="Exterior Color" value={specs.color} />
                                    </ul>
                                </motion.div>

                                {/* Registration Info */}
                                <motion.div 
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="p-5 rounded-2xl border border-slate-100 bg-white"
                                >
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                                        <ShieldCheck size={15} className="text-[#0a66c2]" />
                                        Registration Info
                                    </h4>
                                    <ul className="space-y-3">
                                         <TechnicalItem icon={Hash} label="License Plate" value={docs.registration_number || <span className="text-red-500 font-bold">Unregistered</span>} />
                                         <TechnicalItem icon={Database} label="Chassis Number" value={docs.chassis_number} />
                                         <TechnicalItem icon={Settings2} label="Engine Number" value={docs.engine_number} />
                                         <TechnicalItem icon={Calendar} label="Tax Token Expiry" value={docs.tax_token_expiry} />
                                         <TechnicalItem icon={Shield} label="Fitness Expiry" value={docs.fitness_expiry} />
                                    </ul>
                                </motion.div>

                                {/* Features List */}
                                <div className="md:col-span-2 p-5 rounded-2xl border border-slate-100 bg-white">
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                                        <Layers size={15} className="text-[#0a66c2]" />
                                        Vehicle Features
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {car.features?.length > 0 ? (
                                            car.features.map((feature, i) => (
                                                <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-100 bg-slate-50 text-slate-700 text-[11px] font-bold uppercase transition-all hover:bg-blue-50 hover:text-[#0a66c2] hover:border-blue-100">
                                                    <Check size={12} className="text-emerald-500" strokeWidth={3} />
                                                    {feature.feature_name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-slate-400 text-[12px] italic">No specific features listed for this car.</span>
                                        )}
                                    </div>
                                </div>

                                {/* Car Gallery */}
                                <div className="md:col-span-2 p-5 rounded-2xl border border-slate-100 bg-white">
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                                        <ImageIcon size={15} className="text-[#0a66c2]" />
                                        Car Gallery
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {car.images?.length > 0 ? (
                                            car.images.map((img, i) => (
                                                <div key={i} className="group relative aspect-[4/3] bg-slate-50 rounded-xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-lg">
                                                    <img 
                                                        src={`/${img.file_path}`} 
                                                        alt={`Car view ${i+1}`}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-full py-12 flex flex-col items-center justify-center gap-3 text-slate-400 bg-slate-50 rounded-xl border-2 border-dashed border-slate-100">
                                                <ImageIcon size={32} strokeWidth={1} />
                                                <p className="text-[12px] font-bold uppercase tracking-wider">No photos available</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* FAQ Section */}
                                <div className="md:col-span-2 p-5 rounded-2xl border border-slate-100 bg-white">
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                                        <HelpCircle size={15} className="text-[#0a66c2]" />
                                        Frequently Asked Questions
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {car.faqs?.length > 0 ? (
                                            car.faqs.map((faq, i) => (
                                                <div key={i} className="bg-slate-50/50 rounded-xl p-4 border border-slate-100 hover:border-blue-100 transition-colors">
                                                    <div className="flex items-start gap-2 mb-2">
                                                        <span className="text-[#0a66c2] font-bold text-[14px]">Q.</span>
                                                        <h5 className="text-[13px] font-bold text-slate-800 leading-tight">
                                                             {faq.question}
                                                        </h5>
                                                    </div>
                                                    <p className="text-[12px] text-slate-500 font-medium pl-6 leading-relaxed italic">"{faq.answer}"</p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-full py-4 text-slate-300 text-[12px] italic font-medium px-4">No FAQ entries available for this car listing.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
                            <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <Activity size={16} className="text-[#0a66c2]" />
                                Listing Status
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="space-y-0.5">
                                        <span className="text-[14px] text-slate-800 font-bold">Current State</span>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Availability</p>
                                    </div>
                                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                        car.status === 'available' 
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                            : 'bg-slate-100 text-slate-500 border border-slate-200 shadow-sm'
                                    }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${car.status === 'available' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                                        {car.status === 'available' ? 'Available' : 'Draft'}
                                    </span>
                                </div>
                                <div className="space-y-3 px-1">
                                    <RecordRow label="System ID" value={`#CAR-${car.id.toString().padStart(4, '0')}`} />
                                    <RecordRow label="Date Added" value={new Date(car.created_at).toLocaleDateString()} />
                                    <RecordRow label="Last Updated" value={new Date(car.updated_at).toLocaleDateString()} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl shadow-xl p-6 relative overflow-hidden group">
                             <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={18} className="text-[#0a66c2]" />
                                    <span className="text-[11px] font-bold text-[#0a66c2] uppercase tracking-wider">Data Review</span>
                                </div>
                                <h4 className="text-white font-bold text-lg tracking-tight">Information Check</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[13px] text-slate-400 font-medium">
                                        <span>Total Images</span>
                                        <span className="text-white font-bold">{car.images?.length || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[13px] text-slate-400 font-medium">
                                        <span>Registration Check</span>
                                        <span className={`${docs.registration_number ? 'text-emerald-500' : 'text-amber-500'} font-bold`}>{docs.registration_number ? 'Verified' : 'Incomplete'}</span>
                                    </div>
                                </div>
                                {!docs.registration_number && (
                                     <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[11px] text-amber-500 font-semibold leading-relaxed">
                                        <ShieldAlert size={14} className="shrink-0" />
                                        <span>Missing registration number. Please update as soon as possible.</span>
                                    </div>
                                )}
                             </div>
                             <CarIcon size={120} className="absolute -right-8 -bottom-8 text-white/[0.03] rotate-12 transition-transform duration-700 group-hover:scale-110" />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

// Sub-components
const ListItem = ({ label, value, highlight, bold }) => (
    <li className="flex items-center justify-between text-[13px] py-1">
        <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px]">{label}</span>
        <span className={`font-bold tracking-tight ${highlight ? 'text-[#0a66c2] bg-blue-50 px-2 py-0.5 rounded-lg' : 'text-slate-800'} ${bold ? 'text-[15px]' : ''}`}>
            {value || <span className="text-slate-300">--</span>}
        </span>
    </li>
);

const TechnicalItem = ({ icon: Icon, label, value }) => (
    <li className="flex items-center gap-3 text-[13px] py-1 border-b border-slate-50/50 last:border-0">
        <Icon size={16} className="text-slate-300 shrink-0" strokeWidth={2} />
        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">{label}</span>
        <span className="font-bold text-slate-700 ml-auto tracking-tight truncate pl-4 max-w-[150px]" title={value}>
            {value || <span className="text-slate-200">Pending</span>}
        </span>
    </li>
);

const RecordRow = ({ label, value }) => (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0 px-1">
        <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
        <span className="text-[13px] font-bold text-slate-800">{value}</span>
    </div>
);
