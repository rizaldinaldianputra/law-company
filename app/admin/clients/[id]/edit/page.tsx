import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EditClientForm } from "./EditClientForm";
import { notFound } from "next/navigation";

export default async function EditClientPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const client = await prisma.client.findUnique({
    where: { id }
  });

  if (!client) {
    notFound();
  }

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Edit Client Profile" 
        backHref="/admin/clients"
        description={`Refining partnership details for: ${client.name}`}
      />
      
      <EditClientForm initialData={client} />
    </div>
  );
}
