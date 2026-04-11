"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    // Slight delay to ensure DOM is ready after route change
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible")
            }
          })
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      )

      const elements = document.querySelectorAll(".reveal")
      elements.forEach((el) => observer.observe(el))

      return () => observer.disconnect()
    }, 100)

    return () => clearTimeout(timeout)
  }, [pathname])

  return null
}
