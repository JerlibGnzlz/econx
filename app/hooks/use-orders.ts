import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { cartService, CreateOrderInput, orderService, UpdateOrderStatusInput } from "../services/order-service"

// Keys para React Query
export const orderKeys = {
    all: ["orders"] as const,
    details: (id: number) => [...orderKeys.all, id] as const,
    cart: ["cart"] as const,
}

// Hook para obtener todos los pedidos
export function useOrders() {
    return useQuery({
        queryKey: orderKeys.all,
        queryFn: orderService.getOrders,
    })
}

// Hook para obtener un pedido por ID
export function useOrder(id: number) {
    return useQuery({
        queryKey: orderKeys.details(id),
        queryFn: () => orderService.getOrderById(id),
        enabled: !!id,
    })
}

// Hook para crear un pedido
export function useCreateOrder() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateOrderInput) => orderService.createOrder(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderKeys.all })
            // Limpiar el carrito después de crear el pedido
            queryClient.invalidateQueries({ queryKey: orderKeys.cart })
            cartService.clearCart()
            toast.success("Pedido creado correctamente")
        },
        onError: (error: Error) => {
            toast.error(`Error al crear pedido: ${error.message}`)
        },
    })
}

// Hook para actualizar el estado de un pedido
export function useUpdateOrderStatus() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: { id: number; status: string }) => orderService.updateOrderStatus(data),
        onSuccess: (_: any, variables: { id: number; status: string }) => {
            queryClient.invalidateQueries({ queryKey: orderKeys.details(variables.id) })
            queryClient.invalidateQueries({ queryKey: orderKeys.all })
            toast.success("Estado del pedido actualizado correctamente")
        },
        onError: (error: Error) => {
            toast.error(`Error al actualizar estado del pedido: ${error.message}`)
        },
    })
}

// Hook para cancelar un pedido
export function useCancelOrder() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => orderService.cancelOrder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderKeys.all })
            toast.success("Pedido cancelado correctamente")
        },
        onError: (error: Error) => {
            toast.error(`Error al cancelar pedido: ${error.message}`)
        },
    })
}

// Hook para obtener items del carrito
export function useCartItems() {
    return useQuery({
        queryKey: orderKeys.cart,
        queryFn: cartService.getCartItems,
    })
}

// Hook para añadir item al carrito
export function useAddToCart() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
            cartService.addToCart(productId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderKeys.cart })
            toast.success("Producto añadido al carrito")
        },
        onError: (error: Error) => {
            toast.error(`Error al añadir al carrito: ${error.message}`)
        },
    })
}

// Hook para actualizar cantidad de un item en el carrito
export function useUpdateCartItemQuantity() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
            cartService.updateCartItemQuantity(productId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderKeys.cart })
        },
        onError: (error: Error) => {
            toast.error(`Error al actualizar carrito: ${error.message}`)
        },
    })
}

// Hook para eliminar item del carrito
export function useRemoveFromCart() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (productId: number) => cartService.removeFromCart(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderKeys.cart })
            toast.info("Producto eliminado del carrito")
        },
        onError: (error: Error) => {
            toast.error(`Error al eliminar del carrito: ${error.message}`)
        },
    })
}

// Hook para vaciar el carrito
export function useClearCart() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: cartService.clearCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderKeys.cart })
            toast.info("Carrito vaciado")
        },
        onError: (error: Error) => {
            toast.error(`Error al vaciar el carrito: ${error.message}`)
        },
    })
}

// Hook para obtener el total del carrito
export function useCartTotal() {
    return useQuery({
        queryKey: [...orderKeys.cart, "total"],
        queryFn: cartService.getCartTotal,
    })
}

