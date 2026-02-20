'use client'

import { useEffect, useState } from 'react'
import { getLoginSessions, deleteLoginSession, type LoginSession } from '@/lib/store'

export default function AdminSessionsPage() {
    const [sessions, setSessions] = useState<LoginSession[]>([])
    const [loading, setLoading] = useState(true)

    const loadSessions = async () => {
        setLoading(true)
        const data = await getLoginSessions()
        setSessions(data)
        setLoading(false)
    }

    useEffect(() => {
        loadSessions()
    }, [])

    const handleDelete = async (id: string) => {
        await deleteLoginSession(id)
        loadSessions()
    }

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr)
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        const day = days[d.getDay()]
        const date = d.getDate()
        const month = months[d.getMonth()]
        const year = d.getFullYear()
        const hours = d.getHours().toString().padStart(2, '0')
        const mins = d.getMinutes().toString().padStart(2, '0')
        return `${day}, ${date} ${month} ${year} - ${hours}:${mins} WIB`
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-purple-100">Akun yang Masuk</h1>
                    <p className="text-purple-300/50 text-sm mt-1">Daftar semua perangkat yang pernah login ke admin panel</p>
                </div>
                <button
                    onClick={loadSessions}
                    className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-200 text-sm font-medium transition-all duration-300"
                >
                    🔄 Refresh
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="text-purple-300 animate-pulse">Loading...</div>
                </div>
            ) : sessions.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-purple-300/50 text-lg">Belum ada sesi login tercatat</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {sessions.map((session) => (
                        <div key={session.id} className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/15 hover:border-purple-500/30 transition-all duration-300">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        {/* Device icon */}
                                        <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center">
                                            {session.device_info.includes('iPhone') || session.device_info.includes('Android') ? (
                                                <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-purple-100">{session.device_info}</h3>
                                            <p className="text-purple-300/50 text-xs">Login ke-{session.login_count}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 ml-13">
                                        {/* Location */}
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-purple-400/50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="text-purple-200/60 text-xs">{session.location}</span>
                                        </div>

                                        {/* Last login time */}
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-purple-400/50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-purple-200/60 text-xs">{formatDate(session.last_login)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Delete button */}
                                <button
                                    onClick={() => handleDelete(session.id)}
                                    className="p-2 rounded-lg text-red-400/50 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                                    title="Hapus sesi"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            {/* Login count badge */}
                            {session.login_count >= 3 && (
                                <div className="absolute top-4 right-14">
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-500/15 border border-green-500/25 text-green-300">
                                        ✅ Trusted
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
