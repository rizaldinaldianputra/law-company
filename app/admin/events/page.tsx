import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"
import { ArticleList } from "@/components/admin/articles/ArticleList"

export default async function AdminEventsPage() {
  const events = await prisma.article.findMany({
    where: { category: "event" },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div>
      <AdminPageHeader 
        title="Events & Seminars" 
        description="Manage webinars, legal seminars, and community events."
        actionLabel="Register New Event"
        actionHref="/admin/events/new"
      />

      <ArticleList initialData={events} basePath="/admin/events" />
    </div>
  )
}
