import { prisma } from "@/lib/prisma"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"
import { ClientList } from "@/components/admin/clients/ClientList"

export default async function AdminClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div>
      <AdminPageHeader 
        title="Institutional Clients" 
        description="Manage the prestigious companies and legal entities we represent."
        actionLabel="Register Client"
        actionHref="/admin/clients/new"
      />

      <ClientList initialData={clients} />
    </div>
  )
}
