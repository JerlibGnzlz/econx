// // import { db } from "@/db";
// import bcrypt from "bcryptjs";
// import { db } from "./drizzle";
// // import jwt from "jsonwebtoken";
// import { users } from './schema';

// export async function registerUser(name: string, email: string, password: string) {
//     // Verificar si el usuario ya existe
//     const existingUser = await db.query.users.findFirst({
//         where: (user, { eq }) => eq(user.email, email),
//     });

//     if (existingUser) {
//         return { error: "El usuario ya está registrado" };
//     }

//     // Hashear la contraseña
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insertar usuario en la BD
//     await db.insert(users).values({
//         username: name,
//         email,
//         password: hashedPassword,
//     });

//     return { success: "Registro exitoso" };
// }

// export async function loginUser(email: string, password: string) {
//     const user = await db.query.users.findFirst({
//         where: (user, { eq }) => eq(user.email, email),
//     });

//     if (!user) {
//         return { error: "Usuario no encontrado" };
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//         return { error: "Contraseña incorrecta" };
//     }

//     const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
//         expiresIn: "7d",
//     });

//     return { success: "Login exitoso", token };
// }
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "./drizzle";
import { users } from './schema';

export async function registerUser(name: string, email: string, password: string) {
    try {
        // Verificar si el usuario ya existe
        const existingUser = await db.query.users.findFirst({
            where: (user, { eq }) => eq(user.email, email),
        });

        if (existingUser) {
            return { error: "El usuario ya está registrado" };
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar usuario en la BD
        await db.insert(users).values({
            username: name,
            email,
            password: hashedPassword,
        });

        return { success: "Registro exitoso" };
    } catch (error) {
        console.error("Error en registerUser:", error);
        return { error: "Error en el servidor" };
    }
}

export async function loginUser(email: string, password: string) {
    try {
        // Buscar el usuario en la BD
        const user = await db.query.users.findFirst({
            where: (user, { eq }) => eq(user.email, email),
        });

        if (!user) {
            return { error: "Usuario no encontrado" };
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return { error: "Contraseña incorrecta" };
        }

        // Verificar que JWT_SECRET esté definido
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET no está definido en las variables de entorno");
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        return { success: "Login exitoso", token };
    } catch (error) {
        console.error("Error en loginUser:", error);
        return { error: "Error en el servidor" };
    }
}