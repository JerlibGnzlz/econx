
import { cn } from "@/app/lib/utils"
import * as React from "react"
// import { cn } from "@/lib/utils"

export function Button({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={cn(
                "w-full px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-400",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
