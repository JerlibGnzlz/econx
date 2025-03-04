// "use client"

// import { useState } from "react"
// import {
//     type ColumnDef,
//     flexRender,
//     getCoreRowModel,
//     useReactTable,
//     getPaginationRowModel,
//     getSortedRowModel,
//     type SortingState,
//     getFilteredRowModel,
//     type ColumnFiltersState,
// } from "@tanstack/react-table"
// // import { Input } from "@/components/ui/input"
// // import { Button } from "@/components/ui/button"
// import { ChevronDown, ChevronUp, Search } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { Input } from "@/app/components/ui/input"
// import { Button } from "@/app/components/ui/button"

// interface DataTableProps<TData, TValue> {
//     columns: ColumnDef<TData, TValue>[]
//     data: TData[]
//     isAuthenticated: boolean
// }

// export function DataTable<TData, TValue>({ columns, data, isAuthenticated }: DataTableProps<TData, TValue>) {
//     const [sorting, setSorting] = useState<SortingState>([])
//     const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
//     const router = useRouter()

//     const table = useReactTable({
//         data,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         onSortingChange: setSorting,
//         getSortedRowModel: getSortedRowModel(),
//         onColumnFiltersChange: setColumnFilters,
//         getFilteredRowModel: getFilteredRowModel(),
//         state: {
//             sorting,
//             columnFilters,
//         },
//     })

//     return (
//         <div className="space-y-4">
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center border rounded-md px-3 py-1 w-full max-w-sm">
//                     <Search className="h-4 w-4 text-gray-400 mr-2" />
//                     <Input
//                         placeholder="Buscar productos..."
//                         value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
//                         onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
//                         className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
//                     />
//                 </div>
//                 {isAuthenticated && (
//                     <Button onClick={() => router.push("/products/create")} className="bg-indigo-600 hover:bg-indigo-700">
//                         Nuevo Producto
//                     </Button>
//                 )}
//             </div>

//             <div className="rounded-md border">
//                 <table className="w-full">
//                     <thead>
//                         {table.getHeaderGroups().map((headerGroup) => (
//                             <tr key={headerGroup.id} className="border-b bg-gray-50">
//                                 {headerGroup.headers.map((header) => {
//                                     return (
//                                         <th key={header.id} className="px-4 py-3 text-left text-sm font-medium text-gray-500">
//                                             {header.isPlaceholder ? null : (
//                                                 <div
//                                                     className={
//                                                         header.column.getCanSort() ? "flex items-center gap-1 cursor-pointer select-none" : ""
//                                                     }
//                                                     onClick={header.column.getToggleSortingHandler()}
//                                                 >
//                                                     {flexRender(header.column.columnDef.header, header.getContext())}
//                                                     {{
//                                                         asc: <ChevronUp className="h-4 w-4" />,
//                                                         desc: <ChevronDown className="h-4 w-4" />,
//                                                     }[header.column.getIsSorted() as string] ?? null}
//                                                 </div>
//                                             )}
//                                         </th>
//                                     )
//                                 })}
//                             </tr>
//                         ))}
//                     </thead>
//                     <tbody>
//                         {table.getRowModel().rows?.length ? (
//                             table.getRowModel().rows.map((row) => (
//                                 <tr key={row.id} className="border-b hover:bg-gray-50">
//                                     {row.getVisibleCells().map((cell) => (
//                                         <td key={cell.id} className="px-4 py-3 text-sm">
//                                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                         </td>
//                                     ))}
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={columns.length} className="h-24 text-center">
//                                     No se encontraron resultados.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="flex items-center justify-between">
//                 <div className="text-sm text-gray-500">
//                     Mostrando {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} a{" "}
//                     {Math.min(
//                         (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
//                         table.getFilteredRowModel().rows.length,
//                     )}{" "}
//                     de {table.getFilteredRowModel().rows.length} resultados
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => table.previousPage()}
//                         disabled={!table.getCanPreviousPage()}
//                     >
//                         Anterior
//                     </Button>
//                     <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
//                         Siguiente
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }

"use client"

import { useState } from "react"
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
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isAuthenticated: boolean
}

export function DataTable<TData, TValue>({ columns, data, isAuthenticated }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const router = useRouter()

    const table = useReactTable({
        data,
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
                        placeholder="Buscar productos..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                    />
                </div>
                {isAuthenticated && (
                    <Button onClick={() => router.push("/products/new")} className="bg-indigo-600 hover:bg-indigo-700">
                        Nuevo Producto
                    </Button>
                )}
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
                                        No se encontraron resultados.
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

