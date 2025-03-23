import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/authOptions"

// Mock data para el carrito (referencia a la misma variable que en route.ts)
let mockCartItems: any[] = []

// Especificar que esta ruta debe ejecutarse en Node.js
export const runtime = "nodejs"

// PUT - Actualizar la cantidad de un producto en el carrito
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = Number.parseInt(params.id)

        if (isNaN(id)) {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 })
        }

        const session = await getServerSession(authOptions)

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        const data = await request.json()

        // Validar datos
        if (data.quantity === undefined || data.quantity < 1) {
            return NextResponse.json({ error: "Cantidad debe ser mayor a 0" }, { status: 400 })
        }

        // Buscar el item en el carrito
        const itemIndex = mockCartItems.findIndex((item) => item.id === id)

        if (itemIndex === -1) {
            return NextResponse.json({ error: "Item no encontrado en el carrito" }, { status: 404 })
        }

        // Actualizar la cantidad
        mockCartItems[itemIndex].quantity = data.quantity

        return NextResponse.json(mockCartItems[itemIndex])
    } catch (error) {
        console.error("Error al actualizar item del carrito:", error)
        return NextResponse.json({ error: "Error al actualizar item del carrito" }, { status: 500 })
    }
}

// DELETE - Eliminar un producto del carrito
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = Number.parseInt(params.id)

        if (isNaN(id)) {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 })
        }

        const session = await getServerSession(authOptions)

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        // Filtrar el item del carrito
        const initialLength = mockCartItems.length
        mockCartItems = mockCartItems.filter((item) => item.id !== id)

        if (mockCartItems.length === initialLength) {
            return NextResponse.json({ error: "Item no encontrado en el carrito" }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: "Item eliminado del carrito" })
    } catch (error) {
        console.error("Error al eliminar item del carrito:", error)
        return NextResponse.json({ error: "Error al eliminar item del carrito" }, { status: 500 })
    }
}

