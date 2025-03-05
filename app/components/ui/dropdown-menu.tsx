// "use client"

// import React, { useState } from "react"

// interface DropdownMenuProps {
//     children: React.ReactNode
// }

// export function DropdownMenu({ children }: DropdownMenuProps) {
//     return <div className="relative">{children}</div>
// }

// interface DropdownMenuTriggerProps {
//     children: React.ReactNode
//     asChild?: boolean
// }

// export function DropdownMenuTrigger({ children, asChild = false }: DropdownMenuTriggerProps) {
//     const [isOpen, setIsOpen] = useState(false)

//     const handleClick = () => {
//         setIsOpen(!isOpen)
//     }

//     if (asChild) {
//         return React.cloneElement(children as React.ReactElement, { onClick: handleClick })
//     }

//     return <button onClick={handleClick}>{children}</button>
// }

// interface DropdownMenuContentProps {
//     children: React.ReactNode
//     align?: "start" | "end"
// }

// export function DropdownMenuContent({ children, align = "start" }: DropdownMenuContentProps) {
//     return (
//         <div
//             className={`absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${align === "end" ? "right-0" : "left-0"}`}
//         >
//             <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//                 {children}
//             </div>
//         </div>
//     )
// }

// interface DropdownMenuItemProps {
//     children: React.ReactNode
//     onClick?: () => void
// }

// export function DropdownMenuItem({ children, onClick }: DropdownMenuItemProps) {
//     return (
//         <a
//             href="#"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//             role="menuitem"
//             onClick={(e) => {
//                 e.preventDefault()
//                 onClick && onClick()
//             }}
//         >
//             {children}
//         </a>
//     )
// }

// export function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
//     return <span className="block px-4 py-2 text-sm text-gray-700">{children}</span>
// }

'use client' // Asegúrate de que este archivo sea tratado como un componente del cliente

import React, { useState } from "react"

interface DropdownMenuProps {
    children: React.ReactNode
}

export function DropdownMenu({ children }: DropdownMenuProps) {
    return <div className="relative">{children}</div>
}

interface DropdownMenuTriggerProps {
    children: React.ReactNode
    asChild?: boolean
}

export function DropdownMenuTrigger({ children, asChild = false }: DropdownMenuTriggerProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    if (asChild) {
        // Aquí es importante asegurarnos de que el `children` es un componente React
        return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
            onClick: handleClick,
        })
    }

    return <button onClick={handleClick}>{children}</button>
}

interface DropdownMenuContentProps {
    children: React.ReactNode
    align?: "start" | "end"
}

export function DropdownMenuContent({ children, align = "start" }: DropdownMenuContentProps) {
    return (
        <div
            className={`absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${align === "end" ? "right-0" : "left-0"}`}
        >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {children}
            </div>
        </div>
    )
}

interface DropdownMenuItemProps {
    children: React.ReactNode
    onClick?: () => void
}

export function DropdownMenuItem({ children, onClick }: DropdownMenuItemProps) {
    return (
        <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={(e) => {
                e.preventDefault()
                if (onClick) onClick() // Evita la llamada si no hay `onClick`
            }}
        >
            {children}
        </a>
    )
}

export function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
    return <span className="block px-4 py-2 text-sm text-gray-700">{children}</span>
}
