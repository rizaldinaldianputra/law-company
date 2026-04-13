import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EditEventForm } from "./EditEventForm";
import { notFound } from "next/navigation";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const article = await prisma.article.findUnique({
    where: { id: Number(id) }
  });

  if (!article || article.category !== "event") {
    notFound();
  }

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Edit Event" 
        backHref="/admin/events"
        description={`Modify schedule or details for: ${article.title}`}
      />
      
      <EditEventForm initialData={article} />
    </div>
  );
}
