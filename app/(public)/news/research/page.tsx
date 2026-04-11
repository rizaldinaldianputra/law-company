import { prisma } from "@/lib/prisma"
import { BookOpen, FileText, ChevronRight } from "lucide-react"
import Link from "next/link"

export const revalidate = 3600

export default async function ResearchPage() {
  let research = []
  try {
    const allArticles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    })
    research = allArticles.filter(a => a.category === "research")
  } catch (error) {
    console.error("Fetch error:", error)
  }

  return (
    <div className="pt-40 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 reveal transition-all duration-1000">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase bg-maroon text-white mb-8">In-depth Analysis</div>
          <h1 className="font-serif font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight text-[#111] mb-6">Legal Research</h1>
          <div className="w-16 h-1 bg-linear-to-r from-maroon to-gold rounded-full mb-10" />
          <p className="text-gray-500 text-xl leading-relaxed opacity-80 italic">
            Our firm's contributions to legal scholarship and detailed research 
            on complex legal precedents and policy developments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {research.length === 0 && (
            <div className="col-span-full py-24 text-center text-gray-400 italic bg-[#F7F6F4] rounded-[32px] border border-dashed border-gray-200">
              No research papers available at this time.
            </div>
          )}
          {research.map((item, i) => (
            <Link
              href={`/news/research/${item.slug}`}
              key={item.id}
              className="reveal block group flex flex-col items-center text-center p-12 bg-[#F7F6F4] border border-transparent hover:border-gold/30 rounded-[32px] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-maroon mb-10 group-hover:bg-maroon group-hover:text-white transition-all duration-500 group-hover:scale-110">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#111] mb-6 group-hover:text-maroon transition-colors duration-300 leading-tight min-h-[4rem]">
                {item.title}
              </h3>
              <p className="text-gray-500 text-base leading-relaxed mb-10 italic opacity-80 line-clamp-3">
                {item.excerpt || "Comprehensive research into legal frameworks and historical precedents."}
              </p>
              <div className="mt-auto flex items-center gap-3 text-gold font-bold text-[10px] uppercase tracking-[0.4em] transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                Read Abstract <ChevronRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
