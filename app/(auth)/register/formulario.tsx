"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"

// Esquema de validación con Zod
const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: "El nombre es requerido" })
            .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
        email: z
            .string()
            .min(1, { message: "El correo electrónico es requerido" })
            .email({ message: "Ingrese un correo electrónico válido" }),
        password: z
            .string()
            .min(1, { message: "La contraseña es requerida" })
            .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
        confirmPassword: z.string().min(1, { message: "Confirme su contraseña" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    })

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [generalError, setGeneralError] = useState<string | null>(null)

    // Configurar el formulario con React Hook Form y Zod
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (data: RegisterFormValues) => {
        setIsLoading(true)
        setGeneralError(null)

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                if (result.error === "EmailExists") {
                    form.setError("email", {
                        type: "manual",
                        message: "Este correo electrónico ya está registrado",
                    })
                    setGeneralError("Este correo electrónico ya está registrado")
                } else {
                    setGeneralError(result.error || "Error al registrar usuario")
                }
                return
            }

            // Registro exitoso
            toast.success("Registro exitoso. Ahora puede iniciar sesión.")
            router.push("/login")
        } catch (error) {
            console.error("Error de registro:", error)
            setGeneralError("Ocurrió un error al conectar con el servidor")
            toast.error("Error al registrar usuario")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg animate-in fade-in-50 duration-300">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Crear Cuenta</CardTitle>
                <CardDescription className="text-center">Ingrese sus datos para registrarse</CardDescription>
            </CardHeader>
            <CardContent>
                {generalError && (
                    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4">{generalError}</div>
                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Su nombre" autoComplete="name" disabled={isLoading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo Electrónico</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="correo@ejemplo.com"
                                            type="email"
                                            autoComplete="email"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="••••••••"
                                            type="password"
                                            autoComplete="new-password"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmar Contraseña</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="••••••••"
                                            type="password"
                                            autoComplete="new-password"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full border" disabled={isLoading} aria-label="Registrarse">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Registrando...
                                </>
                            ) : (
                                "Registrarse"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-center text-muted-foreground">
                    ¿Ya tiene una cuenta?{" "}
                    <Link href="/login" className="text-primary font-medium hover:underline focus:outline-none focus:underline">
                        Inicie sesión aquí
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}

