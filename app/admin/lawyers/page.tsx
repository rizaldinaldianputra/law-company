import { prisma } from "@/lib/prisma"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"
import { LawyerList } from "@/components/admin/lawyers/LawyerList"

export default async function AdminLawyersPage() {
  const lawyers = await prisma.lawyer.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div>
      <AdminPageHeader 
        title="Lawyers" 
        description="Manage your professional legal team profiles."
        actionLabel="Add New Lawyer"
        actionHref="/admin/lawyers/new"
      />

      <LawyerList initialData={lawyers} />
    </div>
  )
}

