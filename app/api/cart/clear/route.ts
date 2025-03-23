import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/authOptions"

// Mock data para el carrito (referencia a la misma variable que en route.ts)
let mockCartItems: any[] = []

// Especificar que esta ruta debe ejecutarse en Node.js
export const runtime = "nodejs"

// DELETE - Vaciar el carrito
export async function DELETE() {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        // Vaciar el carrito
        mockCartItems = []

        return NextResponse.json({ success: true, message: "Carrito vaciado" })
    } catch (error) {
        console.error("Error al vaciar el carrito:", error)
        return NextResponse.json({ error: "Error al vaciar el carrito" }, { status: 500 })
    }
}

