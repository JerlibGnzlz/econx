import { db } from "./db"
import { users, type NewUser, type User } from "./schema"
import { eq } from "drizzle-orm"
import { hash, compare } from "bcryptjs"

// Número de rondas para el hash de contraseña
const SALT_ROUNDS = 10

export async function createUser(userData: Omit<NewUser, "id" | "createdAt" | "updatedAt">): Promise<User> {
    // Verificar si el correo electrónico ya existe
    const existingUser = await getUserByEmail(userData.email)
    if (existingUser) {
        throw new Error("El correo electrónico ya está registrado")
    }

    // Hashear la contraseña
    const hashedPassword = await hash(userData.password, SALT_ROUNDS)

    // Crear el nuevo usuario con la contraseña hasheada
    const newUser: NewUser = {
        ...userData,
        password: hashedPassword,
    }

    // Insertar el usuario en la base de datos
    const result = await db.insert(users).values(newUser).returning()
    return result[0]
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email))
    return result[0]
}

export async function getUserById(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id))
    return result[0]
}

export async function verifyPassword(user: User, password: string): Promise<boolean> {
    return await compare(password, user.password)
}
