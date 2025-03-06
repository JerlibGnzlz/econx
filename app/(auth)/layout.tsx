import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Autenticación",
    description: "Autenticación para la aplicación de gestión de productos",
}

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
    )
}

