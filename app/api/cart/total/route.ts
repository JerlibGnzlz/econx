import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/authOptions"

// Mock data para el carrito (referencia a la misma variable que en route.ts)
const mockCartItems: any[] = []

// Especificar que esta ruta debe ejecutarse en Node.js
export const runtime = "nodejs"

// GET - Obtener el total del carrito
export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        // Calcular el total
        const total = mockCartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

        return NextResponse.json({ total })
    } catch (error) {
        console.error("Error al calcular el total del carrito:", error)
        return NextResponse.json({ error: "Error al calcular el total del carrito" }, { status: 500 })
    }
}

