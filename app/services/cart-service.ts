// import { fetchApi } from "@/lib/api-client"
import { fetchApi } from "../utils/api-client"
import type { Product } from "./product-service"

export interface CartItem {
    id: number
    productId: number
    quantity: number
    product: Product
}

export interface AddToCartInput {
    productId: number
    quantity: number
}

export interface UpdateCartItemInput {
    id: number
    quantity: number
}

// Servicios para el carrito de compras
export const cartService = {
    // Obtener todos los items del carrito
    getCartItems: () => {
        return fetchApi<CartItem[]>("/cart")
    },

    // Añadir un producto al carrito
    addToCart: (data: AddToCartInput) => {
        return fetchApi<CartItem>("/cart", {
            method: "POST",
            body: data,
        })
    },

    // Actualizar la cantidad de un producto en el carrito
    updateCartItem: (data: UpdateCartItemInput) => {
        return fetchApi<CartItem>(`/cart/${data.id}`, {
            method: "PUT",
            body: { quantity: data.quantity },
        })
    },

    // Eliminar un producto del carrito
    removeFromCart: (id: number) => {
        return fetchApi<{ success: boolean }>(`/cart/${id}`, {
            method: "DELETE",
        })
    },

    // Vaciar el carrito
    clearCart: () => {
        return fetchApi<{ success: boolean }>("/cart/clear", {
            method: "DELETE",
        })
    },

    // Obtener el total del carrito
    getCartTotal: () => {
        return fetchApi<{ total: number }>("/cart/total")
    },
}

