"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { ShoppingCart, LogOut, Menu, X } from "lucide-react"
import { useCart } from "./cart/cart-context"
import { useState } from "react"
import { Button } from "../components/ui/button"

export default function ShopHeader() {
    const { totalItems } = useCart()
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navLinks = [
        { href: "/products", label: "Productos" },
        { href: "/orders", label: "Mis Pedidos" },
        { href: "/profile", label: "Mi Perfil" },
    ]

    return (
        <header className="bg-white border-b sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/products" className="text-xl font-bold text-indigo-600">
                            Econx
                        </Link>
                    </div>

                    {/* Navegación para escritorio */}
                    <nav className="hidden md:flex items-center space-x-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === link.href ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center space-x-2">
                        <Link href="/cart">
                            <Button variant="ghost" className="relative">
                                <ShoppingCart className="h-5 w-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/login" })}>
                            <LogOut className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Botón de menú móvil */}
                    <div className="md:hidden">
                        <Button variant="ghost" onClick={toggleMenu}>
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Menú móvil */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === link.href ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <Link
                            href="/cart"
                            className="flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <div className="flex items-center">
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                Carrito
                            </div>
                            {totalItems > 0 && (
                                <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                        >
                            <LogOut className="h-5 w-5 mr-2" />
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}

