import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"
import {
  Users,
  FileText,
  Scale,
  Globe,
  Newspaper,
  Settings,
  ArrowRight,
  TrendingUp
} from "lucide-react"

export default async function AdminDashboardPage() {
  const lawyerCount = await prisma.lawyer.count()
  const articleCount = await prisma.article.count()
  const practiceAreaCount = await prisma.practiceArea.count()
  const clientCount = await prisma.client.count()
  const mediaCount = await prisma.media.count()
  const settingCount = await prisma.setting.count()

  const stats = [
    {
      label: "Lawyers",
      value: lawyerCount,
      icon: Users,
      href: "/admin/lawyers",
      color: "text-maroon",
      gradient: "from-maroon/20 to-transparent"
    },
    {
      label: "Insights",
      value: articleCount,
      icon: FileText,
      href: "/admin/articles",
      color: "text-gold",
      gradient: "from-gold/20 to-transparent"
    },
    {
      label: "Specialties",
      value: practiceAreaCount,
      icon: Scale,
      href: "/admin/practice-areas",
      color: "text-gray-900",
      gradient: "from-gray-300/30 to-transparent"
    },
    {
      label: "Clients",
      value: clientCount,
      icon: Globe,
      href: "/admin/clients",
      color: "text-maroon",
      gradient: "from-maroon/20 to-transparent"
    },
    {
      label: "Media",
      value: mediaCount,
      icon: Newspaper,
      href: "/admin/media",
      color: "text-gold",
      gradient: "from-gold/20 to-transparent"
    },
    {
      label: "Settings",
      value: settingCount,
      icon: Settings,
      href: "/admin/settings",
      color: "text-gray-900",
      gradient: "from-gray-300/30 to-transparent"
    }
  ]

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-[32px] p-10 bg-gradient-to-br from-black via-[#1a0a0a] to-black text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,#800000,transparent)]" />

        <div className="relative z-10">
          <h1 className="text-4xl font-serif font-bold mb-2">
            Command Center
          </h1>
          <p className="text-gray-300 max-w-xl">
            Monitor, manage, and control all aspects of your legal platform in one place.
          </p>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <Link
            key={i}
            href={stat.href}
            className="group relative rounded-[28px] p-[1px] bg-gradient-to-br from-white/20 to-white/0 hover:from-gold/40 transition-all duration-500"
          >
            <div className="relative bg-white/80 backdrop-blur-xl rounded-[28px] p-8 h-full border border-white/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">

              {/* Gradient background glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition duration-700`} />

              {/* ICON */}
              <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white shadow-md group-hover:scale-110 transition`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>

              {/* CONTENT */}
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
                    {stat.label}
                  </p>
                  <h3 className="text-4xl font-bold text-gray-900">
                    {stat.value}
                  </h3>


                </div>

                {/* ARROW */}
                <div className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-400 group-hover:text-gold group-hover:border-gold transition-all duration-500 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* subtle shine */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.4),transparent)] animate-[shine_2s_linear_infinite]" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}