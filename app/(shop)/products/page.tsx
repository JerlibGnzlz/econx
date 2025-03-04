// import { eq, and } from "drizzle-orm"
// import { notFound, redirect } from "next/navigation"
// import Image from "next/image"
// import Link from "next/link"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/app/lib/authOptions"
// import { db } from "@/app/lib/db"
// import { products, users } from "@/app/lib/schema"

// export default async function ProductDetailPage({
//     params,
// }: {
//     params: { id: string }
// }) {
//     const session = await getServerSession(authOptions)

//     // Redirigir a login si no hay sesión
//     if (!session) {
//         redirect("/login")
//     }

//     const id = Number.parseInt(params.id)

//     if (isNaN(id)) {
//         notFound()
//     }

//     // Obtener el ID del usuario desde la sesión
//     const user = await db.query.users.findFirst({
//         where: eq(users.email, session.user?.email || ""),
//     })

//     if (!user) {
//         redirect("/login")
//     }

//     // Obtener el producto verificando que pertenezca al usuario
//     const product = await db.query.products.findFirst({
//         where: and(eq(products.id, id), eq(products.userId, user.id)),
//     })

//     if (!product) {
//         notFound()
//     }

//     // Convertir el precio a número para mostrarlo correctamente
//     const price = typeof product.price === "string" ? Number.parseFloat(product.price) : Number(product.price)

//     return (
//         <div className="max-w-4xl mx-auto p-4">
//             <div className="mb-4">
//                 <Link href="/products" className="text-blue-600 hover:underline">
//                     ← Volver a productos
//                 </Link>
//             </div>

//             <div className="grid md:grid-cols-2 gap-8">
//                 <div className="relative h-80 md:h-96 bg-gray-100 rounded-lg">
//                     {product.image ? (
//                         <Image
//                             src={product.image || "/placeholder.svg"}
//                             alt={product.name}
//                             fill
//                             className="object-cover rounded-lg"
//                             unoptimized
//                         />
//                     ) : (
//                         <div className="flex items-center justify-center h-full w-full text-gray-500">Sin imagen</div>
//                     )}
//                 </div>

//                 <div>
//                     <h1 className="text-3xl font-bold">{product.name}</h1>
//                     <p className="text-2xl font-bold text-indigo-600 mt-2">
//                         {new Intl.NumberFormat("es-ES", {
//                             style: "currency",
//                             currency: "USD",
//                         }).format(price)}
//                     </p>

//                     <div className="mt-6">
//                         <h2 className="text-xl font-semibold">Descripción</h2>
//                         <p className="mt-2 text-gray-600">{product.description || "Sin descripción"}</p>
//                     </div>

//                     <div className="mt-8 flex space-x-4">
//                         <Link
//                             href={`/products/${product.id}/edit`}
//                             className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//                         >
//                             Editar
//                         </Link>

//                         <Link
//                             href="/products"
//                             className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                             onClick={async (e) => {
//                                 e.preventDefault()
//                                 if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
//                                     await fetch(`/api/products/${product.id}`, {
//                                         method: "DELETE",
//                                     })
//                                     redirect("/products")
//                                 }
//                             }}
//                         >
//                             Eliminar
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

import { getServerSession } from "next-auth"
import ProductsDataTable from "./products-data-table"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/lib/authOptions"
import { db } from "@/app/lib/db"
import { products, users } from "@/app/lib/schema"

export default async function ProductsPage() {
    const session = await getServerSession(authOptions)

    // Redirigir a login si no hay sesión
    if (!session) {
        redirect("/login")
    }

    // Obtener el ID del usuario desde la sesión
    const user = await db.query.users.findFirst({
        where: eq(users.email, session.user?.email || ""),
    })

    if (!user) {
        redirect("/login")
    }

    // Obtener productos del usuario
    const userProducts = await db.query.products.findMany({
        where: eq(products.userId, user.id),
        orderBy: (products, { desc }) => [desc(products.createdAt)],
    })

    // Convertir y sanitizar los productos para que coincidan con la interfaz Product
    const sanitizedProducts = userProducts.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description ?? "",
        // Convertir el precio de string a number
        price: typeof product.price === "string" ? Number.parseFloat(product.price) : Number(product.price),
        image: product.image ?? "",
        // No necesitamos incluir userId en el objeto sanitizado ya que no es parte de la interfaz Product
    }))

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Mis Productos</h1>
                <p className="text-gray-500">Gestiona tu catálogo de productos</p>
            </div>

            <ProductsDataTable products={sanitizedProducts} isAuthenticated={true} />
        </div>
    )
}

