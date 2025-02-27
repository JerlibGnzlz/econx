// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();
//         console.log("Datos recibidos en el servidor:", body);

//         return NextResponse.json({ message: "Usuario registrado exitosamente" });
//     } catch (error) {
//         console.error("Error procesando la solicitud:", error);
//         return NextResponse.json({ error: "Error en el registro" }, { status: 500 });
//     }
// }

import { registerUser } from "@/app/lib/userServices";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
        }

        const response = await registerUser(name, email, password);
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error en el registro:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}
