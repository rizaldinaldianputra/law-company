'use client';

import { AdminForm } from "@/components/admin/AdminForm";
import { upsertPracticeArea } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

export function EditPracticeAreaForm({ initialData }: { initialData: any }) {
  const router = useRouter();

  const fields = [
    { name: "title", label: "Specialty Title", type: "text" as const, required: true },
    { name: "slug", label: "Custom URL Slug", type: "text" as const },
    { name: "tags", label: "Key Expertise Tags", type: "text" as const },
    { name: "icon", label: "Icon Emoji / Char", type: "text" as const },
    { name: "image", label: "Specialty Header Image", type: "image" as const },
    { name: "description", label: "Detailed Description", type: "textarea" as const, required: true },
  ];

  const handleSubmit = async (data: any) => {
    data.append('id', initialData.id);
    await upsertPracticeArea(data);
    router.push("/admin/practice-areas");
    router.refresh();
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
