'use client'

import { useEffect, useState } from 'react'
import { getProducts, getReviews, getWeeklyStats, getTotalStats, type DailyStats } from '@/lib/store'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({ totalVisitors: 0, totalClicks: 0 })
    const [weeklyStats, setWeeklyStats] = useState<DailyStats[]>([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalReviews, setTotalReviews] = useState(0)
    const [recentReviews, setRecentReviews] = useState<{ name: string; message: string; rating: number }[]>([])

    useEffect(() => {
        const load = async () => {
            setStats(await getTotalStats())
            setWeeklyStats(await getWeeklyStats())
            const products = await getProducts()
            setTotalProducts(products.length)
            const reviews = await getReviews()
            setTotalReviews(reviews.length)
            setRecentReviews(reviews.slice(0, 5).map((r) => ({ name: r.name, message: r.message, rating: r.rating })))
        }
        load()
    }, [])

    const chartData = weeklyStats.map((s) => ({
        ...s,
        date: new Date(s.date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' }),
    }))

    const statCards = [
        { label: 'Total Pengunjung', value: stats.totalVisitors, icon: '👥', color: 'from-blue-500/20 to-blue-700/20', border: 'border-blue-500/30' },
        { label: 'Klik WhatsApp', value: stats.totalClicks, icon: '📱', color: 'from-green-500/20 to-green-700/20', border: 'border-green-500/30' },
        { label: 'Total Produk', value: totalProducts, icon: '📦', color: 'from-purple-500/20 to-purple-700/20', border: 'border-purple-500/30' },
        { label: 'Total Ulasan', value: totalReviews, icon: '⭐', color: 'from-yellow-500/20 to-yellow-700/20', border: 'border-yellow-500/30' },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                    Dashboard
                </h1>
                <p className="text-purple-200/60 mt-1">Selamat datang di panel admin KripikWasyif Store</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card) => (
                    <div key={card.label} className="relative group">
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-2xl backdrop-blur-xl border ${card.border} group-hover:shadow-lg transition-all duration-300`}></div>
                        <div className="relative p-6">
                            <div className="text-3xl mb-2">{card.icon}</div>
                            <p className="text-purple-200/60 text-sm">{card.label}</p>
                            <p className="text-3xl font-bold text-purple-100 mt-1">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visitors Chart */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20"></div>
                    <div className="relative p-6">
                        <h3 className="text-lg font-bold text-purple-100 mb-4">📊 Pengunjung (7 Hari Terakhir)</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                    <XAxis dataKey="date" stroke="#a78bfa80" fontSize={12} />
                                    <YAxis stroke="#a78bfa80" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e1033', border: '1px solid #a855f750', borderRadius: '12px', color: '#e9d5ff' }}
                                        labelStyle={{ color: '#c4b5fd' }}
                                    />
                                    <Area type="monotone" dataKey="visitors" stroke="#a855f7" fill="url(#visitorGradient)" strokeWidth={2} name="Pengunjung" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* WhatsApp Clicks Chart */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20"></div>
                    <div className="relative p-6">
                        <h3 className="text-lg font-bold text-purple-100 mb-4">📱 Klik WhatsApp (7 Hari Terakhir)</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <defs>
                                        <linearGradient id="waGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0.2} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                    <XAxis dataKey="date" stroke="#a78bfa80" fontSize={12} />
                                    <YAxis stroke="#a78bfa80" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e1033', border: '1px solid #22c55e50', borderRadius: '12px', color: '#e9d5ff' }}
                                        labelStyle={{ color: '#c4b5fd' }}
                                    />
                                    <Bar dataKey="whatsappClicks" fill="url(#waGradient)" radius={[6, 6, 0, 0]} name="Klik WA" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Reviews */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20"></div>
                <div className="relative p-6">
                    <h3 className="text-lg font-bold text-purple-100 mb-4">⭐ Ulasan Terbaru</h3>
                    {recentReviews.length === 0 ? (
                        <p className="text-purple-200/50 text-sm">Belum ada ulasan</p>
                    ) : (
                        <div className="space-y-3">
                            {recentReviews.map((review, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                                    <div className="flex gap-0.5 flex-shrink-0">
                                        {[...Array(5)].map((_, j) => (
                                            <span key={j} className={`text-sm ${j < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                                        ))}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-purple-200">{review.name}</p>
                                        <p className="text-xs text-purple-200/60 mt-1 truncate">{review.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
