"use server"

import { cookies } from "next/headers"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { createSessionToken } from "@/lib/auth"
import type { AuthResult } from "@/lib/types"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

// Función para registrar un nuevo usuario
export async function registerUser(data: {
    name: string
    email: string
    password: string
}): Promise<AuthResult> {
    try {
        // Verificar si el correo ya está registrado
        const existingUser = await db.select({ id: users.id }).from(users).where(eq(users.email, data.email)).limit(1)

        if (existingUser.length > 0) {
            return {
                success: false,
                error: "El correo electrónico ya está registrado",
            }
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(data.password, 10)

        // Insertar el nuevo usuario
        await db.insert(users).values({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        })

        return { success: true }
    } catch (error) {
        console.error("Error al registrar usuario:", error)
        return {
            success: false,
            error: "Error al registrar usuario",
        }
    }
}

// Función para iniciar sesión
export async function loginUser(data: {
    email: string
    password: string
}): Promise<AuthResult> {
    try {
        // Buscar el usuario por email
        const [user] = await db.select().from(users).where(eq(users.email, data.email)).limit(1)

        if (!user) {
            return {
                success: false,
                error: "Credenciales inválidas",
            }
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(data.password, user.password)

        if (!passwordMatch) {
            return {
                success: false,
                error: "Credenciales inválidas",
            }
        }

        // Crear token de sesión
        const token = createSessionToken(user.id)

            // Guardar el token en una cookie
            ; (await
                // Guardar el token en una cookie
                cookies()).set({
                    name: "session-token",
                    value: token,
                    httpOnly: true,
                    path: "/",
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 60 * 60 * 24 * 7, // 7 días
                })

        revalidatePath("/dashboard")

        return { success: true }
    } catch (error) {
        console.error("Error al iniciar sesión:", error)
        return {
            success: false,
            error: "Error al iniciar sesión",
        }
    }
}

// Función para cerrar sesión
export async function logoutUser() {
    (await cookies()).delete("session-token")
    revalidatePath("/")
}

