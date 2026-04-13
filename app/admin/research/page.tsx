import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"
import { ArticleList } from "@/components/admin/articles/ArticleList"

export default async function AdminResearchPage() {
  const research = await prisma.article.findMany({
    where: { category: "research" },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div>
      <AdminPageHeader 
        title="Legal Research" 
        description="Manage in-depth legal analysis and research papers."
        actionLabel="Publish Research"
        actionHref="/admin/research/new"
      />

      <ArticleList initialData={research} basePath="/admin/research" />
    </div>
  )
}
