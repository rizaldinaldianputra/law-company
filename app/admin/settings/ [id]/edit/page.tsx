import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { notFound } from "next/navigation";
import { EditSettingForm } from "./EditSettingForm";

export default async function EditSettingPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const setting = await prisma.setting.findUnique({
    where: { id }
  });

  if (!setting) {
    notFound();
  }

  return (
    <div className="pb-24">
      <AdminPageHeader
        title="Edit Configuration"
        backHref="/admin/settings"
        description={`Updating global value for key: ${setting.key}`}
      />

      <EditSettingForm initialData={setting} />
    </div>
  );
}
