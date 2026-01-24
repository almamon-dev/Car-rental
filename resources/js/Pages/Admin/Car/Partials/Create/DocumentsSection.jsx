import React from "react";
import { Input } from "@/Components/ui/Input";
import { ShieldAlert, CalendarClock } from "lucide-react";

const DocumentsSection = ({ data, errors, handleInputChange }) => {
    return (
        <div className="space-y-8">
            {/* Identification Numbers Section */}
            <div>
                <h4 className="text-[14px] font-semibold text-[#191919] mb-4">
                    Identification Numbers
                </h4>
                
                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-[14px] font-medium text-gray-700 block">Registration Number</label>
                        <Input
                            placeholder="e.g. DHAKA-METRO-KA-1234"
                            value={data.registration_number}
                            onChange={(e) => handleInputChange("registration_number", e.target.value)}
                            error={errors.registration_number}
                            className="bg-white border-gray-300 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]/10 rounded h-[40px]"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[14px] font-medium text-gray-700 block">Chassis Number</label>
                            <Input
                                placeholder="Enter Chassis #"
                                value={data.chassis_number}
                                onChange={(e) => handleInputChange("chassis_number", e.target.value)}
                                error={errors.chassis_number}
                                className="bg-white border-gray-300 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]/10 rounded h-[40px]"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[14px] font-medium text-gray-700 block">Engine Number</label>
                            <Input
                                placeholder="Enter Engine #"
                                value={data.engine_number}
                                onChange={(e) => handleInputChange("engine_number", e.target.value)}
                                error={errors.engine_number}
                                className="bg-white border-gray-300 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]/10 rounded h-[40px]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Compliance Section */}
            <div className="pt-2 border-t border-gray-100">
                 <h4 className="text-[14px] font-semibold text-[#191919] mb-4 mt-6">
                    Compliance Tracking
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                         <label className="text-[14px] font-medium text-gray-700 block">Tax Token Expiry</label>
                        <Input
                            type="date"
                            value={data.tax_token_expiry}
                            onChange={(e) => handleInputChange("tax_token_expiry", e.target.value)}
                            error={errors.tax_token_expiry}
                            className="bg-white border-gray-300 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]/10 rounded h-[40px]"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[14px] font-medium text-gray-700 block">Fitness Expiry</label>
                        <Input
                            type="date"
                            value={data.fitness_expiry}
                            onChange={(e) => handleInputChange("fitness_expiry", e.target.value)}
                            error={errors.fitness_expiry}
                            className="bg-white border-gray-300 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]/10 rounded h-[40px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DocumentsSection;
