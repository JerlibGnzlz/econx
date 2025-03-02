"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Slider } from "@/app/components/ui/slider"

export function ProductFilters() {
    return (
        <Card className="sticky top-4">
            <CardHeader>
                <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Rango de precio */}
                <div className="space-y-2">
                    <h3 className="font-medium">Precio</h3>
                    <Slider defaultValue={[0, 1000]} max={1000} step={10} className="w-full" />
                    <div className="flex justify-between text-sm">
                        <span>$0</span>
                        <span>$1,000</span>
                    </div>
                </div>

                {/* Categorías */}
                <div className="space-y-2">
                    <h3 className="font-medium">Categorías</h3>
                    <div className="space-y-2">
                        {["Electrónicos", "Ropa", "Hogar", "Deportes"].map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                                <Checkbox id={category} />
                                <label htmlFor={category} className="text-sm">
                                    {category}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

