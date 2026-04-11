'use client';

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { upsertClient } from "../../actions";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
  const router = useRouter();

  const fields = [
    { name: "name", label: "Client / Entity Name", type: "text" as const, required: true },
    { name: "logo", label: "Corporate Logo", type: "image" as const },
    { name: "website", label: "Official Website URL", type: "url" as const },
  ];

  const handleSubmit = async (data: any) => {
    await upsertClient(data);
    router.push("/admin/clients");
    router.refresh();
  };

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Register Client" 
        backHref="/admin/clients"
        description="Onboard a new institutional client to the firm's prestigious portfolio."
      />
      
      <AdminForm 
        title="Client Partnership Editor"
        fields={fields} 
        onSubmit={handleSubmit} 
        cancelHref="/admin/clients"
        initialData={{}}
      />
    </div>
  );
}
