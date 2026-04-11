'use client';

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { upsertMedia } from "../../actions";
import { useRouter } from "next/navigation";

export default function NewMediaPage() {
  const router = useRouter();

  const fields = [
    { name: "title", label: "Headline / Title", type: "text" as const, required: true },
    { name: "publisher", label: "Media Publisher", type: "text" as const, required: true, placeholder: "e.g. Forbes, Bloomberg, Reuters" },
    { name: "url", label: "External Source URL", type: "url" as const, required: true },
    { name: "date", label: "Publication Date", type: "text" as const, placeholder: "YYYY-MM-DD" },
  ];

  const handleSubmit = async (data: any) => {
    await upsertMedia(data);
    router.push("/admin/media");
    router.refresh();
  };

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Log Media Coverage" 
        backHref="/admin/media"
        description="Add a new press mention or media appearance."
      />
      
      <AdminForm 
        title="Media Entry Editor"
        fields={fields} 
        onSubmit={handleSubmit} 
        cancelHref="/admin/media"
        initialData={{}}
      />
    </div>
  );
}
