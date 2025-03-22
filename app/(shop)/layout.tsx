import type React from "react"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/lib/authOptions"
import ShopHeader from "./shop-header"
import { CartProvider } from "./cart/cart-context"

export default async function ShopLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    // Redirigir a login si no hay sesión
    if (!session) {
        redirect("/login")
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <CartProvider>
                <ShopHeader />
                <main className="flex-grow py-6">{children}</main>
                <footer className="bg-white border-t py-6">
                    <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Online Shop - Sistema de Gestión de Productos
                    </div>
                </footer>
            </CartProvider>
        </div>
    )
}

