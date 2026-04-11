import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export const revalidate = 3600

export default async function PracticeAreaDetail({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const area = await prisma.practiceArea.findUnique({
    where: { slug }
  })

  if (!area) return notFound()

  return (
    <div className="py-20 pt-32">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">{area.title}</h1>
        {area.image && (
          <img src={area.image} alt={area.title} className="w-full h-64 object-cover rounded-xl mb-10" />
        )}
        <div className="prose prose-slate max-w-none text-lg">
          <p>{area.description}</p>
        </div>
      </div>
    </div>
  )
}
