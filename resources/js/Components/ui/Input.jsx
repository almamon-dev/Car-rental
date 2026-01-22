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
                    <label className="text-[13px] font-semibold text-gray-700 block">
                        {label}
                    </label>
                )}

                <Component
                    type={!isTextArea ? type : undefined}
                    className={cn(
                        "block w-full rounded border border-gray-300 bg-white px-3 py-2 text-[14px] transition-all",
                        "placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-0",
                        error
                            ? "border-red-600 focus:border-red-600 focus:ring-red-600/10"
                            : "border-gray-300 focus:border-[#0a66c2] focus:ring-[#0a66c2]/10",
                        isTextArea ? "min-h-[140px] resize-y" : "h-[40px]",
                        "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500",
                        "hover:border-gray-400 focus:bg-white",
                        // Resetting any internal browser centering and fixing the date icon
                        type === "date" && "appearance-none [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:p-0 [&::-webkit-calendar-picker-indicator]:m-0",
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                {error && (
                    <p className="text-[12px] font-medium text-red-600 mt-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
export { Input };
