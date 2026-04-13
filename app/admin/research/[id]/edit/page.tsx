import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EditResearchForm } from "./EditResearchForm";
import { notFound } from "next/navigation";

export default async function EditResearchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const article = await prisma.article.findUnique({
    where: { id: Number(id) }
  });

  if (!article || article.category !== "research") {
    notFound();
  }

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Edit Legal Research" 
        backHref="/admin/research"
        description={`Modify findings or details for: ${article.title}`}
      />
      
      <EditResearchForm initialData={article} />
    </div>
  );
}
