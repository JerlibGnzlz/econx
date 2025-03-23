// Mock data para el carrito
export let mockCartItems: any[] = []

// Función para resetear los datos mock (útil para pruebas)
export function resetMockData() {
    mockCartItems = []
}

// Exportar la variable para que pueda ser compartida entre endpoints
export default {
    cartItems: mockCartItems,
    resetMockData,
}

