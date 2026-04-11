import { prisma } from "@/lib/prisma"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"
import { PracticeAreaList } from "@/components/admin/practice-areas/PracticeAreaList"

export default async function AdminPracticeAreasPage() {
  const practiceAreas = await prisma.practiceArea.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div>
      <AdminPageHeader 
        title="Practice Areas" 
        description="Define and manage the legal specialties your firm offers."
        actionLabel="New Specialty"
        actionHref="/admin/practice-areas/new"
      />

      <PracticeAreaList initialData={practiceAreas} />
    </div>
  )
}
