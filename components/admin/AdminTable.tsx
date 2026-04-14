'use client';
import { Edit, Trash2, Eye, FileText } from "lucide-react";
import Link from "next/link";

interface Column {
  header: string;
  accessor: string;
  render?: (row: any) => React.ReactNode;
}

interface AdminTableProps {
  columns: Column[];
  data: any[];
  onDelete?: (id: string | number) => void;
  editPath?: string; // /admin/lawyers
  detailPath?: string; // /admin/articles
  viewPath?: string; // /lawyers
}

export function AdminTable({ columns, data, onDelete, editPath, detailPath, viewPath }: AdminTableProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#F9FAFB] border-b border-gray-100">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {col.header}
                </th>
              ))}
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-8 py-16 text-center">
                  <div className="text-gray-400 italic text-sm">No records found.</div>
                </td>
              </tr>
            )}
            {data.map((row, i) => (
              <tr key={row.id || i} className="hover:bg-[#FDFDFD] transition-colors group">
                {columns.map((col, j) => (
                  <td key={j} className="px-8 py-6 text-sm text-gray-700">
                    {col.render ? col.render(row) : row[col.accessor] || "-"}
                  </td>
                ))}
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end items-center gap-3">
                    {detailPath && (
                      <Link 
                        href={`${detailPath}/${row.id}`} 
                        className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:text-black hover:bg-black/5 transition-all"
                        title="View details"
                      >
                        <FileText className="h-4 w-4" />
                      </Link>
                    )}
                    {viewPath && (
                      <Link 
                        href={`${viewPath}/${row.slug || row.id}`} 
                        target="_blank"
                        className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:text-maroon hover:bg-maroon/5 transition-all"
                        title="View on site"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    )}
                    {editPath && (
                      <Link 
                        href={`${editPath}/${row.id}/edit`} 
                        className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:text-gold hover:bg-gold/5 transition-all"
                        title="Edit record"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                    )}
                    {onDelete && (
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (window.confirm('Delete this record?')) {
                            onDelete(row.id);
                          }
                        }}
                        className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-500/5 transition-all"
                        title="Delete record"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
