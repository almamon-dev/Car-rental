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

export default function CarCreate({ auth, categories, brands, locations }) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        brand_id: "",
        category_id: "",
        location_id: "",
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
            essentials: ["brand_id", "category_id", "location_id", "make", "model", "year", "rental_type", "description", "daily_rate", "weekly_rate", "monthly_rate", "security_deposit", "currency", "tax_percentage"],
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
                                        Create vehicle listing
                                    </h1>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <Link
                                    href={route("admin.cars.index")}
                                    className="px-4 py-1.5 text-[14px] font-semibold text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                                >
                                    Discard
                                </Link>
                                <button
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    className="px-5 py-1.5 text-[14px] font-semibold text-white bg-[#0a66c2] hover:bg-[#004182] rounded-full transition-all shadow-sm flex items-center gap-2"
                                >
                                    {processing ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : (
                                        <Save size={16} strokeWidth={2.5} />
                                    )}
                                    Save listing
                                </button>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Column (Main Content) */}
                        <div className="lg:col-span-8 bg-white rounded-lg border border-[#e0e0e0] shadow-sm overflow-hidden">
                             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                {/* Clean Tabs Header */}
                                <div className="px-2 flex items-center justify-between bg-white pt-2 sticky top-0 z-10">
                                    <TabsList className="w-full justify-start space-x-6 bg-transparent h-auto p-0 rounded-none">
                                        {[
                                            { id: "essentials", label: "Basics" },
                                            { id: "technical", label: "Specs" },
                                            { id: "media", label: "Media" },
                                            { id: "admin", label: "Identification" }
                                        ].map((tab) => {
                                            const isActive = activeTab === tab.id;
                                            return (
                                                <TabsTrigger 
                                                    key={tab.id}
                                                    value={tab.id} 
                                                    className={`
                                                        relative pb-3 pt-2 text-[14px] font-semibold bg-transparent shadow-none border-none rounded-none transition-colors
                                                        ${isActive ? "text-[#0a66c2] data-[state=active]:text-[#0a66c2]" : "text-[#666666] hover:text-[#191919]"}
                                                    `}
                                                >
                                                    {tab.label}
                                                    {isActive && (
                                                        <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0a66c2] rounded-t-sm" />
                                                    )}
                                                </TabsTrigger>
                                            );
                                        })}
                                    </TabsList>
                                </div>

                                <div className="p-6">
                                    <TabsContent value="essentials" className="mt-0 focus:outline-none space-y-8">
                                        <BasicInfoSection
                                            data={data}
                                            errors={errors}
                                            handleInputChange={handleInputChange}
                                            brands={brands}
                                            categories={categories}
                                            locations={locations}
                                        />
                                        <div className="pt-8 border-t border-gray-100">
                                            <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Pricing & Packages</h3>
                                            <PricingSection
                                                data={data}
                                                errors={errors}
                                                handleInputChange={handleInputChange}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="technical" className="mt-0 focus:outline-none space-y-8">
                                        <TechSpecsSection
                                            data={data}
                                            errors={errors}
                                            handleInputChange={handleInputChange}
                                        />
                                        <div className="pt-8 border-t border-gray-100">
                                            <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Features</h3>
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
                                        />
                                    </TabsContent>

                                    <TabsContent value="admin" className="mt-0 focus:outline-none space-y-8">
                                        <DocumentsSection
                                            data={data}
                                            errors={errors}
                                            handleInputChange={handleInputChange}
                                        />
                                        <div className="pt-8 border-t border-gray-100">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-[14px] font-semibold text-gray-900">FAQ Section</h3>
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
                                </div>
                            </Tabs>
                        </div>

                        <div className="lg:col-span-4 space-y-4">
                            <div className="bg-white border border-[#e0e0e0] rounded-lg shadow-sm p-5">
                                <h3 className="text-[14px] font-semibold text-[#191919] mb-4">Listing Status</h3>
                                
                                <div className="space-y-4">
                                     <div className="flex items-center justify-between">
                                        <span className="text-[14px] text-[#666666] font-medium">Availability</span>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[13px] font-semibold ${data.status === 'available' ? 'text-[#057642]' : 'text-[#666666]'}`}>
                                                {data.status === 'available' ? 'Live' : 'Draft'}
                                            </span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={data.status === "available"}
                                                    onChange={(e) => handleInputChange("status", e.target.checked ? "available" : "draft")}
                                                />
                                                <div className="w-[34px] h-[20px] bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[16px] after:w-[16px] after:transition-all after:shadow-sm peer-checked:bg-[#057642] peer-checked:after:border-transparent"></div>
                                            </label>
                                        </div>
                                    </div>
                                    <p className="text-[12px] text-[#666666] leading-snug">
                                        Draft listings are hidden. Make it live to let users see and book this vehicle.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white border border-[#e0e0e0] rounded-lg shadow-sm p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-[14px] font-semibold text-[#191919]">Completion</h3>
                                    <span className="text-[13px] font-bold text-[#666666]">
                                         {Math.round(([
                                            data.brand_id && data.category_id && data.make && data.model,
                                            data.daily_rate,
                                            data.transmission && data.fuel_type,
                                            data.images?.length > 0
                                        ].filter(Boolean).length / 4) * 100)}%
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-[#f3f2ef] rounded-full overflow-hidden mb-4">
                                    <div 
                                        className="h-full bg-[#0a66c2] transition-all duration-500"
                                        style={{ 
                                            width: `${([
                                                data.brand_id && data.category_id && data.make && data.model,
                                                data.daily_rate,
                                                data.transmission && data.fuel_type,
                                                data.images?.length > 0
                                            ].filter(Boolean).length / 4) * 100}%` 
                                        }}
                                    />
                                </div>
                                <ul className="space-y-2.5">
                                    {[
                                        { label: "Basic details", complete: !!(data.brand_id && data.make) },
                                        { label: "Pricing set", complete: !!data.daily_rate },
                                        { label: "Specs added", complete: !!data.transmission },
                                        { label: "Photos uploaded", complete: data.images?.length > 0 }
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[13px]">
                                            {step.complete ? (
                                                <div className="w-4 h-4 rounded-full bg-[#057642] flex items-center justify-center text-white">
                                                    <Check size={10} strokeWidth={4} />
                                                </div>
                                            ) : (
                                                <div className="w-4 h-4 rounded-full border border-gray-300" />
                                            )}
                                            <span className={step.complete ? "text-[#191919] font-medium" : "text-[#666666]"}>
                                                {step.label}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
        </AdminLayout>
    );
}
