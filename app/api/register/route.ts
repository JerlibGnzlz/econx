import { NextResponse } from "next/server";
import { db } from "@/app/lib/db"; // Asegúrate de que la conexión a la DB está bien definida
import { users } from "@/app/lib/schema"; // Asegúrate de que este archivo define correctamente la tabla `users`
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
        }

        // Verificar si el usuario ya existe
        const existingUser = await db.select().from(users).where(eq(users.email, email));

        if (existingUser.length > 0) {
            return NextResponse.json({ error: "El usuario ya está registrado" }, { status: 400 });
        }

        // Guardar en la base de datos (⚠️ Recuerda usar bcrypt para hashear la contraseña en producción)
        await db.insert(users).values({
            name,
            email,
            password, // ⚠️ En producción, usa bcrypt.hash(password, 10)
        });

        return NextResponse.json({ message: "Usuario registrado exitosamente" }, { status: 201 });
    } catch (error) {
        console.error("❌ Error en el registro:", error);
        return NextResponse.json({ error: "Error al registrar el usuario" }, { status: 500 });
    }
}
