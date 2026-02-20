'use client'

import { useState } from 'react'

interface HomeProductCardProps {
  id: string
  name: string
  price: string
  description: string
  image: string
  whatsappNumber: string
}

export function HomeProductCard({
  name,
  price,
  description,
  image,
  whatsappNumber,
}: HomeProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const message = encodeURIComponent(
      `Halo! Saya tertarik dengan produk ${name} (Rp${price}). Bisa memberikan informasi lebih lanjut?`
    )
    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      '_blank'
    )
  }

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="group relative cursor-pointer h-full"
    >
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-xl backdrop-blur-xl border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300"></div>

      {/* Content */}
      <div className="relative p-4 h-full flex flex-col gap-3">
        {/* Image Container */}
        <div className="w-full h-32 rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/30 to-purple-950/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <div className="text-4xl">{image}</div>
        </div>

        {/* Product Name & Price */}
        <div>
          <h3 className="text-base font-bold text-purple-100 group-hover:text-purple-300 transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-sm font-semibold bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">
            Rp{price}
          </p>
        </div>

        {/* Expanded Description & Button */}
        {isExpanded && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <p className="text-xs text-purple-200/70 leading-relaxed">
              {description}
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="w-full py-2 px-3 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-500 hover:to-purple-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-purple-400/30 hover:border-purple-300/60 active:scale-95"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.719.738 5.36 2.138 7.659L2.821 22.179l8.239-2.163a9.841 9.841 0 004.738 1.206h.005c5.434 0 9.864-4.43 9.888-9.868.021-5.409-4.418-9.812-9.9-9.812" />
              </svg>
              WhatsApp
            </button>
          </div>
        )}

        {/* Collapse Indicator */}
        {!isExpanded && (
          <div className="flex items-center gap-1 text-xs text-purple-300/60 group-hover:text-purple-300 mt-auto">
            <span>Klik untuk detail</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
