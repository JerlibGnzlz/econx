"use client"

import { Button } from "@/app/components/ui/button"
import { useAddToCart } from "@/app/hooks/use-cart"
// import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
// import { useAddToCart } from "@/hooks/use-cart"
import { useState } from "react"

interface AddToCartButtonProps {
    productId: number
    variant?: "default" | "outline" | "secondary"
    size?: "default" | "sm" | "lg" | "icon"
    className?: string
}

export default function AddToCartButton({
    productId,
    variant = "default",
    size = "default",
    className = "",
}: AddToCartButtonProps) {
    const addToCart = useAddToCart()
    const [quantity, setQuantity] = useState(1)

    const handleAddToCart = () => {
        addToCart.mutate({ productId, quantity })
    }

    return (
        <Button
            variant={variant}
            size={size}
            onClick={handleAddToCart}
            disabled={addToCart.isPending}
            className={className}
        >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {addToCart.isPending ? "Añadiendo..." : "Añadir al carrito"}
        </Button>
    )
}

