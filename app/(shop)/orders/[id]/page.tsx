"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { es } from "date-fns/locale"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useCancelOrder, useOrder, useUpdateOrderStatus } from "@/app/hooks/use-orders"
import { Skeleton } from "@/app/components/ui/skeleton"
import { Button } from "@/app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Badge } from "@/app/components/ui/badge"

export default function OrderDetailPage() {
    const params = useParams()
    const router = useRouter()
    const id = Number(params.id)

    const { data: order, isLoading, error } = useOrder(id)
    const cancelOrder = useCancelOrder()
    const updateOrderStatus = useUpdateOrderStatus()
    const [newStatus, setNewStatus] = useState<string>("")

    // Verificar si el pedido puede ser cancelado según su estado
    const canBeCancelled = order && !["enviado", "entregado", "cancelado"].includes(order.status)

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="mb-4">
                    <Skeleton className="h-6 w-32" />
                </div>

                <Skeleton className="h-96 w-full rounded-lg mb-6" />

                <Skeleton className="h-64 w-full rounded-lg" />
            </div>
        )
    }

    if (error || !order) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    Error al cargar el pedido: {error?.message || "Pedido no encontrado"}
                </div>
                <div className="mt-4">
                    <Link href="/orders" className="text-blue-600 hover:underline flex items-center">
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Volver a pedidos
                    </Link>
                </div>
            </div>
        )
    }

    const handleStatusUpdate = () => {
        if (newStatus) {
            updateOrderStatus.mutate({ id, status: newStatus })
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-4">
                <Link href="/orders" className="text-blue-600 hover:underline flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Volver a pedidos
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Pedido #{order.id}</h1>
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
                        className="text-sm"
                    >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Información del Pedido</h2>
                    <p className="text-gray-600">
                        <span className="font-medium">Fecha:</span>{" "}
                        {format(new Date(order.date), "dd/MM/yyyy HH:mm", { locale: es })}
                    </p>
                </div>

                {/* Sección de actualización de estado (solo para administradores) */}
                {order.status !== "cancelado" && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">Actualizar Estado</h2>
                        <div className="flex gap-2">
                            <Select value={newStatus} onValueChange={setNewStatus}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Seleccionar estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pendiente">Pendiente</SelectItem>
                                    <SelectItem value="en curso">En curso</SelectItem>
                                    <SelectItem value="enviado">Enviado</SelectItem>
                                    <SelectItem value="entregado">Entregado</SelectItem>
                                    <SelectItem value="cancelado">Cancelado</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={handleStatusUpdate} disabled={!newStatus || updateOrderStatus.isPending}>
                                {updateOrderStatus.isPending ? "Actualizando..." : "Actualizar"}
                            </Button>
                        </div>
                    </div>
                )}

                <h2 className="text-xl font-semibold mb-4">Productos</h2>
                <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Producto
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Precio
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Cantidad
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Subtotal
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {order.details?.map((item: any) => {
                                const price =
                                    typeof item.unitPrice === "string" ? Number.parseFloat(item.unitPrice) : Number(item.unitPrice)
                                const subtotal = price * item.quantity

                                return (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0 mr-3">
                                                    {item.product?.image ? (
                                                        <Image
                                                            src={item.product.image || "/placeholder.svg"}
                                                            alt={item.product.name}
                                                            width={40}
                                                            height={40}
                                                            className="rounded-md object-cover"
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xs">
                                                            Sin imagen
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{item.product?.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Intl.NumberFormat("es-ES", {
                                                    style: "currency",
                                                    currency: "USD",
                                                }).format(price)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{item.quantity}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Intl.NumberFormat("es-ES", {
                                                    style: "currency",
                                                    currency: "USD",
                                                }).format(subtotal)}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {canBeCancelled && (
                    <div className="mt-6 flex justify-end">
                        <Button
                            variant="destructive"
                            onClick={() => {
                                if (confirm("¿Estás seguro de que deseas cancelar este pedido?")) {
                                    cancelOrder.mutate(order.id, {
                                        onSuccess: () => {
                                            router.push("/orders")
                                        },
                                    })
                                }
                            }}
                            disabled={cancelOrder.isPending}
                        >
                            {cancelOrder.isPending ? "Cancelando..." : "Cancelar Pedido"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

