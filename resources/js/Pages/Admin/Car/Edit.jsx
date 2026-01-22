import React, { useState } from "react";
import { Head, useForm, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Save,
    ChevronLeft,
    Loader2,
} from "lucide-react";

// Import Partials
import BasicInfoSection from "./Partials/Edit/BasicInfoSection";
import TechSpecsSection from "./Partials/Edit/TechSpecsSection";
import FeaturesSection from "./Partials/Edit/FeaturesSection";
import FaqSection from "./Partials/Edit/FaqSection";
import PricingSection from "./Partials/Edit/PricingSection";
import DocumentsSection from "./Partials/Edit/DocumentsSection";
import GallerySection from "./Partials/Edit/GallerySection";
import CollapsibleCard from "./Partials/Edit/CollapsibleCard";

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

    const [openSections, setOpenSections] = useState({
        basic: true,
        specs: true,
        pricing: true,
        features: true,
        documents: true,
        faqs: true,
        images: true,
    });

    const toggleSection = (section) =>
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

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
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Update ${car.make} ${car.model} | Admin`} />

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
                                Update Vehicle Parameters
                            </h1>
                            <p className="text-[13px] text-gray-500 font-medium mt-0.5">
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
                    className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                    {/* Left Column (8 Cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        <CollapsibleCard
                            title="Basic Information"
                            isOpen={openSections.basic}
                            onToggle={() => toggleSection("basic")}
                        >
                            <BasicInfoSection
                                data={data}
                                errors={errors}
                                handleInputChange={handleInputChange}
                                brands={brands}
                                categories={categories}
                            />
                        </CollapsibleCard>

                        <CollapsibleCard
                            title="Technical Specifications"
                            isOpen={openSections.specs}
                            onToggle={() => toggleSection("specs")}
                        >
                            <TechSpecsSection
                                data={data}
                                errors={errors}
                                handleInputChange={handleInputChange}
                            />
                        </CollapsibleCard>

                        <CollapsibleCard
                            title="Fleet Media & Gallery"
                            isOpen={openSections.images}
                            onToggle={() => toggleSection("images")}
                        >
                            <GallerySection
                                data={data}
                                errors={errors}
                                setData={setData}
                                clearErrors={clearErrors}
                                existingImages={data.existing_images}
                                onImageRemove={handleImageRemove}
                            />
                        </CollapsibleCard>

                        <CollapsibleCard
                            title="Vehicle Features"
                            isOpen={openSections.features}
                            onToggle={() => toggleSection("features")}
                        >
                            <FeaturesSection
                                data={data}
                                errors={errors}
                                handleNestedChange={handleNestedChange}
                                removeRow={removeRow}
                                addRow={addRow}
                            />
                        </CollapsibleCard>

                        <CollapsibleCard
                            title="Frequently Asked Questions"
                            isOpen={openSections.faqs}
                            onToggle={() => toggleSection("faqs")}
                        >
                            <FaqSection
                                data={data}
                                errors={errors}
                                handleInputChange={handleInputChange}
                                handleNestedChange={handleNestedChange}
                                removeRow={removeRow}
                                addRow={addRow}
                            />
                        </CollapsibleCard>
                    </div>

                    {/* Right Column (4 Cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Completion Checklist */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/30">
                                <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">Data Integrity Check</h3>
                            </div>
                            <div className="p-6 space-y-5">
                                {[
                                    { 
                                        label: "Basic Information", 
                                        isComplete: !!(data.brand_id && data.category_id && data.make && data.model) 
                                    },
                                    { 
                                        label: "Technical Specs", 
                                        isComplete: !!(data.transmission && data.fuel_type && data.mileage) 
                                    },
                                    { 
                                        label: "Listing Media", 
                                        isComplete: (data.images && data.images.length > 0) || (data.existing_images && data.existing_images.length > 0)
                                    },
                                    { 
                                        label: "Pricing Details", 
                                        isComplete: !!(data.daily_rate && data.security_deposit !== undefined) 
                                    },
                                    { 
                                        label: "Legal Documents", 
                                        isComplete: !!(data.registration_number && data.chassis_number) 
                                    },
                                ].map((step, idx) => (
                                    <div key={idx} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                                                step.isComplete 
                                                    ? "bg-[#0a66c2] text-white" 
                                                    : "bg-gray-100 border border-gray-200 text-transparent group-hover:border-gray-300"
                                            }`}>
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className={`text-[13px] font-medium transition-colors ${
                                                step.isComplete ? "text-gray-900" : "text-gray-500"
                                            }`}>
                                                {step.label}
                                            </span>
                                        </div>
                                        {step.isComplete && (
                                            <span className="text-[11px] font-bold text-[#0a66c2] uppercase tracking-wider">Verified</span>
                                        )}
                                    </div>
                                ))}

                                <div className="pt-4 border-t border-gray-100">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Listing Quality</span>
                                        <span className="text-[13px] font-bold text-[#0a66c2]">
                                            {Math.round(([
                                                data.brand_id && data.category_id && data.make && data.model,
                                                data.transmission && data.fuel_type && data.mileage,
                                                (data.images && data.images.length > 0) || (data.existing_images && data.existing_images.length > 0),
                                                data.daily_rate && data.security_deposit !== undefined,
                                                data.registration_number && data.chassis_number
                                            ].filter(Boolean).length / 5) * 100)}%
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-[#0a66c2] transition-all duration-700 ease-out"
                                            style={{ 
                                                width: `${([
                                                    data.brand_id && data.category_id && data.make && data.model,
                                                    data.transmission && data.fuel_type && data.mileage,
                                                    (data.images && data.images.length > 0) || (data.existing_images && data.existing_images.length > 0),
                                                    data.daily_rate && data.security_deposit !== undefined,
                                                    data.registration_number && data.chassis_number
                                                ].filter(Boolean).length / 5) * 100}%` 
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50/50 border border-gray-200 rounded-lg p-6">
                            <h3 className="text-[15px] font-semibold text-gray-900 mb-4">Listing Settings</h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[13px] font-semibold text-gray-800">Marketplace Visibility</p>
                                        <p className="text-[11px] text-gray-500">Enable listing for end-users</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={data.status === "available"}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "status",
                                                    e.target.checked ? "available" : "draft"
                                                )
                                            }
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0a66c2]"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                    <div>
                                        <p className="text-[13px] font-semibold text-gray-800">Customer FAQs</p>
                                        <p className="text-[11px] text-gray-500">Enable assistance section</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={!!data.has_faqs}
                                            onChange={(e) => {
                                                const isChecked = e.currentTarget.checked;
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
                        </div>

                        <CollapsibleCard
                            title="Pricing Strategy"
                            isOpen={openSections.pricing}
                            onToggle={() => toggleSection("pricing")}
                        >
                            <PricingSection
                                data={data}
                                errors={errors}
                                handleInputChange={handleInputChange}
                            />
                        </CollapsibleCard>

                        <CollapsibleCard
                            title="Legal & Compliance"
                            isOpen={openSections.documents}
                            onToggle={() => toggleSection("documents")}
                        >
                            <DocumentsSection
                                data={data}
                                errors={errors}
                                handleInputChange={handleInputChange}
                            />
                        </CollapsibleCard>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
