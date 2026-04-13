'use client';

import { AdminForm } from "@/components/admin/AdminForm";
import { upsertArticle } from "@/app/admin/actions";

export function EditResearchForm({ initialData }: { initialData: any }) {
  const fields = [
    { 
      name: "category", 
      label: "Category", 
      type: "select" as const, 
      required: true,
      readOnly: true,
      options: [
        { label: "Legal Research", value: "research" },
      ]
    },
    { name: "title", label: "Research Title", type: "text" as const, required: true },
    { name: "slug", label: "Custom Slug", type: "text" as const, placeholder: "leave-empty-for-auto-generate" },
    { name: "image", label: "Featured Image / Cover", type: "image" as const },
    { name: "authorName", label: "Principal Researcher", type: "text" as const },
    { name: "readingTime", label: "Estimated Reading Time", type: "text" as const },
    { name: "excerpt", label: "Abstract / Summary", type: "textarea" as const, required: true },
    { name: "content", label: "Full Research Content", type: "richtext" as const, required: true },
    { name: "published", label: "Publication Status", type: "boolean" as const },
  ];

  const handleSubmit = async (data: any) => {
    return await upsertArticle(data);
  };

  return (
    <AdminForm 
      title="Research Data"
      fields={fields} 
      onSubmit={handleSubmit} 
      cancelHref="/admin/research"
      initialData={initialData}
    />
  );
}
