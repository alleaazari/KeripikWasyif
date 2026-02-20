'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AdminFloatingButton } from '@/components/admin-floating-button'
import { getKegiatanKKN, type KegiatanKKN } from '@/lib/store'

export default function KegiatanPage() {
    const [kegiatan, setKegiatan] = useState<KegiatanKKN[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getKegiatanKKN().then((data) => {
            setKegiatan(data)
            setLoading(false)
        })
    }, [])

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr)
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
    }

    return (
        <div className="min-h-screen bg-black/50 relative">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <Navbar />

            {/* Header */}
            <section className="pt-24 md:pt-32 pb-8 md:pb-12 px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                        <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 bg-clip-text text-transparent">
                            Kegiatan KKN
                        </span>
                    </h1>
                    <p className="text-sm md:text-lg text-purple-200/80 max-w-xl mx-auto">
                        Dokumentasi kegiatan Kuliah Kerja Nyata (KKN) bersama Keripik Wasyif di Kuala Tanjung
                    </p>
                </div>
            </section>

            {/* Activities List */}
            <section className="pb-16 md:pb-20 px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    {loading ? (
                        <div className="text-center py-16">
                            <div className="text-purple-300 animate-pulse text-lg">Memuat kegiatan...</div>
                        </div>
                    ) : kegiatan.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                                <svg className="w-8 h-8 text-purple-300/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <p className="text-purple-200/60 text-sm">Belum ada kegiatan KKN yang ditambahkan.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {kegiatan.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative bg-white/5 backdrop-blur-2xl rounded-xl md:rounded-2xl shadow-[0_0_30px_-10px_rgba(168,85,247,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden border border-white/15 hover:border-purple-300/50 transition-all duration-500 hover:-translate-y-1"
                                >
                                    {/* Glass overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-purple-500/5 to-transparent pointer-events-none rounded-xl md:rounded-2xl"></div>
                                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/8 to-transparent pointer-events-none rounded-t-xl md:rounded-t-2xl"></div>

                                    {/* Image */}
                                    {item.image && (
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="relative z-10 p-4 md:p-6">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="px-2 py-1 text-[10px] md:text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                                                📅 {formatDate(item.date)}
                                            </span>
                                            {item.location && (
                                                <span className="px-2 py-1 text-[10px] md:text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                                                    📍 {item.location}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-base md:text-lg font-bold text-purple-100 mb-2">{item.title}</h3>
                                        <p className="text-purple-200/70 text-xs md:text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
            <AdminFloatingButton />
        </div>
    )
}
