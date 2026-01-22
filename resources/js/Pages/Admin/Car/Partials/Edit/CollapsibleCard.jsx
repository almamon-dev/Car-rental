import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const CollapsibleCard = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className="bg-white border border-gray-200 rounded overflow-hidden shadow-sm">
            <button
                type="button"
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                onClick={onToggle}
            >
                <h3 className="text-[16px] font-semibold text-gray-900 capitalize">
                    {title}
                </h3>
                <div className="text-gray-400">
                    {isOpen ? (
                        <ChevronUp size={20} />
                    ) : (
                        <ChevronDown size={20} />
                    )}
                </div>
            </button>
            {isOpen && <div className="p-6">{children}</div>}
        </div>
    );
};

export default CollapsibleCard;
