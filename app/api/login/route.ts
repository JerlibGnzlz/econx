import { NextResponse } from "next/server"
// import { authOptions } from "../auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/authOptions"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    return NextResponse.json({
        message: "Sesión activa",
        user: session.user,
    })
}


