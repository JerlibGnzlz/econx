import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    // Lógica de inicio de sesión (por ejemplo, verificar credenciales)
    console.log("Iniciando sesión con:", { email, password });

    return NextResponse.json({ message: "Inicio de sesión exitoso" });
}