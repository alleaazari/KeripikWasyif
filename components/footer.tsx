import Link from 'next/link'

export function Footer() {
    return (
        <footer className="relative border-t border-white/10 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-purple-950/80"></div>

            {/* Top Section */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pt-8 md:pt-10 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Brand */}
                    <div className="text-center sm:text-left">
                        <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                            <h3 className="text-lg font-bold text-white tracking-wide">KRIPIKWASYIF STORE</h3>
                        </div>
                        <p className="text-purple-200/50 text-xs italic">Belanja mudah. Kualitas terjamin.</p>
                    </div>

                    {/* navbar */}
                    <div className="text-center">
                        <div className="flex flex-row sm:flex-col gap-3 sm:gap-2 justify-center">
                            <Link href="/" className="text-purple-200/70 hover:text-white text-xs transition-colors">Beranda</Link>
                            <Link href="/katalog" className="text-purple-200/70 hover:text-white text-xs transition-colors">Katalog</Link>
                            <Link href="/kontak" className="text-purple-200/70 hover:text-white text-xs transition-colors">Kontak</Link>
                            <Link href="/ulasan" className="text-purple-200/70 hover:text-white text-xs transition-colors">Ulasan</Link>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="text-center sm:text-right">
                        <div className="flex flex-row sm:flex-col gap-3 sm:gap-2 justify-center">
                            <a href="https://www.facebook.com/share/1D7jAGSFzq/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-purple-200/70 hover:text-white text-xs underline underline-offset-2 transition-colors">Facebook</a>
                            <a href="https://www.instagram.com/saronda_arr?igsh=MTJvZ2QzZ3J6NmozdQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-purple-200/70 hover:text-white text-xs underline underline-offset-2 transition-colors">Instagram</a>
                            <a href="https://wa.me/6289617447090" target="_blank" rel="noopener noreferrer" className="text-purple-200/70 hover:text-white text-xs underline underline-offset-2 transition-colors">WhatsApp</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
            </div>

            {/* Bottom Info */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-1">
                <p className="text-purple-200/40 text-[10px]">© 2024 KripikWasyif Store. All Rights Reserved.</p>
                <p className="text-purple-200/40 text-[10px] italic">Designed with coffe n love</p>
            </div>

            {/* Large Brand Text */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pb-4 overflow-hidden">
                <div className="relative">
                    <h2 className="relative text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-black text-white/90 text-center leading-none tracking-tighter py-2">
                        KRIPIKWASYIF
                    </h2>
                </div>
            </div>
        </footer>
    )
}
