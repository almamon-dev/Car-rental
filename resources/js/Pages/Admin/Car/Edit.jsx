/**
 * Admin - Edit Car
 * 
 * Interface for modifying existing vehicles in the fleet.
 * Manages specs, pricing, features, and media assets.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React, { useState } from "react";
import { Head, useForm, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Save,
    ChevronLeft,
    Loader2,
    Check,
    ShieldCheck,
    Database,
    Activity,
    Image as ImageIcon,
    FileText,
    Settings2,
    XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Partials
import BasicInfoSection from "./Partials/Create/BasicInfoSection";
import TechSpecsSection from "./Partials/Create/TechSpecsSection";
import FeaturesSection from "./Partials/Create/FeaturesSection";
import FaqSection from "./Partials/Create/FaqSection";
import PricingSection from "./Partials/Create/PricingSection";
import DocumentsSection from "./Partials/Create/DocumentsSection";
import GallerySection from "./Partials/Edit/GallerySection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/Tabs";

/**
 * CarEdit Component
 */
export default function CarEdit({ auth, car, categories, brands, locations }) {
    // --- Data Parsing ---
    const specs = car.specifications || {};
    const pricing = car.price_details || car.priceDetails || {};
    const docs = car.police_documents || car.policeDocuments || {};

    const { data, setData, processing, errors, clearErrors } = useForm({
        _method: "PUT",
        brand_id: car.brand_id || "",
        category_id: car.category_id || "",
        location_id: car.location_id || "",
        make: car.make || "",
        model: car.model || "",
        year: car.year || new Date().getFullYear(),
        seats: car.seats || "",
        rental_type: car.rental_type || "daily",
        description: car.description || "",
        status: car.status || "available",
        transmission: specs.transmission || "",
        mileage: specs.mileage || "",
        fuel_type: specs.fuel_type || "",
        steering: specs.steering || "",
        model_year: specs.model_year || "",
        vehicle_type: specs.vehicle_type || "",
        engine_capacity: specs.engine_capacity || "",
        color: specs.color || "",
        daily_rate: pricing.daily_rate ?? "",
        weekly_rate: pricing.weekly_rate ?? "",
        monthly_rate: pricing.monthly_rate ?? "",
        security_deposit: pricing.security_deposit ?? 0,
        currency: pricing.currency || "USD",
        tax_percentage: pricing.tax_percentage ?? 0,
        registration_number: docs.registration_number || "",
        chassis_number: docs.chassis_number || "",
        engine_number: docs.engine_number || "",
        tax_token_expiry: docs.tax_token_expiry || "",
        fitness_expiry: docs.fitness_expiry || "",
        features: car.features?.length > 0 ? car.features : [{ feature_name: "" }],
        faqs: car.faqs?.length > 0 ? car.faqs : [{ question: "", answer: "" }],
        has_faqs: !!car.has_faqs,
        images: [],
        existing_images: car.images || [],
    });

    const [activeTab, setActiveTab] = useState("essentials");

    const findTabForField = (field) => {
        const mapping = {
            essentials: ["brand_id", "category_id", "location_id", "make", "model", "year", "seats", "rental_type", "description", "status", "daily_rate", "weekly_rate", "monthly_rate", "security_deposit", "currency", "tax_percentage"],
            technical: ["transmission", "mileage", "fuel_type", "steering", "model_year", "vehicle_type", "engine_capacity", "color", "features"],
            media: ["images", "existing_images"],
            admin: ["registration_number", "chassis_number", "engine_number", "tax_token_expiry", "fitness_expiry", "faqs", "has_faqs"]
        };

        for (const [tab, fields] of Object.entries(mapping)) {
            if (fields.some(f => field === f || field.startsWith(`${f}.`))) {
                return tab;
            }
        }
        return "essentials";
    };

    const handleInputChange = (field, value) => {
        setData(field, value);
        if (errors[field]) clearErrors(field);
    };

    const handleNestedChange = (field, index, subField, value) => {
        const updated = [...data[field]];
        updated[index] = { ...updated[index], [subField]: value };
        setData(field, updated);
        const errorKey = `${field}.${index}.${subField}`;
        if (errors[errorKey]) clearErrors(errorKey);
    };

    const addRow = (field, obj) => setData(field, [...data[field], obj]);

    const removeRow = (field, index) => {
        if (data[field].length > 1) {
            setData(field, data[field].filter((_, i) => i !== index));
        }
    };

    const handleImageRemove = (imageId) => {
        setData("existing_images", data.existing_images.filter((img) => img.id !== imageId));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("admin.cars.update", car.id), {
            ...data,
            forceFormData: true,
            preserveScroll: true,
            onError: (errors) => {
                const firstErrorKey = Object.keys(errors)[0];
                if (firstErrorKey) {
                    const errorTab = findTabForField(firstErrorKey);
                    setActiveTab(errorTab);
                    
                    setTimeout(() => {
                        const errorElement = document.querySelector(`[name="${firstErrorKey}"], #error-${firstErrorKey}`);
                        if (errorElement) {
                            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 100);
                }
            }
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Edit ${car.make} ${car.model} | Admin Panel`} />

            <div className="max-w-full mx-auto space-y-6 text-[#191919]">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
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
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Edit Vehicle</span>
                                </div>
                                <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                                    Update Vehicle Details
                                </h1>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <Link
                                href={route("admin.cars.index")}
                                className="px-5 py-2 text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-all rounded-xl hover:bg-slate-50"
                            >
                                Discard Changes
                            </Link>
                            <button
                                onClick={handleSubmit}
                                disabled={processing}
                                className="px-6 h-10 text-[12px] font-bold text-white bg-[#0a66c2] hover:bg-[#084d92] rounded-xl transition-all shadow-md shadow-[#0a66c2]/10 flex items-center gap-2 active:scale-95 disabled:opacity-50"
                            >
                                {processing ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <Save size={16} strokeWidth={2} />
                                )}
                                Update Car
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- FORM --- */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[600px]">
                         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            {/* Navigation Tabs */}
                            <div className="px-4 border-b border-slate-50 bg-slate-50/30 sticky top-0 z-10 backdrop-blur-md">
                                <TabsList className="w-full justify-start gap-8 bg-transparent h-auto p-0 rounded-none border-none">
                                    {[
                                        { id: "essentials", label: "Basic Info", icon: <Database size={14} /> },
                                        { id: "technical", label: "Technical Specs", icon: <Settings2 size={14} /> },
                                        { id: "media", label: "Gallery", icon: <ImageIcon size={14} /> },
                                        { id: "admin", label: "Registration", icon: <ShieldCheck size={14} /> }
                                    ].map((tab) => {
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <TabsTrigger 
                                                key={tab.id}
                                                value={tab.id} 
                                                className={`
                                                    relative pb-4 pt-5 text-[13px] font-bold bg-transparent shadow-none border-none rounded-none transition-all uppercase tracking-wider gap-2
                                                    ${isActive ? "text-[#0a66c2] data-[state=active]:text-[#0a66c2]" : "text-slate-400 hover:text-slate-600"}
                                                `}
                                            >
                                                {tab.icon}
                                                {tab.label}
                                                {isActive && (
                                                    <motion.span 
                                                        layoutId="activeTabUnderline"
                                                        className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0a66c2] rounded-t-full shadow-[0_-4px_10px_rgba(10,102,194,0.1)]" 
                                                    />
                                                )}
                                            </TabsTrigger>
                                        );
                                    })}
                                </TabsList>
                            </div>

                            <motion.div 
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="p-8"
                            >
                                <TabsContent value="essentials" className="mt-0 focus:outline-none space-y-10">
                                    <BasicInfoSection
                                        data={data}
                                        errors={errors}
                                        handleInputChange={handleInputChange}
                                        brands={brands}
                                        categories={categories}
                                        locations={locations}
                                    />
                                    <div className="pt-10 border-t border-slate-100">
                                        <div className="flex items-center gap-2 mb-6">
                                            <Activity size={18} className="text-[#0a66c2]" />
                                            <h3 className="text-[14px] font-bold text-slate-800 uppercase tracking-wider">Pricing Details</h3>
                                        </div>
                                        <PricingSection
                                            data={data}
                                            errors={errors}
                                            handleInputChange={handleInputChange}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="technical" className="mt-0 focus:outline-none space-y-10">
                                    <TechSpecsSection
                                        data={data}
                                        errors={errors}
                                        handleInputChange={handleInputChange}
                                    />
                                    <div className="pt-10 border-t border-slate-100">
                                        <div className="flex items-center gap-2 mb-6">
                                            <Settings2 size={18} className="text-[#0a66c2]" />
                                            <h3 className="text-[14px] font-bold text-slate-800 uppercase tracking-wider">Features & Equipment</h3>
                                        </div>
                                        <FeaturesSection
                                            data={data}
                                            errors={errors}
                                            handleNestedChange={handleNestedChange}
                                            removeRow={removeRow}
                                            addRow={addRow}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="media" className="mt-0 focus:outline-none">
                                    <GallerySection
                                        data={data}
                                        errors={errors}
                                        setData={setData}
                                        clearErrors={clearErrors}
                                        existingImages={data.existing_images}
                                        onImageRemove={handleImageRemove}
                                    />
                                </TabsContent>

                                <TabsContent value="admin" className="mt-0 focus:outline-none space-y-10">
                                    <DocumentsSection
                                        data={data}
                                        errors={errors}
                                        handleInputChange={handleInputChange}
                                    />
                                    <div className="pt-10 border-t border-slate-100">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-2">
                                                <FileText size={18} className="text-[#0a66c2]" />
                                                <h3 className="text-[14px] font-bold text-slate-800 uppercase tracking-wider">Common Questions (FAQ)</h3>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={!!data.has_faqs}
                                                    onChange={(e) => {
                                                        const isChecked = e.target.checked;
                                                        handleInputChange("has_faqs", isChecked);
                                                        if (isChecked && (!data.faqs || data.faqs.length === 0)) {
                                                            addRow("faqs", { question: "", answer: "" });
                                                        }
                                                    }}
                                                />
                                                <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0a66c2]" />
                                            </label>
                                        </div>
                                        {data.has_faqs && (
                                            <FaqSection
                                                data={data}
                                                errors={errors}
                                                handleInputChange={handleInputChange}
                                                handleNestedChange={handleNestedChange}
                                                removeRow={removeRow}
                                                addRow={addRow}
                                            />
                                        )}
                                    </div>
                                </TabsContent>
                            </motion.div>
                         </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6 sticky top-24">
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
                            <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <ShieldCheck size={16} className="text-[#0a66c2]" />
                                Car Status
                            </h3>
                            
                            <div className="space-y-4">
                                 <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                    <div className="space-y-0.5">
                                        <span className="text-[13px] text-slate-800 font-bold">Publish Online</span>
                                        <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Active Status</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={data.status === "available"}
                                            onChange={(e) => handleInputChange("status", e.target.checked ? "available" : "draft")}
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm peer-checked:bg-emerald-500 peer-checked:after:border-transparent" />
                                    </label>
                                </div>
                                <div className="px-1 space-y-2">
                                    <div className="flex items-center gap-2 text-[12px] text-slate-500 font-semibold leading-relaxed">
                                        {data.status === 'available' ? (
                                            <Check size={14} className="text-emerald-500 shrink-0" />
                                        ) : (
                                            <XCircle size={14} className="text-amber-500 shrink-0" />
                                        )}
                                        {data.status === 'available' 
                                            ? "This car is public and can be rented." 
                                            : "This car is hidden from customers."}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Completion Progress */}
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Entry Progress</h3>
                                <span className="text-[14px] font-bold text-[#0a66c2]">
                                     {Math.round(([
                                        data.brand_id && data.category_id && data.make && data.model,
                                        data.daily_rate,
                                        data.transmission && data.fuel_type,
                                        (data.images?.length > 0 || data.existing_images?.length > 0)
                                    ].filter(Boolean).length / 4) * 100)}%
                                </span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ 
                                        width: `${([
                                            data.brand_id && data.category_id && data.make && data.model,
                                            data.daily_rate,
                                            data.transmission && data.fuel_type,
                                            (data.images?.length > 0 || data.existing_images?.length > 0)
                                        ].filter(Boolean).length / 4) * 100}%` 
                                    }}
                                    className="h-full bg-[#0a66c2] shadow-[0_0_10px_rgba(10,102,194,0.1)]"
                                />
                            </div>
                            <ul className="space-y-4">
                                {[
                                    { label: "Basic Details", complete: !!(data.brand_id && data.make) },
                                    { label: "Pricing", complete: !!data.daily_rate },
                                    { label: "Technical Specs", complete: !!data.transmission },
                                    { label: "Images", complete: (data.images?.length > 0 || data.existing_images?.length > 0) }
                                ].map((step, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[13px]">
                                        {step.complete ? (
                                            <div className="w-5 h-5 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                                                <Check size={12} strokeWidth={3} />
                                            </div>
                                        ) : (
                                            <div className="w-5 h-5 rounded-lg border border-slate-200 bg-slate-50" />
                                        )}
                                        <span className={step.complete ? "text-slate-800 font-bold" : "text-slate-400 font-semibold"}>
                                            {step.label}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                         <div className="pt-4 text-center">
                             <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider border-t border-slate-100 pt-4 block">Admin Panel © 2026</span>
                         </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
