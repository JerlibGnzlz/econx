
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/app/components/Input"
import { Button } from "@/app/components/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

// Esquema de validación con Zod
const registerSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
    email: z.string().email("Debe ser un correo válido."),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
})

type RegisterData = z.infer<typeof registerSchema>

export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = async (data: RegisterData) => {
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            const result = await response.json()
            if (!response.ok) {
                throw new Error(result.error || "Hubo un problema al registrar el usuario.")
            }

            alert("Registro exitoso 🎉")
            reset()
            router.push("/login")
        } catch (error) {
            alert(error instanceof Error ? error.message : "Error desconocido")
        }
    }

    return (
        <Card className="max-w-md mx-auto mt-10 p-6 shadow-lg">
            <CardHeader>
                <CardTitle className="text-center text-xl font-bold">Crear Cuenta</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Nombre */}
                    <div>
                        <Input type="text" placeholder="Nombre" {...register("name")} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Correo */}
                    <div>
                        <Input type="email" placeholder="Correo electrónico" {...register("email")} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Contraseña */}
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            {...register("password")}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Registrando..." : "Registrarse"}
                    </Button>

                    {/* Enlace al Login */}
                    <p className="text-center text-sm mt-2">
                        ¿Ya tienes una cuenta?{" "}
                        <button
                            type="button"
                            className="text-blue-600 hover:underline font-medium"
                            onClick={() => router.push("/login")}
                        >
                            Inicia sesión
                        </button>
                    </p>
                </form>
            </CardContent>
        </Card>
    )
}
