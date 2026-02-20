'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { id: 'beranda', label: 'Beranda', href: '/' },
    { id: 'katalog', label: 'Katalog', href: '/katalog' },
    { id: 'kegiatan', label: 'Kegiatan KKN', href: '/kegiatan' },
    { id: 'kontak', label: 'Kontak', href: '/kontak' },
    { id: 'ulasan', label: 'Ulasan', href: '/ulasan' },
  ]

  const getActiveLink = () => {
    if (pathname === '/') return 'beranda'
    if (pathname === '/katalog') return 'katalog'
    if (pathname === '/kegiatan') return 'kegiatan'
    if (pathname === '/kontak') return 'kontak'
    if (pathname === '/ulasan') return 'ulasan'
    return 'beranda'
  }

  const activeLink = getActiveLink()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-purple-500/20 bg-black/30">
        {/* Mobile: brand left + hamburger right */}
        <div className="lg:hidden flex justify-between items-center py-3 px-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-all duration-300">
            <img src="/icon.png" alt="KripikWasyif" className="w-8 h-8 rounded-full" />
            <span className="text-sm font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent whitespace-nowrap">
              Keripik Wasyif
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-purple-300 hover:text-purple-100 hover:bg-purple-500/10 transition-all"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop: everything centered in one row */}
        <div className="hidden lg:flex justify-center items-center py-4 px-6">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300">
              <img src="/icon.png" alt="KripikWasyif" className="w-12 h-12 rounded-full" />
              <span className="text-lg font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent whitespace-nowrap">
                Keripik Wasyif
              </span>
            </Link>

            {links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative text-sm font-medium transition-colors duration-300 whitespace-nowrap ${activeLink === link.id
                  ? 'text-purple-400'
                  : hoveredLink === link.id
                    ? 'text-purple-300'
                    : 'text-gray-300 hover:text-purple-300'
                  }`}
              >
                {link.label}
                {(activeLink === link.id || hoveredLink === link.id) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-purple-500/20 bg-black/60 backdrop-blur-xl">
            <div className="flex flex-col py-2 px-4">
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 px-3 rounded-lg text-sm font-medium transition-colors duration-300 ${activeLink === link.id
                    ? 'text-purple-400 bg-purple-500/10'
                    : 'text-gray-300 hover:text-purple-300 hover:bg-purple-500/5'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
