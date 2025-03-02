// import { getProducts } from "@/app/lib/product-service"
import { ProductGrid } from "./components/product-grid"
import { ProductFilters } from "./components/product-filters"
import { Suspense } from "react"
import { ProductsLoading } from "./components/products-loading"
import { getProducts } from "@/app/lib/product-service"

export default async function ProductosPage() {
    const products = await getProducts(20) // Obtener 20 productos por página

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Catálogo de Productos</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filtros en el sidebar */}
                <div className="lg:col-span-1">
                    <ProductFilters />
                </div>

                {/* Grid de productos */}
                <div className="lg:col-span-3">
                    <Suspense fallback={<ProductsLoading />}>
                        <ProductGrid products={products} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

// import { getProducts } from "@/app/lib/product-service"
// import { ProductGrid } from "./components/product-grid"
// import { ProductFilters } from "./components/product-filters"
// import { Suspense } from "react"
// import { ProductsLoading } from "./components/products-loading"
// import { requireAuth } from "@/app/lib/auth"

// export default async function ProductosPage() {
//     // Verificar autenticación
//     const session = await requireAuth()
//     const products = await getProducts(20)

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold">Catálogo de Productos</h1>
//                 <div className="text-sm text-gray-600">Bienvenido, {session.user?.name}</div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//                 <div className="lg:col-span-1">
//                     <ProductFilters />
//                 </div>

//                 <div className="lg:col-span-3">
//                     <Suspense fallback={<ProductsLoading />}>
//                         <ProductGrid products={products} />
//                     </Suspense>
//                 </div>
//             </div>
//         </div>
//     )
// }

