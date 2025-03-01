"use client"

import Link from "next/link"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { Menu, ShoppingCart, Package, LogOut, LayoutDashboard, Users } from "lucide-react"

export function Sidebar() {
    // const { data: session } = useSession() // Obtiene la sesión del usuario
    const [isOpen, setIsOpen] = useState(false)

    // Si el usuario no está autenticado, no se muestra el Sidebar
    // if (!session) return null

    return (
        <div className="relative">
            {/* Botón para abrir/cerrar el Sidebar en móviles */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white bg-gray-800 rounded-md fixed top-20 left-4 z-50">
                <Menu size={28} />
            </button>

            {/* Sidebar */}
            <aside className={`fixed top-16 left-0 h-[calc(100vh-64px)] bg-gray-900 text-white w-64 transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-64"} lg:translate-x-0 lg:w-72 shadow-lg z-40`}>
                <div className="p-6 text-center">
                    <h1 className="text-2xl font-bold text-purple-400">Admin Panel</h1>
                </div>

                {/* Menú de Navegación */}
                <nav className="mt-4">
                    <ul>
                        <li>
                            <Link href="/dashboard" className="flex items-center px-6 py-3 hover:bg-gray-800 transition">
                                <LayoutDashboard className="mr-3" /> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/productos" className="flex items-center px-6 py-3 hover:bg-gray-800 transition">
                                <Package className="mr-3" /> Productos
                            </Link>
                        </li>
                        <li>
                            <Link href="/pedidos" className="flex items-center px-6 py-3 hover:bg-gray-800 transition">
                                <ShoppingCart className="mr-3" /> Pedidos
                            </Link>
                        </li>
                        <li>
                            <Link href="/usuarios" className="flex items-center px-6 py-3 hover:bg-gray-800 transition">
                                <Users className="mr-3" /> Usuarios
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Botón de Logout */}
                <div className="absolute bottom-5 left-0 w-full">
                    <button className="flex items-center w-full px-6 py-3 text-red-400 hover:bg-gray-800 transition">
                        <LogOut className="mr-3" /> Cerrar Sesión
                    </button>
                </div>
            </aside>
        </div>
    )
}
