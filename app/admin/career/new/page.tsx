'use client';

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { upsertArticle } from "../../actions";
import { useRouter } from "next/navigation";

export default function NewCareerPage() {
  const router = useRouter();

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
    { name: "title", label: "Job Title", type: "text" as const, required: true, placeholder: "e.g. Senior Associate - M&A" },
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
    { name: "location", label: "Office Location", type: "text" as const, placeholder: "e.g. Jakarta, Indonesia" },
    { name: "slug", label: "Custom Slug", type: "text" as const, placeholder: "leave-empty-for-auto-generate" },
    { name: "excerpt", label: "Short Summary", type: "textarea" as const, required: true, placeholder: "A brief punchy intro for the job..." },
    { name: "content", label: "Job Description & Requirements", type: "richtext" as const, required: true, placeholder: "Detailed responsibilities, qualifications, and how to apply..." },
    { name: "published", label: "Accepting Applications", type: "boolean" as const },
  ];

  const handleSubmit = async (data: any) => {
    await upsertArticle(data);
    router.push("/admin/career");
    router.refresh();
  };

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Post New Job Opening" 
        backHref="/admin/career"
        description="Expand the firm's excellence by recruiting top legal talent."
      />
      
      <AdminForm 
        title="Job Specification"
        fields={fields} 
        onSubmit={handleSubmit} 
        cancelHref="/admin/career"
        initialData={{ category: "career", published: true, jobType: "Full-Time", location: "Jakarta" }}
      />
    </div>
  );
}
