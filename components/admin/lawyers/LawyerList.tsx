'use client';

import { AdminTable } from "@/components/admin/AdminTable";
import { deleteLawyer } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LawyerListProps {
  initialData: any[];
}

export function LawyerList({ initialData }: LawyerListProps) {
  const router = useRouter();

  const columns = [
    {
      header: "Lawyer",
      accessor: "name",
      render: (row: any) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
            {row.image ? (
              <img src={row.image} alt={row.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 font-serif">
                {row.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="font-bold text-gray-900">{row.name}</div>
            <div className="text-[10px] uppercase tracking-widest text-gold font-bold">{row.title}</div>
          </div>
        </div>
      )
    },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    {
      header: "Added",
      accessor: "createdAt",
      render: (row: any) => new Date(row.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }
  ];

  const handleDelete = async (id: string | number) => {
    const t = toast.loading("Deleting profile...");
    try {
      await deleteLawyer(Number(id));
      toast.success("Deleted successfully!", { id: t });
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete lawyer profile.", { id: t });
    }
  };

  return (
    <AdminTable
      columns={columns}
      data={initialData}
      editPath="/admin/lawyers"
      viewPath="/lawyers"
      onDelete={handleDelete}
    />
  );
}
