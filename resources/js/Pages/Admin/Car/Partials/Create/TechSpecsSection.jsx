import React from "react";
import { Input } from "@/Components/ui/Input";

const TechSpecsSection = ({ data, errors, handleInputChange }) => {
    const Label = ({ children }) => (
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            {children}
        </span>
    );

    const specs = [
        {
            name: "transmission",
            label: "Transmission",
            placeholder: "Automatic",
        },
        { name: "mileage", label: "Mileage", placeholder: "12 km/L" },
        { name: "fuel_type", label: "Fuel Type", placeholder: "Petrol" },
        { name: "steering", label: "Steering", placeholder: "Power" },
        {
            name: "model_year",
            label: "Model Year",
            placeholder: "2024",
            type: "number",
        },
        { name: "vehicle_type", label: "Vehicle Type", placeholder: "Sedan" },
        { name: "engine_capacity", label: "Engine (cc)", placeholder: "2000" },
        { name: "color", label: "Exterior Color", placeholder: "White" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specs.map((spec) => (
                <div key={spec.name} className="space-y-1.5">
                    <label className="text-[14px] font-medium text-gray-700 block">
                        {spec.label}
                    </label>
                    <Input
                        type={spec.type || "text"}
                        placeholder={spec.placeholder}
                        value={data[spec.name] || ""}
                        onChange={(e) =>
                            handleInputChange(spec.name, e.target.value)
                        }
                        error={errors[spec.name]}
                        className="h-[40px]"
                    />
                </div>
            ))}
        </div>
    );
};

export default TechSpecsSection;
