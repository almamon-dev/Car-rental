import React, { useState } from "react";
import { Head, useForm, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Save,
    ChevronLeft,
    Loader2,
    LayoutDashboard,
    Settings2,
    Camera,
    ShieldCheck,
    HelpCircle,
    Check
} from "lucide-react";

// Import Partials
import BasicInfoSection from "./Partials/Edit/BasicInfoSection";
import TechSpecsSection from "./Partials/Edit/TechSpecsSection";
import FeaturesSection from "./Partials/Edit/FeaturesSection";
import FaqSection from "./Partials/Edit/FaqSection";
import PricingSection from "./Partials/Edit/PricingSection";
import DocumentsSection from "./Partials/Edit/DocumentsSection";
import GallerySection from "./Partials/Edit/GallerySection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/Tabs";

export default function CarEdit({ auth, car, categories, brands }) {
    const specs = car.specifications || {};
    const pricing = car.price_details || car.priceDetails || {};
    const docs = car.police_documents || car.policeDocuments || {};

    const { data, setData, processing, errors, clearErrors } = useForm({
        _method: "PUT",
        brand_id: car.brand_id || "",
        category_id: car.category_id || "",
        make: car.make || "",
        model: car.model || "",
        year: car.year || new Date().getFullYear(),
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
            essentials: ["brand_id", "category_id", "make", "model", "year", "rental_type", "description", "status", "daily_rate", "weekly_rate", "monthly_rate", "security_deposit", "currency", "tax_percentage"],
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
            setData(
                field,
                data[field].filter((_, i) => i !== index)
            );
        }
    };

    const handleImageRemove = (imageId) => {
        setData(
            "existing_images",
            data.existing_images.filter((img) => img.id !== imageId)
        );
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
            <Head title={`Update ${car.make} ${car.model} | Admin`} />

            {/* Main Container */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Header Section */}
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
                                Update Vehicle Listing
                            </h1>
                            <p className="text-[13px] text-gray-500 font-medium mt-0.5 tracking-widest">
                                Editing {car.make} {car.model} • Internal ID #{car.id}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={route("admin.cars.index")}
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
                            Update Listing
                        </button>
                    </div>
                </div>

                {/* Form Body */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                    {/* Left Column (Granular Tabs) */}
                    <div className="lg:col-span-8 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col">
                            <div className="px-8 pt-6 border-b border-gray-100 overflow-x-auto custom-sidebar-scrollbar bg-slate-50/30">
                                <TabsList className="w-full justify-start space-x-10 border-b-0 min-w-max">
                                    <TabsTrigger 
                                        value="essentials" 
                                        className="pb-4 text-[12px] font-black  tracking-widest flex items-center gap-2.5 transition-all border-b-2 border-transparent data-[state=active]:border-[#0a66c2] data-[state=active]:text-[#0a66c2] data-[state=active]:bg-blue-50/50 text-slate-400 hover:text-slate-600 rounded-none bg-transparent shadow-none px-6"
                                    >
                                        <LayoutDashboard size={14} />
                                        ESSENTIALS
                                    </TabsTrigger>
                                    <TabsTrigger 
                                        value="technical" 
                                        className="pb-4 text-[12px] font-black  tracking-widest flex items-center gap-2.5 transition-all border-b-2 border-transparent data-[state=active]:border-[#0a66c2] data-[state=active]:text-[#0a66c2] data-[state=active]:bg-blue-50/50 text-slate-400 hover:text-slate-600 rounded-none bg-transparent shadow-none px-6"
                                    >
                                        <Settings2 size={14} />
                                        TECHNICAL
                                    </TabsTrigger>
                                    <TabsTrigger 
                                        value="media" 
                                        className="pb-4 text-[12px] font-black  tracking-widest flex items-center gap-2.5 transition-all border-b-2 border-transparent data-[state=active]:border-[#0a66c2] data-[state=active]:text-[#0a66c2] data-[state=active]:bg-blue-50/50 text-slate-400 hover:text-slate-600 rounded-none bg-transparent shadow-none px-6"
                                    >
                                        <Camera size={14} />
                                        MEDIA
                                    </TabsTrigger>
                                    <TabsTrigger 
                                        value="admin" 
                                        className="pb-4 text-[12px] font-black  tracking-widest flex items-center gap-2.5 transition-all border-b-2 border-transparent data-[state=active]:border-[#0a66c2] data-[state=active]:text-[#0a66c2] data-[state=active]:bg-blue-50/50 text-slate-400 hover:text-slate-600 rounded-none bg-transparent shadow-none px-6"
                                    >
                                        <ShieldCheck size={14} />
                                        ADMINISTRATION
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <div className="flex-1 p-8 h-auto space-y-12">
                                <TabsContent value="essentials" className="mt-0 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div>
                                        <h3 className="text-sm font-black text-slate-800  mb-6 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                            Core Identification
                                        </h3>
                                        <BasicInfoSection
                                            data={data}
                                            errors={errors}
                                            handleInputChange={handleInputChange}
                                            brands={brands}
                                            categories={categories}
                                        />
                                    </div>
                                    
                                    <div className="border-t border-slate-100 pt-12">
                                        <div>
                                            <h3 className="text-sm font-black text-slate-800  mb-6 flex items-center gap-2">
                                                <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                                Pricing & Packages
                                            </h3>
                                            <PricingSection
                                                data={data}
                                                errors={errors}
                                                handleInputChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="technical" className="mt-0 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div>
                                        <h3 className="text-sm font-black text-slate-800  mb-6 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                            Technical Specifications
                                        </h3>
                                        <TechSpecsSection
                                            data={data}
                                            errors={errors}
                                            handleInputChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="border-t border-slate-100 pt-12">
                                        <div>
                                            <h3 className="text-sm font-black text-slate-800  mb-6 flex items-center gap-2">
                                                <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                                Vehicle Features
                                            </h3>
                                            <FeaturesSection
                                                data={data}
                                                errors={errors}
                                                handleNestedChange={handleNestedChange}
                                                removeRow={removeRow}
                                                addRow={addRow}
                                            />
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="media" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div>
                                        <h3 className="text-sm font-black text-slate-800   mb-6 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                            Photos & Assets
                                        </h3>
                                        <GallerySection
                                            data={data}
                                            errors={errors}
                                            setData={setData}
                                            clearErrors={clearErrors}
                                            existingImages={data.existing_images}
                                            onImageRemove={handleImageRemove}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="admin" className="mt-0 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div>
                                        <h3 className="text-sm font-black text-slate-800  mb-6 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                            Legal & Compliance
                                        </h3>
                                        <DocumentsSection
                                            data={data}
                                            errors={errors}
                                            handleInputChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="border-t border-slate-100 pt-12">
                                        <div>
                                            <div className="flex items-center justify-between mb-8">
                                                <h3 className="text-sm font-black text-slate-800  flex items-center gap-2">
                                                    <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                                    Customer FAQs
                                                </h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[13px] text-gray-600 font-medium">Enable FAQs</span>
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
                                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0a66c2]"></div>
                                                    </label>
                                                </div>
                                            </div>

                                            {data.has_faqs ? (
                                                 <FaqSection
                                                    data={data}
                                                    errors={errors}
                                                    handleInputChange={handleInputChange}
                                                    handleNestedChange={handleNestedChange}
                                                    removeRow={removeRow}
                                                    addRow={addRow}
                                                />
                                            ) : (
                                                <div className="py-16 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center px-10 bg-slate-50/30">
                                                    <div className="w-14 h-14 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 mb-5">
                                                        <HelpCircle size={28} />
                                                    </div>
                                                    <h4 className="text-sm font-black text-slate-800  tracking-tight mb-2">FAQs are disabled</h4>
                                                    <p className="text-[12px] text-slate-500 max-w-[280px] leading-relaxed font-medium">Toggle the switch above to enable and add frequently asked questions for your customers.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>

                    {/* Right Column (Sticky Sidebar) */}
                    <div className="lg:col-span-4 space-y-6 sticky top-8">
                         {/* Publishing Info */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                            <h3 className="text-[11px] font-bold text-gray-400  tracking-widest mb-4">Publishing</h3>
                            <div className="space-y-4">
                                <div className={`flex items-center justify-between p-3 rounded-sm border transition-all ${
                                    data.status === 'available' 
                                    ? 'bg-emerald-50 border-emerald-100' 
                                    : 'bg-slate-50 border-slate-100'
                                }`}>
                                    <span className={`text-[13px] font-bold ${
                                        data.status === 'available' ? 'text-emerald-700' : 'text-slate-600'
                                    }`}>Status</span>
                                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm transition-all ${
                                        data.status === 'available' 
                                        ? 'bg-emerald-500 text-white' 
                                        : 'bg-slate-400 text-white'
                                    }`}>
                                        <div className={`w-1.5 h-1.5 bg-white rounded-full ${data.status === 'available' ? 'animate-pulse' : ''}`} />
                                        {data.status === 'available' ? 'Active' : 'Draft'}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-[13px] text-gray-600 font-medium">Public Visibility</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={data.status === "available"}
                                            onChange={(e) => handleInputChange("status", e.target.checked ? "available" : "draft")}
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0a66c2]"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* INVENTORY ASSETS Grid Container */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                             <div className="flex justify-between items-center mb-6">
                                <h3 className="text-[13px] font-bold text-gray-900  tracking-tight">INVENTORY ASSETS</h3>
                                <span className="text-[14px] font-bold text-gray-400">
                                    {Math.round(([
                                        data.brand_id && data.category_id && data.make && data.model,
                                        data.daily_rate,
                                        data.transmission && data.fuel_type,
                                        (data.images?.length > 0 || data.existing_images?.length > 0),
                                        data.registration_number
                                    ].filter(Boolean).length / 5) * 100)}%
                                </span>
                            </div>

                            {/* Subtle Progress Bar */}
                            <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden mb-8">
                                <div 
                                    className="h-full bg-[#0a66c2] transition-all duration-700 ease-out"
                                    style={{ 
                                        width: `${([
                                            data.brand_id && data.category_id && data.make && data.model,
                                            data.daily_rate,
                                            data.transmission && data.fuel_type,
                                            (data.images?.length > 0 || data.existing_images?.length > 0),
                                            data.registration_number
                                        ].filter(Boolean).length / 5) * 100}%` 
                                    }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                {[
                                    { 
                                        label: "Essentials", 
                                        isComplete: !!(data.brand_id && data.category_id && data.make && data.model && data.daily_rate) 
                                    },
                                    { 
                                        label: "Technical", 
                                        isComplete: !!(data.transmission && data.fuel_type) 
                                    },
                                    { 
                                        label: "Media", 
                                        isComplete: (data.images?.length > 0 || data.existing_images?.length > 0) 
                                    },
                                    { 
                                        label: "Administration", 
                                        isComplete: !!(data.registration_number) 
                                    },
                                ].map((step, i) => (
                                    <div key={i} className="flex items-center gap-2.5">
                                        <div className={`flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-all bg-white
                                            ${step.isComplete ? 'border-[#0a66c2] bg-[#0a66c2]/5' : 'border-slate-200'}`}>
                                            {step.isComplete && <Check size={10} className="text-[#0a66c2]" strokeWidth={4} />}
                                        </div>
                                        <span className={`text-[11px] font-black tracking-tight transition-colors
                                            ${step.isComplete ? 'text-slate-900' : 'text-slate-400'}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
