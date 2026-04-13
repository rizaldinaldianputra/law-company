import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"
import Link from "next/link"
import { ArrowRight, ChevronRight, Calendar, Tag } from "lucide-react"

export const revalidate = 3600

async function getNewsByCategory(category: string) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        published: true,
        category: {
          equals: category,
          mode: 'insensitive'
        }
      },
      orderBy: { createdAt: "desc" },
    })
    return articles
  } catch (error) {
    console.error("Fetch error:", error)
    return []
  }
}

export default async function NewsArticlesPage() {
  const articles = await getNewsByCategory("article")

  return (
    <div className="pt-40 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 reveal transition-all duration-1000">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase bg-maroon text-white mb-8">Latest Insights</div>
          <h1 className="font-serif font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight text-[#111] mb-6">Articles & Publications</h1>
          <div className="w-16 h-1 bg-linear-to-r from-maroon to-gold rounded-full mb-10" />
          <p className="text-gray-500 text-xl leading-relaxed opacity-80 italic">
            Expert commentary and in-depth analysis of the latest legal developments and trends
            shaping our industry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {articles.length === 0 && (
            <div className="col-span-full py-24 text-center text-gray-400 italic bg-[#F7F6F4] rounded-2xl border border-dashed border-gray-200">
              No articles found.
            </div>
          )}
          {articles.map((item, i) => (
            <Link
              href={`/news/articles/${item.slug}`}
              key={item.id}
              className="reveal block bg-white border border-maroon/5 rounded-3xl overflow-hidden group transition-all duration-500 hover:-translate-y-2 shadow-maroon hover:shadow-maroon-hover"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="h-64 bg-[#F7F6F4] relative flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="text-6xl opacity-10 font-serif italic">Rizaldi Law</div>
                )}
                <div className="absolute top-6 left-6 inline-flex px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold tracking-[0.2em] uppercase text-maroon shadow-sm self-start">ARTICLE</div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-gold" />
                    {new Date(item.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </div>
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#111] mb-6 group-hover:text-maroon transition-colors duration-300 line-clamp-2 min-h-[4rem]">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="text-gray-500 text-base leading-relaxed mb-8 line-clamp-3 italic opacity-80">
                    {item.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-3 text-gold text-[10px] font-bold uppercase tracking-[0.3em] transform translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                  Read Full Article <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
