import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { name, email, password } = await req.json();

    // Lógica de registro (por ejemplo, guardar en la base de datos)
    console.log("Registrando usuario:", { name, email, password });

    return NextResponse.json({ message: "Usuario registrado exitosamente" });
}