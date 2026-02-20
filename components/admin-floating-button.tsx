'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { isAdminLoggedIn, adminLogout } from '@/lib/store'
import { useRouter } from 'next/navigation'

export function AdminFloatingButton() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setLoggedIn(isAdminLoggedIn())
    }, [])

    const handleLogout = () => {
        adminLogout()
        setLoggedIn(false)
        router.push('/')
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {showTooltip && (
                <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-purple-950/90 border border-purple-500/30 rounded-lg text-xs text-purple-200 whitespace-nowrap backdrop-blur-xl">
                    {loggedIn ? 'Logout Admin' : 'Login Admin'}
                </div>
            )}

            {loggedIn ? (
                <button
                    onClick={handleLogout}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="group w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-700/20 hover:from-red-500/40 hover:to-red-700/40 border border-red-500/30 hover:border-red-400/50 backdrop-blur-xl flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_-5px_rgba(239,68,68,0.5)] hover:scale-110 active:scale-95"
                    title="Logout Admin"
                >
                    {/* Door open / logout icon */}
                    <svg className="w-5 h-5 text-red-300 group-hover:text-red-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            ) : (
                <Link
                    href="/admin/login"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="group w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-700/20 hover:from-purple-500/40 hover:to-purple-700/40 border border-purple-500/30 hover:border-purple-400/50 backdrop-blur-xl flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_-5px_rgba(168,85,247,0.5)] hover:scale-110 active:scale-95"
                    title="Login Admin"
                >
                    {/* Door / login icon */}
                    <svg className="w-5 h-5 text-purple-300 group-hover:text-purple-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                </Link>
            )}
        </div>
    )
}
