"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/app/(shop)/cart/cart-context"
import { Button } from "@/app/components/ui/button"
// import { Button } from "@/components/ui/button"
// import { useCart } from "../../cart/cart-context"

interface Product {
    id: number
    name: string
    description: string
    price: number
    image: string
}

export default function AddToCartButton({ product }: { product: Product }) {
    const { addItem } = useCart()
    const [added, setAdded] = useState(false)
    const router = useRouter()

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        })

        // Mostrar animación de confirmación
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <div className="flex gap-2">
            <Button
                onClick={handleAddToCart}
                className={`transition-all ${added ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"}`}
            >
                {added ? (
                    <>
                        <Check className="mr-2 h-4 w-4" />
                        Añadido
                    </>
                ) : (
                    <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Añadir al carrito
                    </>
                )}
            </Button>

            <Button variant="outline" onClick={() => router.push("/cart")}>
                Ver carrito
            </Button>
        </div>
    )
}

