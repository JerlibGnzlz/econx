// import { fetchApi } from "@/lib/api-client"

import { fetchApi } from "../utils/api-client"

export interface OrderDetail {
    id: number
    orderId: number
    productId: number
    product?: Product
    quantity: number
    unitPrice: number
}

export interface Product {
    id: number
    name: string
    description: string
    price: number
    image: string
}

export interface Order {
    id: number
    userId: number
    status: string
    date: string
    details?: OrderDetail[]
    createdAt: string
    updatedAt: string
}

export interface CreateOrderInput {
    items: {
        productId: number
        quantity: number
    }[]
}

export interface UpdateOrderStatusInput {
    id: number
    status: string
}

export interface CartItem {
    id: number
    productId: number
    quantity: number
    product: Product
}


// Servicios para pedidos
export const orderService = {
    // Obtener todos los pedidos del usuario
    getOrders: () => {
        return fetchApi<Order[]>("/orders")
    },

    // Obtener un pedido por ID
    getOrderById: (id: number) => {
        return fetchApi<Order>(`/orders/${id}`)
    },

    // Crear un nuevo pedido
    createOrder: (orderData: CreateOrderInput) => {
        return fetchApi<Order>("/orders", {
            method: "POST",
            body: orderData,
        })
    },

    // Actualizar el estado de un pedido
    updateOrderStatus: (data: UpdateOrderStatusInput) => {
        return fetchApi<Order>(`/orders/${data.id}`, {
            method: "PUT",
            body: { status: data.status },
        })
    },

    // Cancelar un pedido
    cancelOrder: (id: number) => {
        return fetchApi<{ success: boolean }>(`/orders/${id}`, {
            method: "DELETE",
        })
    },
}

// Mock para el carrito de compras (simulando localStorage)
let mockCart: CartItem[] = []

// Servicios para el carrito de compras
export const cartService = {
    // Obtener items del carrito
    getCartItems: (): Promise<CartItem[]> => {
        return Promise.resolve(mockCart)
    },

    // Añadir item al carrito
    addToCart: async (productId: number, quantity = 1): Promise<CartItem[]> => {
        // Obtener información del producto
        const product = await fetchApi<Product>(`/products/${productId}`)

        // Verificar si el producto ya está en el carrito
        const existingItemIndex = mockCart.findIndex((item) => item.productId === productId)

        if (existingItemIndex >= 0) {
            // Actualizar cantidad si ya existe
            mockCart[existingItemIndex].quantity += quantity
        } else {
            // Añadir nuevo item si no existe
            mockCart.push({
                id: Date.now(),
                productId,
                quantity,
                product,
            })
        }

        return Promise.resolve([...mockCart])
    },

    // Actualizar cantidad de un item
    updateCartItemQuantity: (productId: number, quantity: number): Promise<CartItem[]> => {
        const itemIndex = mockCart.findIndex((item) => item.productId === productId)

        if (itemIndex >= 0 && quantity > 0) {
            mockCart[itemIndex].quantity = quantity
        }

        return Promise.resolve([...mockCart])
    },

    // Eliminar item del carrito
    removeFromCart: (productId: number): Promise<CartItem[]> => {
        mockCart = mockCart.filter((item) => item.productId !== productId)
        return Promise.resolve([...mockCart])
    },

    // Vaciar carrito
    clearCart: (): Promise<CartItem[]> => {
        mockCart = []
        return Promise.resolve([])
    },

    // Calcular total del carrito
    getCartTotal: (): Promise<number> => {
        const total = mockCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
        return Promise.resolve(total)
    },
}

