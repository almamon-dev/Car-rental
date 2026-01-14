import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(
    (
        {
            className,
            type = "text",
            label,
            error,
            isTextArea = false,
            ...props
        },
        ref
    ) => {
        const Component = isTextArea ? "textarea" : "input";

        return (
            <div className="w-full space-y-1.5 text-left">
                {label && (
                    <label className="text-[13px] font-semibold text-gray-700 ml-0.5 uppercase tracking-wide">
                        {label}
                    </label>
                )}

                <Component
                    type={!isTextArea ? type : undefined}
                    className={cn(
                        "flex w-full rounded-md bg-white px-3 py-2 text-sm transition-colors border",
                        "placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-0",
                        // Border logic: matching the image's light blue border
                        error
                            ? "border-red-500 focus:border-red-600 focus:ring-red-500/20"
                            : "border-blue-200 focus:border-[#3B82F6] focus:ring-[#3B82F6]/20",
                        isTextArea ? "min-h-[100px] resize-y" : "h-11", // height adjusted to match image
                        "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                {error && (
                    <p className="text-[11px] font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
export { Input };
