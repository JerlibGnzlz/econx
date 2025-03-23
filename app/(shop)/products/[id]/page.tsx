"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
// import { useProduct, useDeleteProduct } from "@/hooks/use-products"
// import { Button } from "@/components/ui/button"
// import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { useDeleteProduct, useProduct } from "@/app/hooks/use-products"
import { Skeleton } from "@/app/components/ui/skeleton"
import { Button } from "@/app/components/ui/button"
import AddToCartButton from "../add-to-cart-button"
// import AddToCartButton from "../add-to-cart-button"

export default function ProductDetailPage() {
    const params = useParams()
    const router = useRouter()
    const id = Number(params.id)

    const { data: product, isLoading, error } = useProduct(id)
    const deleteProduct = useDeleteProduct()

    const handleDelete = async () => {
        if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            deleteProduct.mutate(id, {
                onSuccess: () => {
                    router.push("/products")
                },
            })
        }
    }

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="mb-4">
                    <Skeleton className="h-6 w-32" />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <Skeleton className="h-80 md:h-96 rounded-lg" />
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-8 w-1/3" />
                        <div className="pt-4">
                            <Skeleton className="h-6 w-1/2 mb-2" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                        <div className="pt-4 flex gap-2">
                            <Skeleton className="h-10 w-40" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    Error al cargar el producto: {error?.message || "Producto no encontrado"}
                </div>
                <div className="mt-4">
                    <Link href="/products" className="text-blue-600 hover:underline flex items-center">
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Volver a productos
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-4">
                <Link href="/products" className="text-blue-600 hover:underline flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Volver a productos
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-80 md:h-96 bg-gray-100 rounded-lg">
                    {product.image ? (
                        <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                            unoptimized
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full w-full text-gray-500">Sin imagen</div>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-2xl font-bold text-indigo-600 mt-2">
                        {new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "USD",
                        }).format(product.price)}
                    </p>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">Descripción</h2>
                        <p className="mt-2 text-gray-600">{product.description || "Sin descripción"}</p>
                    </div>

                    <div className="mt-8 flex flex-col gap-4">
                        {/* Botones de carrito */}
                        <div className="flex gap-4">
                            <AddToCartButton productId={product.id} className="bg-indigo-600 hover:bg-indigo-700" />
                            <Button variant="outline" onClick={() => router.push("/cart")}>
                                Ver carrito
                            </Button>
                        </div>

                        {/* Botones de edición y eliminación */}
                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                className="border-green-600 text-green-600 hover:bg-green-50"
                                onClick={() => router.push(`/products/${product.id}/edit`)}
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                            </Button>

                            <Button
                                variant="outline"
                                className="border-red-600 text-red-600 hover:bg-red-50"
                                onClick={handleDelete}
                                disabled={deleteProduct.isPending}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                {deleteProduct.isPending ? "Eliminando..." : "Eliminar"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
