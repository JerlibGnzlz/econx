import { cn } from "@/app/lib/utils";
import * as React from "react"
// import { cn } from "@/lib/utils"

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={cn("rounded-lg border bg-white p-6 shadow-md", className)}>
            {children}
        </div>
    )
}

export function CardHeader({ children }: { children: React.ReactNode }) {
    return <div className="mb-4">{children}</div>
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
    return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>
}

export function CardContent({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>
}
