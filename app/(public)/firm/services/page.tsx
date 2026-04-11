import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const revalidate = 3600

export default async function PracticeAreasPage() {
  const practiceAreas = await prisma.practiceArea.findMany({
    orderBy: { title: "asc" }
  })

  return (
    <div className="py-20 pt-32">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8 border-b pb-4">Our Practice Areas</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.length === 0 && <p className="text-slate-500">No practice areas added yet.</p>}
          {practiceAreas.map((area) => (
            <Link href={`/firm/services/${area.slug}`} key={area.id} className="group flex flex-col justify-between block h-full bg-white border p-6 rounded-xl hover:shadow-md transition">
              <div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-600 transition-colors">{area.title}</h3>
                <p className="text-slate-600 line-clamp-3 mb-4">{area.description}</p>
              </div>
              <span className="text-sm font-medium underline text-slate-900">Read More &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
