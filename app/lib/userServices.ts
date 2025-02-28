

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import sql from "./db";


export async function registerUser(name: string, email: string, password: string) {
    try {
        // Verificar si el usuario ya existe
        const existingUser = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;

        if (existingUser.length > 0) {
            return { error: "El usuario ya está registrado" };
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar usuario en la BD
        await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})`;

        return { success: "Registro exitoso" };
    } catch (error) {
        console.error("❌ Error en registerUser:", error);
        return { error: "Error en el servidor" };
    }
}



export async function loginUser(email: string, password: string) {
    try {
        // Buscar el usuario en la BD
        const user = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;

        if (user.length === 0) {
            return { error: "Usuario no encontrado" };
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return { error: "Contraseña incorrecta" };
        }

        // Verificar que JWT_SECRET esté definido
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET no está definido en las variables de entorno");
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user[0].id, email: user[0].email }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        return { success: "Login exitoso", token };
    } catch (error) {
        console.error("❌ Error en loginUser:", error);
        return { error: "Error en el servidor" };
    }
}
