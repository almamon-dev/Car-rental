import { useState } from "react";
import { Check, Settings2, ShieldCheck, Zap } from "lucide-react";
import { extraServices } from "./data";


export default function ExtraServices({
    selectedExtras,
    handleExtraServiceToggle,
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full bg-white rounded-[8px] border border-gray-100 overflow-hidden">
            {/* Header / Interactive Toggle */}
            <div
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-50 transition-colors border-b border-gray-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    <Settings2 size={14} className="text-[#0a66c2]" />
                    <h3 className="text-[11px] font-bold text-gray-900">
                        Asset Enhancements
                    </h3>
                </div>
                
                {/* Institutional Switch Component */}
                <div
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-300 focus:outline-none ${
                        isOpen ? "bg-[#0a66c2]" : "bg-gray-200"
                    }`}
                >
                    <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${
                            isOpen ? "translate-x-5" : "translate-x-0.5"
                        }`}
                    />
                </div>
            </div>

            {/* Collapsible Manifest */}
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="p-2 space-y-1">
                    {extraServices.map((service) => (
                        <div
                            key={service.id}
                            onClick={() => handleExtraServiceToggle(service)}
                            className={`flex items-center justify-between px-3 py-2 rounded-[4px] cursor-pointer transition-all border ${
                                selectedExtras.includes(service.id)
                                    ? "bg-blue-50 border-[#0a66c2]/30"
                                    : "bg-white border-transparent hover:border-gray-100"
                            }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <div className={`transition-colors ${selectedExtras.includes(service.id) ? "text-[#0a66c2]" : "text-gray-300"}`}>
                                     {/* Simplified icon rendering or generic bullet */}
                                     {service.popular ? <Zap size={12} fill="currentColor" /> : <ShieldCheck size={12} />}
                                </div>
                                <div className="leading-tight">
                                    <div className={`text-[12px] font-bold transition-colors ${selectedExtras.includes(service.id) ? "text-[#0a66c2]" : "text-gray-700"}`}>
                                        {service.name}
                                    </div>
                                    <div className="text-[9px] font-medium text-gray-400">Operational Upgrade</div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <span className="text-[11px] font-black text-gray-900">+${service.price}</span>
                                <div
                                    className={`w-4 h-4 rounded-full border transition-all flex items-center justify-center ${
                                        selectedExtras.includes(service.id)
                                            ? "bg-[#0a66c2] border-[#0a66c2]"
                                            : "bg-gray-50 border-gray-200"
                                    }`}
                                >
                                    {selectedExtras.includes(service.id) && (
                                        <Check
                                            size={10}
                                            strokeWidth={3}
                                            className="text-white"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
