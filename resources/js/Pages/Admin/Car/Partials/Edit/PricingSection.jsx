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

    // AUTO-OPEN if data exists
    const [showRates, setShowRates] = useState(
        !!(data.daily_rate || data.weekly_rate || data.monthly_rate)
    );

    const Label = ({ children }) => (
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
            {children}
        </label>
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Currency Selection */}
                <div className="flex flex-col">
                    <Label>Currency</Label>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex h-11 w-full items-center justify-between rounded-md border border-blue-200 bg-white px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 transition-all">
                            <span
                                className={
                                    data.currency
                                        ? "text-gray-900"
                                        : "text-gray-400"
                                }
                            >
                                {data.currency
                                    ? `${data.currency} (${curr})`
                                    : "Select Currency"}
                            </span>
                            <ChevronDown size={16} className="text-gray-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="start"
                            className="w-[--radix-dropdown-menu-trigger-width]"
                        >
                            {Object.entries(currencyMap).map(
                                ([code, symbol]) => (
                                    <DropdownMenuItem
                                        key={code}
                                        onClick={() =>
                                            handleInputChange("currency", code)
                                        }
                                    >
                                        {code} ({symbol})
                                    </DropdownMenuItem>
                                )
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {errors.currency && (
                        <span className="text-xs text-red-500 mt-1">
                            {errors.currency}
                        </span>
                    )}
                </div>

                {/* Tax Percentage */}
                <div>
                    <Label>Tax Rate (%)</Label>
                    <Input
                        type="number"
                        value={data.tax_percentage}
                        onChange={(e) =>
                            handleInputChange("tax_percentage", e.target.value)
                        }
                        error={errors.tax_percentage}
                        className="h-11 border-blue-200"
                        placeholder="0"
                    />
                </div>
            </div>

            {/* Rental Rates Toggle Card */}
            <div className="border border-blue-100 rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="bg-slate-50/80 px-4 py-3 flex items-center justify-between border-b border-blue-100">
                    <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-slate-500" />
                        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                            Rental Rates
                        </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={showRates}
                            onChange={() => setShowRates(!showRates)}
                        />
                        <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                {showRates ? (
                    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-1 duration-300">
                        {["daily_rate", "weekly_rate", "monthly_rate"].map(
                            (field) => (
                                <div key={field} className="flex flex-col">
                                    <Label>{field.replace("_", " ")}</Label>
                                    <div className="relative group">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                                            {curr}
                                        </span>
                                        <Input
                                            type="number"
                                            value={data[field]}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    field,
                                                    e.target.value
                                                )
                                            }
                                            error={errors[field]}
                                            className="h-11 border-blue-200 pl-8 w-full"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <div className="p-6 text-center text-[11px] text-slate-400 font-medium">
                        Rates are currently hidden. Toggle to view/edit.
                    </div>
                )}
            </div>

            {/* Security Deposit */}
            <div>
                <Label>Security Deposit</Label>
                <div className="relative">
                    <ShieldCheck
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                        type="number"
                        value={data.security_deposit}
                        onChange={(e) =>
                            handleInputChange(
                                "security_deposit",
                                e.target.value
                            )
                        }
                        error={errors.security_deposit}
                        className="pl-10 h-11 border-blue-200"
                        placeholder="0.00"
                    />
                </div>
            </div>
        </div>
    );
};

export default PricingSection;
