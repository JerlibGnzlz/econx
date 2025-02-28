export interface UserType {
    id: number
    name: string
    email: string
    createdAt: string
    updatedAt: string
}

export interface SessionType {
    user: UserType
    expires: string
}

export interface AuthResult {
    success: boolean
    error?: string
}

