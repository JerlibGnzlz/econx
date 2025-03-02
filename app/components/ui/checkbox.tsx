"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "@/app/lib/utils"

export function Checkbox({ className, ...props }: CheckboxPrimitive.CheckboxProps) {
    return (
        <CheckboxPrimitive.Root
            className={cn(
                "flex h-5 w-5 items-center justify-center rounded border border-gray-400 bg-white data-[state=checked]:bg-black",
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator className="text-white">
                <Check className="h-4 w-4" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    )
}
