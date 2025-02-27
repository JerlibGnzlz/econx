import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Datos recibidos en el servidor:", body);

        return NextResponse.json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error("Error procesando la solicitud:", error);
        return NextResponse.json({ error: "Error en el registro" }, { status: 500 });
    }
}
