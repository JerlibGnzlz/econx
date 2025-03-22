import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { eq, and } from "drizzle-orm"
import { authOptions } from "@/app/lib/authOptions"
import { orders, users } from "@/app/lib/schema"
import { db } from "@/app/lib/db"
// import { orders, users } from "@/db/schema"

// Especificar que esta ruta debe ejecutarse en Node.js
export const runtime = "nodejs"

// GET - Obtener un pedido por ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = Number.parseInt(params.id)

        if (isNaN(id)) {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 })
        }

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

        // Verificar si el usuario es admin o el propietario del pedido
        const isAdmin = user.isAdmin || user.role === "admin"

        // Obtener el pedido con sus detalles
        const order = await db.query.orders.findFirst({
            where: isAdmin ? eq(orders.id, id) : and(eq(orders.id, id), eq(orders.userId, user.id)),
            with: {
                details: {
                    with: {
                        product: true,
                    },
                },
            },
        })

        if (!order) {
            return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 })
        }

        return NextResponse.json(order)
    } catch (error) {
        console.error("Error al obtener pedido:", error)
        return NextResponse.json({ error: "Error al obtener pedido" }, { status: 500 })
    }
}

// PUT - Actualizar el estado de un pedido
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

        // Obtener el ID del usuario desde la sesión
        const user = await db.query.users.findFirst({
            where: eq(users.email, session.user.email),
        })

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
        }

        // Verificar si el usuario es admin o el propietario del pedido
        const isAdmin = user.isAdmin || user.role === "admin"

        // Obtener el pedido actual
        const existingOrder = await db.query.orders.findFirst({
            where: isAdmin ? eq(orders.id, id) : and(eq(orders.id, id), eq(orders.userId, user.id)),
        })

        if (!existingOrder) {
            return NextResponse.json({ error: "Pedido no encontrado o no tienes permiso para editarlo" }, { status: 404 })
        }

        // Verificar si el pedido puede ser modificado según su estado
        const nonModifiableStates = ["enviado", "entregado", "cancelado"]
        if (nonModifiableStates.includes(existingOrder.status) && !isAdmin) {
            return NextResponse.json(
                { error: `No se puede modificar un pedido en estado "${existingOrder.status}"` },
                { status: 400 },
            )
        }

        const data = await request.json()

        // Actualizar el pedido
        await db
            .update(orders)
            .set({
                status: data.status || existingOrder.status,
                updatedAt: new Date(),
            })
            .where(eq(orders.id, id))

        // Obtener el pedido actualizado con sus detalles
        const updatedOrder = await db.query.orders.findFirst({
            where: eq(orders.id, id),
            with: {
                details: {
                    with: {
                        product: true,
                    },
                },
            },
        })

        return NextResponse.json(updatedOrder)
    } catch (error) {
        console.error("Error al actualizar pedido:", error)
        return NextResponse.json({ error: "Error al actualizar pedido" }, { status: 500 })
    }
}

// DELETE - Cancelar un pedido
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

        // Obtener el ID del usuario desde la sesión
        const user = await db.query.users.findFirst({
            where: eq(users.email, session.user.email),
        })

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
        }

        // Verificar si el usuario es admin o el propietario del pedido
        const isAdmin = user.isAdmin || user.role === "admin"

        // Obtener el pedido actual
        const existingOrder = await db.query.orders.findFirst({
            where: isAdmin ? eq(orders.id, id) : and(eq(orders.id, id), eq(orders.userId, user.id)),
        })

        if (!existingOrder) {
            return NextResponse.json({ error: "Pedido no encontrado o no tienes permiso para cancelarlo" }, { status: 404 })
        }

        // Verificar si el pedido puede ser cancelado según su estado
        const nonCancelableStates = ["enviado", "entregado", "cancelado"]
        if (nonCancelableStates.includes(existingOrder.status) && !isAdmin) {
            return NextResponse.json(
                { error: `No se puede cancelar un pedido en estado "${existingOrder.status}"` },
                { status: 400 },
            )
        }

        // Cancelar el pedido (no lo eliminamos, solo cambiamos su estado)
        await db
            .update(orders)
            .set({
                status: "cancelado",
                updatedAt: new Date(),
            })
            .where(eq(orders.id, id))

        return NextResponse.json({ success: true, message: "Pedido cancelado correctamente" })
    } catch (error) {
        console.error("Error al cancelar pedido:", error)
        return NextResponse.json({ error: "Error al cancelar pedido" }, { status: 500 })
    }
}

