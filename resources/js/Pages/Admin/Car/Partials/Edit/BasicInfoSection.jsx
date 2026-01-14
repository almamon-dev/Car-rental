import React from "react";
import { Input } from "@/Components/ui/Input";
import { Car, Tag, Calendar, FileText, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/Components/ui/DropdownMenu";

const BasicInfoSection = ({
    data,
    errors,
    handleInputChange,
    brands,
    categories,
}) => {
    const Label = ({ children }) => (
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">
            {children}
        </label>
    );

    const getBrandLabel = () => {
        const brand = brands?.find(
            (b) => b.id.toString() === data.brand_id?.toString()
        );
        return brand ? brand.name : "Select Brand";
    };

    const getCategoryLabel = () => {
        const category = categories?.find(
            (c) => c.id.toString() === data.category_id?.toString()
        );
        return category ? category.name : "Select Category";
    };

    const getRentalTypeLabel = () => {
        const types = { daily: "Daily", weekly: "Weekly", monthly: "Monthly" };
        return types[data.rental_type] || "Daily";
    };

    // কমন ক্লাস যা ইনপুট এবং ড্রপডাউন উভয় ক্ষেত্রেই ব্যবহার হবে
    const commonFieldClass = (hasError) => `
        flex h-11 w-full items-center justify-between rounded-md border
        ${hasError ? "border-red-500" : "border-blue-200"}
        bg-white px-3 py-2 text-sm transition-all
        focus:outline-none focus:ring-1 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6]
    `;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Brand Dropdown */}
                <div className="space-y-1.5">
                    <Label>
                        Brand <span className="text-red-400">*</span>
                    </Label>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={commonFieldClass(errors.brand_id)}
                        >
                            <div className="flex items-center gap-2">
                                <Tag className="text-gray-400" size={16} />
                                <span
                                    className={
                                        data.brand_id
                                            ? "text-gray-900"
                                            : "text-gray-400"
                                    }
                                >
                                    {getBrandLabel()}
                                </span>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                active={!data.brand_id}
                                onClick={() =>
                                    handleInputChange("brand_id", "")
                                }
                            >
                                Select Brand
                            </DropdownMenuItem>
                            {brands?.map((b) => (
                                <DropdownMenuItem
                                    key={b.id}
                                    active={
                                        data.brand_id?.toString() ===
                                        b.id.toString()
                                    }
                                    onClick={() =>
                                        handleInputChange("brand_id", b.id)
                                    }
                                >
                                    {b.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {errors.brand_id && (
                        <p className="text-red-500 text-[10px] mt-1">
                            {errors.brand_id}
                        </p>
                    )}
                </div>

                {/* Category Dropdown */}
                <div className="space-y-1.5">
                    <Label>
                        Category <span className="text-red-400">*</span>
                    </Label>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={commonFieldClass(errors.category_id)}
                        >
                            <div className="flex items-center gap-2">
                                <Car className="text-gray-400" size={16} />
                                <span
                                    className={
                                        data.category_id
                                            ? "text-gray-900"
                                            : "text-gray-400"
                                    }
                                >
                                    {getCategoryLabel()}
                                </span>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                active={!data.category_id}
                                onClick={() =>
                                    handleInputChange("category_id", "")
                                }
                            >
                                Select Category
                            </DropdownMenuItem>
                            {categories?.map((c) => (
                                <DropdownMenuItem
                                    key={c.id}
                                    active={
                                        data.category_id?.toString() ===
                                        c.id.toString()
                                    }
                                    onClick={() =>
                                        handleInputChange("category_id", c.id)
                                    }
                                >
                                    {c.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {errors.category_id && (
                        <p className="text-red-500 text-[10px] mt-1">
                            {errors.category_id}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Make *"
                    placeholder="e.g., Toyota"
                    value={data.make}
                    onChange={(e) => handleInputChange("make", e.target.value)}
                    error={errors.make}
                    className="h-11 border-blue-200"
                />
                <Input
                    label="Model *"
                    placeholder="e.g., Camry"
                    value={data.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
                    error={errors.model}
                    className="h-11 border-blue-200"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative space-y-1.5">
                    <Label>
                        Year <span className="text-red-400">*</span>
                    </Label>
                    <div className="relative">
                        <Calendar
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                            size={16}
                        />
                        <Input
                            type="number"
                            value={data.year}
                            onChange={(e) =>
                                handleInputChange("year", e.target.value)
                            }
                            error={errors.year}
                            className="h-11 pl-10 border-blue-200"
                        />
                    </div>
                </div>

                {/* Rental Type Dropdown */}
                <div className="space-y-1.5">
                    <Label>Default Rental Type</Label>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={commonFieldClass(false)}
                        >
                            <span className="text-gray-900">
                                {getRentalTypeLabel()}
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {["daily", "weekly", "monthly"].map((type) => (
                                <DropdownMenuItem
                                    key={type}
                                    active={data.rental_type === type}
                                    onClick={() =>
                                        handleInputChange("rental_type", type)
                                    }
                                    className="capitalize"
                                >
                                    {type}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                    <FileText size={14} className="text-gray-400" />
                    <Label>Detailed Description</Label>
                </div>
                <textarea
                    className={`w-full min-h-[140px] border ${
                        errors.description
                            ? "border-red-500"
                            : "border-blue-200"
                    } rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] outline-none transition bg-white`}
                    placeholder="Describe the car's condition, unique features, or rental rules..."
                    value={data.description}
                    onChange={(e) =>
                        handleInputChange("description", e.target.value)
                    }
                />
                {errors.description && (
                    <p className="text-red-500 text-[10px] mt-1">
                        {errors.description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default BasicInfoSection;
