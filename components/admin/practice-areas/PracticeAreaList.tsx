'use client';

import { AdminTable } from "@/components/admin/AdminTable";
import { deletePracticeArea } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

interface PracticeAreaListProps {
  initialData: any[];
}

export function PracticeAreaList({ initialData }: PracticeAreaListProps) {
  const router = useRouter();

  const columns = [
    {
      header: "Practice Area",
      accessor: "title",
      render: (row: any) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gold/5 flex items-center justify-center text-gold border border-gold/10 text-xl">
            {row.icon || "⚖️"}
          </div>
          <div>
            <div className="font-bold text-gray-900">{row.title}</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">/{row.slug}</div>
          </div>
        </div>
      )
    },
    { 
      header: "Description", 
      accessor: "description",
      render: (row: any) => <div className="max-w-xs line-clamp-1 italic text-gray-500">{row.description}</div>
    },
    { 
      header: "Modified", 
      accessor: "updatedAt",
      render: (row: any) => (
        <span className="text-gray-400 text-xs">
          {new Date(row.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      )
    }
  ];

  const handleDelete = async (id: string | number) => {
    try {
      await deletePracticeArea(id.toString());
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to delete practice area.");
    }
  };

  return (
    <AdminTable 
      columns={columns} 
      data={initialData} 
      editPath="/admin/practice-areas"
      onDelete={handleDelete}
    />
  );
}
