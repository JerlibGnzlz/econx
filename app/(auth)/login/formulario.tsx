"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
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
const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "El correo electrónico es requerido" })
        .email({ message: "Ingrese un correo electrónico válido" }),
    password: z
        .string()
        .min(1, { message: "La contraseña es requerida" })
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [generalError, setGeneralError] = useState<string | null>(null)

    // Configurar el formulario con React Hook Form y Zod
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true)
        setGeneralError(null)

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            })

            if (result?.error) {
                // Manejar diferentes tipos de errores
                if (result.error === "CredentialsSignin") {
                    setGeneralError("Correo electrónico o contraseña incorrectos")
                    toast.error("Credenciales inválidas")
                } else {
                    setGeneralError("Ocurrió un error al iniciar sesión")
                    toast.error("Error al iniciar sesión")
                }
                return
            }

            // Inicio de sesión exitoso
            toast.success("Inicio de sesión exitoso")

            try {
                const session = await fetch("/api/auth/session")
                const sessionData = await session.json()

                if (sessionData?.user?.isAdmin) {
                    router.push("/admin")
                } else {
                    router.push("/products")
                }
                router.refresh()
            } catch (error) {
                // Si hay un error al obtener la sesión, redirigir a la página de productos por defecto
                router.push("/products")
                router.refresh()
            }
        } catch (error) {
            console.error("Error de inicio de sesión:", error)
            setGeneralError("Ocurrió un error al conectar con el servidor")
            toast.error("Error al iniciar sesión")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg animate-in fade-in-50 duration-300">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
                <CardDescription className="text-center">Ingrese sus credenciales para acceder a su cuenta</CardDescription>
            </CardHeader>
            <CardContent>
                {generalError && (
                    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4">{generalError}</div>
                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                            autoComplete="current-password"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="text-right text-sm">
                            <Link href="/forgot-password" className="text-primary hover:underline focus:outline-none focus:underline">
                                ¿Olvidó su contraseña?
                            </Link>
                        </div>
                        <Button type="submit" className="w-full border" disabled={isLoading} aria-label="Iniciar sesión">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Iniciando sesión...
                                </>
                            ) : (
                                "Iniciar Sesión"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">O continúe con</span>
                    </div>
                </div>
                <div className="text-center">
                    <Button variant="outline" type="button" disabled={isLoading} onClick={() => signIn("google")}>
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                            <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        Google
                    </Button>
                </div>
                <p className="mt-2 text-sm text-center text-muted-foreground">
                    ¿No tiene una cuenta?{" "}
                    <Link
                        href="/register"
                        className="text-primary font-medium hover:underline focus:outline-none focus:underline"
                    >
                        Regístrese aquí
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}

