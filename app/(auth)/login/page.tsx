import { Suspense } from "react"
import LoginForm from "./formulario"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Bienvenido de nuevo</h1>
                    <p className="mt-2 text-gray-600">Inicie sesión para acceder a su cuenta</p>
                </div>
                <Suspense fallback={<div>Cargando...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    )
}

