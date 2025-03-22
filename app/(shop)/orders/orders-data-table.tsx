"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    getFilteredRowModel,
    type ColumnFiltersState,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Search, Eye, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface Order {
    id: number
    date: Date
    status: string
    total: number
    items: number
    paymentStatus: string
}

interface OrdersDataTableProps {
    orders: Order[]
}

export default function OrdersDataTable({ orders }: OrdersDataTableProps) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const router = useRouter()

    const columns: ColumnDef<Order>[] = [
        {
            accessorKey: "id",
            header: "Pedido #",
            cell: ({ row }) => <div className="font-medium">#{row.getValue("id")}</div>,
        },
        {
            accessorKey: "date",
            header: ({ column }) => {
                return (
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Fecha
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </div>
                )
            },
            cell: ({ row }) => {
                const date = row.getValue("date") as Date
                return <div>{format(new Date(date), "dd/MM/yyyy HH:mm", { locale: es })}</div>
            },
            sortingFn: "datetime",
        },
        {
            accessorKey: "status",
            header: "Estado",
            cell: ({ row }) => {
                const status = row.getValue("status") as string
                return (
                    <Badge
                        variant={
                            status === "pendiente"
                                ? "outline"
                                : status === "en curso"
                                    ? "secondary"
                                    : status === "enviado"
                                        ? "default"
                                        : status === "entregado"
                                            ? "success"
                                            : "destructive"
                        }
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "paymentStatus",
            header: "Pago",
            cell: ({ row }) => {
                const paymentStatus = row.getValue("paymentStatus") as string
                return (
                    <Badge
                        variant={
                            paymentStatus === "pendiente"
                                ? "outline"
                                : paymentStatus === "procesando"
                                    ? "secondary"
                                    : paymentStatus === "pagado"
                                        ? "success"
                                        : "destructive"
                        }
                    >
                        {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "items",
            header: "Productos",
            cell: ({ row }) => <div className="text-center">{row.getValue("items")}</div>,
        },
        {
            accessorKey: "total",
            header: ({ column }) => {
                return (
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Total
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </div>
                )
            },
            cell: ({ row }) => {
                const total = Number.parseFloat(row.getValue("total"))
                const formatted = new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "USD",
                }).format(total)

                return <div className="font-medium">{formatted}</div>
            },
        },
        {
            id: "actions",
            header: "Acciones",
            cell: ({ row }) => {
                const order = row.original

                return (
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/orders/${order.id}`)}
                            className="h-8 w-8 p-0"
                            title="Ver detalles"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                    </div>
                )
            },
        },
    ]

    const table = useReactTable({
        data: orders,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    })

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center border rounded-md px-3 py-1 w-full max-w-sm">
                    <Search className="h-4 w-4 text-gray-400 mr-2" />
                    <Input
                        placeholder="Buscar pedidos..."
                        value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn("id")?.setFilterValue(event.target.value)}
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                    />
                </div>
                <Button onClick={() => router.push("/cart")} className="bg-indigo-600 hover:bg-indigo-700">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Nuevo Pedido
                </Button>
            </div>

            <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="border-b bg-gray-50">
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <th key={header.id} className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                                                {header.isPlaceholder ? null : (
                                                    <div
                                                        className={
                                                            header.column.getCanSort() ? "flex items-center gap-1 cursor-pointer select-none" : ""
                                                        }
                                                        onClick={header.column.getToggleSortingHandler()}
                                                    >
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        {{
                                                            asc: <ChevronUp className="h-4 w-4" />,
                                                            desc: <ChevronDown className="h-4 w-4" />,
                                                        }[header.column.getIsSorted() as string] ?? null}
                                                    </div>
                                                )}
                                            </th>
                                        )
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className="border-b hover:bg-gray-50">
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-4 py-3 text-sm">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="h-24 text-center">
                                        No se encontraron pedidos.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Mostrando {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} a{" "}
                    {Math.min(
                        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                        table.getFilteredRowModel().rows.length,
                    )}{" "}
                    de {table.getFilteredRowModel().rows.length} resultados
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    )
}

