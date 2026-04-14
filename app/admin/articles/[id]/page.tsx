import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  MapPin, 
  Briefcase, 
  Edit, 
  FileText,
  Award,
  BookOpen,
  Globe
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const categoryIcons: Record<string, any> = {
  article: FileText,
  award: Award,
  event: Calendar,
  research: BookOpen,
  career: Briefcase,
};

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const article = await prisma.article.findUnique({
    where: { id: Number(id) }
  });

  if (!article) {
    notFound();
  }

  const Icon = categoryIcons[article.category] || FileText;

  return (
    <div className="pb-24 max-w-6xl mx-auto">
      <AdminPageHeader 
        title="Article Insight" 
        backHref="/admin/articles"
        description="Detailed review of administrative metadata and content."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-10">
          {/* Header Card */}
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-gold/10 text-gold border border-gold/10 flex items-center gap-2">
                <Icon size={12} /> {article.category}
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border ${
                article.published 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                  : 'bg-gray-50 text-gray-500 border-gray-200'
              }`}>
                {article.published ? 'Published' : 'Draft'}
              </div>
            </div>

            <h1 className="text-4xl font-serif font-bold text-gray-900 leading-tight mb-8">
              {article.title}
            </h1>

            {article.image && (
              <div className="aspect-video rounded-2xl overflow-hidden mb-10 border border-gray-100 shadow-inner">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="prose prose-slate max-w-none">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                <FileText size={14} className="text-gold" /> Article Body Content
              </div>
              <div 
                className="text-gray-700 leading-relaxed text-lg font-light"
                dangerouslySetInnerHTML={{ __html: article.content }} 
              />
            </div>
            
            {article.excerpt && (
              <div className="mt-12 pt-8 border-t border-gray-50">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Excerpt / Summary</div>
                <p className="text-gray-500 italic leading-relaxed">{article.excerpt}</p>
              </div>
            )}
          </div>

          {/* Key Takeaways Card */}
          {article.keyTakeaways && (
            <div className="bg-[#0A0A0A] rounded-[32px] p-10 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -mr-32 -mt-32 blur-3xl" />
               <div className="relative">
                  <div className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <Tag size={12} /> Key Highlights
                  </div>
                  <div className="space-y-4">
                    {article.keyTakeaways.split('\n').map((point, index) => (
                      point.trim() && (
                        <div key={index} className="flex gap-4 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                          <p className="text-gray-300 font-medium leading-relaxed">{point}</p>
                        </div>
                      )
                    ))}
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-10">
          {/* Metadata Card */}
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-10 space-y-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-gray-50 pb-4">
              Metadata & Info
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <User size={18} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Author</div>
                  <div className="text-sm font-bold text-gray-900">{article.authorName || 'Staff Member'}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <Clock size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Reading Time</div>
                  <div className="text-sm font-bold text-gray-900">{article.readingTime || '5 min read'}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <Globe size={18} />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Slug Path</div>
                  <div className="text-xs font-mono font-bold text-maroon truncate" title={article.slug}>{article.slug}</div>
                </div>
              </div>
            </div>

            {/* Category Specific Info */}
            {(article.eventDate || article.location || article.jobType) && (
              <div className="pt-6 space-y-6 border-t border-gray-50">
                {article.eventDate && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Event Date</div>
                      <div className="text-sm font-bold text-gray-900">
                        {new Date(article.eventDate).toLocaleDateString('en-US', { dateStyle: 'long' })}
                      </div>
                    </div>
                  </div>
                )}
                {article.location && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Location</div>
                      <div className="text-sm font-bold text-gray-900">{article.location}</div>
                    </div>
                  </div>
                )}
                {article.jobType && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Job Type</div>
                      <div className="text-sm font-bold text-gray-900">{article.jobType}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Timestamps Card */}
          <div className="bg-gray-50 rounded-[32px] border border-gray-200 p-8 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <span>Created</span>
              <span className="text-gray-900 font-mono italic">{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <span>Last Update</span>
              <span className="text-gray-900 font-mono italic">{new Date(article.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-4">
            <Link
              href={`/admin/articles/${article.id}/edit`}
              className="bg-gold text-black font-bold tracking-[0.2em] uppercase text-[10px] py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#0A0A0A] hover:text-white shadow-xl hover:-translate-y-1"
            >
              <Edit size={16} /> Edit Publication
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
