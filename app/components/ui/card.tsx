import { cn } from "@/app/lib/utils";
import clsx from "clsx";
import * as React from "react"


export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={cn("rounded-lg border bg-white p-6 shadow-md", className)}>
            {children}
        </div>
    )
}

export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={clsx("p-4 border-b", className)}>
        {children}
    </div>
);


export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
    return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>
}

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={clsx("p-4", className)}>
        {children}
    </div>
);


export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
    return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}

export const CardFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={clsx("p-4 border-t", className)}>
        {children}
    </div>
);