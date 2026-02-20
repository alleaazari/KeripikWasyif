'use client'

import { useEffect, useState } from 'react'
import { getReviews, deleteReview, replyReview, type Review } from '@/lib/store'

export default function AdminUlasanPage() {
    const [reviews, setReviews] = useState<Review[]>([])
    const [replyingId, setReplyingId] = useState<string | null>(null)
    const [replyText, setReplyText] = useState('')

    useEffect(() => {
        getReviews().then(setReviews)
    }, [])

    const handleDelete = async (id: string) => {
        if (confirm('Yakin ingin menghapus ulasan ini?')) {
            await deleteReview(id)
            setReviews(await getReviews())
        }
    }

    const handleReply = async (id: string) => {
        if (!replyText.trim()) {
            alert('Tuliskan balasan terlebih dahulu!')
            return
        }
        await replyReview(id, replyText)
        setReviews(await getReviews())
        setReplyingId(null)
        setReplyText('')
    }

    const renderStars = (rating: number) => (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
            ))}
        </div>
    )

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp)
        return new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                    Manajemen Ulasan
                </h1>
                <p className="text-purple-200/60 mt-1">{reviews.length} ulasan dari pelanggan</p>
            </div>

            {/* Reviews List */}
            {reviews.length === 0 ? (
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20"></div>
                    <div className="relative p-12 text-center">
                        <p className="text-purple-200/50 text-lg">Belum ada ulasan</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300"></div>
                            <div className="relative p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-1 min-w-0">
                                        {/* Avatar */}
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-600/30 flex items-center justify-center text-2xl border border-purple-400/30 flex-shrink-0">
                                            {review.avatar}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-base font-bold text-purple-100">{review.name}</h3>
                                                {renderStars(review.rating)}
                                            </div>
                                            <p className="text-xs text-purple-200/50 mb-2">{formatDate(review.timestamp)}</p>
                                            <p className="text-purple-200/80 text-sm leading-relaxed">{review.message}</p>
                                        </div>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(review.id)}
                                        className="flex-shrink-0 p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 rounded-xl transition-all duration-300 border border-red-500/20 hover:border-red-500/40"
                                        title="Hapus ulasan"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Existing admin reply */}
                                {review.adminReply && (
                                    <div className="mt-4 ml-16 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-xs font-semibold text-purple-300">Balasan Admin</span>
                                            <span className="text-[10px] text-purple-300/40">{review.replyTimestamp && formatDate(review.replyTimestamp)}</span>
                                        </div>
                                        <p className="text-purple-100 text-sm leading-relaxed">{review.adminReply}</p>
                                    </div>
                                )}

                                {/* Reply form */}
                                {replyingId === review.id ? (
                                    <div className="mt-4 ml-16 space-y-3">
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Tulis balasan untuk ulasan ini..."
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 transition-all duration-300 text-sm resize-none"
                                            autoFocus
                                        />
                                        <div className="flex gap-2 justify-end">
                                            <button
                                                onClick={() => { setReplyingId(null); setReplyText('') }}
                                                className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 font-medium rounded-lg transition-all duration-300 border border-purple-500/20 text-xs"
                                            >
                                                Batal
                                            </button>
                                            <button
                                                onClick={() => handleReply(review.id)}
                                                className="px-5 py-2 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 border border-purple-400/30 text-xs flex items-center gap-1.5 active:scale-95"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                                Kirim Balasan
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-3 ml-16">
                                        <button
                                            onClick={() => { setReplyingId(review.id); setReplyText(review.adminReply || '') }}
                                            className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 font-medium rounded-lg transition-all duration-300 border border-purple-500/20 text-xs flex items-center gap-1.5"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                            </svg>
                                            {review.adminReply ? 'Edit Balasan' : 'Balas'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
