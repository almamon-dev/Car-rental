import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Save,
    HelpCircle,
    ChevronLeft,
    LayoutDashboard,
    Loader2,
    Check,
    Settings2,
    Camera,
    ShieldCheck
} from "lucide-react";

// Import Partials
import BasicInfoSection from "./Partials/Create/BasicInfoSection";
import TechSpecsSection from "./Partials/Create/TechSpecsSection";
import FeaturesSection from "./Partials/Create/FeaturesSection";
import FaqSection from "./Partials/Create/FaqSection";
import PricingSection from "./Partials/Create/PricingSection";
import DocumentsSection from "./Partials/Create/DocumentsSection";
import GallerySection from "./Partials/Create/GallerySection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/Tabs";

export default function CarCreate({ auth, categories, brands }) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        brand_id: "",
        category_id: "",
        make: "",
        model: "",
        year: new Date().getFullYear(),
        rental_type: "daily",
        description: "",
        status: "available",
        transmission: "",
        mileage: "",
        fuel_type: "",
        steering: "",
        model_year: "",
        vehicle_type: "",
        engine_capacity: "",
        color: "",
        daily_rate: "",
        weekly_rate: "",
        monthly_rate: "",
        security_deposit: 0,
        currency: "USD",
        tax_percentage: 0,
        registration_number: "",
        chassis_number: "",
        engine_number: "",
        tax_token_expiry: "",
        fitness_expiry: "",
        features: [{ feature_name: "" }],
        faqs: [{ question: "", answer: "" }],
        has_faqs: false,
        images: [],
    });

    const [activeTab, setActiveTab] = useState("essentials");

    const findTabForField = (field) => {
        const mapping = {
            essentials: ["brand_id", "category_id", "make", "model", "year", "rental_type", "description", "daily_rate", "weekly_rate", "monthly_rate", "security_deposit", "currency", "tax_percentage"],
            technical: ["transmission", "mileage", "fuel_type", "steering", "model_year", "vehicle_type", "engine_capacity", "color", "features"],
            media: ["images"],
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

    const addRow = (field, obj) => {
        const currentItems = data[field] || [];
        setData(field, [...currentItems, obj]);
    };

    const removeRow = (field, index) => {
        const currentItems = data[field] || [];
        if (currentItems.length > 1) {
            setData(
                field,
                currentItems.filter((_, i) => i !== index)
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.cars.store"), {
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
            <Head title="Create Vehicle Listing | Admin" />

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
                                Create Vehicle Listing
                            </h1>
                            <p className="text-[13px] text-gray-500 font-medium mt-0.5 tracking-widest">
                                Inventory Management
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
                            {data.status === "available" ? "Publish" : "Save Draft"}
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column (Tabs Content) */}
                    <div className="lg:col-span-8 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col">
                            {/* Tabs Header with fixed Active state */}
                            <div className="px-8 border-b border-gray-100 overflow-x-auto no-scrollbar bg-white">
                                <TabsList className="w-full justify-start space-x-0 border-b-0 min-w-max bg-transparent h-auto p-0 flex items-center">
                                    {[
                                        { id: "essentials", label: "Essentials" },
                                        { id: "technical", label: "Technical" },
                                        { id: "media", label: "Media" },
                                        { id: "admin", label: "Administration" }
                                    ].map((tab) => {
                                        // Calculate completion counts
                                        const mapping = {
                                            essentials: ["brand_id", "category_id", "make", "model", "year", "daily_rate"],
                                            technical: ["transmission", "mileage", "fuel_type", "steering", "color"],
                                            media: ["images"],
                                            admin: ["registration_number", "chassis_number", "engine_number"]
                                        };
                                        const fields = mapping[tab.id];
                                        const filled = fields.filter(f => 
                                            Array.isArray(data[f]) ? data[f].length > 0 : !!data[f]
                                        ).length;
                                        const total = fields.length;

                                        return (
                                            <TabsTrigger 
                                                key={tab.id}
                                                value={tab.id} 
                                                className="relative group flex items-center gap-1.5 px-6 py-4.5 focus:outline-none whitespace-nowrap transition-all duration-200 border-none bg-transparent shadow-none data-[state=active]:bg-transparent rounded-none"
                                            >
                                                <div className="flex items-center gap-1.5 transition-colors duration-200">
                                                    <span className={`text-[14px] font-semibold tracking-tight ${
                                                        activeTab === tab.id ? "text-[#0a66c2]" : "text-[#5e6670] group-hover:text-gray-900"
                                                    }`}>
                                                        {tab.label}
                                                    </span>
                                                    <span className={`text-[13px] font-medium ${
                                                        activeTab === tab.id ? "text-[#0a66c2]/80" : "text-[#8e97a2]"
                                                    }`}>
                                                        ({filled}/{total})
                                                    </span>
                                                </div>
                                                {activeTab === tab.id && (
                                                    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0a66c2] rounded-t-sm" />
                                                )}
                                            </TabsTrigger>
                                        );
                                    })}
                                </TabsList>
                            </div>

                            <div className="flex-1 p-8 h-auto space-y-12">
                                <TabsContent value="essentials" className="mt-0 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div>
                                        <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
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
                                        <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                            Pricing & Packages
                                        </h3>
                                        <PricingSection
                                            data={data}
                                            errors={errors}
                                            handleInputChange={handleInputChange}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="technical" className="mt-0 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div>
                                        <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
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
                                        <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
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
                                </TabsContent>

                                <TabsContent value="media" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
                                        <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                                        Photos & Assets
                                    </h3>
                                    <GallerySection
                                        data={data}
                                        errors={errors}
                                        setData={setData}
                                        clearErrors={clearErrors}
                                    />
                                </TabsContent>

                                <TabsContent value="admin" className="mt-0 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div>
                                        <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
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
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
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
                                                <h4 className="text-sm font-black text-slate-800 tracking-tight mb-2">FAQs are disabled</h4>
                                                <p className="text-[12px] text-slate-500 max-w-[280px] leading-relaxed font-medium">Toggle the switch above to enable frequently asked questions.</p>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>

                    {/* Right Column (Sticky Sidebar) */}
                    <div className="lg:col-span-4 space-y-6 sticky top-8">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                            <h3 className="text-[11px] font-bold text-gray-400 tracking-widest mb-4">Publishing</h3>
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

                        {/* Inventory Assets Progress */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                             <div className="flex justify-between items-center mb-6">
                                <h3 className="text-[13px] font-bold text-gray-900 tracking-tight">INVENTORY ASSETS</h3>
                                <span className="text-[14px] font-bold text-gray-400">
                                    {Math.round(([
                                        data.brand_id && data.category_id && data.make && data.model,
                                        data.daily_rate,
                                        data.transmission && data.fuel_type,
                                        data.images?.length > 0,
                                        data.registration_number
                                    ].filter(Boolean).length / 5) * 100)}%
                                </span>
                            </div>
                            <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden mb-8">
                                <div 
                                    className="h-full bg-[#0a66c2] transition-all duration-700 ease-out"
                                    style={{ 
                                        width: `${([
                                            data.brand_id && data.category_id && data.make && data.model,
                                            data.daily_rate,
                                            data.transmission && data.fuel_type,
                                            data.images?.length > 0,
                                            data.registration_number
                                        ].filter(Boolean).length / 5) * 100}%` 
                                    }}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                {[
                                    { label: "Essentials", isComplete: !!(data.brand_id && data.category_id && data.make && data.model && data.daily_rate) },
                                    { label: "Technical", isComplete: !!(data.transmission && data.fuel_type) },
                                    { label: "Media", isComplete: (data.images?.length > 0) },
                                    { label: "Administration", isComplete: !!(data.registration_number) },
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
