'use client'

interface ProductCardProps {
  id: string
  name: string
  price: string
  description: string
  image: string
  whatsappNumber: string
}

export function ProductCard({
  id,
  name,
  price,
  description,
  image,
  whatsappNumber,
}: ProductCardProps) {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Halo! Saya tertarik dengan produk ${name} (Rp${price}). Bisa memberikan informasi lebih lanjut?`
    )
    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      '_blank'
    )
  }

  return (
    <div className="group relative h-full">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300"></div>

      {/* Content */}
      <div className="relative p-6 h-full flex flex-col gap-4">
        {/* Image Container */}
        <div className="w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-purple-950/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <div className="text-6xl">{image}</div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-3">
          <h3 className="text-xl font-bold text-purple-100 group-hover:text-purple-300 transition-colors">
            {name}
          </h3>

          <p className="text-sm text-purple-200/70 line-clamp-2">
            {description}
          </p>

          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">
              Rp{price}
            </span>
          </div>
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn backdrop-blur-sm border border-purple-400/30 hover:border-purple-300/60 active:scale-95"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.719.738 5.36 2.138 7.659L2.821 22.179l8.239-2.163a9.841 9.841 0 004.738 1.206h.005c5.434 0 9.864-4.43 9.888-9.868.021-5.409-4.418-9.812-9.9-9.812" />
          </svg>
          Hubungi via WhatsApp
        </button>
      </div>
    </div>
  )
}
