// app/providers.tsx
'use client'

import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from "@heroui/toast";

const HeroProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <HeroUIProvider>
            <ToastProvider placement="top-center" toastOffset={40} toastProps={{
                timeout: 1500
            }} />
            {children}
        </HeroUIProvider>
    )
}

export default HeroProviders