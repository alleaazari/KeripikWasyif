'use client'

import { useEffect, useState } from 'react'
import { getHeroSettings, updateHeroSettings, type HeroSettings } from '@/lib/store'

export default function AdminHeroPage() {
    const [hero, setHero] = useState<HeroSettings | null>(null)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        getHeroSettings().then(setHero)
    }, [])

    const handleSave = async () => {
        if (!hero) return
        setSaving(true)
        await updateHeroSettings({
            featured_image: hero.featured_image,
            description: hero.description,
            grid_images: hero.grid_images,
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
                        <div className="w-40 h-52 rounded-xl overflow-hidden border border-white/15 shrink-0">
                            <img src={hero.featured_image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <label className="text-purple-300/70 text-sm mb-2 block">URL Gambar</label>
                            <input
                                type="text"
                                value={hero.featured_image}
                                onChange={(e) => setHero({ ...hero, featured_image: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-purple-100 placeholder-purple-300/30 focus:outline-none focus:border-purple-400/50"
                                placeholder="https://..."
                            />
                            <p className="text-purple-300/50 text-xs mt-2">Paste URL gambar dari Unsplash atau URL gambar lainnya</p>
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
                    <div className="grid grid-cols-4 gap-4">
                        {hero.grid_images.map((img, index) => (
                            <div key={index} className="space-y-2">
                                <div className="aspect-square rounded-xl overflow-hidden border border-white/15">
                                    <img src={img} alt={`Grid ${index + 1}`} className="w-full h-full object-cover" />
                                </div>
                                <input
                                    type="text"
                                    value={img}
                                    onChange={(e) => {
                                        const newImages = [...hero.grid_images]
                                        newImages[index] = e.target.value
                                        setHero({ ...hero, grid_images: newImages })
                                    }}
                                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-purple-100 text-xs placeholder-purple-300/30 focus:outline-none focus:border-purple-400/50"
                                    placeholder={`URL Gambar ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
