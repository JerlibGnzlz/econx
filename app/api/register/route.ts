import { createUser } from "@/app/lib/userServices"
import { type NextRequest, NextResponse } from "next/server"
// import { createUser } from "@/app/lib/userservices"
import { z } from "zod"

// Esquema de validación para el registro
const registerSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
})

export async function POST(request: NextRequest) {
    try {
        // Obtener y validar los datos del cuerpo de la solicitud
        const body = await request.json()
        const validationResult = registerSchema.safeParse(body)

        if (!validationResult.success) {
            return NextResponse.json(
                { error: "Datos de registro inválidos", details: validationResult.error.format() },
                { status: 400 },
            )
        }

        // Crear el usuario en la base de datos
        const userData = validationResult.data
        const user = await createUser(userData)

        // Retornar respuesta exitosa (sin incluir la contraseña)
        return NextResponse.json(
            {
                message: "Usuario registrado exitosamente",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 201 },
        )
    } catch (error) {
        console.error("Error al registrar usuario:", error)

        // Manejar error de correo electrónico duplicado
        if (error instanceof Error && error.message === "El correo electrónico ya está registrado") {
            return NextResponse.json({ error: error.message }, { status: 409 })
        }

        // Manejar otros errores
        return NextResponse.json({ error: "Error al registrar usuario" }, { status: 500 })
    }
}

