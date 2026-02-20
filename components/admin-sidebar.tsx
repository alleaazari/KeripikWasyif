'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { adminLogout } from '@/lib/store'

export function AdminSidebar() {
    const pathname = usePathname()
    const router = useRouter()

    const menuItems = [
        {
            label: 'Dashboard',
            href: '/admin',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            ),
        },
        {
            label: 'Hero',
            href: '/admin/hero',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            label: 'Produk',
            href: '/admin/produk',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
        },
        {
            label: 'Ulasan',
            href: '/admin/ulasan',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
            ),
        },
        {
            label: 'Laporan',
            href: '/admin/laporan',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
    ]

    const handleLogout = () => {
        adminLogout()
        router.push('/')
    }

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 z-50">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-950/90 via-black/80 to-purple-950/90 backdrop-blur-xl border-r border-purple-500/20"></div>

            <div className="relative h-full flex flex-col p-4">
                {/* Brand */}
                <div className="mb-8 px-3 pt-2">
                    <h1 className="text-lg font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                        KripikWasyif
                    </h1>
                    <p className="text-purple-300/50 text-xs mt-1">Admin Panel</p>
                </div>

                {/* Menu */}
                <nav className="flex-1 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                                    ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30 shadow-[0_0_15px_-5px_rgba(168,85,247,0.3)]'
                                    : 'text-purple-300/70 hover:text-purple-200 hover:bg-purple-500/10'
                                    }`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom section */}
                <div className="border-t border-purple-500/20 pt-4 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-purple-300/70 hover:text-purple-200 hover:bg-purple-500/10 transition-all duration-300"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Lihat Website
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 w-full text-left"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    )
}
