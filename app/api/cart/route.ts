import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/authOptions"

// Mock data para el carrito
const mockCartItems: any[] = []

// Especificar que esta ruta debe ejecutarse en Node.js
export const runtime = "nodejs"

// GET - Obtener todos los items del carrito
export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        // En una implementación real, obtendríamos los items del carrito de la base de datos
        // Aquí usamos datos mock
        return NextResponse.json(mockCartItems)
    } catch (error) {
        console.error("Error al obtener items del carrito:", error)
        return NextResponse.json({ error: "Error al obtener items del carrito" }, { status: 500 })
    }
}

// POST - Añadir un producto al carrito
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        const data = await request.json()

        // Validar datos
        if (!data.productId || !data.quantity) {
            return NextResponse.json({ error: "ID de producto y cantidad son requeridos" }, { status: 400 })
        }

        // Mock de producto
        const mockProduct = {
            id: data.productId,
            name: `Producto ${data.productId}`,
            description: "Descripción del producto",
            price: Math.floor(Math.random() * 100) + 10,
            image: `/placeholder.svg?height=200&width=300`,
        }

        // Verificar si el producto ya está en el carrito
        const existingItemIndex = mockCartItems.findIndex((item) => item.productId === data.productId)

        if (existingItemIndex >= 0) {
            // Actualizar cantidad si ya existe
            mockCartItems[existingItemIndex].quantity += data.quantity
            return NextResponse.json(mockCartItems[existingItemIndex])
        } else {
            // Añadir nuevo item si no existe
            const newItem = {
                id: Date.now(),
                productId: data.productId,
                quantity: data.quantity,
                product: mockProduct,
            }
            mockCartItems.push(newItem)
            return NextResponse.json(newItem)
        }
    } catch (error) {
        console.error("Error al añadir al carrito:", error)
        return NextResponse.json({ error: "Error al añadir al carrito" }, { status: 500 })
    }
}

