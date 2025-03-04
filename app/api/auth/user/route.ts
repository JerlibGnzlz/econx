import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
// import { authOptions } from "../[...nextauth]/route"
import { db } from "@/app/lib/db"
import { users } from "@/app/lib/schema"
import { authOptions } from "@/app/lib/authOptions"

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        const user = await db.query.users.findFirst({
            where: eq(users.email, session.user.email),
        })

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
        }

        // No devolver la contraseña
        const { password, ...userWithoutPassword } = user

        return NextResponse.json(userWithoutPassword)
    } catch (error) {
        console.error("Error al obtener usuario:", error)
        return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        const data = await request.json()

        // Validar datos
        if (!data.name) {
            return NextResponse.json({ error: "El nombre es requerido" }, { status: 400 })
        }

        // Actualizar usuario
        await db
            .update(users)
            .set({
                name: data.name,
                updatedAt: new Date(),
            })
            .where(eq(users.email, session.user.email))

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error al actualizar usuario:", error)
        return NextResponse.json({ error: "Error al actualizar usuario" }, { status: 500 })
    }
}

