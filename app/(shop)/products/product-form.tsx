// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// // import { Input } from "@/components/ui/input"
// // import { Button } from "@/components/ui/button"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { toast } from "sonner"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form"
// import { Input } from "@/app/components/ui/input"
// import { Textarea } from "@/app/components/ui/textarea"
// import { Button } from "@/app/components/ui/button"

// // Esquema de validación con Zod
// const productSchema = z.object({
//     name: z
//         .string()
//         .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
//         .max(255, { message: "El nombre no puede exceder los 255 caracteres" }),
//     description: z.string().max(1000, { message: "La descripción no puede exceder los 1000 caracteres" }).optional(),
//     price: z.coerce.number().positive({ message: "El precio debe ser un número positivo" }),
//     image: z.string().url({ message: "Debe ser una URL válida" }).optional().or(z.literal("")),
// })

// type ProductFormValues = z.infer<typeof productSchema>

// interface Product {
//     id: number
//     name: string
//     description: string
//     price: number
//     image: string
// }

// export default function ProductForm({ product }: { product?: Product }) {
//     const router = useRouter()
//     const isEditing = !!product
//     const [isLoading, setIsLoading] = useState(false)

//     // Valores por defecto para el formulario
//     const defaultValues: Partial<ProductFormValues> = {
//         name: product?.name || "",
//         description: product?.description || "",
//         price: product?.price || undefined,
//         image: product?.image || "",
//     }

//     // Configurar el formulario con React Hook Form y Zod
//     const form = useForm<ProductFormValues>({
//         resolver: zodResolver(productSchema),
//         defaultValues,
//     })

//     const onSubmit = async (data: ProductFormValues) => {
//         setIsLoading(true)

//         try {
//             const url = isEditing ? `/api/products/${product.id}` : "/api/products"

//             const method = isEditing ? "PUT" : "POST"

//             const response = await fetch(url, {
//                 method,
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             })

//             if (!response.ok) {
//                 const errorData = await response.json()
//                 throw new Error(errorData.error || "Error al guardar producto")
//             }

//             toast.success(isEditing ? "Producto actualizado correctamente" : "Producto creado correctamente")
//             router.push("/products")
//             router.refresh()
//         } catch (error: any) {
//             toast.error(error.message || "Ocurrió un error")
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                 <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Nombre</FormLabel>
//                             <FormControl>
//                                 <Input {...field} placeholder="Nombre del producto" />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 <FormField
//                     control={form.control}
//                     name="description"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Descripción</FormLabel>
//                             <FormControl>
//                                 <Textarea {...field} placeholder="Descripción del producto" rows={4} />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 <FormField
//                     control={form.control}
//                     name="price"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Precio</FormLabel>
//                             <FormControl>
//                                 <Input {...field} type="number" step="0.01" placeholder="0.00" />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 <FormField
//                     control={form.control}
//                     name="image"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>URL de la imagen</FormLabel>
//                             <FormControl>
//                                 <Input {...field} placeholder="https://ejemplo.com/imagen.jpg" />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 <div className="flex justify-end space-x-3">
//                     <Button type="button" variant="outline" onClick={() => router.back()}>
//                         Cancelar
//                     </Button>

//                     <Button type="submit" disabled={isLoading}>
//                         {isLoading ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
//                     </Button>
//                 </div>
//             </form>
//         </Form>
//     )
// }

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Button } from "@/app/components/ui/button"

// Esquema de validación con Zod
const productSchema = z.object({
    name: z
        .string()
        .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
        .max(255, { message: "El nombre no puede exceder los 255 caracteres" }),
    description: z
        .string()
        .max(1000, { message: "La descripción no puede exceder los 1000 caracteres" })
        .optional()
        .or(z.literal("")),
    price: z.coerce.number().positive({ message: "El precio debe ser un número positivo" }),
    image: z.string().url({ message: "Debe ser una URL válida" }).optional().or(z.literal("")),
})

type ProductFormValues = z.infer<typeof productSchema>

interface Product {
    id: number
    name: string
    description: string
    price: number
    image: string
}

export default function ProductForm({ product }: { product?: Product }) {
    const router = useRouter()
    const isEditing = !!product
    const [isLoading, setIsLoading] = useState(false)

    // Valores por defecto para el formulario
    const defaultValues: Partial<ProductFormValues> = {
        name: product?.name || "",
        description: product?.description || "",
        price: product?.price || undefined,
        image: product?.image || "",
    }

    // Configurar el formulario con React Hook Form y Zod
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues,
    })

    const onSubmit = async (data: ProductFormValues) => {
        setIsLoading(true)

        try {
            const url = isEditing ? `/api/products/${product.id}` : "/api/products"

            const method = isEditing ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Error al guardar producto")
            }

            toast.success(isEditing ? "Producto actualizado correctamente" : "Producto creado correctamente")
            router.push("/products")
            router.refresh()
        } catch (error: any) {
            toast.error(error.message || "Ocurrió un error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre del producto" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Descripción del producto" rows={4} {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Precio</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...field}
                                    value={field.value === undefined ? "" : field.value}
                                    onChange={(e) => {
                                        const value = e.target.value === "" ? undefined : Number.parseFloat(e.target.value)
                                        field.onChange(value)
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL de la imagen</FormLabel>
                            <FormControl>
                                <Input placeholder="https://ejemplo.com/imagen.jpg" {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-3">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancelar
                    </Button>

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

