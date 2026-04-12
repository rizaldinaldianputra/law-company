import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"
import { SettingList } from "@/components/admin/settings/SettingList"

export default async function AdminSettingsPage() {
  const settings = await prisma.setting.findMany({
    orderBy: { key: "asc" }
  })

  return (
    <div>
      <AdminPageHeader 
        title="Site Settings" 
        description="Global configurations for headers, contact info, and legal disclaimers."
        actionLabel="Add Setting"
        actionHref="/admin/settings/new"
      />

      <SettingList initialData={settings} />
    </div>
  )
}
