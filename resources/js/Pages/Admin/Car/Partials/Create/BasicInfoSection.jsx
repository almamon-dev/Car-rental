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

    const dropdownTriggerClass = (hasError) => `
        flex h-[40px] w-full items-center justify-between rounded border
        ${hasError ? "border-red-600 focus:ring-red-600/10" : "border-gray-300 focus:border-[#0a66c2] focus:ring-[#0a66c2]/10"}
        bg-white px-3 py-2 text-[14px] transition-all
        focus:outline-none focus:ring-1 hover:border-gray-400
    `;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Brand Dropdown */}
                <div className="space-y-1">
                    <label className="text-[12px] font-bold text-gray-700 uppercase tracking-wide block">
                        Brand <span className="text-red-500">*</span>
                    </label>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={dropdownTriggerClass(errors.brand_id)}
                        >
                            <div className="flex items-center gap-2">
                                <Tag className="text-gray-400" size={14} />
                                <span
                                    className={`truncate ${
                                        data.brand_id
                                            ? "text-gray-900 font-medium"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {getBrandLabel()}
                                </span>
                            </div>
                            <ChevronDown size={14} className="text-gray-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
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
                        <p className="text-red-600 text-[11px] mt-0.5">
                            {errors.brand_id}
                        </p>
                    )}
                </div>

                {/* Category Dropdown */}
                <div className="space-y-1">
                    <label className="text-[12px] font-bold text-gray-700 uppercase tracking-wide block">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={dropdownTriggerClass(errors.category_id)}
                        >
                            <div className="flex items-center gap-2">
                                <Car className="text-gray-400" size={14} />
                                <span
                                     className={`truncate ${
                                        data.category_id
                                            ? "text-gray-900 font-medium"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {getCategoryLabel()}
                                </span>
                            </div>
                            <ChevronDown size={14} className="text-gray-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
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
                        <p className="text-red-600 text-[11px] mt-0.5">
                            {errors.category_id}
                        </p>
                    )}
                </div>
            </div>

            {/* Make, Model, Year - 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                    <label className="text-[12px] font-bold text-gray-700 uppercase tracking-wide block">Make <span className="text-red-500">*</span></label>
                    <Input
                        placeholder="e.g. Toyota"
                        value={data.make}
                        onChange={(e) => handleInputChange("make", e.target.value)}
                        error={errors.make}
                        className="h-[40px]"
                    />
                </div>
                <div className="space-y-1">
                     <label className="text-[12px] font-bold text-gray-700 uppercase tracking-wide block">Model <span className="text-red-500">*</span></label>
                     <Input
                        placeholder="e.g. Camry"
                        value={data.model}
                        onChange={(e) => handleInputChange("model", e.target.value)}
                        error={errors.model}
                        className="h-[40px]"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[12px] font-bold text-gray-700 uppercase tracking-wide block">Year <span className="text-red-500">*</span></label>
                    <Input
                        type="number"
                        value={data.year}
                        onChange={(e) => handleInputChange("year", e.target.value)}
                        error={errors.year}
                        className="h-[40px]"
                    />
                </div>
            </div>
            
            {/* Rental Type & Description */}
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                     <label className="text-[12px] font-bold text-gray-700 uppercase tracking-wide block">Rental Type</label>
                     <DropdownMenu>
                        <DropdownMenuTrigger
                            className={dropdownTriggerClass(false)}
                        >
                            <span className="text-gray-900 font-medium capitalize">
                                {getRentalTypeLabel()}
                            </span>
                            <ChevronDown size={14} className="text-gray-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
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
            
                <div className="space-y-1">
                    <label className="text-[12px] font-bold text-gray-700 uppercase tracking-wide block">Description</label>
                    <Input
                        isTextArea
                        placeholder="Vehicle description..."
                        value={data.description}
                        onChange={(e) =>
                            handleInputChange("description", e.target.value)
                        }
                        error={errors.description}
                        className="min-h-[80px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default BasicInfoSection;
