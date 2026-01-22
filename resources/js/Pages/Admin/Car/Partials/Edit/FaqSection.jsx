import React from "react";
import { Input } from "@/Components/ui/Input";
import { Plus, Trash2 } from "lucide-react";

const FaqSection = ({
    data,
    errors,
    handleNestedChange,
    handleInputChange,
    removeRow,
    addRow,
}) => {
    return (
        <div className="space-y-6">
            {data.has_faqs && (
                <div className="space-y-4 animate-in fade-in duration-500">
                    <div className="space-y-3">
                        {data.faqs?.map((faq, i) => (
                            <div
                                key={i}
                                className="group bg-white border border-gray-200 rounded-md overflow-hidden transition-all hover:border-gray-300"
                            >
                                <div className="flex items-start gap-4 p-5">
                                    <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded text-[12px] flex items-center justify-center font-bold text-gray-500">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <Input
                                            label={`Question ${i + 1}`}
                                            placeholder="e.g. Is insurance included in the rental price?"
                                            value={faq.question}
                                            onChange={(e) =>
                                                handleNestedChange("faqs", i, "question", e.target.value)
                                            }
                                            error={errors[`faqs.${i}.question`]}
                                        />
                                        <Input
                                            isTextArea
                                            label="Public Answer"
                                            placeholder="Provide a clear and concise answer for potential customers..."
                                            value={faq.answer}
                                            onChange={(e) =>
                                                handleNestedChange("faqs", i, "answer", e.target.value)
                                            }
                                            error={errors[`faqs.${i}.answer`]}
                                            className="min-h-[80px]"
                                        />
                                        {data.faqs.length > 1 && (
                                            <div className="flex justify-end pt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => removeRow("faqs", i)}
                                                    className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-500 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                    Remove Question
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            addRow("faqs", { question: "", answer: "" });
                        }}
                        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-md flex items-center justify-center gap-2 text-[14px] font-semibold text-[#0a66c2] hover:bg-blue-50/50 hover:border-[#0a66c2]/30 transition-all"
                    >
                        <Plus size={18} />
                        Add Another Question
                    </button>
                </div>
            )}
        </div>
    );
};

export default FaqSection;
