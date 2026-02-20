'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminLogin } from '@/lib/store'
import Link from 'next/link'

const OWNER_NAME = 'allea'

export default function AdminLoginPage() {
    const router = useRouter()
    const [step, setStep] = useState<'verify' | 'login'>('verify')
    const [ownerInput, setOwnerInput] = useState('')
    const [verifyError, setVerifyError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault()
        setVerifyError('')
        if (ownerInput.trim().toLowerCase() === OWNER_NAME.toLowerCase()) {
            setStep('login')
        } else {
            setVerifyError('Nama pemilik salah! Anda bukan admin yang berwenang.')
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        setTimeout(() => {
            if (adminLogin(username, password)) {
                router.push('/admin')
            } else {
                setError('Username atau password salah!')
                setIsLoading(false)
            }
        }, 500)
    }

    return (
        <div className="min-h-screen bg-black/50 relative flex items-center justify-center px-4">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="w-full max-w-md">
                {/* Warning Announcement */}
                <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-orange-500/5 to-transparent rounded-2xl backdrop-blur-xl border border-red-500/30"></div>
                    <div className="relative p-5 flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center">
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-red-300 mb-1">⚠️ PERINGATAN</h3>
                            <p className="text-red-200/70 text-xs leading-relaxed">
                                HANYA UNTUK ADMIN! JIKA ANDA BUYER, BISA TETAP DI HALAMAN UTAMA TANPA PERLU LOG IN.
                            </p>
                        </div>
                    </div>
                </div>

                {step === 'verify' ? (
                    <>
                        {/* Verification Step */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/30 to-red-700/30 border border-orange-500/30 mb-4">
                                <svg className="w-10 h-10 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-300 via-red-400 to-orange-500 bg-clip-text text-transparent">
                                Verifikasi Identitas
                            </h1>
                            <p className="text-purple-200/60 text-sm mt-2">Masukkan nama pemilik usaha untuk melanjutkan</p>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-orange-500/20"></div>
                            <form onSubmit={handleVerify} className="relative p-8 space-y-6">
                                {verifyError && (
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm text-center">
                                        {verifyError}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-purple-200 mb-2">Nama Pemilik Usaha</label>
                                    <input
                                        type="text"
                                        value={ownerInput}
                                        onChange={(e) => setOwnerInput(e.target.value)}
                                        placeholder="Masukkan nama pemilik"
                                        className="w-full px-4 py-3 rounded-lg bg-purple-950/40 border border-orange-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-orange-400/60 focus:bg-purple-950/60 transition-all duration-300"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 px-6 bg-gradient-to-r from-orange-500/80 to-red-600/80 hover:from-orange-500 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-orange-400/30 hover:border-orange-300/60 active:scale-95"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Verifikasi
                                </button>

                                <div className="text-center">
                                    <Link href="/" className="text-purple-300/60 hover:text-purple-200 text-xs transition-colors">
                                        ← Kembali ke halaman utama
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Login Step */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/30 to-purple-700/30 border border-purple-500/30 mb-4">
                                <svg className="w-10 h-10 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 bg-clip-text text-transparent">
                                Admin Login
                            </h1>
                            <p className="text-purple-200/60 text-sm mt-2">Masuk ke panel admin KripikWasyif Store</p>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20"></div>
                            <form onSubmit={handleSubmit} className="relative p-8 space-y-6">
                                {error && (
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm text-center">
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-purple-200 mb-2">Username</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Masukkan username"
                                        className="w-full px-4 py-3 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 focus:bg-purple-950/60 transition-all duration-300"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-purple-200 mb-2">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Masukkan password"
                                        className="w-full px-4 py-3 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 focus:bg-purple-950/60 transition-all duration-300"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 px-6 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-500 hover:to-purple-600 disabled:from-purple-500/50 disabled:to-purple-600/50 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-purple-400/30 hover:border-purple-300/60 active:scale-95"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                            </svg>
                                            Masuk
                                        </>
                                    )}
                                </button>

                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => { setStep('verify'); setOwnerInput(''); setVerifyError('') }}
                                        className="text-purple-300/60 hover:text-purple-200 text-xs transition-colors"
                                    >
                                        ← Kembali ke verifikasi
                                    </button>
                                    <Link href="/" className="text-purple-300/60 hover:text-purple-200 text-xs transition-colors">
                                        Halaman utama →
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
