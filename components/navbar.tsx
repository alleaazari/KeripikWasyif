'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const links = [
    { id: 'beranda', label: 'Home', href: '/' },
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
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-purple-500/20">
      <div className="flex justify-center items-center py-4 px-6">
        <div className="flex items-center justify-center gap-12">
          <Link href="/" className="text-lg font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent hover:from-purple-300 hover:to-purple-500 transition-all duration-300">
            KripikWasyif Store Page
          </Link>

          <div className="flex gap-8 items-center">
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
        </div>
      </div>
    </nav>
  )
}
