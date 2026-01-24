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

    return (
        <div className="space-y-6">
            <div className="space-y-4">
            <div className="space-y-4">
                <div className="space-y-6">
                    {data.faqs?.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-white border border-gray-200 rounded-lg p-5"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-1 space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[14px] font-medium text-gray-700 block">
                                            Question
                                        </label>
                                        <Input
                                            placeholder="e.g. Is insurance included in the rental price?"
                                            value={faq.question}
                                            onChange={(e) =>
                                                handleNestedChange("faqs", i, "question", e.target.value)
                                            }
                                            error={errors[`faqs.${i}.question`]}
                                            className="bg-white border-gray-300 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]/10 rounded h-[40px]"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[14px] font-medium text-gray-700 block">
                                            Public Answer
                                        </label>
                                        <Input
                                            isTextArea
                                            placeholder="Provide a clear and concise answer for potential customers..."
                                            value={faq.answer}
                                            onChange={(e) =>
                                                handleNestedChange("faqs", i, "answer", e.target.value)
                                            }
                                            error={errors[`faqs.${i}.answer`]}
                                            className="min-h-[100px] bg-white border-gray-300 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]/10 rounded"
                                        />
                                    </div>
                                    <div className="flex justify-end pt-2">
                                        <button
                                            type="button"
                                            onClick={() => removeRow("faqs", i)}
                                            className="flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                            Remove
                                        </button>
                                    </div>
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
                    className="flex items-center gap-2 text-[14px] font-semibold text-[#0a66c2] hover:text-[#004182] hover:underline decoration-2 underline-offset-4 transition-all mt-4"
                >
                    <Plus size={18} strokeWidth={2.5} />
                    Add another question
                </button>
            </div>
            </div>
        </div>
    );
};

export default FaqSection;
