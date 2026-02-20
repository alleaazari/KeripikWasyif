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
    { id: 'kontak', label: 'Kontak', href: '/kontak' },
    { id: 'ulasan', label: 'Ulasan', href: '/ulasan' },
  ]

  const getActiveLink = () => {
    if (pathname === '/') return 'beranda'
    if (pathname === '/katalog') return 'katalog'
    if (pathname === '/kontak') return 'kontak'
    if (pathname === '/ulasan') return 'ulasan'
    return 'beranda'
  }

  const activeLink = getActiveLink()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-purple-500/20">
        <div className="flex justify-between items-center py-3 px-4 md:py-4 md:px-6 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-all duration-300">
            <img src="/icon.png" alt="KripikWasyif" className="w-9 h-9 md:w-12 md:h-12 rounded-full" />
            <span className="text-sm md:text-lg font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
              Keripik Wasyif
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-8 items-center">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative text-sm font-medium transition-colors duration-300 ${activeLink === link.id
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-purple-300 hover:text-purple-100 hover:bg-purple-500/10 transition-all"
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

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-purple-500/20 backdrop-blur-xl bg-black/40">
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
