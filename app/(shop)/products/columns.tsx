"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Trash2, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Asegúrate de que esta interfaz coincida con los datos que estás pasando
export interface Product {
    id: number
    name: string
    description: string
    price: number
    image: string
}

export const getColumns = (isAuthenticated: boolean, handleDelete: (id: number) => void): ColumnDef<Product>[] => {
    return [
        {
            accessorKey: "image",
            header: "Imagen",
            cell: ({ row }) => {
                const product = row.original
                return (
                    <div className="relative h-12 w-12 bg-gray-100 rounded-md overflow-hidden">
                        {product.image ? (
                            <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name || "Producto"}
                                width={48}
                                height={48}
                                className="object-cover"
                                unoptimized
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-500 text-xs">
                                Sin imagen
                            </div>
                        )}
                    </div>
                )
            },
            enableSorting: false,
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nombre
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                )
            },
        },
        {
            accessorKey: "description",
            header: "Descripción",
            cell: ({ row }) => {
                const description = row.getValue("description") as string
                return (
                    <div className="max-w-[200px] truncate" title={description}>
                        {description}
                    </div>
                )
            },
        },
        {
            accessorKey: "price",
            header: ({ column }) => {
                return (
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Precio
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                )
            },
            cell: ({ row }) => {
                const price = Number.parseFloat(row.getValue("price"))
                const formatted = new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "USD",
                }).format(price)

                return <div>{formatted}</div>
            },
        },
        {
            id: "actions",
            header: "Acciones",
            cell: ({ row }) => {
                const product = row.original

                return (
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/products/${product.id}`}
                            className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100"
                            title="Ver detalles"
                        >
                            <Eye className="h-4 w-4" />
                        </Link>

                        {isAuthenticated && (
                            <>
                                <Link
                                    href={`/products/${product.id}/edit`}
                                    className="p-2 text-green-600 hover:text-green-800 rounded-full hover:bg-green-100"
                                    title="Editar"
                                >
                                    <Edit className="h-4 w-4" />
                                </Link>

                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100"
                                    title="Eliminar"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </>
                        )}
                    </div>
                )
            },
        },
    ]
}

