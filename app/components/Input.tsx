
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={`p-2 border rounded-md w-full ${className}`}
            {...props}
        />
    );
}