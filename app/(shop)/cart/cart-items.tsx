"use client"

import Image from "next/image"
import { Trash2, Plus, Minus } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useCart } from "./cart-context"
import Link from "next/link"

export default function CartItems() {
    const { items, removeItem, updateQuantity } = useCart()

    if (items.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="mb-4 text-gray-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Tu carrito está vacío</h3>
                <p className="text-gray-500 mb-4">Parece que aún no has añadido productos a tu carrito</p>
                <Button >
                    <Link href="/products">Ver Productos</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
                <h2 className="font-semibold text-lg">Productos en tu carrito</h2>
            </div>
            <ul className="divide-y">
                {items.map((item) => (
                    <li key={item.id} className="p-4 flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100">
                            {item.image ? (
                                <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
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
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {new Intl.NumberFormat("es-ES", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(item.price)}
                            </p>
                        </div>

                        <div className="flex items-center">
                            <div className="flex items-center border rounded-md">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-none"
                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                >
                                    <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-none"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    <Plus className="h-3 w-3" />
                                </Button>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => removeItem(item.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="ml-4 text-right min-w-[80px]">
                            <p className="font-medium">
                                {new Intl.NumberFormat("es-ES", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(item.price * item.quantity)}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

