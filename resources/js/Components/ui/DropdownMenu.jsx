import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react"; // install lucide-react if not present
import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

// Custom Trigger that matches Input style
const DropdownMenuTrigger = React.forwardRef(
    ({ className, children, ...props }, ref) => (
        <DropdownMenuPrimitive.Trigger
            ref={ref}
            className={cn(
                "flex h-11 w-full items-center justify-between rounded-md border border-blue-200 bg-white px-3 py-2 text-sm text-gray-500 transition-colors focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/20 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            {children}
            <ChevronDown className="h-4 w-4 opacity-50" />
        </DropdownMenuPrimitive.Trigger>
    )
);
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

const DropdownMenuContent = React.forwardRef(
    ({ className, sideOffset = 4, ...props }, ref) => (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                ref={ref}
                sideOffset={sideOffset}
                align="start"
                className={cn(
                    "z-50 w-[var(--radix-dropdown-menu-trigger-width)] min-w-[8rem] max-h-[300px] overflow-y-auto overflow-x-hidden rounded-md border border-gray-100 bg-white py-1 text-popover-foreground shadow-lg animate-in fade-in-80",
                    "scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent",
                    className
                )}
                {...props}
            />
        </DropdownMenuPrimitive.Portal>
    )
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef(
    ({ className, active, ...props }, ref) => (
        <DropdownMenuPrimitive.Item
            ref={ref}
            className={cn(
                "relative flex cursor-pointer select-none items-center px-4 py-2.5 text-[14px] outline-none transition-colors",
                active
                    ? "bg-[#3B82F6] text-white"
                    : "text-gray-700 focus:bg-gray-100 hover:bg-gray-50",
                className
            )}
            {...props}
        />
    )
);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
};
