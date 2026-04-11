import Link from "next/link"
import { ArrowRight, Shield, Award, Users, Scale } from "lucide-react"

export default function AboutPage() {
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
            <div className="badge badge-gold mb-6">Our Firm</div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              A Legacy of <span className="text-shimmer">Integrity</span> & Excellence
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              Established in 1995, Rizaldi & Associates has been at the forefront of legal advocacy,
              providing strategic counsel and aggressive representation for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <h2 className="section-title text-[#111] mb-6">Our Story</h2>
              <div className="divider-gold mb-8" />
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  Rizaldi & Associates was founded on the principle that every client deserves high-quality
                  legal representation combined with personal attention and unflinching integrity.
                </p>
                <p>
                  Over the decades, we have grown from a small boutique practice into a premier full-service
                  law firm, handling complex cases across corporate law, litigation, and family matters.
                </p>
                <p>
                  Our success is built on the trust our clients place in us and our unwavering commitment
                  to achieving the best possible outcomes in every case we handle.
                </p>
              </div>
            </div>
            <div className="reveal relative">
              <div className="aspect-[4/5] bg-[#F5F0E8] rounded-2xl overflow-hidden relative border border-[#C9A844]/20 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center text-[200px] opacity-5">🏛️</div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="text-sm uppercase tracking-widest text-[#C9A844] mb-2 font-bold">Since 1995</div>
                  <div className="text-2xl font-serif font-bold italic">"Justice delayed is justice denied."</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#F7F6F4]">
        <div className="container mx-auto px-6 text-center">
          <div className="badge badge-maroon mb-6">Our Core Values</div>
          <h2 className="section-title text-[#111] mb-12">The Pillars of Our Success</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "High Integrity",
                desc: "We adhere to the highest ethical standards in all our legal dealings."
              },
              {
                icon: Scale,
                title: "Legal Excellence",
                desc: "Our expertise is honed by decades of experience and successful cases."
              },
              {
                icon: Users,
                title: "Client-First",
                desc: "Your interests are at the center of every strategy we develop."
              },
              {
                icon: Award,
                title: "Proven Results",
                desc: "A track record of success in high-stakes litigation and negotiations."
              },
            ].map((value, i) => (
              <div
                key={i}
                className="reveal bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-[#C9A844]/30 transition-all card-hover"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-[#7C1D1D]/10 rounded-lg flex items-center justify-center mx-auto mb-6 text-[#7C1D1D]">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#111] mb-3">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Team CTA */}
      <section className="py-24 bg-[#7C1D1D] text-white">
        <div className="container mx-auto px-6 text-center reveal">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Meet the Minds Behind Our Success</h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
            Our team of dedicated attorneys brings diverse expertise and a shared passion for justice.
          </p>
          <Link href="/firm/team" className="btn-secondary">
            Meet Our Team <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}
