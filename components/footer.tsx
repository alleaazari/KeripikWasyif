import Link from 'next/link'

export function Footer() {
    return (
        <footer className="relative border-t border-white/10 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-purple-950/80"></div>

            {/* Top Section */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-10 pb-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* Brand */}
                    <div className="col-span-4">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-white tracking-wide">KRIPIKWASYIF STORE</h3>
                        </div>
                        <p className="text-purple-200/50 text-xs italic">Belanja mudah. Kualitas terjamin.</p>
                    </div>

                    {/* navbar */}
                    <div className="col-span-4">
                        <div className="space-y-2">
                            <Link href="/" className="block text-purple-200/70 hover:text-white text-xs transition-colors">Home</Link>
                            <Link href="/katalog" className="block text-purple-200/70 hover:text-white text-xs transition-colors">Katalog</Link>
                            <Link href="/kontak" className="block text-purple-200/70 hover:text-white text-xs transition-colors">Kontak</Link>
                            <Link href="/ulasan" className="block text-purple-200/70 hover:text-white text-xs transition-colors">Ulasan</Link>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="col-span-4 text-right">
                        <div className="space-y-2">
                            <a href="https://www.facebook.com/share/1D7jAGSFzq/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="block text-purple-200/70 hover:text-white text-xs underline underline-offset-2 transition-colors">Facebook</a>
                            <a href="https://www.instagram.com/saronda_arr?igsh=MTJvZ2QzZ3J6NmozdQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="block text-purple-200/70 hover:text-white text-xs underline underline-offset-2 transition-colors">Instagram</a>
                            <a href="https://wa.me/6289617447090" target="_blank" rel="noopener noreferrer" className="block text-purple-200/70 hover:text-white text-xs underline underline-offset-2 transition-colors">WhatsApp</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
            </div>

            {/* Bottom Info */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <p className="text-purple-200/40 text-[10px]">© 2024 KripikWasyif Store. All Rights Reserved.</p>
                <p className="text-purple-200/40 text-[10px] italic">Designed with coffe n love</p>
            </div>

            {/* Large Brand Text */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 pb-4 overflow-hidden">
                <div className="relative">
                    <h2 className="relative text-[4rem] sm:text-[5rem] md:text-[6rem] font-black text-white/90 text-center leading-none tracking-tighter py-2">
                        KRIPIKWASYIF
                    </h2>
                </div>
            </div>
        </footer>
    )
}
