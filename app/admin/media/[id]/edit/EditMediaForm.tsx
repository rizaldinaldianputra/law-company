'use client';

import { AdminForm } from "@/components/admin/AdminForm";
import { upsertMedia } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

export function EditMediaForm({ initialData }: { initialData: any }) {
  const router = useRouter();

  const fields = [
    { name: "title", label: "Headline / Title", type: "text" as const, required: true },
    { name: "publisher", label: "Media Publisher", type: "text" as const, required: true },
    { name: "url", label: "External Source URL", type: "url" as const, required: true },
    { name: "date", label: "Publication Date", type: "text" as const, placeholder: "YYYY-MM-DD" },
  ];

  const handleSubmit = async (data: any) => {
    data.append('id', initialData.id);
    await upsertMedia(data);
    router.push("/admin/media");
    router.refresh();
  };

  return (
    <AdminForm
      title="Media Entry Editor"
      fields={fields}
      onSubmit={handleSubmit}
      cancelHref="/admin/media"
      initialData={initialData}
    />
  );
}
