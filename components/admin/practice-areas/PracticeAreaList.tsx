'use client';

import { AdminTable } from "@/components/admin/AdminTable";
import { deletePracticeArea } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface PracticeAreaListProps {
  initialData: any[];
}

export function PracticeAreaList({ initialData }: PracticeAreaListProps) {
  const router = useRouter();

  const columns = [
    {
      header: "Visual",
      accessor: "image",
      render: (row: any) => (
        <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0 relative">
          {row.image ? (
            <img src={row.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-200 bg-gray-50">
              <span className="text-xl opacity-30">{row.icon || "⚖️"}</span>
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-md bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[10px] z-10">
            {row.icon || "⚖️"}
          </div>
        </div>
      )
    },
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
    const t = toast.loading("Deleting record...");
    try {
      await deletePracticeArea(Number(id));
      toast.success("Deleted successfully!", { id: t });
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete practice area.", { id: t });
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
