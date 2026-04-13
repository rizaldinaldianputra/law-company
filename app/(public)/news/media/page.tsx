import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"
import { Media } from "@prisma/client"
import Link from "next/link"
import { Calendar, ExternalLink, Newspaper } from "lucide-react"

export const revalidate = 3600

export default async function MediaCoveragePage() {
  let media: Media[] = []
  try {
    media = await prisma.media.findMany({
      orderBy: { date: "desc" },
    })
  } catch (error) {
    console.error("Fetch error:", error)
  }

  return (
    <div className="pt-40 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 reveal transition-all duration-1000">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase bg-maroon text-white mb-8">Press & Media</div>
          <h1 className="font-serif font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight text-[#111] mb-6">Media Coverage</h1>
          <div className="w-16 h-1 bg-linear-to-r from-maroon to-gold rounded-full mb-10" />
          <p className="text-gray-500 text-xl leading-relaxed opacity-80 italic">
            Our firm in the news. Highlighting our successes, expert commentary, 
            and contributions to public legal discourse.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {media.length === 0 && (
            <div className="col-span-full py-24 text-center text-gray-400 italic bg-[#F7F6F4] rounded-[32px] border border-dashed border-gray-200">
              No media coverage found.
            </div>
          )}
          {media.map((item, i) => (
            <div
              key={item.id}
              className="reveal block bg-white border border-maroon/5 rounded-[32px] p-10 transition-all duration-500 hover:-translate-y-2 shadow-maroon hover:shadow-maroon-hover group"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-14 h-14 bg-maroon/5 rounded-2xl flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                  <Newspaper className="h-7 w-7" />
                </div>
                <div>
                  <div className="text-gold font-bold text-[10px] uppercase tracking-[0.3em] mb-1">{item.publisher || "Global News"}</div>
                  <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest opacity-60">
                    {item.date ? new Date(item.date).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "Legal Archive"}
                  </div>
                </div>
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#111] mb-8 line-clamp-2 min-h-[4rem] group-hover:text-maroon transition-colors duration-300">
                {item.title}
              </h3>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group border border-gold/30 text-gold font-bold tracking-[0.2em] uppercase text-[10px] py-4 px-8 rounded-sm inline-flex items-center justify-center gap-3 transition-all duration-300 hover:bg-gold hover:text-black w-full shadow-lg hover:shadow-gold/20"
              >
                Access Full Story <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
