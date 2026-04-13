'use client';

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { upsertArticle } from "../../actions";
import { useRouter } from "next/navigation";

export default function NewResearchPage() {
  const router = useRouter();

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
    { name: "title", label: "Research Title", type: "text" as const, required: true, placeholder: "e.g. Analysis of Jakarta's New Investment Law" },
    { name: "slug", label: "Custom Slug", type: "text" as const, placeholder: "leave-empty-for-auto-generate" },
    { name: "image", label: "Featured Image / Cover", type: "image" as const },
    { name: "authorName", label: "Principal Researcher", type: "text" as const, placeholder: "e.g. Lead Partner Name" },
    { name: "readingTime", label: "Estimated Reading Time", type: "text" as const, placeholder: "e.g. 15 min read" },
    { name: "excerpt", label: "Abstract / Summary", type: "textarea" as const, required: true, placeholder: "Key findings summary..." },
    { name: "content", label: "Full Research Content", type: "richtext" as const, required: true, placeholder: "Comprehensive legal analysis..." },
    { name: "published", label: "Publication Status", type: "boolean" as const },
  ];

  const handleSubmit = async (data: any) => {
    await upsertArticle(data);
    router.push("/admin/research");
    router.refresh();
  };

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Publish Legal Research" 
        backHref="/admin/research"
        description="Share deep legal insights and scholarly research papers."
      />
      
      <AdminForm 
        title="Research Data"
        fields={fields} 
        onSubmit={handleSubmit} 
        cancelHref="/admin/research"
        initialData={{ category: "research", published: true }}
      />
    </div>
  );
}
