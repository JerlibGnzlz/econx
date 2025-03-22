type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE"
    body?: any
    headers?: Record<string, string>
}

export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {} } = options

    const requestOptions: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        ...(body && { body: JSON.stringify(body) }),
    }

    try {
        const response = await fetch(`/api${endpoint}`, requestOptions)

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || `Error: ${response.status}`)
        }

        return (await response.json()) as T
    } catch (error) {
        console.error(`API error for ${endpoint}:`, error)
        throw error
    }
}

