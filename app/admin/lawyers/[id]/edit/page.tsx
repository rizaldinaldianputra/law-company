import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EditLawyerForm } from "./EditLawyerForm";
import { notFound } from "next/navigation";

export default async function EditLawyerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const lawyer = await prisma.lawyer.findUnique({
    where: { id: Number(id) }
  });

  if (!lawyer) {
    notFound();
  }

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Edit Partner Profile" 
        backHref="/admin/lawyers"
        description={`Refining professional details for: ${lawyer.name}`}
      />
      
      <EditLawyerForm initialData={lawyer} />
    </div>
  );
}
