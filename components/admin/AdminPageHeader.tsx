import Link from "next/link";
import { Plus, ChevronLeft } from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  backHref?: string;
}

export function AdminPageHeader({
  title,
  description,
  actionLabel,
  actionHref,
  backHref,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div className="space-y-2">
        {backHref && (
          <Link 
            href={backHref}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-maroon transition-colors mb-2"
          >
            <ChevronLeft className="h-3 w-3" /> Back to List
          </Link>
        )}
        <h1 className="text-4xl font-serif font-bold text-gray-900 tracking-tight">{title}</h1>
        {description && <p className="text-gray-500 text-sm italic opacity-80">{description}</p>}
      </div>

      {actionLabel && actionHref && (
        <Link 
          href={actionHref}
          className="bg-maroon text-white font-bold tracking-[0.1em] uppercase text-[11px] py-4 px-8 rounded-sm inline-flex items-center gap-3 transition-all duration-300 hover:bg-maroon-dark hover:-translate-y-1 hover:shadow-2xl hover:shadow-maroon/20 shadow-lg"
        >
          <Plus className="h-4 w-4" /> {actionLabel}
        </Link>
      )}
    </div>
  );
}
