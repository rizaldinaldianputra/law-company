import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"
import { ArticleList } from "@/components/admin/articles/ArticleList"

export default async function AdminCareerPage() {
  const jobs = await prisma.article.findMany({
    where: { category: "career" },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div>
      <AdminPageHeader 
        title="Career Opportunities" 
        description="Manage job openings and legal talent recruitment."
        actionLabel="Post New Opening"
        actionHref="/admin/career/new"
      />

      <ArticleList initialData={jobs} basePath="/admin/career" />
    </div>
  )
}
