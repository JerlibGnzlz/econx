// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/app/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Input } from "@/app/components/ui/input"
// import Link from "next/link"

// export default function RegisterForm() {
//     const router = useRouter()
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//     })
//     const [errors, setErrors] = useState<Record<string, string>>({})
//     const [isLoading, setIsLoading] = useState(false)
//     const [serverError, setServerError] = useState("")

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target
//         setFormData((prev) => ({ ...prev, [name]: value }))

//         // Limpiar error del campo cuando el usuario comienza a escribir
//         if (errors[name]) {
//             setErrors((prev) => {
//                 const newErrors = { ...prev }
//                 delete newErrors[name]
//                 return newErrors
//             })
//         }
//     }

//     const validateForm = () => {
//         const newErrors: Record<string, string> = {}

//         if (!formData.name.trim()) {
//             newErrors.name = "El nombre es requerido"
//         }

//         if (!formData.email.trim()) {
//             newErrors.email = "El correo electrónico es requerido"
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = "Correo electrónico inválido"
//         }

//         if (!formData.password) {
//             newErrors.password = "La contraseña es requerida"
//         } else if (formData.password.length < 8) {
//             newErrors.password = "La contraseña debe tener al menos 8 caracteres"
//         }

//         if (formData.password !== formData.confirmPassword) {
//             newErrors.confirmPassword = "Las contraseñas no coinciden"
//         }

//         setErrors(newErrors)
//         return Object.keys(newErrors).length === 0
//     }

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()

//         if (!validateForm()) {
//             return
//         }

//         setIsLoading(true)
//         setServerError("")

//         try {
//             const response = await fetch("/api/register", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     name: formData.name,
//                     email: formData.email,
//                     password: formData.password,
//                 }),
//             })

//             const data = await response.json()

//             if (!response.ok) {
//                 throw new Error(data.error || "Error al registrar usuario")
//             }

//             // Registro exitoso, redirigir a la página de inicio de sesión
//             router.push("/auth/login?registered=true")
//         } catch (error) {
//             setServerError(error instanceof Error ? error.message : "Ocurrió un error al registrar")
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     return (
//         <Card className="w-full max-w-md mx-auto">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-bold">Crear cuenta</CardTitle>
//                 <CardDescription>Complete el formulario para registrarse</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="space-y-2">
//                         <label htmlFor="name" className="text-sm font-medium">
//                             Nombre completo
//                         </label>
//                         <Input
//                             id="name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             placeholder="Juan Pérez"
//                             required
//                         />
//                         {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
//                     </div>

//                     <div className="space-y-2">
//                         <label htmlFor="email" className="text-sm font-medium">
//                             Correo electrónico
//                         </label>
//                         <Input
//                             id="email"
//                             name="email"
//                             type="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="correo@ejemplo.com"
//                             required
//                         />
//                         {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
//                     </div>

//                     <div className="space-y-2">
//                         <label htmlFor="password" className="text-sm font-medium">
//                             Contraseña
//                         </label>
//                         <Input
//                             id="password"
//                             name="password"
//                             type="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                         />
//                         {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
//                     </div>

//                     <div className="space-y-2">
//                         <label htmlFor="confirmPassword" className="text-sm font-medium">
//                             Confirmar contraseña
//                         </label>
//                         <Input
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             type="password"
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                             required
//                         />
//                         {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
//                     </div>

//                     {serverError && <p className="text-sm text-red-500">{serverError}</p>}

//                     <Button type="submit" className="w-full" disabled={isLoading}>
//                         {isLoading ? "Registrando..." : "Registrarse"}
//                     </Button>
//                 </form>
//             </CardContent>
//             <CardFooter className="flex justify-center">
//                 <p className="text-sm text-center">
//                     ¿Ya tiene una cuenta?{" "}
//                     <Link href="/login" className="text-blue-600 hover:underline">
//                         Inicie sesión aquí
//                     </Link>
//                 </p>
//             </CardFooter>
//         </Card>
//     )
// }

import RegisterForm from "./formulario"

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Crear una cuenta</h1>
                    <p className="mt-2 text-gray-600">Regístrese para comenzar a usar nuestra plataforma</p>
                </div>
                <RegisterForm />
            </div>
        </div>
    )
}

