// import { fetchApi } from "@/lib/api-client"

import { fetchApi } from "../utils/api-client"

export interface Product {
    id: number
    name: string
    description: string
    price: number
    image: string
    userId?: number
}

export interface CreateProductInput {
    name: string
    description?: string
    price: number
    image?: string
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
    id: number
}

// Servicios para productos
export const productService = {
    // Obtener todos los productos
    getProducts: () => {
        return fetchApi<Product[]>("/products")
    },

    // Obtener un producto por ID
    getProductById: (id: number) => {
        return fetchApi<Product>(`/products/${id}`)
    },

    // Crear un nuevo producto
    createProduct: (product: CreateProductInput) => {
        return fetchApi<Product>("/products", {
            method: "POST",
            body: product,
        })
    },

    // Actualizar un producto existente
    updateProduct: (product: UpdateProductInput) => {
        return fetchApi<Product>(`/products/${product.id}`, {
            method: "PUT",
            body: product,
        })
    },

    // Eliminar un producto
    deleteProduct: (id: number) => {
        return fetchApi<{ success: boolean }>(`/products/${id}`, {
            method: "DELETE",
        })
    },
}

