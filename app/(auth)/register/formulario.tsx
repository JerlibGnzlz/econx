"use client";

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";


export function RegisterForm() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica de registro
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6 space-y-4">
            <Input type="text" placeholder="Nombre" required />
            <Input type="email" placeholder="Correo electrónico" required />
            <Input type="password" placeholder="Contraseña" required />
            <Button type="submit" className="w-full">Registrarse</Button>
        </form>
    );
}