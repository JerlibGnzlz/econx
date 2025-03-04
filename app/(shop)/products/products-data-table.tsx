"use client"
import { useRouter } from "next/navigation"
import { DataTable } from "./data-table"
import { type Product, getColumns } from "./columns"

interface ProductsDataTableProps {
    products: Product[]
    isAuthenticated: boolean
}

export default function ProductsDataTable({ products, isAuthenticated }: ProductsDataTableProps) {
    const router = useRouter()

    const handleDelete = async (id: number) => {
        if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            return
        }

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Error al eliminar producto")
            }

            router.refresh()
        } catch (error) {
            console.error("Error:", error)
            alert("Error al eliminar producto")
        }
    }

    const columns = getColumns(isAuthenticated, handleDelete)

    return <DataTable columns={columns} data={products} isAuthenticated={isAuthenticated} />
}


