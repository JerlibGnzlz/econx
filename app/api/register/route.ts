import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { users } from "@/app/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs"; // Usar bcrypt en lugar de bcryptjs
import * as z from "zod"; // Para validar los datos de entrada

// Definir esquema de validación con Zod
const registerSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
    email: z.string().email("Debe ser un correo válido."),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

// Función para hashear la contraseña con buenas prácticas
async function hashPassword(password: string): Promise<string> {
    const saltRounds = 12; // Usamos un costo mayor para mayor seguridad
    return await bcrypt.hash(password, saltRounds);
}

// Función principal del endpoint
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedData = registerSchema.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json({ error: parsedData.error.format() }, { status: 400 });
        }

        const { name, email, password } = parsedData.data;

        // Verificar si el usuario ya existe
        const existingUser = await db.select().from(users).where(eq(users.email, email));

        if (existingUser.length > 0) {
            return NextResponse.json({ error: "El usuario ya está registrado" }, { status: 400 });
        }

        // Hashear la contraseña
        const hashedPassword = await hashPassword(password);

        // Guardar en la base de datos
        await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({ message: "Usuario registrado exitosamente" }, { status: 201 });
    } catch (error) {
        console.error("❌ Error en el registro:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
