'use client'

import { useEffect, useState, useRef } from 'react'
import { getHeroSettings, updateHeroSettings, uploadImage, type HeroSettings } from '@/lib/store'

export default function AdminHeroPage() {
    const [hero, setHero] = useState<HeroSettings | null>(null)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [uploading, setUploading] = useState<string | null>(null)
    const featuredInputRef = useRef<HTMLInputElement>(null)
    const gridInputRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        getHeroSettings().then(setHero)
    }, [])

    const handleFileUpload = async (file: File, target: 'featured' | number) => {
        setUploading(target === 'featured' ? 'featured' : `grid-${target}`)
        const url = await uploadImage(file)
        if (url && hero) {
            if (target === 'featured') {
                setHero({ ...hero, featured_image: url })
            } else {
                const newImages = [...hero.grid_images]
                newImages[target] = url
                setHero({ ...hero, grid_images: newImages })
            }
        }
        setUploading(null)
    }

    const handleSave = async () => {
        if (!hero) return
        setSaving(true)
        await updateHeroSettings({
            featured_image: hero.featured_image,
            description: hero.description,
            grid_images: hero.grid_images,
            grid_descriptions: hero.grid_descriptions,
        })
        setSaving(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    if (!hero) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-purple-300 animate-pulse">Loading...</div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-purple-100">Edit Hero Section</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_-3px_rgba(168,85,247,0.5)] disabled:opacity-50"
                >
                    {saving ? 'Menyimpan...' : saved ? '✅ Tersimpan!' : 'Simpan Perubahan'}
                </button>
            </div>

            <div className="space-y-8">
                {/* Featured Image */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/15">
                    <h2 className="text-lg font-bold text-purple-200 mb-4">Foto Utama (Featured Image)</h2>
                    <div className="flex gap-6 items-start">
                        <div className="relative w-40 h-52 rounded-xl overflow-hidden border border-white/15 shrink-0 group">
                            <img src={hero.featured_image} alt="Preview" className="w-full h-full object-cover" />
                            {uploading === 'featured' && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <div className="text-purple-300 animate-pulse text-sm">Uploading...</div>
                                </div>
                            )}
                            <button
                                onClick={() => featuredInputRef.current?.click()}
                                className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                            >
                                <span className="bg-purple-500/90 px-3 py-1.5 rounded-lg text-white text-xs font-semibold">
                                    📷 Ganti Foto
                                </span>
                            </button>
                            <input
                                ref={featuredInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) handleFileUpload(file, 'featured')
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-purple-300/70 text-sm mb-3">Klik foto untuk mengganti dari galeri kamu</p>
                            <button
                                onClick={() => featuredInputRef.current?.click()}
                                className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-200 text-sm font-medium transition-all duration-300"
                            >
                                📁 Pilih dari Galeri
                            </button>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/15">
                    <h2 className="text-lg font-bold text-purple-200 mb-4">Deskripsi Hero</h2>
                    <textarea
                        value={hero.description}
                        onChange={(e) => setHero({ ...hero, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-purple-100 placeholder-purple-300/30 focus:outline-none focus:border-purple-400/50 resize-none"
                        placeholder="Tuliskan deskripsi untuk hero section..."
                    />
                </div>

                {/* Grid Images */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/15">
                    <h2 className="text-lg font-bold text-purple-200 mb-4">Gambar Grid (8 gambar)</h2>
                    <div className="grid grid-cols-4 gap-5">
                        {hero.grid_images.map((img, index) => (
                            <div key={index} className="space-y-3">
                                {/* Image with upload overlay */}
                                <div className="relative aspect-square rounded-xl overflow-hidden border border-white/15 group">
                                    <img src={img} alt={`Grid ${index + 1}`} className="w-full h-full object-cover" />
                                    {uploading === `grid-${index}` && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <div className="text-purple-300 animate-pulse text-xs">Uploading...</div>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => gridInputRefs.current[index]?.click()}
                                        className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                                    >
                                        <span className="bg-purple-500/90 px-2 py-1 rounded-lg text-white text-[10px] font-semibold">
                                            📷 Ganti
                                        </span>
                                    </button>
                                    <input
                                        ref={(el) => { gridInputRefs.current[index] = el }}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) handleFileUpload(file, index)
                                        }}
                                    />
                                </div>

                                {/* Description input */}
                                <input
                                    type="text"
                                    value={hero.grid_descriptions[index] || ''}
                                    onChange={(e) => {
                                        const newDescs = [...hero.grid_descriptions]
                                        newDescs[index] = e.target.value
                                        setHero({ ...hero, grid_descriptions: newDescs })
                                    }}
                                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-purple-100 text-xs placeholder-purple-300/30 focus:outline-none focus:border-purple-400/50"
                                    placeholder={`Deskripsi gambar ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
