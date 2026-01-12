import { useState } from "react";
import { Head, useForm, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DeleteAction from "@/Components/modals/ConfirmDelete";
import {
    ChevronDown,
    ChevronUp,
    Settings,
    Car,
    DollarSign,
    ShieldCheck,
    Plus,
    Trash2,
    XCircle,
    Save,
    HelpCircle,
    Image as ImageIcon,
    ChevronLeft,
} from "lucide-react";
import { Input } from "@/Components/ui/Input";
import FileUpload from "@/Components/forms/FileUpload";

export default function CarEdit({ auth, categories, brands, car }) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        _method: "PUT",
        brand_id: car.brand_id || "",
        category_id: car.category_id || "",
        make: car.make || "",
        model: car.model || "",
        year: car.year || "",
        rental_type: car.rental_type || "daily",
        description: car.description || "",
        status: car.status || "available",
        // Specifications
        transmission: car.specifications?.transmission || "",
        mileage: car.specifications?.mileage || "",
        fuel_type: car.specifications?.fuel_type || "",
        steering: car.specifications?.steering || "",
        model_year: car.specifications?.model_year || "",
        vehicle_type: car.specifications?.vehicle_type || "",
        engine_capacity: car.specifications?.engine_capacity || "",
        color: car.specifications?.color || "",
        // Pricing
        daily_rate: car.price_details?.daily_rate || "",
        weekly_rate: car.price_details?.weekly_rate || "",
        monthly_rate: car.price_details?.monthly_rate || "",
        security_deposit: car.price_details?.security_deposit || 0,
        currency: car.price_details?.currency || "USD",
        tax_percentage: car.price_details?.tax_percentage || 0,
        // Documents
        registration_number: car.police_documents?.registration_number || "",
        chassis_number: car.police_documents?.chassis_number || "",
        engine_number: car.police_documents?.engine_number || "",
        tax_token_expiry: car.police_documents?.tax_token_expiry || "",
        fitness_expiry: car.police_documents?.fitness_expiry || "",
        // Relations
        features:
            car.features.length > 0 ? car.features : [{ feature_name: "" }],
        faqs: car.faqs.length > 0 ? car.faqs : [{ question: "", answer: "" }],
        images: [], // New images
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
        const updated = data[field].map((item, idx) =>
            idx === index ? { ...item, [subField]: value } : item
        );
        setData(field, updated);
    };

    const addRow = (field, obj) => setData(field, [...data[field], obj]);
    const removeRow = (field, index) =>
        setData(
            field,
            data[field].filter((_, i) => i !== index)
        );

    // Database theke image delete korar logic
    const deleteExistingImage = (id) => {
        if (confirm("Are you sure you want to delete this image?")) {
            router.delete(route("admin.cars.image.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.cars.update", car.id), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const Label = ({ children, required }) => (
        <label className="text-[13px] font-semibold text-gray-700">
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    );

    return (
        <AdminLayout user={auth.user}>
            <Head title="Edit Car" />
            <div className="px-4 bg-[#F8F9FB] min-h-screen font-sans space-y-8 pb-10">
                <div className="flex justify-between items-center max-w-8xl mx-auto pt-6">
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold text-slate-800">
                            Edit Vehicle
                        </h1>
                        <p className="text-sm text-gray-500">
                            Update car information
                        </p>
                    </div>
                    <Link
                        href={route("admin.cars.index")}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium"
                    >
                        <ChevronLeft size={18} /> Go Back
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-8xl mx-auto"
                >
                    <div className="lg:col-span-2 space-y-8">
                        {/* 1. Basic Info */}
                        <CollapsibleCard
                            title="Basic Information"
                            icon={<Car size={18} />}
                            isOpen={openSections.basic}
                            onToggle={() => toggleSection("basic")}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label required>Brand</Label>
                                    <select
                                        className="w-full h-10 border border-gray-200 rounded-md px-3 text-sm focus:ring-2 focus:ring-orange-500"
                                        value={data.brand_id}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "brand_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Select Brand</option>
                                        {brands?.map((b) => (
                                            <option key={b.id} value={b.id}>
                                                {b.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.brand_id && (
                                        <p className="text-red-500 text-xs">
                                            {errors.brand_id}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label required>Category</Label>
                                    <select
                                        className="w-full h-10 border border-gray-200 rounded-md px-3 text-sm"
                                        value={data.category_id}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "category_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">
                                            Select Category
                                        </option>
                                        {categories?.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && (
                                        <p className="text-red-500 text-xs">
                                            {errors.category_id}
                                        </p>
                                    )}
                                </div>
                                <Input
                                    label="Make *"
                                    value={data.make}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "make",
                                            e.target.value
                                        )
                                    }
                                    error={errors.make}
                                />
                                <Input
                                    label="Model *"
                                    value={data.model}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "model",
                                            e.target.value
                                        )
                                    }
                                    error={errors.model}
                                />
                                <Input
                                    label="Year *"
                                    type="number"
                                    value={data.year}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "year",
                                            e.target.value
                                        )
                                    }
                                    error={errors.year}
                                />
                                <div className="space-y-2">
                                    <Label required>Rental Type</Label>
                                    <select
                                        className="w-full h-10 border border-gray-200 rounded-md px-3 text-sm"
                                        value={data.rental_type}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "rental_type",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <Input
                                        label="Description *"
                                        isTextArea
                                        rows={3}
                                        value={data.description}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        error={errors.description}
                                    />
                                </div>
                            </div>
                        </CollapsibleCard>

                        {/* 2. Specs */}
                        <CollapsibleCard
                            title="Technical Specifications"
                            icon={<Settings size={18} />}
                            isOpen={openSections.specs}
                            onToggle={() => toggleSection("specs")}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Input
                                    label="Transmission"
                                    value={data.transmission}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "transmission",
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    label="Mileage"
                                    value={data.mileage}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "mileage",
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    label="Fuel Type"
                                    value={data.fuel_type}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "fuel_type",
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    label="Steering"
                                    value={data.steering}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "steering",
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    label="Model Year"
                                    value={data.model_year}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "model_year",
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    label="Vehicle Type"
                                    value={data.vehicle_type}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "vehicle_type",
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    label="Engine (cc)"
                                    value={data.engine_capacity}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "engine_capacity",
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    label="Color"
                                    value={data.color}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "color",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </CollapsibleCard>

                        {/* 3. Features & FAQs (Shortened for brevity but logic same as your create) */}
                        <CollapsibleCard
                            title="Car Features"
                            icon={<Plus size={18} />}
                            isOpen={openSections.features}
                            onToggle={() => toggleSection("features")}
                        >
                            <div className="space-y-4">
                                {data.features.map((f, i) => (
                                    <div key={i} className="flex gap-3">
                                        <Input
                                            className="flex-1"
                                            value={f.feature_name}
                                            onChange={(e) =>
                                                handleNestedChange(
                                                    "features",
                                                    i,
                                                    "feature_name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeRow("features", i)
                                            }
                                            className="text-red-400"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() =>
                                        addRow("features", { feature_name: "" })
                                    }
                                    className="text-orange-500 font-semibold"
                                >
                                    + Add Feature
                                </button>
                            </div>
                        </CollapsibleCard>
                        <CollapsibleCard
                            title="FAQs"
                            icon={<HelpCircle size={18} />}
                            isOpen={openSections.faqs}
                            onToggle={() => toggleSection("faqs")}
                        >
                            <div className="space-y-5">
                                {data.faqs.map((faq, i) => (
                                    <div
                                        key={i}
                                        className="p-4 border bg-gray-50 rounded-lg space-y-3 relative"
                                    >
                                        <Input
                                            label="Question"
                                            value={faq.question}
                                            onChange={(e) =>
                                                handleNestedChange(
                                                    "faqs",
                                                    i,
                                                    "question",
                                                    e.target.value
                                                )
                                            }
                                            error={errors[`faqs.${i}.question`]}
                                        />
                                        <Input
                                            label="Answer"
                                            isTextArea
                                            rows={2}
                                            value={faq.answer}
                                            onChange={(e) =>
                                                handleNestedChange(
                                                    "faqs",
                                                    i,
                                                    "answer",
                                                    e.target.value
                                                )
                                            }
                                            error={errors[`faqs.${i}.answer`]}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeRow("faqs", i)}
                                            className="text-red-500 text-xs flex items-center gap-1 hover:text-red-700 absolute top-2 right-2"
                                        >
                                            <Trash2 size={14} /> Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() =>
                                        addRow("faqs", {
                                            question: "",
                                            answer: "",
                                        })
                                    }
                                    className="text-orange-500 font-semibold flex items-center gap-2 hover:text-orange-600"
                                >
                                    <Plus size={16} /> Add FAQ
                                </button>
                            </div>
                        </CollapsibleCard>
                    </div>

                    {/* Right Side */}
                    <div className="space-y-8">
                        {/* 1. Pricing & Fees Section */}
                        <CollapsibleCard
                            title="Pricing & Fees"
                            icon={<DollarSign size={18} />}
                            isOpen={openSections.pricing}
                            onToggle={() => toggleSection("pricing")}
                        >
                            <div className="space-y-4">
                                <Input
                                    label={
                                        <span>
                                            Daily Rate{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.daily_rate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "daily_rate",
                                            e.target.value
                                        )
                                    }
                                    error={errors.daily_rate}
                                />
                                <Input
                                    label={
                                        <span>
                                            Weekly Rate{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.weekly_rate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "weekly_rate",
                                            e.target.value
                                        )
                                    }
                                    error={errors.weekly_rate}
                                />
                                <Input
                                    label={
                                        <span>
                                            Monthly Rate{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.monthly_rate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "monthly_rate",
                                            e.target.value
                                        )
                                    }
                                    error={errors.monthly_rate}
                                />
                                <div className="grid grid-cols-2 gap-3">
                                    <Input
                                        label={
                                            <span>
                                                Tax %{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </span>
                                        }
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.tax_percentage}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "tax_percentage",
                                                e.target.value
                                            )
                                        }
                                        error={errors.tax_percentage}
                                    />
                                    <div className="space-y-2">
                                        <Label required>Currency</Label>
                                        <select
                                            className={`w-full h-10 border ${
                                                errors.currency
                                                    ? "border-red-500"
                                                    : "border-gray-200"
                                            } rounded-md px-3 text-sm outline-none`}
                                            value={data.currency}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "currency",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="USD">USD</option>
                                            <option value="BDT">BDT</option>
                                            <option value="EUR">EUR</option>
                                        </select>
                                    </div>
                                </div>
                                <Input
                                    label="Security Deposit"
                                    type="number"
                                    value={data.security_deposit}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "security_deposit",
                                            e.target.value
                                        )
                                    }
                                    error={errors.security_deposit}
                                />
                            </div>
                        </CollapsibleCard>

                        {/* 2. Legal Documents Section */}
                        <CollapsibleCard
                            title="Legal Documents"
                            icon={<ShieldCheck size={18} />}
                            isOpen={openSections.documents}
                            onToggle={() => toggleSection("documents")}
                        >
                            <div className="space-y-4">
                                <Input
                                    label={
                                        <span>
                                            Registration No{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    placeholder="ABC-123"
                                    value={data.registration_number}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "registration_number",
                                            e.target.value
                                        )
                                    }
                                    error={errors.registration_number}
                                />
                                <Input
                                    label={
                                        <span>
                                            Chassis No{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    placeholder="CH123456789"
                                    value={data.chassis_number}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "chassis_number",
                                            e.target.value
                                        )
                                    }
                                    error={errors.chassis_number}
                                />
                                <Input
                                    label={
                                        <span>
                                            Engine No{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    placeholder="EN123456789"
                                    value={data.engine_number}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "engine_number",
                                            e.target.value
                                        )
                                    }
                                    error={errors.engine_number}
                                />
                                <Input
                                    label={
                                        <span>
                                            Tax Expiry{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    type="date"
                                    value={data.tax_token_expiry}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "tax_token_expiry",
                                            e.target.value
                                        )
                                    }
                                    error={errors.tax_token_expiry}
                                />
                                <Input
                                    label={
                                        <span>
                                            Fitness Expiry{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    type="date"
                                    value={data.fitness_expiry}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "fitness_expiry",
                                            e.target.value
                                        )
                                    }
                                    error={errors.fitness_expiry}
                                />
                            </div>
                        </CollapsibleCard>

                        {/* Gallery Images Section inside Edit.jsx */}
                        <CollapsibleCard
                            title="Gallery Images"
                            icon={<ImageIcon size={18} />}
                            isOpen={openSections.images}
                            onToggle={() => toggleSection("images")}
                        >
                            {/* Existing Images Show Section */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                {car.images?.map((img) => (
                                    <div
                                        key={img.id}
                                        className="relative group aspect-video rounded-lg overflow-hidden border border-gray-200 shadow-sm"
                                    >
                                        <img
                                            src={`/${img.file_path}`}
                                            alt="Car Gallery"
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Delete Button Overlay using your DeleteAction Component */}
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <DeleteAction
                                                id={img.id}
                                                routeName="admin.cars.image.destroy"
                                                title="Delete Image?"
                                                confirmButtonText="Yes, delete it!"
                                                onSuccess={() => {
                                                    // Image delete hole page auto refresh hobe preserveScroll shoho
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 2. Upload New Images Component */}
                            <FileUpload
                                field="images"
                                label="Upload New Images"
                                multiple={true}
                                accept="image/*"
                                data={data}
                                setData={setData}
                                errors={errors}
                                clearErrors={clearErrors}
                            />
                        </CollapsibleCard>

                        <div className="flex justify-end gap-3">
                            <Link
                                href={route("admin.cars.index")}
                                className="flex items-center gap-2 px-6 py-3 border rounded-md text-gray-500"
                            >
                                <XCircle size={18} /> Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 px-7 py-3 bg-orange-500 text-white font-bold rounded-md"
                            >
                                {processing ? "Updating..." : "Update Car"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

function CollapsibleCard({ title, icon, children, isOpen, onToggle }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div
                className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 border-b"
                onClick={onToggle}
            >
                <div className="flex items-center gap-3 text-slate-800 font-bold">
                    <div className="p-2 text-orange-500 bg-orange-50 rounded-lg">
                        {icon}
                    </div>
                    <span className="text-lg">{title}</span>
                </div>
                {isOpen ? (
                    <ChevronUp size={20} className="text-gray-400" />
                ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                )}
            </div>
            {isOpen && <div className="p-6">{children}</div>}
        </div>
    );
}
