"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form"

// Esquema de validación con Zod
const orderStatusSchema = z.object({
    status: z.string().min(1, { message: "El estado es requerido" }),
    paymentStatus: z.string().min(1, { message: "El estado de pago es requerido" }),
})

type OrderStatusFormValues = z.infer<typeof orderStatusSchema>

interface OrderStatusFormProps {
    order: any
}

export default function OrderStatusForm({ order }: OrderStatusFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    // Valores por defecto para el formulario
    const defaultValues: OrderStatusFormValues = {
        status: order.status || "pendiente",
        paymentStatus: order.paymentStatus || "pendiente",
    }

    // Configurar el formulario con React Hook Form y Zod
    const form = useForm<OrderStatusFormValues>({
        resolver: zodResolver(orderStatusSchema),
        defaultValues,
    })

    const onSubmit = async (data: OrderStatusFormValues) => {
        setIsLoading(true)

        try {
            // Actualizar el estado del pedido
            const response = await fetch(`/api/orders/${order.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Error al actualizar el estado del pedido")
            }

            // Si el estado ha cambiado, enviar notificación por correo
            if (data.status !== order.status) {
                try {
                    await fetch("/api/email/order-status-update", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            orderId: order.id,
                            newStatus: data.status,
                        }),
                    })
                } catch (emailError) {
                    console.error("Error al enviar notificación:", emailError)
                }
            }

            toast.success("Estado del pedido actualizado correctamente")
            router.refresh()
        } catch (error: any) {
            toast.error(error.message || "Ocurrió un error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }: any) => (
                        <FormItem>
                            <FormLabel>Estado del pedido</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar estado" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="pendiente">Pendiente</SelectItem>
                                    <SelectItem value="en curso">En curso</SelectItem>
                                    <SelectItem value="enviado">Enviado</SelectItem>
                                    <SelectItem value="entregado">Entregado</SelectItem>
                                    <SelectItem value="cancelado">Cancelado</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="paymentStatus"
                    render={({ field }: any) => (
                        <FormItem>
                            <FormLabel>Estado del pago</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar estado de pago" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="pendiente">Pendiente</SelectItem>
                                    <SelectItem value="procesando">Procesando</SelectItem>
                                    <SelectItem value="pagado">Pagado</SelectItem>
                                    <SelectItem value="reembolsado">Reembolsado</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Actualizando...
                        </>
                    ) : (
                        "Actualizar Estado"
                    )}
                </Button>
            </form>
        </Form>
    )
}

