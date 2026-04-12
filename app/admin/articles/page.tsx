import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"
import { ArticleList } from "@/components/admin/articles/ArticleList"

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div>
      <AdminPageHeader 
        title="Articles & Insights" 
        description="Manage your publications, awards, and firm news."
        actionLabel="Create New Post"
        actionHref="/admin/articles/new"
      />

      <ArticleList initialData={articles} />
    </div>
  )
}

