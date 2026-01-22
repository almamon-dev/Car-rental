import React from "react";
import { Input } from "@/Components/ui/Input";

const TechSpecsSection = ({ data, errors, handleInputChange }) => {
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6">
            {specs.map((spec) => (
                <Input
                    key={spec.name}
                    label={spec.label}
                    type={spec.type || "text"}
                    placeholder={spec.placeholder}
                    value={data[spec.name] || ""}
                    onChange={(e) =>
                        handleInputChange(spec.name, e.target.value)
                    }
                    error={errors[spec.name]}
                />
            ))}
        </div>
    );
};

export default TechSpecsSection;
