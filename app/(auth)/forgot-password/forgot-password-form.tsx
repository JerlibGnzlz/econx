"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"

// Esquema de validación con Zod
const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, { message: "El correo electrónico es requerido" })
        .email({ message: "Ingrese un correo electrónico válido" }),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Configurar el formulario con React Hook Form y Zod
    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        setIsLoading(true)

        try {
            // Aquí iría la lógica para enviar el correo de recuperación
            // Por ahora, simulamos un retraso
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Marcar como enviado
            setIsSubmitted(true)
            toast.success("Se ha enviado un correo con instrucciones para restablecer su contraseña")
        } catch (error) {
            console.error("Error al enviar correo:", error)
            toast.error("Error al enviar correo de recuperación")
        } finally {
            setIsLoading(false)
        }
    }

    if (isSubmitted) {
        return (
            <Card className="w-full max-w-md mx-auto shadow-lg animate-in fade-in-50 duration-300">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Correo Enviado</CardTitle>
                    <CardDescription className="text-center">
                        Hemos enviado un correo con instrucciones para restablecer su contraseña
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <div className="rounded-full bg-green-100 p-3 text-green-600 mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <p className="text-center text-sm text-muted-foreground mb-4">
                        Por favor, revise su bandeja de entrada y siga las instrucciones para restablecer su contraseña.
                    </p>
                    <Button className="w-full">
                        <Link href="/login">Volver a Iniciar Sesión</Link>
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg animate-in fade-in-50 duration-300">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Recuperar Contraseña</CardTitle>
                <CardDescription className="text-center">
                    Ingrese su correo electrónico para recibir instrucciones
                </CardDescription>
            </CardHeader>
            <CardContent>
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
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                "Enviar Instrucciones"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-center text-muted-foreground">
                    <Link href="/login" className="text-primary font-medium hover:underline focus:outline-none focus:underline">
                        Volver a Iniciar Sesión
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
