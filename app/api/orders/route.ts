import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { eq } from "drizzle-orm"
import { authOptions } from "@/app/lib/authOptions"
import { db } from "@/app/lib/db"
import { users, orders, products, orderDetails } from "@/app/lib/schema"
// import { db } from "@/db"
// import { orders, orderDetails, products, users } from "@/db/schema"

// Especificar que esta ruta debe ejecutarse en Node.js
export const runtime = "nodejs"

// GET - Obtener todos los pedidos del usuario actual
export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        // Obtener el ID del usuario desde la sesión
        const user = await db.query.users.findFirst({
            where: eq(users.email, session.user.email),
        })

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
        }

        // Obtener pedidos del usuario con sus detalles
        const userOrders = await db.query.orders.findMany({
            where: eq(orders.userId, user.id),
            orderBy: (orders, { desc }) => [desc(orders.createdAt)],
            with: {
                details: {
                    with: {
                        product: true,
                    },
                },
            },
        })

        return NextResponse.json(userOrders)
    } catch (error) {
        console.error("Error al obtener pedidos:", error)
        return NextResponse.json({ error: "Error al obtener pedidos" }, { status: 500 })
    }
}

// POST - Crear un nuevo pedido
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        // Obtener el ID del usuario desde la sesión
        const user = await db.query.users.findFirst({
            where: eq(users.email, session.user.email),
        })

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
        }

        const data = await request.json()

        // Validar datos
        if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
            return NextResponse.json({ error: "Se requieren items para el pedido" }, { status: 400 })
        }

        // Crear el pedido
        const [newOrder] = await db
            .insert(orders)
            .values({
                userId: user.id,
                status: "pendiente",
                date: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning()

        // Procesar cada item del pedido
        for (const item of data.items) {
            if (!item.productId || !item.quantity || item.quantity < 1) {
                continue // Saltamos items inválidos
            }

            // Obtener el producto para verificar que existe y obtener su precio
            const product = await db.query.products.findFirst({
                where: eq(products.id, item.productId),
            })

            if (!product) {
                continue // Saltamos productos que no existen
            }

            // Convertir el precio a número si es necesario
            const price = typeof product.price === "string" ? Number.parseFloat(product.price) : Number(product.price)

            // Crear el detalle del pedido
            await db.insert(orderDetails).values({
                orderId: newOrder.id,
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: String(price),
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        }

        // Obtener el pedido completo con sus detalles
        const completeOrder = await db.query.orders.findFirst({
            where: eq(orders.id, newOrder.id),
            with: {
                details: {
                    with: {
                        product: true,
                    },
                },
            },
        })

        return NextResponse.json(completeOrder)
    } catch (error) {
        console.error("Error al crear pedido:", error)
        return NextResponse.json({ error: "Error al crear pedido" }, { status: 500 })
    }
}

