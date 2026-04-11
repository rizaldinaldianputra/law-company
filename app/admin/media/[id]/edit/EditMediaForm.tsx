'use client';

import { AdminForm } from "@/components/admin/AdminForm";
import { upsertMedia } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

export function EditMediaForm({ initialData }: { initialData: any }) {
  const fields = [
    { name: "title", label: "Headline / Title", type: "text" as const, required: true },
    { name: "publisher", label: "Media Publisher", type: "text" as const, required: true },
    { name: "url", label: "External Source URL", type: "url" as const },
    { name: "date", label: "Publication Date", type: "datetime" as const },
  ];

  const handleSubmit = async (data: any) => {
    data.append('id', initialData.id);
    await upsertMedia(data);
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

