// import Link from "next/link"
// import { getSession } from "../lib/auth"
// import { LogoutButton } from "./ui/logout-button"

// export async function Navbar() {
//     const session = await getSession()

//     return (
//         <nav className="bg-white shadow dark:bg-gray-800">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between h-16">
//                     <div className="flex items-center">
//                         <Link href="/" className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-400 text-transparent bg-clip-text">
//                             ONLINE SHOP 🛍️✨
//                         </Link>
//                     </div>

//                     {/* <div className="hidden md:flex space-x-4">
//                         <Link
//                             href="/products"
//                             className="text-gray-700 hover:text-gray-900 dark:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
//                         >
//                             Productos y Servicios
//                         </Link>
//                     </div> */}

//                     <div className="flex items-center">
//                         {session ? (
//                             <div className="flex items-center gap-4">
//                                 <span className="text-sm text-gray-700 dark:text-gray-200">{session.user.name}</span>
//                                 <LogoutButton />
//                             </div>
//                         ) : (
//                             <div className="flex items-center gap-4">
//                                 <Link href="/login" className="text-gray-700 hover:text-gray-900 dark:text-gray-200">
//                                     Iniciar Sesión
//                                 </Link>
//                                 <Link href="/register" className="text-gray-700 hover:text-gray-900 dark:text-gray-200">
//                                     Registrarse
//                                 </Link>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     )
// }


"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
// import { Button } from "@/components/ui/button"
import { ShoppingBag, Package, User, LogOut } from "lucide-react"
import CartIcon from "./cart-icon"
import { Button } from "./ui/button"
// import CartIcon from "@/components/cart-icon"

export function Navbar() {
    const pathname = usePathname()

    const isActive = (path: string) => {
        return pathname === path
    }

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-xl font-bold text-indigo-600">
                                <ShoppingBag className="h-6 w-6 inline-block mr-2" />
                                Mi Tienda
                            </Link>
                        </div>
                        <nav className="ml-6 flex space-x-4 sm:space-x-8">
                            <Link
                                href="/products"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive("/products")
                                    ? "border-indigo-500 text-gray-900"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    }`}
                            >
                                Productos
                            </Link>
                            <Link
                                href="/orders"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive("/orders")
                                    ? "border-indigo-500 text-gray-900"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    }`}
                            >
                                <Package className="h-4 w-4 mr-1" />
                                Mis Pedidos
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <CartIcon />
                        <Button variant="ghost" size="sm" className="text-gray-500">
                            <User className="h-5 w-5 mr-1" />
                            Mi Cuenta
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                            <LogOut className="h-5 w-5 mr-1" />
                            Salir
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

