'use client';

import { AdminTable } from "@/components/admin/AdminTable";
import { deleteArticle } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { FileText, Award, Calendar, BookOpen, Briefcase } from "lucide-react";
import { toast } from "react-hot-toast";

interface ArticleListProps {
  initialData: any[];
  basePath?: string;
}

const categoryIcons: Record<string, any> = {
  article: FileText,
  award: Award,
  event: Calendar,
  research: BookOpen,
  career: Briefcase,
};

export function ArticleList({ initialData, basePath = "/admin/articles" }: ArticleListProps) {
  const router = useRouter();

  const columns = [
    {
      header: "Media",
      accessor: "image",
      render: (row: any) => (
        <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
          {row.image ? (
            <img src={row.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <FileText className="h-5 w-5" />
            </div>
          )}
        </div>
      )
    },
    {
      header: "Category",
      accessor: "category",
      render: (row: any) => {
        const Icon = categoryIcons[row.category] || FileText;
        return (
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold bg-gold/5 px-3 py-1.5 rounded-full border border-gold/10 w-fit">
            <Icon className="h-3 w-3" /> {row.category}
          </div>
        );
      }
    },
    {
      header: "Title",
      accessor: "title",
      render: (row: any) => (
        <div className="max-w-md">
          <div className="font-bold text-gray-900 line-clamp-1">{row.title}</div>
          <div className="text-[10px] text-gray-400 mt-1 font-mono">{row.slug}</div>
        </div>
      )
    },
    {
      header: "Status",
      accessor: "published",
      render: (row: any) => (
        <div className={`text-[10px] font-bold px-2.5 py-1 rounded-sm w-fit ${row.published ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
          {row.published ? 'PUBLISHED' : 'DRAFT'}
        </div>
      )
    },
    {
      header: "Date",
      accessor: "createdAt",
      render: (row: any) => (
        <span className="text-gray-500 text-xs">
          {new Date(row.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      )
    }
  ];

  const handleDelete = async (id: string | number) => {
    const t = toast.loading("Deleting record...");
    try {
      await deleteArticle(Number(id));
      toast.success("Deleted successfully!", { id: t });
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete article.", { id: t });
    }
  };

  return (
    <AdminTable
      columns={columns}
      data={initialData}
      editPath={basePath}
      detailPath={basePath}
      onDelete={handleDelete}
    />
  );
}
