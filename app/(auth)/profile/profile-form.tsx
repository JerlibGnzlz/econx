"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProfileForm({ user }: { user: any }) {
    const router = useRouter()
    const [name, setName] = useState(user.name || "")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setSuccess("")

        try {
            const response = await fetch("/api/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Error al actualizar perfil")
            }

            setSuccess("Perfil actualizado correctamente")
            router.refresh()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">{success}</div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={user.email}
                    disabled
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                />
            </div>

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
                {isLoading ? "Actualizando..." : "Actualizar Perfil"}
            </button>
        </form>
    )
}

