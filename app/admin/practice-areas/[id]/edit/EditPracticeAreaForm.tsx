'use client';

import { AdminForm } from "@/components/admin/AdminForm";
import { upsertPracticeArea } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

export function EditPracticeAreaForm({ initialData }: { initialData: any }) {
  const fields = [
    { name: "title", label: "Specialty Title", type: "text" as const, required: true },
    { name: "tags", label: "Key Expertise Tags", type: "text" as const },
    { name: "icon", label: "Icon Emoji / Char", type: "emoji" as const },
    { name: "image", label: "Specialty Header Image", type: "image" as const },
    { name: "description", label: "Detailed Description", type: "textarea" as const, required: true },
  ];

  const handleSubmit = async (data: any) => {
    return await upsertPracticeArea(data);
  };

  return (
    <AdminForm
      title="Specialty Specification Editor"
      fields={fields}
      onSubmit={handleSubmit}
      cancelHref="/admin/practice-areas"
      initialData={initialData}
    />
  );
}

