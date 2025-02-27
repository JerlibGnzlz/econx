"use client";

// import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";

export function LoginForm() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica de inicio de sesión
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6 space-y-4">
            <Input type="email" placeholder="Correo electrónico" required />
            <Input type="password" placeholder="Contraseña" required />
            <button type="submit" className="w-full">Iniciar Sesión</button>
        </form>
    );
}