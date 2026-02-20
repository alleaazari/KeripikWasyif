'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AdminFloatingButton } from '@/components/admin-floating-button'
import { getProducts, trackVisitor, getHeroSettings, type Product, type HeroSettings } from '@/lib/store'

export default function Page() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [hero, setHero] = useState<HeroSettings | null>(null)

  useEffect(() => {
    const load = async () => {
      trackVisitor()
      const products = await getProducts()
      setAllProducts(products.slice(0, 4))
      setHero(await getHeroSettings())
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-black/50 relative">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl shadow-[0_0_60px_-15px_rgba(168,85,247,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden border border-white/15">
            {/* Glass glossy overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-purple-500/5 to-transparent pointer-events-none rounded-3xl"></div>
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/8 to-transparent pointer-events-none rounded-t-3xl"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none rounded-b-3xl"></div>
            {/* Reflection line */}
            <div className="absolute top-[48%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

            <div className="relative grid grid-cols-12 gap-8 p-12 z-10">
              {/* Left - Featured Product Image */}
              <div className="col-span-3 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/5 rounded-3xl transform -rotate-6 shadow-lg border border-white/10"></div>
                  <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl w-64 h-80 overflow-hidden border border-white/15 shadow-[0_0_30px_-5px_rgba(168,85,247,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl pointer-events-none z-10"></div>
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-10 rounded-t-3xl"></div>
                    <img
                      src={hero?.featured_image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop'}
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>

              {/* Center - Content */}
              <div className="col-span-6 flex flex-col justify-center">
                <h2 className="text-sm font-semibold text-purple-300/70 mb-2">TRUSTED</h2>
                <h1 className="text-5xl font-bold text-purple-100 mb-6 leading-tight drop-shadow-lg">
                  KERIPIK WASYIF
                  <br />
                  PLATFORM
                </h1>
                <p className="text-purple-200/80 text-sm mb-8 leading-relaxed">
                  {hero?.description || 'Temukan produk pilihan dengan kualitas terjamin dan harga terbaik. Belanja sekarang dan nikmati pengalaman berbelanja yang luar biasa dengan layanan terbaik kami.'}
                </p>

                <div className="flex gap-4 mb-8">
                  <Link
                    href="/katalog"
                    className="relative px-8 py-3 bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600 hover:from-purple-400 hover:via-purple-500 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-[0_0_20px_-3px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_-3px_rgba(168,85,247,0.7)] overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-lg"></span>
                    <span className="relative z-10">Get Started</span>
                  </Link>
                  <Link
                    href="#"
                    className="relative px-8 py-3 bg-white/5 hover:bg-white/10 text-purple-100 font-semibold rounded-lg transition-all duration-300 border border-white/20 hover:border-white/30 backdrop-blur-sm overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-lg"></span>
                    <span className="relative z-10">Read More</span>
                  </Link>
                </div>
              </div>

              {/* Right - Product Grid */}
              <div className="col-span-3 flex flex-col gap-4 justify-center items-center">
                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-2 w-full aspect-square overflow-hidden border border-white/15 shadow-[0_0_25px_-5px_rgba(168,85,247,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl pointer-events-none z-10"></div>
                  <div className="grid grid-cols-2 gap-2 w-full h-full relative z-0">
                    {(hero?.grid_images || []).slice(0, 4).map((img, i) => (
                      <div key={i} className="rounded-xl overflow-hidden border border-white/10"><img src={img} alt={`Grid ${i + 1}`} className="w-full h-full object-cover" /></div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <button className="w-3 h-3 bg-gradient-to-br from-purple-400/70 to-purple-600/70 rounded-full hover:from-purple-300 hover:to-purple-500 transition-all duration-300 shadow-[0_0_8px_rgba(168,85,247,0.3)]"></button>
                  <button className="w-3 h-3 bg-gradient-to-br from-purple-400/70 to-purple-600/70 rounded-full hover:from-purple-300 hover:to-purple-500 transition-all duration-300 shadow-[0_0_8px_rgba(168,85,247,0.3)]"></button>
                  <button className="w-3 h-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.5)]"></button>
                  <button className="w-3 h-3 bg-gradient-to-br from-purple-400/70 to-purple-600/70 rounded-full hover:from-purple-300 hover:to-purple-500 transition-all duration-300 shadow-[0_0_8px_rgba(168,85,247,0.3)]"></button>
                </div>

                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-2 w-full aspect-square overflow-hidden border border-white/15 shadow-[0_0_25px_-5px_rgba(168,85,247,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl pointer-events-none z-10"></div>
                  <div className="grid grid-cols-2 gap-2 w-full h-full relative z-0">
                    {(hero?.grid_images || []).slice(4, 8).map((img, i) => (
                      <div key={i} className="rounded-xl overflow-hidden border border-white/10"><img src={img} alt={`Grid ${i + 5}`} className="w-full h-full object-cover" /></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-purple-100 text-center mb-12 drop-shadow-lg">
            Produk Unggulan Kami
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {allProducts.map((product) => (
              <Link
                key={product.id}
                href="/katalog"
                className="group relative bg-white/5 backdrop-blur-2xl rounded-2xl shadow-[0_0_30px_-10px_rgba(168,85,247,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] p-5 hover:shadow-[0_0_50px_-10px_rgba(168,85,247,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-500 hover:-translate-y-3 border border-white/15 hover:border-purple-300/50 overflow-hidden"
              >
                {/* Glass glossy overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-purple-500/5 to-transparent pointer-events-none rounded-2xl"></div>
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/8 to-transparent pointer-events-none rounded-t-2xl"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-purple-900/30 to-transparent pointer-events-none rounded-b-2xl"></div>
                {/* Reflection line */}
                <div className="absolute top-[45%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="relative rounded-xl mb-4 overflow-hidden aspect-square border border-white/10 shadow-inner">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-white/5 pointer-events-none"></div>
                  </div>
                  <h3 className="text-purple-100 font-bold mb-1 text-sm">{product.name}</h3>
                  <p className="text-purple-300 font-semibold mb-1">{product.price}</p>
                  {/* Deskripsi: tersembunyi secara default, muncul saat hover */}
                  <p className="text-purple-200/70 text-xs leading-relaxed opacity-0 max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:max-h-24 group-hover:mt-2">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <AdminFloatingButton />
    </div>
  )
}


