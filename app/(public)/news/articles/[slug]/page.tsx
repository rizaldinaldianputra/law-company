import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"
import { notFound } from "next/navigation"
import { Calendar, Tag, ChevronLeft, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const revalidate = 3600

export default async function NewsDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await prisma.article.findUnique({
    where: { slug }
  })

  if (!article) return notFound()

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
          <Link 
            href={`/news/${article.category === 'article' ? 'articles' : article.category}`}
            className="inline-flex items-center gap-2 text-[#C9A844] mb-8 text-sm font-bold uppercase tracking-widest hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to {article.category}s
          </Link>
          <div className="max-w-4xl">
            <div className="badge badge-gold mb-6 uppercase tracking-[0.2em]">{article.category}</div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#C9A844]" />
                {new Date(article.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-[#C9A844]" />
                Legal {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          {article.image && (
            <div className="mb-16 -mt-32 relative z-20 shadow-2xl rounded-2xl overflow-hidden border border-[#C9A844]/20">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-auto max-h-[600px] object-cover"
              />
            </div>
          )}

          <div className="prose prose-slate prose-lg max-w-none">
            {article.excerpt && (
              <p className="text-xl text-gray-600 font-serif italic mb-10 leading-relaxed border-l-4 border-[#C9A844] pl-6">
                {article.excerpt}
              </p>
            )}
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {article.content}
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-gray-100 flex justify-between items-center">
            <div className="flex gap-4">
              {/* Social share icons placeholder */}
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Share:</div>
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#7C1D1D] transition cursor-pointer">
                    <span className="text-[10px]">●</span>
                  </div>
                ))}
              </div>
            </div>
            <Link 
              href="/contact" 
              className="text-[#7C1D1D] font-bold text-sm uppercase tracking-widest hover:text-[#C9A844] transition flex items-center gap-2"
            >
              Discuss This Topic <ChevronLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
