import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"
import { Article } from "@prisma/client"
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export const revalidate = 3600

export default async function CareerPage() {
  let jobs: Article[] = []
  try {
    const allArticles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    })
    jobs = allArticles.filter(a => a.category === "career")
  } catch (error) {
    console.error("Fetch error:", error)
  }

  return (
    <div className="pt-40 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 reveal transition-all duration-1000">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase bg-maroon text-white mb-8">Join Our Team</div>
          <h1 className="font-serif font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight text-[#111] mb-6">Careers & Talent</h1>
          <div className="w-16 h-1 bg-linear-to-r from-maroon to-gold rounded-full mb-10" />
          <p className="text-gray-500 text-xl leading-relaxed opacity-80 italic text-gray-600">
            We are always looking for exceptional talent to join our growing firm. 
            Build your career with a legacy of excellence and integrity.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="reveal space-y-8 transition-all duration-1000">
            <h2 className="text-3xl font-serif font-bold text-[#111] mb-8 border-l-4 border-maroon pl-6">Open Positions</h2>
            {jobs.length === 0 && (
              <div className="p-12 text-center text-gray-400 italic bg-[#F7F6F4] rounded-2xl border border-dashed border-gray-200">
                No open positions at the moment. Please check back later or send a spontaneous application.
              </div>
            )}
            {jobs.map((item, i) => (
              <div
                key={item.id}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 p-10 bg-white border border-gray-100 rounded-2xl hover:border-maroon/20 hover:shadow-2xl transition-all duration-500"
              >
                <div>
                  <h3 className="font-serif font-bold text-2xl text-[#111] mb-3 group-hover:text-maroon transition-colors duration-300">{item.title}</h3>
                  <div className="flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> Full-Time
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Jakarta
                    </div>
                  </div>
                </div>
                <Link href={`/news/career/${item.slug}`} className="bg-maroon text-white font-bold tracking-[0.1em] uppercase text-[11px] py-4 px-8 rounded-sm flex items-center justify-center gap-2 transition-all duration-300 hover:bg-maroon-dark hover:-translate-y-1 shadow-lg">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="reveal bg-black text-white p-16 rounded-[40px] relative overflow-hidden h-fit transition-all duration-1000" style={{ transitionDelay: "0.2s" }}>
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle at 100% 0%, #C9A844 0%, transparent 60%)",
              }}
            />
            <h2 className="text-4xl font-serif font-bold mb-8 italic">Spontaneous Application</h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">
              Don't see a role that fits? We are always interested in hearing from 
              motivated professionals who share our values.
            </p>
            <div className="space-y-6 mb-12 text-sm text-gray-300 font-bold tracking-wide">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(201,168,68,0.5)]" />
                Resume & Cover Letter
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(201,168,68,0.5)]" />
                Portfolio (if applicable)
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(201,168,68,0.5)]" />
                Academic Transcripts
              </div>
            </div>
            <a href="mailto:hr@smithlaw.com" className="group border-2 border-gold text-gold font-bold tracking-[0.2em] uppercase text-[12px] py-6 px-12 rounded-sm flex items-center justify-center gap-3 transition-all duration-300 hover:bg-gold hover:text-black hover:-translate-y-1 w-full shadow-2xl hover:shadow-gold/20">
              Send Your CV <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
