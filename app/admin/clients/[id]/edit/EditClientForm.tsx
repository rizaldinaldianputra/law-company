'use client';

import { AdminForm } from "@/components/admin/AdminForm";
import { upsertClient } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

export function EditClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();

  const fields = [
    { name: "name", label: "Client / Entity Name", type: "text" as const, required: true },
    { name: "logo", label: "Corporate Logo", type: "image" as const },
    { name: "website", label: "Official Website URL", type: "url" as const },
  ];

  const handleSubmit = async (data: any) => {
    data.append('id', initialData.id);
    await upsertClient(data);
    router.push("/admin/clients");
    router.refresh();
  };

  return (
    <AdminForm
      title="Client Partnership Editor"
      fields={fields}
      onSubmit={handleSubmit}
      cancelHref="/admin/clients"
      initialData={initialData}
    />
  );
}
