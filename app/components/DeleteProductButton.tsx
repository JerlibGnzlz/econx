"use client"

import { useRouter } from "next/navigation"

export function DeleteProductButton({ productId }: { productId: number }) {
    const router = useRouter()

    async function handleDelete() {
        if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            await fetch(`/api/products/${productId}`, {
                method: "DELETE",
            })
            router.push("/products") // Redirigir después de eliminar
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
            Eliminar
        </button>
    )
}
