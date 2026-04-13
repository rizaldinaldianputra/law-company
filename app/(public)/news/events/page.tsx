import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"
import { Article } from "@prisma/client"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export const revalidate = 3600

export default async function EventsPage() {
  let events: Article[] = []
  try {
    const allArticles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    })
    events = allArticles.filter(a => a.category === "event")
  } catch (error) {
    console.error("Fetch error:", error)
  }

  return (
    <div className="pt-40 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 reveal transition-all duration-1000">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase bg-maroon text-white mb-8">Upcoming & Past Events</div>
          <h1 className="font-serif font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight text-[#111] mb-6">Events & Seminars</h1>
          <div className="w-16 h-1 bg-linear-to-r from-maroon to-gold rounded-full mb-10" />
          <p className="text-gray-500 text-xl leading-relaxed opacity-80 italic">
            Stay updated with our latest webinars, legal seminars, and community 
            outreach programs where we share our expertise.
          </p>
        </div>

        <div className="space-y-10">
          {events.length === 0 && (
            <div className="py-24 text-center text-gray-400 italic bg-[#F7F6F4] rounded-[32px] border border-dashed border-gray-200">
              No upcoming events scheduled at this time.
            </div>
          )}
          {events.map((item, i) => (
            <div
              key={item.id}
              className="reveal flex flex-col md:grid md:grid-cols-[180px_1fr_200px] items-center gap-12 bg-white border border-maroon/5 rounded-[32px] p-10 shadow-maroon hover:shadow-maroon-hover transition-all duration-500 hover:-translate-y-1 group"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Date Block */}
              <div className="text-center md:border-r border-gray-100 pr-12 w-full">
                <div className="text-maroon font-serif font-bold text-6xl mb-2 group-hover:scale-110 transition-transform duration-500">
                  {item.eventDate ? new Date(item.eventDate).getDate() : new Date(item.createdAt).getDate()}
                </div>
                <div className="text-gold font-bold text-[10px] uppercase tracking-[0.4em] mb-1">
                  {item.eventDate ? new Date(item.eventDate).toLocaleDateString("en-US", { month: "long" }) : new Date(item.createdAt).toLocaleDateString("en-US", { month: "long" })}
                </div>
                <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {item.eventDate ? new Date(item.eventDate).getFullYear() : new Date(item.createdAt).getFullYear()}
                </div>
              </div>

              {/* Content */}
              <div className="w-full">
                <h3 className="font-serif font-bold text-2xl text-[#111] mb-4 group-hover:text-maroon transition-colors duration-300">
                  {item.title}
                </h3>
                <div className="flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gold opacity-60" /> 
                    {new Date(item.createdAt).toLocaleDateString("en-US", { weekday: "long" })}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gold opacity-60" /> 
                    {item.location || "Jakarta Corporate Office"}
                  </div>
                </div>
                <p className="text-gray-500 text-sm italic leading-relaxed line-clamp-2 opacity-80">{item.excerpt}</p>
              </div>

              {/* Action */}
              <div className="text-right w-full">
                <Link 
                  href={`/news/events/${item.slug}`} 
                  className="bg-maroon text-white font-bold tracking-[0.2em] uppercase text-[11px] py-4 px-8 rounded-sm inline-flex items-center justify-center gap-3 transition-all duration-300 hover:bg-maroon-dark hover:-translate-y-1 w-full md:w-auto shadow-lg"
                >
                  Explore Event <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
