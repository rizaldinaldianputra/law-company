'use client';

import { AdminForm } from "@/components/admin/AdminForm";
import { upsertArticle } from "@/app/admin/actions";

export function EditEventForm({ initialData }: { initialData: any }) {
  const fields = [
    { 
      name: "category", 
      label: "Category", 
      type: "select" as const, 
      required: true,
      readOnly: true,
      options: [
        { label: "Event & Seminar", value: "event" },
      ]
    },
    { name: "title", label: "Event Title", type: "text" as const, required: true },
    { name: "slug", label: "Custom Slug", type: "text" as const, placeholder: "leave-empty-for-auto-generate" },
    { name: "eventDate", label: "Event Date & Time", type: "datetime" as const, required: true },
    { name: "location", label: "Location", type: "text" as const },
    { name: "image", label: "Event Banner", type: "image" as const },
    { name: "excerpt", label: "Short Description", type: "textarea" as const, required: true },
    { name: "content", label: "Event Details", type: "richtext" as const, required: true },
    { name: "published", label: "Publication Status", type: "boolean" as const },
  ];

  const handleSubmit = async (data: any) => {
    return await upsertArticle(data);
  };

  return (
    <AdminForm 
      title="Event Details"
      fields={fields} 
      onSubmit={handleSubmit} 
      cancelHref="/admin/events"
      initialData={initialData}
    />
  );
}
