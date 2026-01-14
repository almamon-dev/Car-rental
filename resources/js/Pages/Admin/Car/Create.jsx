import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Save,
    XCircle,
    ChevronLeft,
    LayoutDashboard,
    Loader2,
} from "lucide-react";

// Import Partials
import BasicInfoSection from "./Partials/Create/BasicInfoSection";
import TechSpecsSection from "./Partials/Create/TechSpecsSection";
import FeaturesSection from "./Partials/Create/FeaturesSection";
import FaqSection from "./Partials/Create/FaqSection";
import PricingSection from "./Partials/Create/PricingSection";
import DocumentsSection from "./Partials/Create/DocumentsSection";
import GallerySection from "./Partials/Create/GallerySection";
import CollapsibleCard from "./Partials/Create/CollapsibleCard";

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
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Add Vehicle | Admin Dashboard" />

            <div className="bg-[#FDFDFD] min-h-screen pb-20">
                {/* Header - Minimal & Non-Sticky */}
                <div className="bg-white border-b border-gray-100 px-8 py-6">
                    <div className="flex justify-between items-center mx-auto">
                        <div>
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">
                                <LayoutDashboard size={12} />
                                <span>Inventory</span>
                            </div>
                            <h1 className="text-xl font-black text-slate-900 tracking-tight">
                                New Vehicle Listing
                            </h1>
                        </div>

                        <Link
                            href={route("admin.cars.index")}
                            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
                        >
                            <ChevronLeft size={16} />
                            BACK
                        </Link>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-8 py-10"
                >
                    {/* Left Column (8 Cols) */}
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

                    {/* Right Column (4 Cols) */}
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
                            title="Media"
                            isOpen={openSections.images}
                            onToggle={() => toggleSection("images")}
                        >
                            <GallerySection
                                data={data}
                                errors={errors}
                                setData={setData}
                                clearErrors={clearErrors}
                            />
                        </CollapsibleCard>

                        {/* Minimal Submit Section */}
                        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm tracking-tight">
                                        Finish Process
                                    </h4>
                                    <p className="text-slate-400 text-[10px] uppercase tracking-wider font-medium">
                                        Visibility & Status
                                    </p>
                                </div>

                                {/* Your Custom Switch Style */}
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
                                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-slate-900"></div>
                                </label>
                            </div>

                            {/* Buttons: Same Width in One Row */}
                            <div className="flex items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 flex items-center justify-center gap-2 px-2 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black disabled:opacity-50 transition-all text-[10px] uppercase tracking-widest shadow-sm"
                                >
                                    {processing ? (
                                        <Loader2
                                            size={14}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <Save size={14} />
                                    )}
                                    {processing
                                        ? "Saving..."
                                        : data.status === "available"
                                        ? "Publish"
                                        : "Save Draft"}
                                </button>

                                <Link
                                    href={route("admin.cars.index")}
                                    className="flex-1 flex items-center justify-center gap-2 px-2 py-4 bg-white text-slate-400 font-bold border border-slate-100 rounded-xl hover:bg-slate-50 hover:text-red-500 hover:border-red-100 transition-all text-[10px] uppercase tracking-widest"
                                >
                                    <XCircle size={14} />
                                    Discard
                                </Link>
                            </div>

                            {/* Status Label */}
                            <div className="mt-4 flex items-center justify-center gap-2">
                                <div
                                    className={`w-1.5 h-1.5 rounded-full ${
                                        data.status === "available"
                                            ? "bg-green-500 animate-pulse"
                                            : "bg-slate-300"
                                    }`}
                                />
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                    {data.status === "available"
                                        ? "Listing will be Live"
                                        : "Saved as Private Draft"}
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
