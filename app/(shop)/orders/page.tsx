"use client"

// import { useOrders, useCancelOrder } from "@/hooks/use-orders"
import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Eye, ShoppingCart } from "lucide-react"
import { Skeleton } from "@/app/components/ui/skeleton"
import { Button } from "@/app/components/ui/button"
import { useCancelOrder, useOrders } from "@/app/hooks/use-orders"
import { Badge } from "@/app/components/ui/badge"

export default function OrdersPage() {
    const router = useRouter()
    const { data: orders, isLoading, error } = useOrders()
    const cancelOrder = useCancelOrder()

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto p-4">
                <div className="mb-6">
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-96" />
                </div>

                <Skeleton className="h-96 w-full rounded-lg" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto p-4">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    Error al cargar pedidos: {error.message}
                </div>
            </div>
        )
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="max-w-7xl mx-auto p-4">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Mis Pedidos</h1>
                    <p className="text-gray-500">Aún no tienes pedidos</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="mb-4 text-gray-400">
                        <ShoppingCart className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No has realizado ningún pedido</h3>
                    <p className="text-gray-500 mb-4">Realiza tu primera compra para ver tus pedidos aquí</p>
                    <Button >
                        <a href="/products">Ver Productos</a>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Mis Pedidos</h1>
                <p className="text-gray-500">Gestiona y consulta el estado de tus pedidos</p>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Pedido #</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Productos</th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order: any) => (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm font-medium">#{order.id}</td>
                                    <td className="px-4 py-3 text-sm">
                                        {format(new Date(order.date), "dd/MM/yyyy HH:mm", { locale: es })}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <Badge
                                            variant={
                                                order.status === "pendiente"
                                                    ? "outline"
                                                    : order.status === "en curso"
                                                        ? "secondary"
                                                        : order.status === "enviado"
                                                            ? "default"
                                                            : order.status === "entregado"
                                                                ? "success"
                                                                : "destructive"
                                            }
                                        >
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-sm">{order.details?.length || 0} productos</td>
                                    <td className="px-4 py-3 text-sm text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.push(`/orders/${order.id}`)}
                                                className="h-8 w-8 p-0"
                                                title="Ver detalles"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>

                                            {order.status === "pendiente" && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        if (confirm("¿Estás seguro de que deseas cancelar este pedido?")) {
                                                            cancelOrder.mutate(order.id)
                                                        }
                                                    }}
                                                    className="h-8 text-red-600 border-red-600 hover:bg-red-50"
                                                    disabled={cancelOrder.isPending}
                                                >
                                                    Cancelar
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

