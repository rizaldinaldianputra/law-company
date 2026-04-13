'use client';

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { upsertPracticeArea } from "../../actions";
import { useRouter } from "next/navigation";

export default function NewPracticeAreaPage() {
  const fields = [
    { name: "title", label: "Specialty Title", type: "text" as const, required: true, placeholder: "e.g. Corporate Finance" },
    { name: "tags", label: "Key Expertise Tags", type: "text" as const, placeholder: "e.g. Merger, Acquisition, Funding" },
    { name: "icon", label: "Icon Emoji / Char", type: "emoji" as const },
    { name: "image", label: "Specialty Header Image", type: "image" as const },
    { name: "description", label: "Detailed Description", type: "textarea" as const, required: true, placeholder: "Describe the scope of this practice area..." },
  ];

  const handleSubmit = async (data: FormData) => {
    return await upsertPracticeArea(data);
  };

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Define Specialty" 
        backHref="/admin/practice-areas"
        description="Add a new area of legal expertise to your firm's profile."
      />
      
      <AdminForm 
        title="Specialty Specification Editor"
        fields={fields} 
        onSubmit={handleSubmit} 
        cancelHref="/admin/practice-areas"
        initialData={{ icon: "⚖️" }}
      />
    </div>
  );
}

