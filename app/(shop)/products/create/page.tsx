import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/lib/authOptions"
import ProductForm from "../product-form"

export default async function ProductPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Crear Nuevo Producto</h1>
            <ProductForm />
        </div>
    )
}

