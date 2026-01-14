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
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((f, i) => (
                    <div
                        key={i}
                        className="group relative flex items-center gap-2 bg-gray-50 p-2 rounded-sm border border-transparent hover:border-blue-200 hover:bg-white transition-all"
                    >
                        <div className="pl-2 text-blue-500">
                            <CheckCircle2 size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Feature name..."
                            value={f?.feature_name || ""}
                            onChange={(e) =>
                                handleNestedChange(
                                    "features",
                                    i,
                                    "feature_name",
                                    e.target.value
                                )
                            }
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-1.5"
                        />
                        {features.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeRow("features", i)}
                                className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                        {errors[`features.${i}.feature_name`] && (
                            <p className="absolute -bottom-5 left-0 text-[10px] text-red-500">
                                {errors[`features.${i}.feature_name`]}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={() => addRow("features", { feature_name: "" })}
                className="flex items-center gap-2 px-4 py-3 text-blue-600 hover:text-blue-700 font-bold text-xs uppercase tracking-widest hover:bg-blue-50 rounded-sm transition-all border border-dashed border-blue-200 w-full justify-center mt-4"
            >
                <Plus size={16} />
                Add Feature
            </button>
        </div>
    );
};
export default FeaturesSection;
