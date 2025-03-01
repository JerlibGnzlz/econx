"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

// Esquema de validación con Zod
const loginSchema = z.object({
    email: z.string().email("Debe ser un correo válido."),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginData) => {
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (!result) {
            alert("Error desconocido al iniciar sesión.");
            return;
        }

        if (result.error) {
            alert(result.error);
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <Card className="max-w-md mx-auto mt-10 p-6 shadow-lg">
            <CardHeader>
                <CardTitle className="text-center text-xl font-bold">Iniciar Sesión</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                        {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
                    </Button>

                    {/* Enlace al Registro */}
                    <p className="text-center text-sm mt-2">
                        ¿No tienes una cuenta?{" "}
                        <button
                            type="button"
                            className="text-blue-600 hover:underline font-medium"
                            onClick={() => router.push("/register")}
                        >
                            Regístrate
                        </button>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
