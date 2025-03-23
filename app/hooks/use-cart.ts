import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { AddToCartInput, cartService, UpdateCartItemInput } from "../services/cart-service"
// import { cartService, type AddToCartInput, type UpdateCartItemInput } from "@/services/cart-service"

// Keys para React Query
export const cartKeys = {
    all: ["cart"] as const,
    items: () => [...cartKeys.all, "items"] as const,
    item: (id: number) => [...cartKeys.items(), id] as const,
    total: () => [...cartKeys.all, "total"] as const,
}

// Hook para obtener todos los items del carrito
export function useCartItems() {
    return useQuery({
        queryKey: cartKeys.items(),
        queryFn: cartService.getCartItems,
    })
}

// Hook para obtener el total del carrito
export function useCartTotal() {
    return useQuery({
        queryKey: cartKeys.total(),
        queryFn: cartService.getCartTotal,
    })
}

// Hook para añadir un producto al carrito
export function useAddToCart() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: AddToCartInput) => cartService.addToCart(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cartKeys.items() })
            queryClient.invalidateQueries({ queryKey: cartKeys.total() })
            toast.success("Producto añadido al carrito")
        },
        onError: (error: Error) => {
            toast.error(`Error al añadir al carrito: ${error.message}`)
        },
    })
}

// Hook para actualizar la cantidad de un producto en el carrito
export function useUpdateCartItem() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: UpdateCartItemInput) => cartService.updateCartItem(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: cartKeys.item(variables.id) })
            queryClient.invalidateQueries({ queryKey: cartKeys.items() })
            queryClient.invalidateQueries({ queryKey: cartKeys.total() })
            toast.success("Carrito actualizado")
        },
        onError: (error: Error) => {
            toast.error(`Error al actualizar el carrito: ${error.message}`)
        },
    })
}

// Hook para eliminar un producto del carrito
export function useRemoveFromCart() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => cartService.removeFromCart(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cartKeys.items() })
            queryClient.invalidateQueries({ queryKey: cartKeys.total() })
            toast.success("Producto eliminado del carrito")
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
            queryClient.invalidateQueries({ queryKey: cartKeys.items() })
            queryClient.invalidateQueries({ queryKey: cartKeys.total() })
            toast.success("Carrito vaciado")
        },
        onError: (error: Error) => {
            toast.error(`Error al vaciar el carrito: ${error.message}`)
        },
    })
}

