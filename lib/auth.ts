import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import type { SessionType, UserType } from "@/lib/types"
import { verify, sign } from "jsonwebtoken"
import { cache } from "react"
import "server-only"

// Clave secreta para firmar los tokens JWT
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Función para obtener la sesión actual (cacheada)
export const getSession = cache(async (): Promise<SessionType | null> => {
    const cookieStore = await cookies()
    const token = cookieStore.get("session-token")

    if (!token) {
        return null
    }

    try {
        // Verificar y decodificar el token
        const decoded = verify(token.value, JWT_SECRET) as {
            userId: number
            exp: number
        }

        // Verificar si el token ha expirado
        if (Date.now() >= decoded.exp * 1000) {
            return null
        }

        // Obtener el usuario de la base de datos
        const [user] = await db.select().from(users).where(eq(users.id, decoded.userId))

        if (!user) {
            return null
        }

        // Crear un objeto de usuario sin la contraseña
        const userWithoutPassword: UserType = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        }

        return {
            user: userWithoutPassword,
            expires: new Date(decoded.exp * 1000).toISOString(),
        }
    } catch (error) {
        console.error("Error al verificar la sesión:", error)
        return null
    }
})

// Función para crear un token de sesión
export function createSessionToken(userId: number): string {
    // Crear un token que expire en 7 días
    const expiresIn = 60 * 60 * 24 * 7 // 7 días en segundos

    return sign(
        {
            userId,
            exp: Math.floor(Date.now() / 1000) + expiresIn,
        },
        JWT_SECRET,
    )
}

// Middleware para proteger rutas
export async function requireAuth() {
    const session = await getSession()

    if (!session) {
        redirect("/login")
    }

    return session
}

// Función para obtener el usuario actual (DTO)
export async function getCurrentUserDTO() {
    const session = await getSession()

    if (!session) {
        return null
    }

    // Devolver solo los datos necesarios (DTO) [^1]
    return {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
    }
}

