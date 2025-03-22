import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { CreateProductInput, productService, UpdateProductInput } from "../services/product-service"
// import { productService, type CreateProductInput, type UpdateProductInput } from "@/services/product-service"

// Keys para React Query
export const productKeys = {
    all: ["products"] as const,
    details: (id: number) => [...productKeys.all, id] as const,
}

// Hook para obtener todos los productos
export function useProducts() {
    return useQuery({
        queryKey: productKeys.all,
        queryFn: productService.getProducts,
    })
}

// Hook para obtener un producto por ID
export function useProduct(id: number) {
    return useQuery({
        queryKey: productKeys.details(id),
        queryFn: () => productService.getProductById(id),
        enabled: !!id,
    })
}

// Hook para crear un producto
export function useCreateProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateProductInput) => productService.createProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.all })
            toast.success("Producto creado correctamente")
        },
        onError: (error: Error) => {
            toast.error(`Error al crear producto: ${error.message}`)
        },
    })
}

// Hook para actualizar un producto
export function useUpdateProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: UpdateProductInput) => productService.updateProduct(data),
        onSuccess: (_: any, variables: { id: number }) => {
            queryClient.invalidateQueries({ queryKey: productKeys.details(variables.id) })
            queryClient.invalidateQueries({ queryKey: productKeys.all })
            toast.success("Producto actualizado correctamente")
        },
        onError: (error: Error) => {
            toast.error(`Error al actualizar producto: ${error.message}`)
        },
    })
}

// Hook para eliminar un producto
export function useDeleteProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => productService.deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.all })
            toast.success("Producto eliminado correctamente")
        },
        onError: (error: Error) => {
            toast.error(`Error al eliminar producto: ${error.message}`)
        },
    })
}

