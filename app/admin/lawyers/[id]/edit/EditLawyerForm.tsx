'use client';

import { upsertLawyer } from "@/app/admin/actions";
import { AdminForm } from "@/components/admin/AdminForm";
import { useRouter } from "next/navigation";

export function EditLawyerForm({ initialData }: { initialData: any }) {
  const router = useRouter();

  const fields = [
    { name: "name", label: "Full Name", type: "text" as const, required: true },
    { name: "title", label: "Professional Title", type: "text" as const, required: true },
    { name: "image", label: "Profile Photo", type: "image" as const },
    { name: "email", label: "Email Address", type: "text" as const },
    { name: "phone", label: "Direct Phone", type: "text" as const },
    { name: "education", label: "Educational Background", type: "textarea" as const },
    { name: "expertise", label: "Expertise (Keywords)", type: "text" as const },
    { name: "languages", label: "Languages Spoken", type: "text" as const },
    { name: "socialLinks", label: "Social Media (LinkedIn/Web)", type: "text" as const },
    { name: "slug", label: "Custom URL Slug", type: "text" as const },
    { name: "bio", label: "Professional Biography", type: "textarea" as const },
  ];

  const handleSubmit = async (data: any) => {
    data.append('id', initialData.id);
    await upsertLawyer(data);
    router.push("/admin/lawyers");
    router.refresh();
  };

  return (
    <AdminForm
      title="Lawyer Profile Editor"
      fields={fields}
      onSubmit={handleSubmit}
      cancelHref="/admin/lawyers"
      initialData={initialData}
    />
  );
}
