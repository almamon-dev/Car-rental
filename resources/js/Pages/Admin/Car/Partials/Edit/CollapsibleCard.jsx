import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const CollapsibleCard = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
            <div
                className="px-5 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50/50 border-b border-gray-100"
                onClick={onToggle}
            >
                <h3 className="text-base font-semibold text-slate-800">
                    {title}
                </h3>
                <div className="text-gray-400">
                    {isOpen ? (
                        <ChevronUp size={20} />
                    ) : (
                        <ChevronDown size={20} />
                    )}
                </div>
            </div>
            {isOpen && <div className="p-6">{children}</div>}
        </div>
    );
};

export default CollapsibleCard;
