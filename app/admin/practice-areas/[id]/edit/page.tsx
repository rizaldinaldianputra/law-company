import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EditPracticeAreaForm } from "./EditPracticeAreaForm";
import { notFound } from "next/navigation";

export default async function EditPracticeAreaPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const area = await prisma.practiceArea.findUnique({
    where: { id }
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
