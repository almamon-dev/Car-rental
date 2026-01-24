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
            <div className="space-y-4">
                {features.map((f, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3"
                    >
                         <div className="flex-1">
                            <input
                                type="text"
                                placeholder="e.g. Leather Seats"
                                value={f.feature_name || ""}
                                onChange={(e) =>
                                    handleNestedChange("features", i, "feature_name", e.target.value)
                                }
                                className="flex h-[40px] w-full rounded border border-gray-300 bg-white px-3 py-2 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0a66c2]/10 focus:border-[#0a66c2] transition-all hover:border-gray-400"
                            />
                        </div>
                        {features.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeRow("features", i)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                            >
                                <Trash2 size={18} strokeWidth={2} />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={() => addRow("features", { feature_name: "" })}
                className="flex items-center gap-2 text-[14px] font-semibold text-[#0a66c2] hover:text-[#004182] hover:underline decoration-2 underline-offset-4 transition-all"
            >
                <Plus size={18} strokeWidth={2.5} />
                Add another feature
            </button>
        </div>
    );
};
export default FeaturesSection;
