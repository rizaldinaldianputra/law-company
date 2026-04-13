'use client';

import { AdminForm } from "@/components/admin/AdminForm";
import { upsertArticle } from "@/app/admin/actions";

export function EditCareerForm({ initialData }: { initialData: any }) {
  const fields = [
    { 
      name: "category", 
      label: "Category", 
      type: "select" as const, 
      required: true,
      readOnly: true,
      options: [
        { label: "Career Opportunity", value: "career" },
      ]
    },
    { name: "title", label: "Job Title", type: "text" as const, required: true },
    { name: "slug", label: "Custom Slug", type: "text" as const, placeholder: "leave-empty-for-auto-generate" },
    { 
      name: "jobType", 
      label: "Employment Type", 
      type: "select" as const, 
      required: true,
      options: [
        { label: "Full-Time", value: "Full-Time" },
        { label: "Part-Time", value: "Part-Time" },
        { label: "Internship", value: "Internship" },
        { label: "Contract", value: "Contract" },
      ]
    },
    { name: "location", label: "Office Location", type: "text" as const },
    { name: "excerpt", label: "Short Summary", type: "textarea" as const, required: true },
    { name: "content", label: "Job Description & Requirements", type: "richtext" as const, required: true },
    { name: "published", label: "Accepting Applications", type: "boolean" as const },
  ];

  const handleSubmit = async (data: any) => {
    return await upsertArticle(data);
  };

  return (
    <AdminForm 
      title="Job Specification"
      fields={fields} 
      onSubmit={handleSubmit} 
      cancelHref="/admin/career"
      initialData={initialData}
    />
  );
}
