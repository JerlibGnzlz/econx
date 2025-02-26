
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline";
}

export function Button({ variant = "default", className, ...props }: ButtonProps) {
    const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors";
    const variantStyles = variant === "outline"
        ? "border border-blue-600 text-blue-600 hover:bg-blue-50"
        : "bg-blue-600 text-white hover:bg-blue-700";

    return (
        <button
            className={`${baseStyles} ${variantStyles} ${className}`}
            {...props}
        />
    );
}