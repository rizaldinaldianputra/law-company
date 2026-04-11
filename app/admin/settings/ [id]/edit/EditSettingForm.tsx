'use client';

import { upsertSetting } from "@/app/admin/actions";
import { AdminForm } from "@/components/admin/AdminForm";
import { useRouter } from "next/navigation";

export function EditSettingForm({ initialData }: { initialData: any }) {
  const router = useRouter();

  const fields = [
    { name: "key", label: "Setting Key", type: "text" as const, required: true },
    { name: "value", label: "Setting Value", type: "textarea" as const, required: true },
  ];

  const handleSubmit = async (data: any) => {
    data.append('id', initialData.id);
    await upsertSetting(data);
    router.push("/admin/settings");
    router.refresh();
  };

  return (
    <AdminForm
      title="Configuration Editor"
      fields={fields}
      onSubmit={handleSubmit}
      cancelHref="/admin/settings"
      initialData={initialData}
    />
  );
}
