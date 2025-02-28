import bcrypt from "bcryptjs";
import { db } from "./db"; // Asegúrate de que la conexión esté bien definida
import { users } from "./schema";
import { eq } from "drizzle-orm";

export async function registerUser(name: string, email: string, password: string) {
    try {
        // Verificar si el usuario ya existe
        const existingUser = await db.select().from(users).where(eq(users.email, email));

        if (existingUser.length > 0) {
            return { error: "El usuario ya está registrado" };
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar usuario en la BD
        await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
        });

        return { success: "Registro exitoso" };
    } catch (error) {
        console.error("❌ Error en registerUser:", error);
        return { error: "Error en el servidor" };
    }
}
