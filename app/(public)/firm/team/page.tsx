import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"
import Link from "next/link"

export const revalidate = 3600

export default async function LawyersPage() {
  const lawyers = await prisma.lawyer.findMany({
    orderBy: { createdAt: "asc" }
  })

  return (
    <div className="py-20 pt-32 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8 border-b pb-4">Our Legal Team</h1>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {lawyers.length === 0 && <p className="text-slate-500">No lawyers added yet.</p>}
          {lawyers.map((lawyer) => (
            <Link href={`/firm/team/${lawyer.slug}`} key={lawyer.id} className="group bg-white border rounded-xl overflow-hidden hover:shadow-md transition flex flex-col">
              <div className="h-64 bg-slate-200 flex items-center justify-center relative">
                {/* Normally an `img` tag here */}
                {lawyer.image ? (
                  <img src={lawyer.image} alt={lawyer.name} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-slate-400 text-sm">No Image</span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold group-hover:text-amber-600 transition-colors">{lawyer.name}</h3>
                <p className="text-amber-700 text-sm font-medium mb-3">{lawyer.title}</p>
                <span className="text-sm font-medium underline text-slate-900 mt-auto block">View Profile &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
