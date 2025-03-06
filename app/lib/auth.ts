import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "./authOptions"

export async function getSession() {
    return await getServerSession(authOptions)
}

export async function getCurrentUser() {
    const session = await getSession()
    return session?.user
}

export async function requireAuth() {
    const session = await getSession()

    if (!session) {
        redirect("/auth/login")
    }

    return session
}

