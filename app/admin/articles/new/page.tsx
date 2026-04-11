'use client';

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { upsertArticle } from "../../actions";
import { useRouter } from "next/navigation";

export default function NewArticlePage() {
  const router = useRouter();

  const fields = [
    { 
      name: "category", 
      label: "Category", 
      type: "select" as const, 
      required: true,
      options: [
        { label: "General Article", value: "article" },
        { label: "Award & Achievement", value: "award" },
        { label: "Event", value: "event" },
        { label: "Legal Research", value: "research" },
        { label: "Career Opportunity", value: "career" },
      ]
    },
    { name: "title", label: "Title", type: "text" as const, required: true, placeholder: "Enter the headline..." },
    { name: "slug", label: "Custom Slug", type: "text" as const, placeholder: "leave-empty-for-auto-generate" },
    { name: "image", label: "Featured Image", type: "image" as const },
    { name: "authorName", label: "Author Name", type: "text" as const, placeholder: "e.g. Senior Partner Name" },
    { name: "readingTime", label: "Estimated Reading Time", type: "text" as const, placeholder: "e.g. 5 min read" },
    { name: "excerpt", label: "Excerpt / Summary", type: "textarea" as const, required: true, placeholder: "Brief overview for cards..." },
    { name: "keyTakeaways", label: "Key Takeaways (Bullet points)", type: "textarea" as const, placeholder: "Major points to highlight..." },
    { name: "content", label: "Main Content (Markdown/HTML Supported)", type: "textarea" as const, required: true, placeholder: "Detailed content goes here..." },
    { name: "published", label: "Publication Status", type: "boolean" as const },
  ];

  const handleSubmit = async (data: any) => {
    await upsertArticle(data);
    router.push("/admin/articles");
    router.refresh();
  };

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Compose New Article" 
        backHref="/admin/articles"
        description="Create a new post for the firm's news and insights portal."
      />
      
      <AdminForm 
        title="Article Content Editor"
        fields={fields} 
        onSubmit={handleSubmit} 
        cancelHref="/admin/articles"
        initialData={{ category: "article", published: true }}
      />
    </div>
  );
}
