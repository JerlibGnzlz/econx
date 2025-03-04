import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { eq } from "drizzle-orm"
import { authOptions } from "@/app/lib/authOptions"
import { db } from "@/app/lib/db"
import { products, users } from "@/app/lib/schema"

// GET - Obtener productos del usuario actual
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

        // Obtener productos del usuario
        const userProducts = await db.query.products.findMany({
            where: eq(products.userId, user.id),
            orderBy: (products, { desc }) => [desc(products.createdAt)],
        })

        return NextResponse.json(userProducts)
    } catch (error) {
        console.error("Error al obtener productos:", error)
        return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 })
    }
}

// POST - Crear un nuevo producto asociado al usuario actual
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
        if (!data.name || data.price === undefined) {
            return NextResponse.json({ error: "Nombre y precio son requeridos" }, { status: 400 })
        }

        // Crear producto asociado al usuario
        const newProduct = await db
            .insert(products)
            .values({
                name: data.name,
                description: data.description || "",
                price: data.price,
                image: data.image || "",
                userId: user.id, // Asociar al usuario actual
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning()

        return NextResponse.json(newProduct[0])
    } catch (error) {
        console.error("Error al crear producto:", error)
        return NextResponse.json({ error: "Error al crear producto" }, { status: 500 })
    }
}

