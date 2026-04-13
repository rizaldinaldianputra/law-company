import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"
import { Article } from "@prisma/client"
import { Award, Trophy, Star, ShieldCheck } from "lucide-react"

export const revalidate = 3600

export default async function AwardsPage() {
  let awards: Article[] = []
  try {
    const allArticles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    })
    awards = allArticles.filter(a => a.category === "award")
  } catch (error) {
    console.error("Fetch error:", error)
  }

  return (
    <div className="pt-40 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 reveal transition-all duration-1000">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase bg-gold text-white mb-8">Achievements</div>
          <h1 className="font-serif font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight text-[#111] mb-6">Awards & Recognition</h1>
          <div className="w-16 h-1 bg-linear-to-r from-maroon to-gold rounded-full mb-10" />
          <p className="text-gray-500 text-xl leading-relaxed opacity-80 italic">
            A testament to our dedication, expertise, and commitment to delivering 
            exceptional legal results for our clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {awards.length === 0 && (
            <div className="col-span-full py-24 text-center text-gray-400 italic bg-[#F7F6F4] rounded-2xl border border-dashed border-gray-200">
              No awards listed yet.
            </div>
          )}
          {awards.map((item, i) => (
            <div
              key={item.id}
              className="reveal block bg-white border border-maroon/5 rounded-[32px] p-10 text-center transition-all duration-500 hover:-translate-y-2 shadow-maroon hover:shadow-maroon-hover group"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-maroon rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-maroon group-hover:shadow-maroon-hover rotate-3 group-hover:rotate-0 transition-all duration-500">
                <Trophy className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#111] mb-6">
                {item.title}
              </h3>
              <div className="text-gold font-bold text-[10px] uppercase tracking-[0.3em] mb-8 border-y border-gold/20 py-3 inline-block px-6">
                {new Date(item.createdAt).getFullYear()} Distinguished Award
              </div>
              <p className="text-gray-500 text-base leading-relaxed mb-10 italic opacity-80 underline decoration-gold/10 decoration-2 underline-offset-8">
                {item.excerpt || "Awarded for outstanding legal service and professional excellence."}
              </p>
              <div className="flex justify-center gap-1.5 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
