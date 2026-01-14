import React from "react";
import { Input } from "@/Components/ui/Input";
import { ShieldAlert, CalendarClock } from "lucide-react";

const DocumentsSection = ({ data, errors, handleInputChange }) => {
    const SectionHeader = ({ icon: Icon, title }) => (
        <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600">
                <Icon size={14} />
            </div>
            <h4 className="text-[12px] font-bold text-slate-700 uppercase tracking-tight">
                {title}
            </h4>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <SectionHeader
                    icon={ShieldAlert}
                    title="Identification Numbers"
                />
                <div className="grid grid-cols-1 gap-4">
                    <Input
                        label="Registration Number"
                        placeholder="DHAKA-METRO-KA-1234"
                        value={data.registration_number}
                        onChange={(e) =>
                            handleInputChange(
                                "registration_number",
                                e.target.value
                            )
                        }
                        error={errors.registration_number}
                        className="rounded-sm h-11"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Chassis Number"
                            value={data.chassis_number}
                            onChange={(e) =>
                                handleInputChange(
                                    "chassis_number",
                                    e.target.value
                                )
                            }
                            error={errors.chassis_number}
                            className="rounded-sm h-10"
                        />
                        <Input
                            label="Engine Number"
                            value={data.engine_number}
                            onChange={(e) =>
                                handleInputChange(
                                    "engine_number",
                                    e.target.value
                                )
                            }
                            error={errors.engine_number}
                            className="rounded-sm h-10"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-2 border-slate-100">
                <SectionHeader icon={CalendarClock} title="Expiry Tracking" />
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-600">
                            Tax Token Expiry
                        </label>
                        <input
                            type="date"
                            className="w-full h-11 border-gray-200 rounded-sm text-sm focus:ring-blue-500 transition px-3"
                            value={data.tax_token_expiry}
                            onChange={(e) =>
                                handleInputChange(
                                    "tax_token_expiry",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-600">
                            Fitness Expiry
                        </label>
                        <input
                            type="date"
                            className="w-full h-11 border-gray-200 rounded-sm text-sm focus:ring-blue-500 transition px-3"
                            value={data.fitness_expiry}
                            onChange={(e) =>
                                handleInputChange(
                                    "fitness_expiry",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DocumentsSection;
