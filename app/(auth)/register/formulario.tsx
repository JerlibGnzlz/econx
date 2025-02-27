"use client";

import { useState } from "react";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";

export function RegisterForm() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Enviando datos:", formData);

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const text = await response.text();
            console.log("Respuesta cruda:", text);

            try {
                const data = JSON.parse(text);
                alert(data.message);
            } catch (error) {
                console.error("Error al parsear JSON:", error);
            }
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6 space-y-4">
            <Input type="text" name="name" placeholder="Nombre" required onChange={handleChange} />
            <Input type="email" name="email" placeholder="Correo electrónico" required onChange={handleChange} />
            <Input type="password" name="password" placeholder="Contraseña" required onChange={handleChange} />
            <Button type="submit" className="w-full">Registrarse</Button>
        </form>
    );
}
