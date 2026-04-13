'use client';

import { AdminForm } from "@/components/admin/AdminForm";
import { upsertArticle } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

export function EditArticleForm({ initialData }: { initialData: any }) {
  const fields = [
    {
      name: "category",
      label: "Category",
      type: "select" as const,
      required: true,
      readOnly: true,
      options: [
        { label: "General Article", value: "article" },
        { label: "Award & Achievement", value: "award" },
        { label: "Event", value: "event" },
        { label: "Legal Research", value: "research" },
        { label: "Career Opportunity", value: "career" },
      ]
    },
    { name: "title", label: "Title", type: "text" as const, required: true },
    { name: "slug", label: "Custom Slug", type: "text" as const, placeholder: "leave-empty-for-auto-generate" },
    { name: "eventDate", label: "Event Date", type: "datetime" as const },
    { name: "location", label: "Location", type: "text" as const },
    {
      name: "jobType",
      label: "Job Type",
      type: "select" as const,
      options: [
        { label: "Full-Time", value: "Full-Time" },
        { label: "Part-Time", value: "Part-Time" },
        { label: "Internship", value: "Internship" },
        { label: "Contract", value: "Contract" },
      ]
    },
    { name: "image", label: "Featured Image", type: "image" as const },
    { name: "authorName", label: "Author/Recipient Name", type: "text" as const },
    { name: "readingTime", label: "Estimated Reading Time", type: "text" as const },
    { name: "excerpt", label: "Excerpt / Summary", type: "textarea" as const, required: true },
    { name: "keyTakeaways", label: "Key Takeaways (Bullet points)", type: "textarea" as const },
    { name: "content", label: "Main Content", type: "richtext" as const, required: true },
    { name: "published", label: "Publication Status", type: "boolean" as const },
  ];

  const handleSubmit = async (data: any) => {
    return await upsertArticle(data);
  };

  return (
    <AdminForm
      title="Article Content Editor"
      fields={fields}
      onSubmit={handleSubmit}
      cancelHref="/admin/articles"
      initialData={initialData}
    />
  );
}

