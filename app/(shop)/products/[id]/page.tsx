import { eq, and } from "drizzle-orm"
import { notFound, redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/authOptions"
import { db } from "@/app/lib/db"
import { products, users } from "@/app/lib/schema"
import { DeleteProductButton } from "@/app/components/DeleteProductButton"

export default async function ProductDetailPage({
    params,
}: {
    params: { id?: string }
}) {
    const session = await getServerSession(authOptions)

    // Redirigir a login si no hay sesión
    if (!session) {
        redirect("/login")
    }

    if (!params.id) {
        notFound()
    }

    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
        notFound()
    }

    // Obtener el usuario
    const user = await db.query.users.findFirst({
        where: eq(users.email, session.user?.email || ""),
    })

    if (!user) {
        redirect("/login")
    }

    // Obtener el producto
    const product = await db.query.products.findFirst({
        where: and(eq(products.id, id), eq(products.userId, user.id)),
    })

    if (!product) {
        notFound()
    }

    const price = typeof product.price === "string" ? Number.parseFloat(product.price) : Number(product.price)

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-4">
                <Link href="/products" className="text-blue-600 hover:underline">
                    ← Volver a productos
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-80 md:h-96 bg-gray-100 rounded-lg">
                    {product.image ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                            unoptimized
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full w-full text-gray-500">
                            Sin imagen
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-2xl font-bold text-indigo-600 mt-2">
                        {new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "USD",
                        }).format(price)}
                    </p>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">Descripción</h2>
                        <p className="mt-2 text-gray-600">{product.description || "Sin descripción"}</p>
                    </div>

                    <div className="mt-8 flex space-x-4">
                        <Link
                            href={`/products/${product.id}/edit`}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Editar
                        </Link>

                        {/* Botón separado para manejo en el cliente */}
                        <DeleteProductButton productId={product.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}
