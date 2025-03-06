import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/lib/authOptions"
import LoginForm from "./formulario"

export default async function LoginPage() {
    const session = await getServerSession(authOptions)

    // Si ya hay una sesión activa, redirigir a la página de productos
    if (session) {
        redirect("/products")
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <LoginForm />
            </div>
        </div>
    )
}

