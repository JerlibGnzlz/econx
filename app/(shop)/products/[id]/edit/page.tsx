import { getServerSession } from "next-auth"
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect, notFound } from "next/navigation"
import { eq } from "drizzle-orm"
import { products } from "@/app/lib/schema"
import { authOptions } from "@/app/lib/authOptions"
import { db } from "@/app/lib/db"
import ProductForm from "../../product-form"

type Product = {
    id: number;
    name: string;
    description: string | null;
    price: string;
    image: string | null; // Asegúrate de incluir esta propiedad
    createdAt: Date | null;
    updatedAt: Date | null;
};


export default async function EditProductPage({
    params,
}: {
    params: { id: string }
}) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
        notFound()
    }

    const product = await db.query.products.findFirst({
        where: eq(products.id, id),
    })

    if (!product) {
        notFound()
    }

    const formattedProduct = {
        ...product,
        description: product.description ?? "", // Si es null, lo convierte en ""
        image: product.image ?? "", // Si es null, lo convierte en ""
        price: Number(product.price), // Convertir a número
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>
            <ProductForm product={formattedProduct} />
        </div>
    )

}


// import { getServerSession } from "next-auth"
// import { redirect, notFound } from "next/navigation"
// import { eq, and } from "drizzle-orm"
// import ProductForm from "../../product-form"
// import { authOptions } from "@/app/lib/authOptions"
// import { db } from "@/app/lib/db"
// import { products, users } from "@/app/lib/schema"

// export default async function EditProductPage({
//     params,
// }: {
//     params: { id: string }
// }) {
//     const session = await getServerSession(authOptions)

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

//     return (
//         <div className="max-w-4xl mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>
//             <ProductForm product={product} />
//         </div>
//     )
// }

