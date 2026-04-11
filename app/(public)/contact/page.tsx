import { Phone, Mail, MapPin, Clock, ArrowRight, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, #C9A844 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="badge badge-gold mb-6">Connect With Us</div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Let's Discuss <br /><span className="text-shimmer">Your Case</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              Our team of expert attorneys is ready to provide the personal attention and 
              aggressive representation you deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
            {/* Left: Info */}
            <div className="reveal space-y-12">
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#111] mb-8">Contact Information</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#7C1D1D]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#7C1D1D]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Our Office</h4>
                      <p className="text-gray-500 leading-relaxed text-sm">
                        Jl. Sudirman No. 123, Suite 12<br />
                        Jakarta Pusat 10220, Indonesia
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#7C1D1D]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#7C1D1D]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone & Fax</h4>
                      <a href="tel:+6221123456" className="text-gray-500 hover:text-[#7C1D1D] transition block text-sm">
                        +62 21 123 456
                      </a>
                      <p className="text-xs text-gray-400 mt-1">Available Mon-Fri, 9am - 5pm</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#7C1D1D]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#7C1D1D]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <a href="mailto:contact@smithlaw.com" className="text-gray-500 hover:text-[#7C1D1D] transition block text-sm">
                        contact@smithlaw.com
                      </a>
                      <p className="text-xs text-gray-400 mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#7C1D1D]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#7C1D1D]">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                      <p className="text-gray-500 text-sm">
                        Mon – Fri: 08:00 – 17:00<br />
                        Sat: 08:00 – 12:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-[#F7F6F4] rounded-2xl border border-gray-100">
                <h4 className="font-bold text-[#111] mb-4">Urgent Matters</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  For immediate legal assistance outside business hours, 
                  please message us on WhatsApp or call our emergency hotline.
                </p>
                <div className="mt-6 flex gap-2">
                  <a href="#" className="w-8 h-8 rounded-full border border-[#C9A844] flex items-center justify-center text-[#C9A844] hover:bg-[#C9A844] hover:text-white transition">
                    <Send className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="reveal bg-white p-8 md:p-12 rounded-2xl border border-gray-100 shadow-xl shadow-black/5" style={{ transitionDelay: "0.2s" }}>
              <div className="mb-10">
                <h3 className="text-2xl font-serif font-bold text-[#111] mb-4">Send a Message</h3>
                <p className="text-gray-500">Provide some details about your case and we'll get back to you shortly.</p>
              </div>

              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#C9A844] transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#C9A844] transition"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="Enter your phone"
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#C9A844] transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Interested In</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#C9A844] transition">
                      <option>Choose Service</option>
                      <option>Corporate Law</option>
                      <option>Civil Litigation</option>
                      <option>Family Law</option>
                      <option>Real Estate Law</option>
                      <option>Criminal Defense</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Brief Description of Case</label>
                  <textarea 
                    rows={5} 
                    placeholder="Provide a short overview of your legal needs..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#C9A844] transition resize-none"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button className="btn-primary w-full justify-center group">
                    Send Message <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] w-full bg-[#111] overflow-hidden">
        <div className="w-full h-full flex flex-col items-center justify-center text-[#C9A844] opacity-50 space-y-4">
          <MapPin className="h-12 w-12" />
          <span className="uppercase tracking-[0.3em] font-bold text-xs">Map Loading...</span>
        </div>
      </section>
    </div>
  )
}
