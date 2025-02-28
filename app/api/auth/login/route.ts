import { loginUser } from "@/app/lib/userServices";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
        }

        const response = await loginUser(email, password);
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error en el login:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}
