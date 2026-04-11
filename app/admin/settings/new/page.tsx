'use client';

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { upsertSetting } from "../../actions";
import { useRouter } from "next/navigation";

export default function NewSettingPage() {
  const router = useRouter();

  const fields = [
    { name: "key", label: "Setting Key", type: "text" as const, required: true, placeholder: "e.g. contact_email, hero_title" },
    { name: "value", label: "Setting Value", type: "textarea" as const, required: true, placeholder: "Configuration value..." },
  ];

  const handleSubmit = async (data: any) => {
    await upsertSetting(data);
    router.push("/admin/settings");
    router.refresh();
  };

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="New Configuration" 
        backHref="/admin/settings"
        description="Define a new global site setting."
      />
      
      <AdminForm 
        title="Configuration Editor"
        fields={fields} 
        onSubmit={handleSubmit} 
        cancelHref="/admin/settings"
        initialData={{}}
      />
    </div>
  );
}
