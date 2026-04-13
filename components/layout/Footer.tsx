import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Globe, MessageCircle, ExternalLink, Send } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] text-gray-400 border-t border-white/5 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] bg-gold blur-[120px] top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-maroon blur-[120px] bottom-[-100px] right-[-100px]" />
      </div>

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2A0E0E] to-[#0A0A0A] flex items-center justify-center 
        shadow-lg shadow-black/40 overflow-hidden group transition-all duration-500">

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                  {/* Icon Scale */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-gold group-hover:scale-110 transition duration-500"
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
                <div>
                  <div className="text-white font-semibold text-lg font-serif">Rizaldi & Associates</div>
                  <div className="text-gold text-[10px] uppercase tracking-[0.3em]">Law Firm</div>
                </div>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed">
                Delivering strategic legal solutions with integrity, precision, and excellence since 1995.
              </p>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[Globe, MessageCircle, ExternalLink, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center 
                  text-gray-500 hover:text-gold hover:border-gold transition-all duration-300 hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Our Firm */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Our Firm</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/firm/about", label: "About Us" },
                { href: "/firm/team", label: "Our Team" },
                { href: "/firm/services", label: "Services" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group flex items-center gap-2 text-gray-400 hover:text-gold transition">
                    <span className="w-0 group-hover:w-2 h-px bg-gold transition-all"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* News */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Insights</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/news/media", label: "Media Coverage" },
                { href: "/news/articles", label: "Articles" },
                { href: "/news/awards", label: "Awards" },
                { href: "/news/events", label: "Events" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group flex items-center gap-2 text-gray-400 hover:text-gold transition">
                    <span className="w-0 group-hover:w-2 h-px bg-gold transition-all"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Contact</h4>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-gold mt-0.5" />
                  <span className="text-gray-500">
                    Jl. Sudirman No. 123, Jakarta
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gold" />
                  <a href="#" className="hover:text-gold transition">+62 21 123 456</a>
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gold" />
                  <a href="#" className="hover:text-gold transition">contact@smithlaw.com</a>
                </li>

                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gold" />
                  <span>Mon – Fri: 08:00 – 17:00</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Subscribe for insights</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 text-sm bg-black border border-white/10 rounded-l-md focus:outline-none focus:border-gold"
                />
                <button className="px-4 bg-maroon text-white rounded-r-md hover:bg-maroon-dark transition">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Bottom */}
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
        <p>&copy; {new Date().getFullYear()} Rizaldi & Associates. All rights reserved.</p>

        <div className="flex gap-6">
          <Link href="#" className="hover:text-gold transition">Privacy</Link>
          <Link href="#" className="hover:text-gold transition">Terms</Link>
          <Link href="#" className="hover:text-gold transition">Disclaimer</Link>
        </div>
      </div>
    </footer>
  )
}