import Link from "next/link"
import { getSession } from "../lib/auth"
import { LogoutButton } from "./ui/logout-button"

export async function Navbar() {
    const session = await getSession()

    return (
        <nav className="bg-white shadow dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-400 text-transparent bg-clip-text">
                            ONLINE SHOP 🛍️✨
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-4">
                        <Link
                            href="/productos"
                            className="text-gray-700 hover:text-gray-900 dark:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Productos y Servicios
                        </Link>
                        {/* Otros enlaces de navegación */}
                    </div>

                    <div className="flex items-center">
                        {session ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-700 dark:text-gray-200">{session.user.name}</span>
                                <LogoutButton />
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/login" className="text-gray-700 hover:text-gray-900 dark:text-gray-200">
                                    Iniciar Sesión
                                </Link>
                                <Link href="/register" className="text-gray-700 hover:text-gray-900 dark:text-gray-200">
                                    Registrarse
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
