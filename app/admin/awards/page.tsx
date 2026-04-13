import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"
import { ArticleList } from "@/components/admin/articles/ArticleList"

export default async function AdminAwardsPage() {
  const awards = await prisma.article.findMany({
    where: { category: "award" },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div>
      <AdminPageHeader 
        title="Awards & Recognition" 
        description="Manage prestigious awards and professional accolades."
        actionLabel="Add New Award"
        actionHref="/admin/awards/new"
      />

      <ArticleList initialData={awards} basePath="/admin/awards" />
    </div>
  )
}
