'use client';

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { upsertArticle } from "../../actions";
import { useRouter } from "next/navigation";

export default function NewEventPage() {
  const router = useRouter();

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
    { name: "title", label: "Event Title", type: "text" as const, required: true, placeholder: "e.g. 2024 Legal Tech Symposium" },
    { name: "eventDate", label: "Event Date & Time", type: "datetime" as const, required: true },
    { name: "location", label: "Location", type: "text" as const, placeholder: "e.g. Jakarta, HQ / Zoom Webinar" },
    { name: "slug", label: "Custom Slug", type: "text" as const, placeholder: "leave-empty-for-auto-generate" },
    { name: "image", label: "Event Banner", type: "image" as const },
    { name: "excerpt", label: "Short Description", type: "textarea" as const, required: true, placeholder: "Brief overview for event list..." },
    { name: "content", label: "Event Details", type: "richtext" as const, required: true, placeholder: "Full agenda, speaker info, etc..." },
    { name: "published", label: "Publication Status", type: "boolean" as const },
  ];

  const handleSubmit = async (data: any) => {
    await upsertArticle(data);
    router.push("/admin/events");
    router.refresh();
  };

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Schedule New Event" 
        backHref="/admin/events"
        description="Add a new webinar, seminar, or workshop to the firm's calendar."
      />
      
      <AdminForm 
        title="Event Details"
        fields={fields} 
        onSubmit={handleSubmit} 
        cancelHref="/admin/events"
        initialData={{ category: "event", published: true }}
      />
    </div>
  );
}
