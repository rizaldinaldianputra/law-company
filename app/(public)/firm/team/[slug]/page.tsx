import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Phone, Mail } from "lucide-react"

export const revalidate = 3600

export default async function LawyerDetail({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const lawyer = await prisma.lawyer.findUnique({
    where: { slug }
  })

  if (!lawyer) return notFound()

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-2xl border p-8 md:p-12 shadow-sm grid md:grid-cols-[1fr_2fr] gap-12">
          <div>
            <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden mb-6 filter drop-shadow-md">
              {lawyer.image ? (
                <img src={lawyer.image} alt={lawyer.name} className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
              )}
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{lawyer.name}</h1>
              <p className="text-amber-700 font-semibold text-lg">{lawyer.title}</p>
              
              <div className="pt-6 border-t space-y-4">
                {lawyer.email && (
                  <a href={`mailto:${lawyer.email}`} className="flex items-center text-slate-600 hover:text-slate-900">
                    <Mail className="h-5 w-5 mr-3" /> {lawyer.email}
                  </a>
                )}
                {lawyer.phone && (
                  <a href={`tel:${lawyer.phone}`} className="flex items-center text-slate-600 hover:text-slate-900">
                    <Phone className="h-5 w-5 mr-3" /> {lawyer.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6 border-b pb-4">Biography</h2>
            <div className="prose prose-slate max-w-none">
              {lawyer.bio ? (
                <p className="whitespace-pre-line">{lawyer.bio}</p>
              ) : (
                <p className="text-slate-500 italic">No biography available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
