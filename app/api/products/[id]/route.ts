import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { eq, and } from "drizzle-orm"
import { authOptions } from "@/app/lib/authOptions"
import { db } from "@/app/lib/db"
import { products, users } from "@/app/lib/schema"

// GET - Obtener un producto por ID (verificando propiedad)
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

        // Obtener el producto verificando que pertenezca al usuario
        const product = await db.query.products.findFirst({
            where: and(eq(products.id, id), eq(products.userId, user.id)),
        })

        if (!product) {
            return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
        }

        return NextResponse.json(product)
    } catch (error) {
        console.error("Error al obtener producto:", error)
        return NextResponse.json({ error: "Error al obtener producto" }, { status: 500 })
    }
}

// PUT - Actualizar un producto por ID (verificando propiedad)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        const id = Number.parseInt(params.id)

        if (isNaN(id)) {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 })
        }

        // Obtener el ID del usuario desde la sesión
        const user = await db.query.users.findFirst({
            where: eq(users.email, session.user.email),
        })

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
        }

        // Verificar que el producto exista y pertenezca al usuario
        const existingProduct = await db.query.products.findFirst({
            where: and(eq(products.id, id), eq(products.userId, user.id)),
        })

        if (!existingProduct) {
            return NextResponse.json({ error: "Producto no encontrado o no tienes permiso para editarlo" }, { status: 404 })
        }

        const data = await request.json()

        // Validar datos
        if (!data.name || data.price === undefined) {
            return NextResponse.json({ error: "Nombre y precio son requeridos" }, { status: 400 })
        }

        // Actualizar producto
        await db
            .update(products)
            .set({
                name: data.name,
                description: data.description || "",
                price: data.price,
                image: data.image || "",
                updatedAt: new Date(),
            })
            .where(and(eq(products.id, id), eq(products.userId, user.id)))

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error al actualizar producto:", error)
        return NextResponse.json({ error: "Error al actualizar producto" }, { status: 500 })
    }
}

// DELETE - Eliminar un producto por ID (verificando propiedad)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        const id = Number.parseInt(params.id)

        if (isNaN(id)) {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 })
        }

        // Obtener el ID del usuario desde la sesión
        const user = await db.query.users.findFirst({
            where: eq(users.email, session.user.email),
        })

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
        }

        // Verificar que el producto exista y pertenezca al usuario
        const existingProduct = await db.query.products.findFirst({
            where: and(eq(products.id, id), eq(products.userId, user.id)),
        })

        if (!existingProduct) {
            return NextResponse.json({ error: "Producto no encontrado o no tienes permiso para eliminarlo" }, { status: 404 })
        }

        // Eliminar producto
        await db.delete(products).where(and(eq(products.id, id), eq(products.userId, user.id)))

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error al eliminar producto:", error)
        return NextResponse.json({ error: "Error al eliminar producto" }, { status: 500 })
    }
}

