"use client"

import { Session } from "next-auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "./Button"

interface NavbarProps {
    session: Session | null
}

export function Navbar({ session }: NavbarProps) {
    const router = useRouter()

    return (
        <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md">
            {/* Usando Link en lugar de button */}
            <Link href="/" className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-400 text-transparent bg-clip-text">
                ONLINE SHOP 🛍️✨
            </Link>

            <div className="flex items-center space-x-4">
                {session ? (
                    <p className="text-slate-300">Bienvenido, {session.user?.name}</p>
                ) : (
                    <Button
                        onClick={() => router.push("/register")}
                        className="bg-[#312488] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#271b70] transition-all duration-300 ease-in-out"
                    >
                        Registrarse
                    </Button>
                )}
            </div>
        </nav>
    )
}

