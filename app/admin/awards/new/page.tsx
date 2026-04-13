'use client';

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { upsertArticle } from "../../actions";
import { useRouter } from "next/navigation";

export default function NewAwardPage() {
  const router = useRouter();

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
    { name: "title", label: "Award Title", type: "text" as const, required: true, placeholder: "e.g. Chambers Asia Pacific Tier 1" },
    { name: "slug", label: "Custom Slug", type: "text" as const, placeholder: "leave-empty-for-auto-generate" },
    { name: "image", label: "Award Badge / Image", type: "image" as const },
    { name: "authorName", label: "Recipient Name", type: "text" as const, placeholder: "e.g. Firm Wide or Lawyer Name" },
    { name: "excerpt", label: "Summary", type: "textarea" as const, required: true, placeholder: "Short description of the award..." },
    { name: "content", label: "Full Details", type: "richtext" as const, required: true, placeholder: "Detailed story about the recognition..." },
    { name: "published", label: "Display on Site", type: "boolean" as const },
  ];

  const handleSubmit = async (data: any) => {
    await upsertArticle(data);
    router.push("/admin/awards");
    router.refresh();
  };

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Add New Award" 
        backHref="/admin/awards"
        description="List a new professional achievement or firm recognition."
      />
      
      <AdminForm 
        title="Award Information"
        fields={fields} 
        onSubmit={handleSubmit} 
        cancelHref="/admin/awards"
        initialData={{ category: "award", published: true }}
      />
    </div>
  );
}
