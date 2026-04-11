'use client';
import { AdminTable } from "@/components/admin/AdminTable";
import { deleteMedia } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { Newspaper } from "lucide-react";

interface MediaListProps {
  initialData: any[];
}

export function MediaList({ initialData }: MediaListProps) {
  const router = useRouter();

  const columns = [
    {
      header: "Media Coverage",
      accessor: "title",
      render: (row: any) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-maroon/5 flex items-center justify-center text-maroon border border-maroon/10">
            <Newspaper className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold text-gray-900 line-clamp-1 max-w-sm">{row.title}</div>
            <div className="text-[10px] uppercase tracking-widest text-gold font-bold">{row.publisher || "Global Media"}</div>
          </div>
        </div>
      )
    },
    { 
      header: "Date", 
      accessor: "date",
      render: (row: any) => (
        <span className="text-gray-500 text-xs">
          {row.date ? new Date(row.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
        </span>
      )
    },
    { 
      header: "Source URL", 
      accessor: "url",
      render: (row: any) => <div className="max-w-[150px] truncate text-xs text-blue-500 font-medium">{row.url}</div>
    }
  ];

  const handleDelete = async (id: string | number) => {
    try {
      await deleteMedia(id.toString());
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to delete media record.");
    }
  };

  return (
    <AdminTable 
      columns={columns} 
      data={initialData} 
      editPath="/admin/media"
      onDelete={handleDelete}
    />
  );
}
