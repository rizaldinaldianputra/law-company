"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/firm",
    label: "Our Firm",
    children: [
      { href: "/firm/about", label: "About Us" },
      { href: "/firm/team", label: "Our Team" },
      { href: "/firm/services", label: "Services" },
    ],
  },
  {
    href: "/news",
    label: "News",
    children: [
      { href: "/news/media", label: "Media Coverage" },
      { href: "/news/articles", label: "Articles" },
      { href: "/news/awards", label: "Awards & Achievements" },
      { href: "/news/events", label: "Events" },
      { href: "/news/research", label: "Research" },
      { href: "/news/career", label: "Career" },
    ],
  },
  { href: "/contact", label: "Contact Us" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const isHome = pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    // Run once on mount to handle cases where page starts scrolled
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  const handleMouseEnter = (href: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDropdown(href)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdown(null)
    }, 150)
  }

  const isSolid = scrolled || !isHome

  return (
    <header
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ${isSolid
        ? "bg-white/95 backdrop-blur-2xl shadow-xl border-b border-gray-100 py-0"
        : "bg-transparent py-4"
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex h-[80px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">

            {/* Icon */}
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-gray-50 flex items-center justify-center 
        shadow-lg shadow-black/5 overflow-hidden group-hover:scale-110 transition-all duration-500 border border-gray-100">

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Icon Scale */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-yellow-500 group-hover:scale-110 transition duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v18m0-18l6 6m-6-6l-6 6M4 9h16M6 9l-2 6h4l-2-6zm12 0l-2 6h4l-2-6z"
                />
              </svg>
            </div>

            {/* Text */}
            <div className="flex flex-col">
              <span className={`font-semibold text-lg tracking-tight font-serif transition duration-300 ${isSolid ? 'text-navy' : 'text-white'} group-hover:text-blue-900`}>
                Rizaldi & Associates
              </span>

              <span className={`text-[10px] uppercase tracking-[0.35em] mt-1 opacity-80 ${isSolid ? 'text-navy-light' : 'text-white'}`}>
                High Integrity Counsel
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && handleMouseEnter(link.href)}
                onMouseLeave={handleMouseLeave}
              >
                {link.children ? (
                  <button
                    className={`text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 py-2 px-4 rounded-full transition-all duration-300 ${dropdown === link.href || pathname.startsWith(link.href)
                      ? "text-navy bg-navy/5"
                      : isSolid ? "text-slate-high hover:text-navy" : "text-white/90 hover:text-white"
                      }`}
                  >
                    {link.label}
                    <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${dropdown === link.href ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-[11px] font-bold uppercase tracking-[0.2em] py-2 px-4 rounded-full transition-all duration-300 ${pathname === link.href ? "text-navy bg-navy/5" : isSolid ? "text-slate-high hover:text-navy" : "text-white/90 hover:text-white"
                      }`}
                  >
                    {link.label}
                  </Link>
                )}

                {link.children && dropdown === link.href && (
                  <div
                    className="absolute top-[100%] left-0 w-64 pt-4 z-[110]"
                    onMouseEnter={() => handleMouseEnter(link.href)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white backdrop-blur-2xl border border-gray-100 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up p-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`flex items-center px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${pathname === child.href
                            ? "bg-navy text-white"
                            : "text-slate-mid hover:bg-navy/5 hover:text-navy"
                            }`}
                          onClick={() => setDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-3 rounded-full transition-colors ${isSolid ? 'text-[#1A1A1A] hover:bg-black/5' : 'text-white hover:bg-white/5'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[80px] bg-white/98 backdrop-blur-2xl z-40 overflow-y-auto animate-fade-in-up">
          <nav className="container mx-auto px-6 py-12 flex flex-col gap-6">
            {navLinks.map((link) => (
              <div key={link.href} className="flex flex-col gap-4">
                {link.children ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-navy text-[10px] font-bold uppercase tracking-widest opacity-60">
                      {link.label}
                    </span>
                    <div className="flex flex-col gap-1 pl-4 border-l border-gray-100 mt-2">
                      {link.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`py-3 text-sm font-medium ${pathname === child.href ? 'text-navy' : 'text-slate-high'}`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-2xl font-serif border-b border-gray-100 pb-4 ${pathname === link.href ? 'text-navy' : 'text-slate-high'}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="mt-8 bg-navy text-white font-bold tracking-[0.1em] uppercase text-[13px] py-6 px-12 rounded-sm flex items-center justify-center gap-3 hover:bg-navy-dark transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Consult With Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

