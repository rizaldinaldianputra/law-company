import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EditAwardForm } from "./EditAwardForm";
import { notFound } from "next/navigation";

export default async function EditAwardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const article = await prisma.article.findUnique({
    where: { id: Number(id) }
  });

  if (!article || article.category !== "award") {
    notFound();
  }

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Edit Award" 
        backHref="/admin/awards"
        description={`Update details for: ${article.title}`}
      />
      
      <EditAwardForm initialData={article} />
    </div>
  );
}
