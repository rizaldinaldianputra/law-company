import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EditMediaForm } from "./EditMediaForm";
import { notFound } from "next/navigation";

export default async function EditMediaPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const media = await prisma.media.findUnique({
    where: { id }
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
