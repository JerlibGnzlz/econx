"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/app/lib/utils"

export function Slider({ className, ...props }: SliderPrimitive.SliderProps) {
    return (
        <SliderPrimitive.Root
            className={cn("relative flex items-center select-none touch-none w-full h-5", className)}
            {...props}
        >
            <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-1">
                <SliderPrimitive.Range className="absolute bg-black rounded-full h-full" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="block w-4 h-4 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-black" />
        </SliderPrimitive.Root>
    )
}
