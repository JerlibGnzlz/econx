"use client"

import Image from "next/image"
// import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus } from "lucide-react"
// import { useRemoveFromCart, useUpdateCartItem } from "@/hooks/use-cart"
// import type { CartItem } from "@/services/cart-service"
import { useRemoveFromCart } from "@/app/hooks/use-orders"
import { Button } from "@/app/components/ui/button"
import { useUpdateCartItem } from "@/app/hooks/use-cart"
import { CartItem } from "@/app/services/order-service"

interface CartItemsListProps {
    cartItems: CartItem[]
}

export default function CartItemsList({ cartItems }: CartItemsListProps) {
    const removeFromCart = useRemoveFromCart()
    const updateCartItem = useUpdateCartItem()

    const handleUpdateQuantity = (id: number, currentQuantity: number, change: number) => {
        const newQuantity = Math.max(1, currentQuantity + change)
        updateCartItem.mutate({ id, quantity: newQuantity })
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
                <h2 className="font-semibold text-lg">Productos en tu carrito</h2>
            </div>
            <ul className="divide-y">
                {cartItems.map((item) => (
                    <li key={item.id} className="p-4 flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100">
                            {item.product.image ? (
                                <Image
                                    src={item.product.image || "/placeholder.svg"}
                                    alt={item.product.name}
                                    width={64}
                                    height={64}
                                    className="h-full w-full object-cover object-center"
                                    unoptimized
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-gray-400 text-xs">Sin imagen</div>
                            )}
                        </div>

                        <div className="ml-4 flex-1">
                            <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {new Intl.NumberFormat("es-ES", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(item.product.price)}
                            </p>
                        </div>

                        <div className="flex items-center">
                            <div className="flex items-center border rounded-md">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-none"
                                    onClick={() => handleUpdateQuantity(Number(item.id), item.quantity, -1)}
                                    disabled={updateCartItem.isPending}
                                >
                                    <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-none"
                                    onClick={() => handleUpdateQuantity(Number(item.id), item.quantity, 1)}
                                    disabled={updateCartItem.isPending}
                                >
                                    <Plus className="h-3 w-3" />
                                </Button>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => removeFromCart.mutate(Number(item.id))}
                                disabled={removeFromCart.isPending}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="ml-4 text-right min-w-[80px]">
                            <p className="font-medium">
                                {new Intl.NumberFormat("es-ES", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(item.product.price * item.quantity)}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

