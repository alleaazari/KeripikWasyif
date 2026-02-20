'use client'

import { useEffect, useState } from 'react'
import { getContactMessages, replyContactMessage, deleteContactMessage, type ContactMessage } from '@/lib/store'

export default function AdminLaporanPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [replyingId, setReplyingId] = useState<string | null>(null)
    const [replyText, setReplyText] = useState('')

    useEffect(() => {
        getContactMessages().then(setMessages)
    }, [])

    const handleReply = async (id: string) => {
        if (!replyText.trim()) {
            alert('Tuliskan balasan terlebih dahulu!')
            return
        }
        await replyContactMessage(id, replyText)
        setMessages(await getContactMessages())
        setReplyingId(null)
        setReplyText('')
    }

    const handleDelete = async (id: string) => {
        if (confirm('Yakin ingin menghapus laporan ini?')) {
            await deleteContactMessage(id)
            setMessages(await getContactMessages())
        }
    }

    const formatDate = (timestamp: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(timestamp))
    }

    const unreplied = messages.filter((m) => !m.adminReply).length

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                    Laporan & Pesan Kontak
                </h1>
                <p className="text-purple-200/60 mt-1">
                    {messages.length} pesan total &middot;{' '}
                    <span className={unreplied > 0 ? 'text-orange-400' : 'text-green-400'}>
                        {unreplied > 0 ? `${unreplied} belum dibalas` : 'Semua sudah dibalas ✓'}
                    </span>
                </p>
            </div>

            {/* Messages List */}
            {messages.length === 0 ? (
                <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-4">
                        <svg className="w-8 h-8 text-purple-300/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-purple-200/50 text-sm">Belum ada pesan masuk</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300"></div>
                            <div className="relative p-6">
                                {/* Header row */}
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-base font-bold text-purple-100">{msg.name}</h3>
                                            {!msg.adminReply && (
                                                <span className="px-2 py-0.5 bg-orange-500/15 text-orange-400 text-[10px] font-semibold rounded-full border border-orange-500/25">
                                                    BELUM DIBALAS
                                                </span>
                                            )}
                                            {msg.adminReply && (
                                                <span className="px-2 py-0.5 bg-green-500/15 text-green-400 text-[10px] font-semibold rounded-full border border-green-500/25">
                                                    SUDAH DIBALAS
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-purple-300/50">
                                            <span>{msg.email}</span>
                                            {msg.phone && <span>📞 {msg.phone}</span>}
                                            <span>{formatDate(msg.timestamp)}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        className="flex-shrink-0 p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400/60 hover:text-red-300 border border-red-500/10 hover:border-red-500/30 transition-all duration-300"
                                        title="Hapus"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Subject & Message */}
                                {msg.subject && (
                                    <p className="text-sm font-semibold text-purple-200 mb-1">📌 {msg.subject}</p>
                                )}
                                <p className="text-purple-200/70 text-sm leading-relaxed mb-4">{msg.message}</p>

                                {/* Admin Reply (if exists) */}
                                {msg.adminReply && (
                                    <div className="mt-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-xs font-semibold text-purple-300">Balasan Admin</span>
                                            <span className="text-[10px] text-purple-300/40">{msg.replyTimestamp && formatDate(msg.replyTimestamp)}</span>
                                        </div>
                                        <p className="text-purple-100 text-sm leading-relaxed">{msg.adminReply}</p>
                                    </div>
                                )}

                                {/* Reply form */}
                                {replyingId === msg.id ? (
                                    <div className="mt-4 space-y-3">
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Tulis balasan untuk user..."
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
                                                onClick={() => handleReply(msg.id)}
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
                                    <div className="mt-3 flex gap-2">
                                        <button
                                            onClick={() => { setReplyingId(msg.id); setReplyText(msg.adminReply || '') }}
                                            className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 font-medium rounded-lg transition-all duration-300 border border-purple-500/20 text-xs flex items-center gap-1.5"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                            </svg>
                                            {msg.adminReply ? 'Edit Balasan' : 'Balas'}
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
