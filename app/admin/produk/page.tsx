'use client'

import { useEffect, useState } from 'react'
import { getProducts, addProduct, updateProduct, deleteProduct, type Product } from '@/lib/store'

export default function AdminProdukPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        whatsappNumber: '6289617447090',
    })

    useEffect(() => {
        getProducts().then(setProducts)
    }, [])

    const resetForm = () => {
        setFormData({ name: '', price: '', description: '', image: '', whatsappNumber: '6289617447090' })
        setEditingId(null)
        setShowForm(false)
    }

    const handleEdit = (product: Product) => {
        setFormData({
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
            whatsappNumber: product.whatsappNumber,
        })
        setEditingId(product.id)
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (confirm('Yakin ingin menghapus produk ini?')) {
            await deleteProduct(id)
            setProducts(await getProducts())
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.price) {
            alert('Nama dan harga wajib diisi!')
            return
        }

        if (editingId) {
            await updateProduct(editingId, formData)
        } else {
            await addProduct(formData)
        }

        setProducts(await getProducts())
        resetForm()
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                        Manajemen Produk
                    </h1>
                    <p className="text-purple-200/60 mt-1">{products.length} produk tersedia</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(true) }}
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 border border-purple-400/30 hover:border-purple-300/60 text-sm active:scale-95"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Produk
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div className="w-full max-w-lg relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/95 via-purple-900/90 to-black/95 rounded-2xl border border-purple-500/30 backdrop-blur-xl"></div>

                        {/* Close button - top right */}
                        <button
                            type="button"
                            onClick={resetForm}
                            className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-xl bg-purple-500/10 hover:bg-red-500/20 border border-purple-500/20 hover:border-red-500/40 text-purple-300/60 hover:text-red-300 transition-all duration-300"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <form onSubmit={handleSubmit} className="relative p-8 max-h-[85vh] overflow-y-auto">
                            {/* Header */}
                            <h2 className="text-xl font-bold text-purple-100 mb-5 pr-10">
                                {editingId ? 'Edit Produk' : 'Tambah Produk Baru'}
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-purple-200 mb-1.5">Nama Produk</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Nama produk"
                                        className="w-full px-4 py-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 transition-all duration-300 text-sm"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-purple-200 mb-1.5">Harga</label>
                                        <input
                                            type="text"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            placeholder="Rp 000.000"
                                            className="w-full px-4 py-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 transition-all duration-300 text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-purple-200 mb-1.5">No. WhatsApp</label>
                                        <input
                                            type="text"
                                            value={formData.whatsappNumber}
                                            onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                            placeholder="62812345678"
                                            className="w-full px-4 py-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 transition-all duration-300 text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-purple-200 mb-1.5">Deskripsi</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Deskripsi produk"
                                        rows={3}
                                        className="w-full px-4 py-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 transition-all duration-300 text-sm resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-purple-200 mb-1.5">Gambar Produk</label>
                                    {formData.image && (
                                        <div className="mb-3 rounded-xl overflow-hidden border border-purple-500/20 aspect-video max-h-40 flex items-center justify-center bg-purple-950/30">
                                            <img src={formData.image} alt="Preview" className="max-h-40 object-contain" />
                                        </div>
                                    )}
                                    <label className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-purple-950/40 border border-purple-500/30 border-dashed text-purple-300/70 hover:text-purple-200 hover:border-purple-400/50 hover:bg-purple-950/60 transition-all duration-300 text-sm cursor-pointer">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {formData.image ? 'Ganti Gambar' : 'Pilih Gambar'}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (file) {
                                                    const reader = new FileReader()
                                                    reader.onloadend = () => {
                                                        setFormData({ ...formData, image: reader.result as string })
                                                    }
                                                    reader.readAsDataURL(file)
                                                }
                                            }}
                                        />
                                    </label>
                                    <p className="text-purple-300/40 text-xs mt-1.5">Format: JPG, PNG, WebP. Maks 2MB.</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-6 mt-2 border-t border-purple-500/15">
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            if (editingId && confirm('Yakin ingin menghapus produk ini?')) {
                                                await deleteProduct(editingId)
                                                setProducts(await getProducts())
                                                resetForm()
                                            }
                                        }}
                                        className="py-2.5 px-5 bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 font-medium rounded-lg transition-all duration-300 border border-red-500/20 hover:border-red-500/40 text-sm flex items-center gap-2 active:scale-95"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Hapus
                                    </button>
                                )}
                                <div className="flex-1"></div>
                                <button
                                    type="submit"
                                    className="py-2.5 px-8 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 border border-purple-400/30 hover:border-purple-300/60 text-sm flex items-center gap-2 active:scale-95 shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)]"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300"></div>
                        <div className="relative p-4">
                            {product.image && (
                                <div className="rounded-xl overflow-hidden mb-3 aspect-square border border-purple-500/10">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <h3 className="text-sm font-bold text-purple-100 truncate">{product.name}</h3>
                            <p className="text-purple-300 font-semibold text-sm mt-1">{product.price}</p>
                            <p className="text-purple-200/50 text-xs mt-1 line-clamp-2">{product.description}</p>

                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="flex-1 py-1.5 px-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 font-medium rounded-lg transition-all duration-300 border border-purple-500/20 text-xs flex items-center justify-center gap-1"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="flex-1 py-1.5 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-300 font-medium rounded-lg transition-all duration-300 border border-red-500/20 text-xs flex items-center justify-center gap-1"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
