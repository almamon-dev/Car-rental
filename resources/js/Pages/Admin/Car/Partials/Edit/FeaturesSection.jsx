import React from "react";
import { Trash2, Plus, CheckCircle2 } from "lucide-react";

const FeaturesSection = ({
    data,
    errors,
    handleNestedChange,
    removeRow,
    addRow,
}) => {
    const features = Array.isArray(data.features)
        ? data.features
        : [{ feature_name: "" }];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((f, i) => (
                    <div
                        key={i}
                        className="group flex items-center gap-3 bg-white p-1.5 px-3 rounded border border-gray-200 hover:border-gray-300 transition-all focus-within:ring-1 focus-within:ring-[#0a66c2]/10 focus-within:border-[#0a66c2]"
                    >
                        <div className="text-[#0a66c2]">
                            <CheckCircle2 size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="e.g. Leather Seats"
                            value={f.feature_name || ""}
                            onChange={(e) =>
                                handleNestedChange("features", i, "feature_name", e.target.value)
                            }
                            className="flex-1 bg-transparent border-none focus:ring-0 text-[14px] text-gray-800 placeholder:text-gray-400 py-1.5 transition-all outline-none"
                        />
                        {features.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeRow("features", i)}
                                className="p-1.5 text-gray-300 hover:text-red-600 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                        {errors[`features.${i}.feature_name`] && (
                            <span className="text-red-600 text-[10px] whitespace-nowrap">
                                *Required
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={() => addRow("features", { feature_name: "" })}
                className="w-full py-3 border-2 border-dashed border-gray-200 rounded-md flex items-center justify-center gap-2 text-[14px] font-semibold text-[#0a66c2] hover:bg-blue-50/50 hover:border-[#0a66c2]/30 transition-all"
            >
                <Plus size={18} />
                Add Vehicle Feature
            </button>
        </div>
    );
};
export default FeaturesSection;
