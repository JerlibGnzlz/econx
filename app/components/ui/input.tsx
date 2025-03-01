
import { cn } from "@/app/lib/utils"
import * as React from "react"
// import { cn } from "@/lib/utils"

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn(
                    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                    className
                )}
                {...props}
            />
        )
    }
)

Input.displayName = "Input"
