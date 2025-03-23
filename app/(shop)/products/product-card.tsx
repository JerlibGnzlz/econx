"use client"

import Image from "next/image"
import Link from "next/link"
import { Eye, Edit, Trash2 } from "lucide-react"
import AddToCartButton from "./add-to-cart-button"

interface Product {
    id: number
    name: string
    description: string
    price: number
    image: string
}

interface ProductCardProps {
    product: Product
    isAuthenticated: boolean
    onDelete: (id: number) => void
}

export default function ProductCard({ product, isAuthenticated, onDelete }: ProductCardProps) {
    return (
        <div className="border rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg">
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
                <p className="text-lg font-bold mt-2">
                    {new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "USD",
                    }).format(product.price)}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    <AddToCartButton productId={product.id} variant="outline" size="sm" />

                    <Link
                        href={`/products/${product.id}`}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center"
                    >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                    </Link>

                    {isAuthenticated && (
                        <>
                            <Link
                                href={`/products/${product.id}/edit`}
                                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 inline-flex items-center"
                            >
                                <Edit className="h-4 w-4 mr-1" />
                                Editar
                            </Link>

                            <button
                                onClick={() => onDelete(product.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 inline-flex items-center"
                            >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Eliminar
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

