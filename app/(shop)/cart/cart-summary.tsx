// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { toast } from "sonner"
// import { Loader2 } from "lucide-react"
// // import { Button } from "@/components/ui/button"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Label } from "@/components/ui/label"
// import { useCart } from "./cart-context"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/app/components/ui/textarea"
// // import { Label } from "@radix-ui/react-label"
// import { Button } from "@/app/components/ui/button"
// import { Label } from "@/app/components/ui/labels"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"

// export default function CartSummary() {
//     const { items, subtotal, clearCart } = useCart()
//     const [isLoading, setIsLoading] = useState(false)
//     const [shippingAddress, setShippingAddress] = useState("")
//     const [notes, setNotes] = useState("")
//     const [paymentMethod, setPaymentMethod] = useState("efectivo")
//     const router = useRouter()

//     const handleCheckout = async () => {
//         if (items.length === 0) {
//             toast.error("No hay productos en el carrito")
//             return
//         }

//         if (!shippingAddress.trim()) {
//             toast.error("La dirección de envío es requerida")
//             return
//         }

//         setIsLoading(true)

//         try {
//             const response = await fetch("/api/orders", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     items: items.map((item) => ({
//                         productId: item.id,
//                         quantity: item.quantity,
//                     })),
//                     shippingAddress,
//                     notes,
//                     paymentMethod,
//                 }),
//             })

//             if (!response.ok) {
//                 const data = await response.json()
//                 throw new Error(data.error || "Error al crear el pedido")
//             }

//             const order = await response.json()

//             // Limpiar el carrito después de crear el pedido
//             clearCart()

//             toast.success("¡Pedido creado con éxito!")

//             // Redirigir a la página de confirmación
//             router.push(`/checkout/success?orderId=${order.id}`)
//         } catch (error: any) {
//             toast.error(error.message || "Error al procesar el pedido")
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     return (
//         <div className="bg-white rounded-lg shadow p-6 sticky top-4">
//             <h2 className="font-semibold text-lg mb-4">Resumen del pedido</h2>

//             <div className="space-y-4 mb-6">
//                 <div className="flex justify-between">
//                     <span>Subtotal</span>
//                     <span>
//                         {new Intl.NumberFormat("es-ES", {
//                             style: "currency",
//                             currency: "USD",
//                         }).format(subtotal)}
//                     </span>
//                 </div>
//                 <div className="flex justify-between font-medium text-lg">
//                     <span>Total</span>
//                     <span>
//                         {new Intl.NumberFormat("es-ES", {
//                             style: "currency",
//                             currency: "USD",
//                         }).format(subtotal)}
//                     </span>
//                 </div>
//             </div>

//             <div className="space-y-4 mb-6">
//                 <div>
//                     <Label htmlFor="shipping-address">Dirección de envío</Label>
//                     <Textarea
//                         id="shipping-address"
//                         placeholder="Ingresa tu dirección completa"
//                         value={shippingAddress}
//                         onChange={(e) => setShippingAddress(e.target.value)}
//                         className="mt-1"
//                         rows={3}
//                     />
//                 </div>

//                 <div>
//                     <Label htmlFor="payment-method">Método de pago</Label>
//                     <Select value={paymentMethod} onValueChange={setPaymentMethod}>
//                         <SelectTrigger className="mt-1">
//                             <SelectValue placeholder="Selecciona un método de pago" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="efectivo">Efectivo</SelectItem>
//                             <SelectItem value="tarjeta">Tarjeta de crédito</SelectItem>
//                             <SelectItem value="transferencia">Transferencia bancaria</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>

//                 <div>
//                     <Label htmlFor="notes">Notas adicionales</Label>
//                     <Textarea
//                         id="notes"
//                         placeholder="Instrucciones especiales para la entrega"
//                         value={notes}
//                         onChange={(e) => setNotes(e.target.value)}
//                         className="mt-1"
//                         rows={2}
//                     />
//                 </div>
//             </div>

//             <div className="space-y-2">
//                 <Button
//                     onClick={handleCheckout}
//                     disabled={isLoading || items.length === 0}
//                     className="w-full bg-indigo-600 hover:bg-indigo-700"
//                 >
//                     {isLoading ? (
//                         <>
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                             Procesando...
//                         </>
//                     ) : (
//                         "Finalizar Compra"
//                     )}
//                 </Button>

//                 <Button variant="outline" onClick={clearCart} disabled={isLoading || items.length === 0} className="w-full">
//                     Vaciar Carrito
//                 </Button>
//             </div>
//         </div>
//     )
// }


"use client"

import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface CartSummaryProps {
    total: number
    onCheckout: () => void
    onClearCart: () => void
    isClearingCart: boolean
}

export default function CartSummary({ total, onCheckout, onClearCart, isClearingCart }: CartSummaryProps) {
    const [shippingAddress, setShippingAddress] = useState("")

    const handleCheckout = () => {
        if (!shippingAddress.trim()) {
            alert("Por favor ingrese una dirección de envío")
            return
        }
        onCheckout()
    }

    return (
        <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="font-semibold text-lg mb-4">Resumen del pedido</h2>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                        {new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "USD",
                        }).format(total)}
                    </span>
                </div>
                <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>
                        {new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "USD",
                        }).format(total)}
                    </span>
                </div>
            </div>

            <div className="space-y-4 mb-6">
                <div>
                    <label htmlFor="shipping-address" className="block text-sm font-medium text-gray-700">
                        Dirección de envío
                    </label>
                    <Textarea
                        id="shipping-address"
                        placeholder="Ingresa tu dirección completa"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="mt-1"
                        rows={3}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Button onClick={handleCheckout} className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Finalizar Compra
                </Button>

                <Button variant="outline" onClick={onClearCart} disabled={isClearingCart} className="w-full">
                    {isClearingCart ? "Vaciando..." : "Vaciar Carrito"}
                </Button>
            </div>
        </div>
    )
}

