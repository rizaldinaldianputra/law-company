import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EditPracticeAreaForm } from "./EditPracticeAreaForm";
import { notFound } from "next/navigation";

export default async function EditPracticeAreaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const area = await prisma.practiceArea.findUnique({
    where: { id: Number(id) }
  });

  if (!area) {
    notFound();
  }

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Edit Specialty" 
        backHref="/admin/practice-areas"
        description={`Modifying scope and details for: ${area.title}`}
      />
      
      <EditPracticeAreaForm initialData={area} />
    </div>
  );
}
