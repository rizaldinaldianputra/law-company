import { prisma } from "@/lib/prisma"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"
import { MediaList } from "@/components/admin/media/MediaList"

export default async function AdminMediaPage() {
  const media = await prisma.media.findMany({
    orderBy: { date: "desc" }
  })

  return (
    <div>
      <AdminPageHeader 
        title="Media & Press" 
        description="Curate the firm's appearances and mentions in global media."
        actionLabel="Log Coverage"
        actionHref="/admin/media/new"
      />

      <MediaList initialData={media} />
    </div>
  )
}
