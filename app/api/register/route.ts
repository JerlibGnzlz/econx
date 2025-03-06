import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/app/lib/db"
import { users } from "@/app/lib/schema"
import { eq } from "drizzle-orm"

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json()

        // Validar los datos de entrada
        if (!name || !email || !password) {
            return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 })
        }

        // Verificar si el usuario ya existe
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email),
        })

        if (existingUser) {
            return NextResponse.json({ error: "El usuario ya está registrado" }, { status: 400 })
        }

        // Hashear la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10)

        // Crear el usuario en la base de datos
        const newUser = await db
            .insert(users)
            .values({
                name,
                email,
                password: hashedPassword,
                role: "user",
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning()

        // Retornar el usuario recién creado (sin la contraseña)
        return NextResponse.json({
            id: newUser[0].id,
            name: newUser[0].name,
            email: newUser[0].email,
            role: newUser[0].role,
        })
    } catch (error) {
        console.error("Error al registrar usuario:", error)
        return NextResponse.json({ error: "Error al registrar usuario" }, { status: 500 })
    }
}
