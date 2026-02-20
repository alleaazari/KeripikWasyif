'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AdminFloatingButton } from '@/components/admin-floating-button'
import { getProducts, trackWhatsAppClick, type Product } from '@/lib/store'

export default function KatalogPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([])

  useEffect(() => {
    getProducts().then(setAllProducts)
  }, [])

  const handleWhatsAppClick = (product: Product) => {
    trackWhatsAppClick()
    window.open(
      `https://wa.me/${product.whatsappNumber}?text=Halo, saya tertarik dengan ${product.name}. Berapa harga dan stok terkini?`,
      '_blank'
    )
  }

  return (
    <div className="min-h-screen bg-black/50 relative">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />

      {/* Header Section */}
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-purple-800/50 via-purple-700/40 to-purple-900/50 backdrop-blur-2xl rounded-3xl shadow-[0_0_60px_-15px_rgba(168,85,247,0.4)] p-10 border border-purple-400/40 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-3xl"></div>
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-t-3xl"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-purple-100 mb-3 drop-shadow-lg">Katalog Lengkap</h1>
              <p className="text-purple-200/80 text-sm max-w-2xl">
                Jelajahi seluruh koleksi produk kami dengan berbagai pilihan berkualitas tinggi dan harga terjangkau.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid - 4 columns */}
      <section className="py-8 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {allProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white/5 backdrop-blur-2xl rounded-xl shadow-[0_0_20px_-8px_rgba(168,85,247,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_0_35px_-8px_rgba(168,85,247,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-white/15 hover:border-purple-300/50"
              >
                {/* Glass glossy overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-purple-500/5 to-transparent pointer-events-none rounded-xl"></div>
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/8 to-transparent pointer-events-none rounded-t-xl"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-purple-900/30 to-transparent pointer-events-none rounded-b-xl"></div>
                <div className="absolute top-[55%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-white/5 pointer-events-none"></div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-purple-100 mb-1 truncate">{product.name}</h3>
                    <p className="text-purple-200/70 text-xs mb-0 line-clamp-2 opacity-0 max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:max-h-16 group-hover:mb-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-purple-300 font-bold text-sm">{product.price}</p>
                      <button
                        onClick={() => handleWhatsAppClick(product)}
                        className="relative px-3 py-1.5 bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600 hover:from-purple-400 hover:via-purple-500 hover:to-purple-700 text-white font-semibold rounded-md transition-all duration-300 text-xs shadow-[0_0_12px_-3px_rgba(168,85,247,0.4)] hover:shadow-[0_0_20px_-3px_rgba(168,85,247,0.6)] overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-md"></span>
                        <span className="relative z-10">Beli</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
      <AdminFloatingButton />
    </div>
  )
}
