'use client';

import { AdminTable } from "@/components/admin/AdminTable";
import { deleteClient } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

interface ClientListProps {
  initialData: any[];
}

export function ClientList({ initialData }: ClientListProps) {
  const router = useRouter();

  const columns = [
    {
      header: "Client Name",
      accessor: "name",
      render: (row: any) => (
        <div className="flex items-center gap-6">
          <div className="w-16 h-12 rounded-xl bg-white border border-gray-100 p-2 flex items-center justify-center overflow-hidden">
            {row.logo ? (
              <img src={row.logo} alt={row.name} className="max-w-full max-h-full object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
            ) : (
              <div className="text-[10px] font-bold text-gray-300">NO LOGO</div>
            )}
          </div>
          <div className="font-bold text-gray-900">{row.name}</div>
        </div>
      )
    },
    { 
      header: "Website", 
      accessor: "website",
      render: (row: any) => <div className="text-xs text-blue-500 font-medium underline decoration-blue-100">{row.website || "-"}</div>
    },
    { 
      header: "Partnership Start", 
      accessor: "createdAt",
      render: (row: any) => (
        <span className="text-gray-400 text-xs">
          {new Date(row.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
        </span>
      )
    }
  ];

  const handleDelete = async (id: string | number) => {
    try {
      await deleteClient(Number(id));
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to delete client record.");
    }
  };

  return (
    <AdminTable 
      columns={columns} 
      data={initialData} 
      editPath="/admin/clients"
      onDelete={handleDelete}
    />
  );
}
