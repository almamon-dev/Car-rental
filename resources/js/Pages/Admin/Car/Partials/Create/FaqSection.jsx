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
                    {data.faqs?.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex items-start gap-4 p-6">
                                <div className="flex-1 space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-1">
                                            Question
                                        </label>
                                        <Input
                                            placeholder="e.g. Is insurance included in the rental price?"
                                            value={faq.question}
                                            onChange={(e) =>
                                                handleNestedChange("faqs", i, "question", e.target.value)
                                            }
                                            error={errors[`faqs.${i}.question`]}
                                            className="bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-lg"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-1">
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
                                            className="min-h-[100px] bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-lg"
                                        />
                                    </div>
                                    <div className="flex justify-end border-t border-slate-50 pt-4 mt-2">
                                        <button
                                            type="button"
                                            onClick={() => removeRow("faqs", i)}
                                            className="flex items-center gap-2 text-[12px] font-bold text-slate-400 hover:text-red-500 transition-all px-3 py-1.5 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 size={14} />
                                            Remove Item
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
                    className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-[#0a66c2] hover:bg-slate-50 hover:border-[#0a66c2]/40 transition-all group"
                >
                    <div className="w-6 h-6 rounded-full bg-[#0a66c2]/10 flex items-center justify-center group-hover:bg-[#0a66c2]/20 transition-colors">
                        <Plus size={16} />
                    </div>
                    Add Frequently Asked Question
                </button>
            </div>
        </div>
    );
};

export default FaqSection;
