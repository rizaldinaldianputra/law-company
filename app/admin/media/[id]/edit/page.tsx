import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EditMediaForm } from "./EditMediaForm";
import { notFound } from "next/navigation";

export default async function EditMediaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const media = await prisma.media.findUnique({
    where: { id: Number(id) }
  });

  if (!media) {
    notFound();
  }

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Edit Media Entry" 
        backHref="/admin/media"
        description={`Modifying record for: ${media.title}`}
      />
      
      <EditMediaForm initialData={{
        ...media,
        date: media.date ? media.date.toISOString().split('T')[0] : ""
      }} />
    </div>
  );
}
