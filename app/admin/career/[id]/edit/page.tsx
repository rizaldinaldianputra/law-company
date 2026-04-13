import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EditCareerForm } from "./EditCareerForm";
import { notFound } from "next/navigation";

export default async function EditCareerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const article = await prisma.article.findUnique({
    where: { id: Number(id) }
  });

  if (!article || article.category !== "career") {
    notFound();
  }

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Edit Job Opening" 
        backHref="/admin/career"
        description={`Modify requirements for: ${article.title}`}
      />
      
      <EditCareerForm initialData={article} />
    </div>
  );
}
