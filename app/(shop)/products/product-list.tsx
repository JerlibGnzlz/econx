"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export type Product = {
    id: number;
    name: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    description: string | null; // Permitir null
    price: string;
    image: string | null; // Permitir null
}


export default function ProductList({
    products,
    isAuthenticated,
}: {
    products: Product[]
    isAuthenticated: boolean
}) {
    const router = useRouter()

    const handleDelete = async (id: number) => {
        if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            return
        }

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Error al eliminar producto")
            }

            router.refresh()
        } catch (error) {
            console.error("Error:", error)
            alert("Error al eliminar producto")
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <div key={product.id} className="border rounded-lg overflow-hidden shadow-md">
                    <div className="h-48 relative">
                        <Image
                            src={product.image || "/placeholder.svg?height=200&width=300"}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="p-4">
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                        <p className="text-lg font-bold mt-2">${product.price}</p>

                        <div className="mt-4 flex space-x-2">
                            <Link
                                href={`/products/${product.id}`}
                                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Ver
                            </Link>

                            {isAuthenticated && (
                                <>
                                    <Link
                                        href={`/products/${product.id}/edit`}
                                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                                    >
                                        Editar
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

