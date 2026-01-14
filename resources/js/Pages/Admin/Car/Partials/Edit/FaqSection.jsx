import React from "react";
import { Input } from "@/Components/ui/Input";
import { Plus, Trash2, ChevronDown, HelpCircle } from "lucide-react";

const FaqSection = ({
    data,
    errors,
    handleNestedChange,
    handleInputChange,
    removeRow,
    addRow,
}) => {
    const [expandedIndex, setExpandedIndex] = React.useState(0);

    const onToggleFaq = (e) => {
        const isChecked = e.target.checked;
        if (typeof handleInputChange === "function") {
            handleInputChange("has_faqs", isChecked);
        }
        if (isChecked && (!data.faqs || data.faqs.length === 0)) {
            addRow("faqs", { question: "", answer: "" });
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
            {/* Header Section */}
            <div className="px-4 py-3 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <HelpCircle className="text-slate-400" size={18} />
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-tight">
                        Frequently Asked Questions
                    </h3>
                </div>

                {/* Toggle Switch */}
                <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-500">
                        Show FAQs
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={!!data.has_faqs}
                            onChange={onToggleFaq}
                        />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-slate-900"></div>
                    </label>
                </div>
            </div>

            {data.has_faqs && (
                <div className="p-4 space-y-3">
                    {/* FAQ Items */}
                    <div className="space-y-2">
                        {data.faqs?.map((faq, i) => (
                            <div
                                key={i}
                                className={`border rounded-sm transition-all ${
                                    i === expandedIndex
                                        ? "ring-1 ring-slate-100"
                                        : "border-gray-200"
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setExpandedIndex(
                                            i === expandedIndex ? -1 : i
                                        )
                                    }
                                    className="w-full flex items-center justify-between p-3 text-left"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <span className="flex-shrink-0 w-5 h-5 bg-slate-100 rounded text-[10px] flex items-center justify-center font-bold text-slate-500">
                                            {i + 1}
                                        </span>
                                        <span
                                            className={`text-sm truncate ${
                                                faq.question
                                                    ? "text-slate-900 font-medium"
                                                    : "text-slate-400 italic"
                                            }`}
                                        >
                                            {faq.question || "Empty Question"}
                                        </span>
                                    </div>
                                    <ChevronDown
                                        size={16}
                                        className={`text-slate-400 transition-transform duration-200 ${
                                            i === expandedIndex
                                                ? "rotate-180 text-slate-900"
                                                : ""
                                        }`}
                                    />
                                </button>

                                {i === expandedIndex && (
                                    <div className="px-3 pb-3 space-y-3">
                                        <div className="space-y-1">
                                            <Input
                                                placeholder="Enter Question"
                                                value={faq.question}
                                                onChange={(e) =>
                                                    handleNestedChange(
                                                        "faqs",
                                                        i,
                                                        "question",
                                                        e.target.value
                                                    )
                                                }
                                                error={
                                                    errors[`faqs.${i}.question`]
                                                }
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Input
                                                placeholder="Enter Answer"
                                                isTextArea
                                                rows={2}
                                                value={faq.answer}
                                                onChange={(e) =>
                                                    handleNestedChange(
                                                        "faqs",
                                                        i,
                                                        "answer",
                                                        e.target.value
                                                    )
                                                }
                                                error={
                                                    errors[`faqs.${i}.answer`]
                                                }
                                            />
                                        </div>

                                        <div className="flex justify-end pt-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeRow("faqs", i)
                                                }
                                                className="flex items-center gap-1 text-[11px] font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-wider"
                                            >
                                                <Trash2 size={12} />
                                                Remove Item
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Add New Button */}
                    <button
                        type="button"
                        onClick={() => {
                            addRow("faqs", { question: "", answer: "" });
                            setExpandedIndex(data.faqs?.length || 0);
                        }}
                        className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:border-slate-900 hover:text-slate-900 hover:bg-slate-50 transition-all"
                    >
                        <Plus size={16} />
                        Add New FAQ
                    </button>
                </div>
            )}
        </div>
    );
};

export default FaqSection;
