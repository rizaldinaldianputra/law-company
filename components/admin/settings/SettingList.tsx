'use client';

import { AdminTable } from "@/components/admin/AdminTable";
import { deleteSetting } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

interface SettingListProps {
  initialData: any[];
}

export function SettingList({ initialData }: SettingListProps) {
  const router = useRouter();

  const columns = [
    {
      header: "Setting Key",
      accessor: "key",
      render: (row: any) => (
        <div className="font-mono text-xs font-bold text-gray-900 bg-gray-50 px-3 py-1.5 rounded border border-gray-100 w-fit">
          {row.key}
        </div>
      )
    },
    { 
      header: "Value", 
      accessor: "value",
      render: (row: any) => <div className="max-w-md truncate text-sm text-gray-600 italic">"{row.value}"</div>
    },
    { 
      header: "Last Updated", 
      accessor: "updatedAt",
      render: (row: any) => (
        <span className="text-gray-400 text-xs">
          {new Date(row.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      )
    }
  ];

  const handleDelete = async (id: string | number) => {
    try {
      await deleteSetting(Number(id));
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to delete setting.");
    }
  };

  return (
    <AdminTable 
      columns={columns} 
      data={initialData} 
      editPath="/admin/settings"
      onDelete={handleDelete}
    />
  );
}
