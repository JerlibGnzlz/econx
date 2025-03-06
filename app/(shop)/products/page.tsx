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

