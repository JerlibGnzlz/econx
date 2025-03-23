"use client"

import { ShoppingCart } from "lucide-react"
// import { useCartItems } from "@/hooks/use-cart"
import Link from "next/link"
import { useCartItems } from "../hooks/use-cart"

export default function CartIcon() {
    const { data: cartItems } = useCartItems()

    const itemCount = cartItems?.length || 0

    return (
        <Link href="/cart" className="relative inline-flex items-center p-1">
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                </span>
            )}
        </Link>
    )
}

