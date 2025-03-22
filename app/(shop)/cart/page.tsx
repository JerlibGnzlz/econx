"use client"

import { useRouter } from "next/navigation"
import {
    useCartItems,
    useRemoveFromCart,
    useUpdateCartItemQuantity,
    useClearCart,
    useCreateOrder,
} from "../../hooks/use-orders"
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react"
import { Skeleton } from "@/app/components/ui/skeleton"
import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"

export default function CartPage() {
    const router = useRouter()
    const { data: cartItems, isLoading } = useCartItems()
    const removeFromCart = useRemoveFromCart()
    const updateQuantity = useUpdateCartItemQuantity()
    const clearCart = useClearCart()
    const createOrder = useCreateOrder()
    const [shippingAddress, setShippingAddress] = useState("")

    const handleCheckout = () => {
        if (!cartItems || cartItems.length === 0) {
            return
        }

        if (!shippingAddress.trim()) {
            alert("Por favor ingrese una dirección de envío")
            return
        }

        createOrder.mutate(
            {
                items: cartItems.map((item: { productId: any; quantity: any }) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                onSuccess: (data: { id: any }) => {
                    router.push(`/checkout/success?orderId=${data.id}`)
                },
            },
        )
    }

    // Calcular subtotal
    const subtotal = cartItems?.reduce((total: number, item: { product: { price: number }; quantity: number }) => total + item.product.price * item.quantity, 0) || 0

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto p-4">
                <div className="mb-6">
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-96" />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <Skeleton className="h-96 w-full rounded-lg" />
                    </div>
                    <div>
                        <Skeleton className="h-80 w-full rounded-lg" />
                    </div>
                </div>
            </div>
        )
    }

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto p-4">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Mi Carrito</h1>
                    <p className="text-gray-500">Tu carrito está vacío</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="mb-4 text-gray-400">
                        <ShoppingCart className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No hay productos en tu carrito</h3>
                    <p className="text-gray-500 mb-4">Añade algunos productos para continuar con la compra</p>
                    <Button >
                        <Link href="/products">Ver Productos</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Mi Carrito</h1>
                <p className="text-gray-500">Revisa tus productos y procede al pago</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-4 border-b">
                            <h2 className="font-semibold text-lg">Productos en tu carrito</h2>
                        </div>
                        <ul className="divide-y">
                            {cartItems.map((item: { productId: Key | null | undefined; product: { image: any; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: string | number | bigint }; quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
                                <li key={item.productId} className="p-4 flex items-center">
                                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100">
                                        {item.product.image ? (
                                            <Image
                                                src={item.product.image || "/placeholder.svg"}
                                                alt={item.product.name?.toString() || ""}
                                                width={64}
                                                height={64}
                                                className="h-full w-full object-cover object-center"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-gray-400 text-xs">
                                                Sin imagen
                                            </div>
                                        )}
                                    </div>

                                    <div className="ml-4 flex-1">
                                        <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {new Intl.NumberFormat("es-ES", {
                                                style: "currency",
                                                currency: "USD",
                                            }).format(Number(item.product.price))}
                                        </p>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="flex items-center border rounded-md">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-none"
                                                onClick={() =>
                                                    updateQuantity.mutate({
                                                        productId: item.productId as number,
                                                        quantity: Math.max(1, Number(item.quantity) - 1),
                                                    })
                                                }
                                                disabled={updateQuantity.isPending}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-none"
                                                onClick={() =>
                                                    updateQuantity.mutate({
                                                        productId: item.productId as number,
                                                        quantity: Number(item.quantity) + 1,
                                                    })
                                                }
                                                disabled={updateQuantity.isPending}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => removeFromCart.mutate(Number(item.productId))}
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
                                            }).format(Number(item.product.price) * Number(item.quantity))}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div>
                    <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                        <h2 className="font-semibold text-lg mb-4">Resumen del pedido</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>
                                    {new Intl.NumberFormat("es-ES", {
                                        style: "currency",
                                        currency: "USD",
                                    }).format(subtotal)}
                                </span>
                            </div>
                            <div className="flex justify-between font-medium text-lg">
                                <span>Total</span>
                                <span>
                                    {new Intl.NumberFormat("es-ES", {
                                        style: "currency",
                                        currency: "USD",
                                    }).format(subtotal)}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label htmlFor="shipping-address" className="block text-sm font-medium text-gray-700">
                                    Dirección de envío
                                </label>
                                <Textarea
                                    id="shipping-address"
                                    placeholder="Ingresa tu dirección completa"
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                    className="mt-1"
                                    rows={3}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Button
                                onClick={handleCheckout}
                                disabled={createOrder.isPending || cartItems.length === 0}
                                className="w-full bg-indigo-600 hover:bg-indigo-700"
                            >
                                {createOrder.isPending ? "Procesando..." : "Finalizar Compra"}
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => clearCart.mutate()}
                                disabled={clearCart.isPending || cartItems.length === 0}
                                className="w-full"
                            >
                                Vaciar Carrito
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

