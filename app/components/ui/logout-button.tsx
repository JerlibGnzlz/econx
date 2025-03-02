"use client"

import { signOut } from "next-auth/react"
import { Button } from "./button"
import { LogOut } from "lucide-react"

interface LogoutButtonProps {
    showIcon?: boolean
}

export function LogoutButton({ showIcon = true }: LogoutButtonProps) {
    const handleLogout = async () => {
        await signOut({ callbackUrl: "/login" })
    }

    return (
        <Button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 text-white hover:bg-red-700">
            {showIcon && <LogOut className="h-4 w-4" />}
            Cerrar Sesión
        </Button>
    )
}
