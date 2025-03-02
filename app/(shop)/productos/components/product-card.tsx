// import Image from "next/image"
// import type { Product } from "@/app/lib/schema"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Button } from "@/app/components/ui/button"
// import { formatCurrency } from "@/app/lib/utils"

// interface ProductCardProps {
//     product: Product
// }

// export function ProductCard({ product }: ProductCardProps) {
//     return (
//         <Card className="h-full flex flex-col">
//             <CardHeader className="p-4">
//                 <div className="aspect-square relative overflow-hidden rounded-lg mb-3">
//                     <Image
//                         src={product.image || `/placeholder.svg?height=300&width=300`}
//                         alt={product.name}
//                         fill
//                         className="object-cover"
//                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                 </div>
//                 <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
//             </CardHeader>
//             <CardContent className="flex-grow p-4 pt-0">
//                 <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
//             </CardContent>
//             <CardFooter className="p-4 pt-0">
//                 <div className="flex items-center justify-between w-full">
//                     <span className="text-lg font-bold">{formatCurrency(Number(product.price))}</span>
//                     <Button variant="secondary">Agregar al carrito</Button>
//                 </div>
//             </CardFooter>
//         </Card>
//     )
// }

import Image from "next/image"
import type { Product } from "@/app/lib/schema"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { formatCurrency } from "@/app/lib/utils"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="p-4">
                <div className="aspect-square relative overflow-hidden rounded-lg mb-3">
                    <Image
                        src={product.image || `/placeholder.svg?height=300&width=300`}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <div className="flex items-center justify-between w-full">
                    <span className="text-lg font-bold">{formatCurrency(Number(product.price))}</span>
                    <Button>Agregar al carrito</Button>
                </div>
            </CardFooter>
        </Card>
    )
}
