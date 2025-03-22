"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { useOrder } from "@/app/hooks/use-orders"
import { Skeleton } from "@/app/components/ui/skeleton"
import { Button } from "@/app/components/ui/button"
// import { Button } from "@/components/ui/button"
// import { useOrder } from "@/hooks/use-orders"
// import { Skeleton } from "@/components/ui/skeleton"

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const orderId = searchParams.get("orderId")
    const id = orderId ? Number(orderId) : undefined

    const { data: order, isLoading } = useOrder(id || 0)

    if (isLoading && id) {
        return (
            <div className="max-w-3xl mx-auto p-4 text-center">
                <div className="bg-white rounded-lg shadow-md p-8 my-8">
                    <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                    <Skeleton className="h-8 w-64 mx-auto mb-2" />
                    <Skeleton className="h-4 w-96 mx-auto mb-6" />
                    <Skeleton className="h-16 w-full mx-auto mb-6" />
                    <Skeleton className="h-4 w-80 mx-auto mb-8" />
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Skeleton className="h-10 w-40 mx-auto" />
                        <Skeleton className="h-10 w-40 mx-auto" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto p-4 text-center">
            <div className="bg-white rounded-lg shadow-md p-8 my-8">
                <div className="flex justify-center mb-4">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                </div>

                <h1 className="text-2xl font-bold mb-2">¡Pedido Realizado con Éxito!</h1>

                <p className="text-gray-600 mb-6">Gracias por tu compra. Hemos recibido tu pedido y lo estamos procesando.</p>

                {orderId && (
                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                        <p className="text-gray-500">Número de pedido:</p>
                        <p className="text-lg font-medium">#{orderId}</p>
                    </div>
                )}

                <p className="text-gray-600 mb-8">
                    Recibirás un correo electrónico con los detalles de tu pedido y te notificaremos cuando esté en camino.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button variant="outline">
                        <Link href={orderId ? `/orders/${orderId}` : "/orders"}>Ver Detalles del Pedido</Link>
                    </Button>

                    <Button >
                        <Link href="/products">Continuar Comprando</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

