import React from "react";
import { Input } from "@/Components/ui/Input";
import { ShieldAlert, CalendarClock } from "lucide-react";

const DocumentsSection = ({ data, errors, handleInputChange }) => {
    const SectionHeader = ({ title }) => (
        <div className="mb-4">
            <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-tight">
                {title}
            </h4>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <SectionHeader title="Identification Numbers" />
                <div className="grid grid-cols-1 gap-4">
                    <Input
                        label="Registration Number"
                        placeholder="e.g. DHAKA-METRO-KA-1234"
                        value={data.registration_number}
                        onChange={(e) => handleInputChange("registration_number", e.target.value)}
                        error={errors.registration_number}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Chassis Number"
                            value={data.chassis_number}
                            onChange={(e) => handleInputChange("chassis_number", e.target.value)}
                            error={errors.chassis_number}
                        />
                        <Input
                            label="Engine Number"
                            value={data.engine_number}
                            onChange={(e) => handleInputChange("engine_number", e.target.value)}
                            error={errors.engine_number}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-2">
                <SectionHeader title="Compliance Tracking" />
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        type="date"
                        label="Tax Token Expiry"
                        value={data.tax_token_expiry}
                        onChange={(e) => handleInputChange("tax_token_expiry", e.target.value)}
                        error={errors.tax_token_expiry}
                    />
                    <Input
                        type="date"
                        label="Fitness Expiry"
                        value={data.fitness_expiry}
                        onChange={(e) => handleInputChange("fitness_expiry", e.target.value)}
                        error={errors.fitness_expiry}
                    />
                </div>
            </div>
        </div>
    );
};
export default DocumentsSection;
