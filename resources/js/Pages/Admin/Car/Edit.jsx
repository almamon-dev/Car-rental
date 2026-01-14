import React, { useState } from "react";
import { Head, useForm, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    XCircle,
    ChevronLeft,
    LayoutDashboard,
    Loader2,
    Edit,
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
    // Helper constants for relationship data
    const specs = car.specifications || {};
    const pricing = car.price_details || car.priceDetails || {};
    const docs = car.police_documents || car.policeDocuments || {};

    const { data, setData, processing, errors, clearErrors } = useForm({
        // Method Spoofing for Laravel Multipart Form
        _method: "PUT",

        // Basic Info
        brand_id: car.brand_id || "",
        category_id: car.category_id || "",
        make: car.make || "",
        model: car.model || "",
        year: car.year || new Date().getFullYear(),
        rental_type: car.rental_type || "daily",
        description: car.description || "",
        status: car.status || "available",

        // Technical Specs
        transmission: specs.transmission || "",
        mileage: specs.mileage || "",
        fuel_type: specs.fuel_type || "",
        steering: specs.steering || "",
        model_year: specs.model_year || "",
        vehicle_type: specs.vehicle_type || "",
        engine_capacity: specs.engine_capacity || "",
        color: specs.color || "",

        // Pricing - Mapping from the priceDetails relationship
        daily_rate: pricing.daily_rate ?? "",
        weekly_rate: pricing.weekly_rate ?? "",
        monthly_rate: pricing.monthly_rate ?? "",
        security_deposit: pricing.security_deposit ?? 0,
        currency: pricing.currency || "USD",
        tax_percentage: pricing.tax_percentage ?? 0,

        // Documents
        registration_number: docs.registration_number || "",
        chassis_number: docs.chassis_number || "",
        engine_number: docs.engine_number || "",
        tax_token_expiry: docs.tax_token_expiry || "",
        fitness_expiry: docs.fitness_expiry || "",

        // Features & FAQs
        features:
            car.features?.length > 0 ? car.features : [{ feature_name: "" }],
        faqs: car.faqs?.length > 0 ? car.faqs : [{ question: "", answer: "" }],
        has_faqs: !!car.has_faqs,

        // Images
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
        // Since we are using _method: "PUT", we send as a POST for FormData support
        router.post(route("admin.cars.update", car.id), {
            ...data,
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Edit ${car.make} ${car.model}`} />

            <div className="bg-[#FDFDFD] min-h-screen pb-20">
                {/* Header Section */}
                <div className="bg-white border-b border-gray-100 px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">
                                <LayoutDashboard size={12} />
                                <span>Inventory Management</span>
                            </div>
                            <h1 className="text-xl font-black text-slate-900">
                                Edit Vehicle Listing
                            </h1>
                            <p className="text-sm text-slate-500">
                                {car.make} {car.model} • ID: {car.id}
                            </p>
                        </div>
                        <Link
                            href={route("admin.cars.index")}
                            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900"
                        >
                            <ChevronLeft size={16} /> BACK
                        </Link>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-8 py-10"
                >
                    {/* Left Column */}
                    <div className="lg:col-span-8 space-y-6">
                        <CollapsibleCard
                            title="Primary Details"
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
                            title="Technical Specs"
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
                            title="Customer FAQs"
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

                    {/* Right Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <CollapsibleCard
                            title="Pricing"
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
                            title="Compliance"
                            isOpen={openSections.documents}
                            onToggle={() => toggleSection("documents")}
                        >
                            <DocumentsSection
                                data={data}
                                errors={errors}
                                handleInputChange={handleInputChange}
                            />
                        </CollapsibleCard>

                        <CollapsibleCard
                            title="Media Gallery"
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

                        {/* Submit Actions */}
                        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="font-bold text-slate-800 text-sm">
                                    Update Vehicle
                                </h4>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={data.status === "available"}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "status",
                                                e.target.checked
                                                    ? "available"
                                                    : "draft"
                                            )
                                        }
                                    />
                                    <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:bg-slate-900 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                                </label>
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black disabled:opacity-50 text-[10px] uppercase tracking-widest shadow-sm"
                            >
                                {processing ? (
                                    <Loader2
                                        size={14}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <Edit size={14} />
                                )}
                                {data.status === "available"
                                    ? "Update & Publish"
                                    : "Save Draft"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
