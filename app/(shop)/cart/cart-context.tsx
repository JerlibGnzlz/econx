"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "sonner"

export interface CartItem {
    id: number
    name: string
    price: number
    image?: string
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addItem: (product: Omit<CartItem, "quantity">) => void
    removeItem: (id: number) => void
    updateQuantity: (id: number, quantity: number) => void
    clearCart: () => void
    totalItems: number
    subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    // Cargar carrito desde localStorage al iniciar
    useEffect(() => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (error) {
                console.error("Error parsing cart from localStorage:", error)
            }
        }
    }, [])

    // Guardar carrito en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items))
    }, [items])

    const addItem = (product: Omit<CartItem, "quantity">) => {
        setItems((prevItems) => {
            // Verificar si el producto ya está en el carrito
            const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

            if (existingItemIndex >= 0) {
                // Si ya existe, incrementar la cantidad
                const updatedItems = [...prevItems]
                updatedItems[existingItemIndex].quantity += 1
                toast.success(`${product.name} añadido al carrito`)
                return updatedItems
            } else {
                // Si no existe, añadirlo con cantidad 1
                toast.success(`${product.name} añadido al carrito`)
                return [...prevItems, { ...product, quantity: 1 }]
            }
        })
    }

    const removeItem = (id: number) => {
        setItems((prevItems) => {
            const itemToRemove = prevItems.find((item) => item.id === id)
            if (itemToRemove) {
                toast.info(`${itemToRemove.name} eliminado del carrito`)
            }
            return prevItems.filter((item) => item.id !== id)
        })
    }

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) return

        setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }

    const clearCart = () => {
        setItems([])
        toast.info("Carrito vaciado")
    }

    const totalItems = items.reduce((total, item) => total + item.quantity, 0)

    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalItems,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}

