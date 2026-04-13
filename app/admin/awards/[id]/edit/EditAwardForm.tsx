'use client';

import { AdminForm } from "@/components/admin/AdminForm";
import { upsertArticle } from "@/app/admin/actions";

export function EditAwardForm({ initialData }: { initialData: any }) {
  const fields = [
    { 
      name: "category", 
      label: "Category", 
      type: "select" as const, 
      required: true,
      readOnly: true,
      options: [
        { label: "Award & Achievement", value: "award" },
      ]
    },
    { name: "title", label: "Award Title", type: "text" as const, required: true },
    { name: "slug", label: "Custom Slug", type: "text" as const, placeholder: "leave-empty-for-auto-generate" },
    { name: "image", label: "Award Badge / Image", type: "image" as const },
    { name: "authorName", label: "Recipient Name", type: "text" as const },
    { name: "excerpt", label: "Summary", type: "textarea" as const, required: true },
    { name: "content", label: "Full Details", type: "richtext" as const, required: true },
    { name: "published", label: "Display on Site", type: "boolean" as const },
  ];

  const handleSubmit = async (data: any) => {
    return await upsertArticle(data);
  };

  return (
    <AdminForm 
      title="Award Information"
      fields={fields} 
      onSubmit={handleSubmit} 
      cancelHref="/admin/awards"
      initialData={initialData}
    />
  );
}
