'use client';

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { upsertLawyer } from "../../actions";
import { useRouter } from "next/navigation";

export default function NewLawyerPage() {
  const fields = [
    { name: "name", label: "Full Name", type: "text" as const, required: true },
    { name: "title", label: "Professional Title", type: "text" as const, required: true, placeholder: "e.g. Senior Partner, Managing Director" },
    { name: "image", label: "Profile Photo", type: "image" as const },
    { name: "email", label: "Email Address", type: "text" as const },
    { name: "phone", label: "Direct Phone", type: "text" as const },
    { name: "education", label: "Educational Background", type: "textarea" as const, placeholder: "e.g. Harvard Law..." },
    { name: "expertise", label: "Expertise (Keywords)", type: "text" as const, placeholder: "e.g. Corporate, M&A, Litigations" },
    { name: "languages", label: "Languages Spoken", type: "text" as const, placeholder: "e.g. English, Indonesian" },
    { name: "socialLinks", label: "Social Media (LinkedIn/Web)", type: "text" as const, placeholder: "LinkedIn Profile URL..." },
    { name: "bio", label: "Professional Biography", type: "textarea" as const, placeholder: "Detailed professional history..." },
  ];

  const handleSubmit = async (data: FormData) => {
    return await upsertLawyer(data);
  };

  return (
    <div className="pb-24">
      <AdminPageHeader 
        title="Add Global Partner" 
        backHref="/admin/lawyers"
        description="Register a new legal professional to the firm's roster."
      />
      
      <AdminForm 
        title="Professional Profile Editor"
        fields={fields} 
        onSubmit={handleSubmit} 
        cancelHref="/admin/lawyers"
        initialData={{}}
      />
    </div>
  );
}

