"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/Button"
import { Input } from "@/app/components/Input"

export function RegisterForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [isError, setIsError] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage("")
        setIsError(false)

        console.log("Enviando datos:", { name, email, password })

        try {

            const response = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Hubo un problema al registrar el usuario.")
            }

            console.log("Registro exitoso:", data)
            setMessage("Registro exitoso 🎉")
            setIsError(false)

            setTimeout(() => {
                router.push("/login")
            }, 2000)
        } catch (error) {
            console.error("Error en el registro:", error)
            setIsError(true)
            setMessage(error instanceof Error ? error.message : "Hubo un problema al registrar el usuario.")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6 space-y-4">
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" required />
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
            <Button type="submit" className="w-full">Registrarse</Button>
            {message && (
                <p className={`text-center ${isError ? "text-red-500" : "text-green-500"}`}>
                    {message}
                </p>
            )}
        </form>
    )
}
