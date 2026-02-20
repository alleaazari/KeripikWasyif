'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { isAdminLoggedIn } from '@/lib/store'
import { AdminSidebar } from '@/components/admin-sidebar'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        // Don't check auth for login page
        if (pathname === '/admin/login') {
            setChecking(false)
            return
        }

        if (!isAdminLoggedIn()) {
            router.push('/admin/login')
        } else {
            setChecking(false)
        }
    }, [pathname, router])

    // Login page doesn't use sidebar layout
    if (pathname === '/admin/login') {
        return <>{children}</>
    }

    if (checking) {
        return (
            <div className="min-h-screen bg-black/50 flex items-center justify-center">
                <div className="text-purple-300 animate-pulse text-lg">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black/50 relative">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <AdminSidebar />

            {/* Main content */}
            <main className="ml-64 min-h-screen p-8">
                {children}
            </main>
        </div>
    )
}
