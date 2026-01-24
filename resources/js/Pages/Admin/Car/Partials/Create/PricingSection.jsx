import React, { useState } from "react";
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
    const [showRates, setShowRates] = useState(false);

    // Standardized Label to match the internal Input label styling
    const Label = ({ children }) => (
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
            {children}
        </label>
    );

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Currency Dropdown */}
                <div className="space-y-1.5">
                    <label className="text-[14px] font-medium text-gray-700 block">
                        Currency
                    </label>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex h-[40px] w-full items-center justify-between rounded border border-gray-300 bg-white px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#0a66c2]/10 focus:border-[#0a66c2] transition-all hover:border-gray-400">
                            <span className={data.currency ? "text-gray-900" : "text-gray-400"}>
                                {data.currency ? `${data.currency} (${curr})` : "Select Currency"}
                            </span>
                            <ChevronDown size={16} className="text-gray-500" />
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

                <div className="space-y-1.5">
                    <label className="text-[14px] font-medium text-gray-700 block">
                        Tax Percentage (%)
                    </label>
                    <Input
                        type="number"
                        value={data.tax_percentage}
                        onChange={(e) => handleInputChange("tax_percentage", parseFloat(e.target.value) || 0)}
                        error={errors.tax_percentage}
                        placeholder="0"
                        className="h-[40px]"
                    />
                </div>
            </div>

            <div className="pt-2">
                <h4 className="text-[14px] font-semibold text-[#191919] mb-4">Rental Rates</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["daily_rate", "weekly_rate", "monthly_rate"].map((field) => (
                        <div key={field} className="relative space-y-1.5">
                            <label className="text-[14px] font-medium text-gray-700 block capitalize">
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
                                    className="pl-7 h-[40px]"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative space-y-1.5">
                 <label className="text-[14px] font-medium text-gray-700 block">
                    Security Deposit
                </label>
                <div className="relative">
                    <Input
                        type="number"
                        value={data.security_deposit}
                        onChange={(e) => handleInputChange("security_deposit", parseFloat(e.target.value) || 0)}
                        error={errors.security_deposit}
                        className="pl-9 h-[40px]"
                        placeholder="0.00"
                    />
                    <ShieldCheck
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                </div>
            </div>
        </div>
    );
};

export default PricingSection;
