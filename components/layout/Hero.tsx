"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Scale, Shield } from "lucide-react"

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect()
        const x = (e.clientX - left) / width - 0.5
        const y = (e.clientY - top) / height - 0.5
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ─── BACKGROUND LAYER (Parallax Image) ─── */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-bg.png')",
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(1.1)`,
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'brightness(0.6) contrast(1.2) saturate(0.5)'
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/95 via-black/80 to-black/95" />

        {/* Grain Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-1 opacity-[0.03]"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
        />
      </div>

      {/* ─── DECORATIVE GLOW ─── */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[120px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, #7C1D1D 0%, transparent 70%)",
          left: `calc(50% + ${mousePosition.x * 300}px - 400px)`,
          top: `calc(50% + ${mousePosition.y * 300}px - 400px)`,
          transition: 'left 0.3s ease-out, top 0.3s ease-out'
        }}
      />

      {/* ─── CONTENT ─── */}
      <div className="container mx-auto px-6 relative z-10 text-center py-32 lg:py-48">
        {/* Modern Badge */}
        <div className="inline-flex overflow-hidden mb-10 -translate-y-[20px] animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl inline-flex items-center gap-2 px-6 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] sm:text-[11px] text-gray-300 font-bold uppercase tracking-[0.4em]">Excellence Since 1995</span>
          </div>
        </div>

        {/* Headline Cluster */}
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="overflow-hidden">
            <h1 className="text-white font-serif font-bold italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl animate-mask-up"
              style={{ animationDelay: "0.5s" }}>
              Upholding Justice
            </h1>
          </div>

          <div className="relative py-4 flex items-center justify-center">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px] bg-linear-to-r from-transparent via-gold to-transparent w-full max-w-lg opacity-30" />
            <div className="px-6 bg-transparent relative z-10 overflow-hidden">
              <h2 className="text-gold font-serif font-bold italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl animate-mask-up"
                style={{ animationDelay: "0.8s" }}>
                With <span className="bg-linear-to-r from-gold via-gold-light to-gold bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer italic">Absolute Integrity</span>
              </h2>
            </div>
          </div>

          <div className="overflow-hidden">
            <h1 className="text-white/90 font-serif font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl animate-mask-up"
              style={{ animationDelay: "1.1s" }}>
              In Every Case
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <div className="max-w-2xl mx-auto mt-12 mb-16 px-4">
          <div className="overflow-hidden">
            <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed italic animate-mask-up"
              style={{ animationDelay: "1.4s" }}>
              Rizaldi & Associates serves as a bastion for the vulnerable and a strategic advisor
              to progress. Defending your rights with wisdom and power.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 animate-fade-in-up"
          style={{ animationDelay: "1.8s" }}>
          <Link
            href="/contact"
            className="bg-maroon text-white font-bold tracking-[0.1em] uppercase text-[13px] py-4 px-9 rounded-sm flex items-center gap-3 transition-all duration-300 hover:bg-maroon-dark hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(124,29,29,0.3)] shadow-xl"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
            }}
          >
            Consult With Us <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            href="/firm/about"
            className="group relative py-3 px-6 overflow-hidden"
            style={{
              transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`
            }}
          >
            <span className="text-gold font-bold text-xs sm:text-sm uppercase tracking-[0.3em] group-hover:text-white transition-colors duration-300">Explore Our Firm</span>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Link>
        </div>
      </div>

      {/* ─── DECORATIVE LAYER ─── */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]">
        <Scale size={300} className="absolute -top-20 -left-20 text-gold animate-float" />
        <Shield size={250} className="absolute -bottom-20 -right-20 text-maroon animate-float" style={{ animationDelay: "2s" }} />
      </div>
    </section>
  )
}
