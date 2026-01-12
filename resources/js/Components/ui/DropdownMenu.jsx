// components/ui/DropdownMenu.jsx
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuContent = React.forwardRef(
    ({ className, sideOffset = 4, ...props }, ref) => (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                ref={ref}
                sideOffset={sideOffset}
                className={cn(
                    // z-50: অন্যান্য এলিমেন্টের উপরে থাকার জন্য
                    // w-[var(--radix-dropdown-menu-trigger-width)]: ট্রিগারের সমান প্রশস্ত হওয়ার জন্য
                    // max-h-[300px] overflow-y-auto: নির্দিষ্ট উচ্চতার পর স্ক্রল করার জন্য
                    "z-50 w-[var(--radix-dropdown-menu-trigger-width)] min-w-[8rem] max-h-[300px] overflow-y-auto overflow-x-hidden rounded-md border border-[#3B82F6]/50 bg-white p-0 text-popover-foreground shadow-md animate-in fade-in-80",
                    "scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent", // কাস্টম স্ক্রলবার (ঐচ্ছিক)
                    className
                )}
                {...props}
            />
        </DropdownMenuPrimitive.Portal>
    )
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef(
    ({ className, inset, active, ...props }, ref) => (
        <DropdownMenuPrimitive.Item
            ref={ref}
            className={cn(
                "relative flex cursor-pointer select-none items-center px-4 py-2.5 text-sm outline-none transition-colors focus:bg-[#3B82F6] focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                active
                    ? "bg-[#3B82F6] text-white"
                    : "text-gray-500 hover:bg-gray-50",
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
