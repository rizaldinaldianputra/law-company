import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"
import Link from "next/link"
import { ArrowRight, ChevronRight, Scale, Shield, Users, Clock, Mail, Phone, MapPin } from "lucide-react"
import { Hero } from "@/components/layout/Hero"

// Types for components
interface PracticeArea {
  id: string
  title: string
  slug: string
  description: string
  image?: string | null
}

const defaultPracticeAreas: (PracticeArea & { icon: string })[] = [
  { id: "1", title: "Corporate Law", slug: "corporate", description: "Strategic counsel for businesses of all sizes, from startups to multinationals.", icon: "🏢" },
  { id: "2", title: "Civil Litigation", slug: "litigation", description: "Aggressive representation in complex disputes and courtroom battles.", icon: "⚖️" },
  { id: "3", title: "Family Law", slug: "family", description: "Compassionate guidance through sensitive family transitions and matters.", icon: "🏠" },
]

export const revalidate = 3600

export default async function Home() {
  // Fetch preview data
  let practiceAreas: PracticeArea[] = []
  let lawyers: any[] = []
  let articles: any[] = []

  try {
    practiceAreas = await prisma.practiceArea.findMany({ take: 6 })
    lawyers = await prisma.lawyer.findMany({ take: 4 })

    // Workaround for category filter type issue
    const allArticles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" }
    })
    articles = allArticles
      .filter(a => a.category === "article")
      .slice(0, 3)
  } catch (error) {
    console.error("Home fetch error:", error)
  }

  const displayedAreas = practiceAreas.length > 0
    ? practiceAreas.map((a) => ({ ...a, icon: "⚖️" }))
    : defaultPracticeAreas

  return (
    <div className="flex flex-col">

      {/* ─────────── HERO ─────────── */}
      <Hero />


      {/* ─────────── PRACTICE AREAS ─────────── */}
      <section className="py-24 bg-[#F7F6F4]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl reveal transition-all duration-1000">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase bg-maroon text-white mb-6">Expertise</div>
              <h2 className="font-serif font-bold text-[clamp(2.5rem,5vw,3.5rem)] leading-tight text-[#111] mb-4">Our Practice Areas</h2>
              <div className="w-16 h-1 bg-linear-to-r from-maroon to-gold rounded-full" />
              <p className="text-gray-500 mt-8 text-xl leading-relaxed font-medium opacity-80">
                We provide a wide range of legal services designed to assist you with
                even the most complex issues.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedAreas.slice(0, 6).map((area, i) => (
              <Link
                href={`/firm/services/${area.slug}`}
                key={area.id}
                className="reveal block bg-white rounded-2xl p-10 group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-maroon/5 rounded-xl flex items-center justify-center text-maroon mb-8 group-hover:bg-maroon group-hover:text-white transition-all duration-500 group-hover:scale-110">
                  <span className="text-3xl">{area.icon}</span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#111] mb-4 group-hover:text-maroon transition-colors duration-300">
                  {area.title}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed mb-8 group-hover:text-gray-600 transition-colors">
                  {area.description}
                </p>
                <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-[0.2em] transform translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                  Discover Expertise <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-20 reveal transition-all duration-1000">
            <Link href="/firm/services" className="bg-maroon text-white font-bold tracking-[0.2em] uppercase text-[12px] py-5 px-10 rounded-sm inline-flex items-center gap-3 transition-all duration-300 hover:bg-maroon-dark hover:-translate-y-1 hover:shadow-xl shadow-maroon/20">
              View All Practice Areas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────── OUR FIRM / ABOUT PREVIEW ─────────── */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal relative transition-all duration-1000">
              <div className="aspect-square bg-[#F5F0E8] rounded-3xl overflow-hidden relative border border-gold/10 shadow-3xl">
                <div className="absolute inset-0 flex items-center justify-center text-[250px] opacity-[0.03]">🏛️</div>
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12 right-12 text-white">
                  <div className="text-xs uppercase tracking-[0.4em] text-gold mb-3 font-bold">A Legacy of Excellence</div>
                  <div className="text-4xl font-serif font-bold italic leading-tight">Defending Your Rights With Unwavering Integrity</div>
                </div>
              </div>
              {/* Floating Stat */}
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-2xl border border-gray-50 z-10 animate-float">
                <div className="text-gold font-serif font-bold text-4xl mb-1">98%</div>
                <div className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.3em]">Client Satisfaction</div>
              </div>
            </div>

            <div className="reveal transition-all duration-1000" style={{ transitionDelay: "0.2s" }}>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase bg-maroon text-white mb-8">Our Firm</div>
              <h2 className="font-serif font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight text-[#111] mb-8 italic">Focused on Your Success</h2>
              <div className="w-16 h-1 bg-linear-to-r from-maroon to-gold rounded-full mb-10" />
              <div className="space-y-8 text-gray-500 text-lg leading-relaxed mb-12">
                <p>
                  Rizaldi & Associates was founded on the principle that every client deserves high-quality
                  legal representation combined with personal attention and unflinching integrity.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { icon: Shield, title: "Aggressive Advocacy" },
                    { icon: Scale, title: "Strategic Counsel" },
                    { icon: Users, title: "Personal Attention" },
                    { icon: Clock, title: "24/7 Availability" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-[#111] font-bold text-sm tracking-wide transition-all hover:text-maroon">
                      <item.icon className="h-5 w-5 text-gold" /> {item.title}
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/firm/about" className="group border-2 border-gold text-gold font-bold tracking-[0.2em] uppercase text-[12px] py-5 px-10 rounded-sm inline-flex items-center gap-3 transition-all duration-300 hover:bg-gold hover:text-black hover:-translate-y-1 shadow-xl hover:shadow-gold/20">
                Our Full Story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── LAWYERS ─────────── */}
      {lawyers.length > 0 && (
        <section className="py-32 bg-[#F7F6F4]">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 reveal transition-all duration-1000">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase bg-maroon text-white mb-8">Team</div>
              <h2 className="font-serif font-bold text-[clamp(2.5rem,5vw,3.5rem)] leading-tight text-[#111] mb-6">Our Elite Attorneys</h2>
              <div className="w-16 h-1 bg-linear-to-r from-maroon to-gold rounded-full mx-auto" />
              <p className="text-gray-500 mt-10 text-xl leading-relaxed opacity-80 italic">
                Lead by nationally recognized legal experts dedicated to your case.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
              {lawyers.map((lawyer, i) => (
                <Link
                  href={`/firm/team/${lawyer.slug}`}
                  key={lawyer.id}
                  className="reveal block group transition-all duration-500"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-8 relative shadow-xl">
                    {lawyer.image ? (
                      <img src={lawyer.image} alt={lawyer.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 font-serif italic">Rizaldi & Associates</div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                      <span className="text-white text-[10px] font-bold uppercase tracking-[0.4em] border-b border-gold pb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View Legal Profile</span>
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#111] group-hover:text-maroon transition-colors duration-300">
                    {lawyer.name}
                  </h3>
                  <p className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mt-2 opacity-80">
                    {lawyer.title}
                  </p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-20 reveal transition-all duration-1000">
              <Link href="/firm/team" className="bg-maroon text-white font-bold tracking-[0.2em] uppercase text-[12px] py-5 px-10 rounded-sm inline-flex items-center gap-3 transition-all duration-300 hover:bg-maroon-dark hover:-translate-y-1 shadow-xl">
                Meet All Attorneys <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─────────── TESTIMONIALS / QUOTE ─────────── */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M100 0 L100 100 L0 100 Z" fill="#C9A844" />
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center reveal transition-all duration-1000">
            <div className="text-gold text-7xl font-serif opacity-20 mb-10 leading-none">"</div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif italic font-medium leading-[1.4] mb-12 text-white/95">
              In any legal battle, the quality of your counsel determines the outcome. We provide the
              strategic advantage you need to prevail.
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-12 h-[2px] bg-gold mb-6" />
              <div className="font-bold tracking-[0.4em] uppercase text-xs text-gold/80 mb-2">Rizaldi & Associates</div>
              <div className="text-white text-[11px] font-bold uppercase tracking-[0.2em] opacity-60">Elite Legal Counsel</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── ARTICLES ─────────── */}
      {articles.length > 0 && (
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="reveal transition-all duration-1000">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase bg-maroon text-white mb-8">Insights</div>
                <h2 className="font-serif font-bold text-[clamp(2.5rem,5vw,3.5rem)] leading-tight text-[#111] mb-6">Latest Legal Intelligence</h2>
                <div className="w-16 h-1 bg-linear-to-r from-maroon to-gold rounded-full" />
              </div>
              <Link href="/news/articles" className="group text-[12px] text-maroon font-bold uppercase tracking-[0.2em] flex items-center gap-3 transition-all hover:text-gold">
                Archive of Knowledge <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {articles.map((article, i) => (
                <Link
                  href={`/news/articles/${article.slug}`}
                  key={article.id}
                  className="reveal block bg-white rounded-2xl overflow-hidden border border-gray-100 group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="h-64 bg-slate-50 relative overflow-hidden">
                    {article.image ? (
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 font-serif italic text-4xl opacity-20">📰</div>
                    )}
                    <div className="absolute top-6 left-6 inline-flex px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold tracking-[0.2em] uppercase text-maroon shadow-sm self-start">LEGAL INSIGHT</div>
                  </div>
                  <div className="p-10">
                    <div className="text-gray-400 text-[10px] mb-6 flex items-center gap-2 uppercase tracking-[0.3em] font-bold">
                      <Clock className="h-3.5 w-3.5 text-gold" /> {new Date(article.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-[#111] mb-6 group-hover:text-maroon transition-colors duration-300 line-clamp-2 min-h-[4rem]">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-base leading-relaxed mb-8 line-clamp-3 italic opacity-80">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-[0.3em] transform translate-x-[-10px] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      Engage Further <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────── CONTACT CTA ─────────── */}
      <section className="py-32 bg-[#F7F6F4]">
        <div className="container mx-auto px-6">
          <div className="bg-maroon rounded-[40px] p-12 md:p-24 text-white relative overflow-hidden shadow-3xl reveal transition-all duration-1000">
            {/* Ambient pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle at 100% 0%, #C9A844 0%, transparent 60%)",
              }}
            />

            <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 italic">Securing Your Future</h2>
                <p className="text-white/70 max-w-2xl text-xl mb-12 leading-relaxed font-medium">
                  Every legal problem has a strategic solution. Let's discuss your situation and
                  build an aggressive plan for your success.
                </p>
                <div className="flex flex-wrap gap-12 pt-10 border-t border-white/10">
                  <div className="flex flex-col gap-2">
                    <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">Direct Dial</span>
                    <div className="flex items-center gap-4">
                      <Phone className="h-5 w-5 text-gold" />
                      <span className="font-serif text-2xl">+62 21 123 456</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">Electronic Mail</span>
                    <div className="flex items-center gap-4">
                      <Mail className="h-5 w-5 text-gold" />
                      <span className="font-serif text-2xl">contact@smithlaw.com</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full lg:w-80">
                <Link href="/contact" className="bg-white text-maroon font-bold tracking-[0.2em] uppercase text-[12px] py-6 rounded-sm flex items-center justify-center gap-3 transition-all duration-300 hover:bg-gold hover:text-black hover:-translate-y-1 shadow-2xl">
                  Consult With Us <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="flex items-center justify-center gap-2 opacity-40">
                  <Clock className="h-3 w-3" />
                  <p className="text-[10px] uppercase font-bold tracking-widest text-center">Inquiry response within 24H</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
