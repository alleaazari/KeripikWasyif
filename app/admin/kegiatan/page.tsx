'use client'

import { useEffect, useState, useRef } from 'react'
import { getKegiatanKKN, addKegiatanKKN, updateKegiatanKKN, deleteKegiatanKKN, uploadKegiatanImage, type KegiatanKKN } from '@/lib/store'

export default function AdminKegiatanPage() {
    const [kegiatan, setKegiatan] = useState<KegiatanKKN[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editId, setEditId] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        date: '',
        location: '',
    })

    const loadData = async () => {
        setLoading(true)
        const data = await getKegiatanKKN()
        setKegiatan(data)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    const resetForm = () => {
        setFormData({ title: '', description: '', image: '', date: '', location: '' })
        setEditId(null)
        setShowForm(false)
        setImagePreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Show local preview immediately
        const reader = new FileReader()
        reader.onload = (ev) => setImagePreview(ev.target?.result as string)
        reader.readAsDataURL(file)

        // Upload to Supabase
        setUploading(true)
        try {
            const url = await uploadKegiatanImage(file)
            setFormData((prev) => ({ ...prev, image: url }))
        } catch (err) {
            alert('Gagal upload gambar. Pastikan bucket "kegiatan-images" sudah dibuat di Supabase Storage.')
            console.error(err)
            setImagePreview(null)
        }
        setUploading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.title || !formData.description || !formData.date) {
            alert('Judul, deskripsi, dan tanggal wajib diisi!')
            return
        }

        if (editId) {
            await updateKegiatanKKN(editId, formData)
        } else {
            await addKegiatanKKN(formData)
        }

        resetForm()
        loadData()
    }

    const handleEdit = (item: KegiatanKKN) => {
        setEditId(item.id)
        setFormData({
            title: item.title,
            description: item.description,
            image: item.image || '',
            date: item.date,
            location: item.location || '',
        })
        setImagePreview(item.image || null)
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (confirm('Yakin ingin menghapus kegiatan ini?')) {
            await deleteKegiatanKKN(id)
            loadData()
        }
    }

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
    }

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-purple-100">Kegiatan KKN</h1>
                    <p className="text-purple-300/60 text-xs md:text-sm mt-1">Kelola dokumentasi kegiatan KKN - <span className="text-purple-400 font-bold">Versi Terbaru (Galeri Aktif)</span></p>
                </div>
                <button
                    onClick={() => {
                        resetForm()
                        setShowForm(true)
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all shadow-[0_0_12px_-3px_rgba(168,85,247,0.5)] self-start sm:self-auto"
                >
                    + Tambah Kegiatan
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="relative mb-6 bg-white/5 backdrop-blur-xl rounded-xl border border-purple-500/20 p-4 md:p-6">
                    <h2 className="text-base md:text-lg font-bold text-purple-100 mb-4">
                        {editId ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-purple-200 mb-1">Judul *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Judul kegiatan"
                                    className="w-full px-3 py-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-purple-200 mb-1">Tanggal *</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-3 py-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 focus:outline-none focus:border-purple-400/60 text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-purple-200 mb-1">Lokasi</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="Lokasi kegiatan"
                                className="w-full px-3 py-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 text-sm"
                            />
                        </div>

                        {/* Image picker */}
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-purple-200 mb-2">Gambar</label>
                            <div className="flex flex-col sm:flex-row gap-4 items-start">
                                {/* Preview */}
                                {imagePreview && (
                                    <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-purple-500/30 flex-shrink-0">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImagePreview(null)
                                                setFormData({ ...formData, image: '' })
                                                if (fileInputRef.current) fileInputRef.current.value = ''
                                            }}
                                            className="absolute top-1 right-1 w-5 h-5 bg-red-500/80 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-400 transition-all"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}

                                {/* File picker button */}
                                <div className="flex-1">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageSelect}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={uploading}
                                        className="w-full px-4 py-3 rounded-lg bg-purple-950/40 border border-dashed border-purple-500/40 text-purple-300/70 hover:text-purple-200 hover:border-purple-400/60 hover:bg-purple-950/60 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {uploading ? (
                                            <>
                                                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Mengupload...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                📁 Pilih Gambar dari Galeri
                                            </>
                                        )}
                                    </button>
                                    <p className="text-purple-300/40 text-[10px] mt-1">Format: JPG, PNG, WebP (max 5MB)</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs md:text-sm font-medium text-purple-200 mb-1">Deskripsi *</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Deskripsi kegiatan..."
                                rows={4}
                                className="w-full px-3 py-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 text-sm resize-none"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={uploading}
                                className="px-5 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all disabled:opacity-50"
                            >
                                {editId ? 'Simpan Perubahan' : 'Tambah Kegiatan'}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-5 py-2 bg-white/5 text-purple-300 text-sm rounded-lg border border-purple-500/20 hover:bg-white/10 transition-all"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            {loading ? (
                <div className="text-purple-300 animate-pulse text-center py-12">Memuat...</div>
            ) : kegiatan.length === 0 ? (
                <div className="text-center py-12 text-purple-200/50 text-sm">
                    Belum ada kegiatan. Klik &quot;Tambah Kegiatan&quot; untuk menambahkan.
                </div>
            ) : (
                <div className="space-y-3">
                    {kegiatan.map((item) => (
                        <div
                            key={item.id}
                            className="relative bg-white/5 backdrop-blur-xl rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 overflow-hidden"
                        >
                            <div className="flex flex-col sm:flex-row">
                                {/* Image thumbnail */}
                                {item.image && (
                                    <div className="sm:w-32 md:w-40 flex-shrink-0">
                                        <img src={item.image} alt={item.title} className="w-full h-32 sm:h-full object-cover" />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="flex-1 p-4">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm md:text-base font-bold text-purple-100 mb-1 truncate">{item.title}</h3>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                <span className="text-[10px] md:text-xs text-purple-300/60">📅 {formatDate(item.date)}</span>
                                                {item.location && (
                                                    <span className="text-[10px] md:text-xs text-purple-300/60">📍 {item.location}</span>
                                                )}
                                            </div>
                                            <p className="text-purple-200/70 text-xs leading-relaxed line-clamp-2">{item.description}</p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 flex-shrink-0 mt-2 sm:mt-0">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="px-3 py-1.5 text-xs bg-purple-500/10 text-purple-300 rounded-lg border border-purple-500/20 hover:bg-purple-500/20 transition-all"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="px-3 py-1.5 text-xs bg-red-500/10 text-red-300 rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-all"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
