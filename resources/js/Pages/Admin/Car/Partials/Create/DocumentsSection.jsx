import React from "react";
import { Input } from "@/Components/ui/Input";
import { ShieldAlert, CalendarClock } from "lucide-react";

const DocumentsSection = ({ data, errors, handleInputChange }) => {
    return (
        <div className="space-y-10">
            {/* Identification Numbers Section */}
            <div className="space-y-6">
                <div className="border-b border-slate-50 pb-2">
                    <h4 className="text-[14px] font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                        IDENTIFICATION NUMBERS
                    </h4>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-1">Registration Number</label>
                        <Input
                            placeholder="e.g. DHAKA-METRO-KA-1234"
                            value={data.registration_number}
                            onChange={(e) => handleInputChange("registration_number", e.target.value)}
                            error={errors.registration_number}
                            className="bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-lg h-11"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-1">Chassis Number</label>
                            <Input
                                placeholder="Enter Chassis #"
                                value={data.chassis_number}
                                onChange={(e) => handleInputChange("chassis_number", e.target.value)}
                                error={errors.chassis_number}
                                className="bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-lg h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-1">Engine Number</label>
                            <Input
                                placeholder="Enter Engine #"
                                value={data.engine_number}
                                onChange={(e) => handleInputChange("engine_number", e.target.value)}
                                error={errors.engine_number}
                                className="bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-lg h-11"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Compliance Section */}
            <div className="space-y-6">
                 <div className="border-b border-slate-50 pb-2">
                    <h4 className="text-[14px] font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                        COMPLIANCE TRACKING
                    </h4>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-1">Tax Token Expiry</label>
                        <Input
                            type="date"
                            value={data.tax_token_expiry}
                            onChange={(e) => handleInputChange("tax_token_expiry", e.target.value)}
                            error={errors.tax_token_expiry}
                            className="bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-lg h-11"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-1">Fitness Expiry</label>
                        <Input
                            type="date"
                            value={data.fitness_expiry}
                            onChange={(e) => handleInputChange("fitness_expiry", e.target.value)}
                            error={errors.fitness_expiry}
                            className="bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-lg h-11"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DocumentsSection;
