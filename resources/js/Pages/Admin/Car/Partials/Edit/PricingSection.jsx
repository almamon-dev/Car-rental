import React from "react";
import { Input } from "@/Components/ui/Input";
import { DollarSign, ShieldCheck, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/Components/ui/DropdownMenu";

const PricingSection = ({ data, errors, handleInputChange }) => {
    const currencyMap = { USD: "$", BDT: "৳", EUR: "€", GBP: "£" };
    const curr = currencyMap[data.currency] || "$";

    return (
        <div className="space-y-6 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Currency Selection */}
                <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-gray-700 block text-left">
                        Currency
                    </label>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex h-[40px] w-full items-center justify-between rounded border border-gray-300 bg-white px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#0a66c2]/10 focus:border-[#0a66c2] transition-all hover:border-gray-400">
                            <span className={data.currency ? "text-gray-900" : "text-gray-400"}>
                                {data.currency ? `${data.currency} (${curr})` : "Select Currency"}
                            </span>
                            <ChevronDown size={14} className="text-gray-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                            {Object.entries(currencyMap).map(([code, symbol]) => (
                                <DropdownMenuItem
                                    key={code}
                                    onClick={() => handleInputChange("currency", code)}
                                >
                                    {code} ({symbol})
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Input
                    label="Tax Rate (%)"
                    type="number"
                    value={data.tax_percentage}
                    onChange={(e) => handleInputChange("tax_percentage", parseFloat(e.target.value) || 0)}
                    error={errors.tax_percentage}
                    placeholder="0"
                />
            </div>

            {/* Rate Management */}
            <div className="bg-gray-50 border border-gray-200 rounded p-5 space-y-6">
                <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-[#0a66c2]" />
                    <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-tight">Active Rental Rates</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["daily_rate", "weekly_rate", "monthly_rate"].map((field) => (
                        <div key={field} className="relative">
                            <label className="text-[13px] font-semibold text-gray-700 block mb-1.5 capitalize">
                                {field.replace("_", " ")}
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[14px] font-medium z-10">
                                    {curr}
                                </span>
                                <Input
                                    type="number"
                                    value={data[field]}
                                    onChange={(e) => handleInputChange(field, parseFloat(e.target.value) || 0)}
                                    error={errors[field]}
                                    className="pl-7 font-semibold"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative">
                <Input
                    label="Security Deposit"
                    type="number"
                    value={data.security_deposit}
                    onChange={(e) => handleInputChange("security_deposit", parseFloat(e.target.value) || 0)}
                    error={errors.security_deposit}
                    className="pl-10"
                    placeholder="0.00"
                />
                <ShieldCheck
                    size={16}
                    className="absolute left-3 bottom-[12px] text-gray-400"
                />
            </div>
        </div>
    );
};

export default PricingSection;
