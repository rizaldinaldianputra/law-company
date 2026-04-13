'use client';

import { Inter, Instrument_Sans } from 'next/font/google';
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Scale,
  Image as ImageIcon,
  Settings,
  LogOut,
  ChevronRight,
  Shield,
  Award,
  Calendar,
  BookOpen,
  Briefcase,
  File,
  Book
} from "lucide-react";
import { logoutAction } from "./actions";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const instrumentSans = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument' });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide sidebar/header on login page
  if (pathname === '/admin/login') {
    return <div className={`${inter.variable} ${instrumentSans.variable} font-sans`}>{children}</div>;
  }

  // ✅ NAV GROUPS
  const navGroups = [
    {
      title: "Main",
      items: [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      ],
    },
    {
      title: "Our Firm",
      items: [
        { href: "/admin/lawyers", label: "Our Team", icon: Users },
        { href: "/admin/practice-areas", label: "Services", icon: Scale },
      ],
    },
    {
      title: "News",
      items: [
        { href: "/admin/articles", label: "Articles", icon: Book },

        { href: "/admin/media", label: "Media Coverage", icon: FileText },
        { href: "/admin/awards", label: "Awards & Achievement", icon: Award },
        { href: "/admin/events", label: "Events", icon: Calendar },
        { href: "/admin/research", label: "Research", icon: BookOpen },
        { href: "/admin/career", label: "Career", icon: Briefcase },
      ],
    },
    {
      title: "Others",
      items: [
        { href: "/admin/clients", label: "Clients", icon: Users },
        { href: "/admin/media-library", label: "Media Library", icon: ImageIcon },
        { href: "/admin/settings", label: "Settings", icon: Settings },
      ],
    },
  ];

  // ✅ FIND CURRENT PAGE & GROUP
  const currentGroup = navGroups.find(group =>
    group.items.some(item =>
      pathname === item.href || pathname.startsWith(item.href)
    )
  );

  const currentItem = currentGroup?.items.find(item =>
    pathname === item.href || pathname.startsWith(item.href)
  );

  return (
    <div className={`${inter.variable} ${instrumentSans.variable} font-sans flex min-h-screen bg-[#FDFDFC]`}>
      <Toaster position="top-right" />

      {/* ─── SIDEBAR ─── */}
      <aside className="w-72 bg-[#0A0A0A] text-gray-400 flex-shrink-0 min-h-screen z-20 hidden lg:flex flex-col border-r border-white/5 shadow-2xl">

        {/* Logo */}
        <div className="p-8 mb-4">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-maroon flex items-center justify-center text-white shadow-lg shadow-maroon/20 group-hover:rotate-12 transition-transform duration-500">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="text-white font-serif font-bold text-lg tracking-wide">
                Rizal Law
              </div>
              <div className="text-gold text-[9px] font-bold uppercase tracking-[0.3em]">
                Administrator
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 mb-8 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.title} className="mb-6">
              <div className="px-5 mb-2 text-[10px] uppercase tracking-[0.2em] text-gray-500">
                {group.title}
              </div>

              <ul className="space-y-2">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href));

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-300 group ${isActive
                          ? "bg-white/5 text-white border border-white/5"
                          : "hover:bg-white/[0.02] hover:text-white"
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <item.icon
                            className={`h-4.5 w-4.5 ${isActive
                              ? "text-gold"
                              : "text-gray-500 group-hover:text-gold"
                              }`}
                          />
                          <span className="text-[13px] font-medium">
                            {item.label}
                          </span>
                        </div>

                        {isActive && (
                          <ChevronRight className="h-3.5 w-3.5 text-gold" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-6 mt-auto border-t border-white/5">
          <button
            onClick={() => {
              if (confirm('Exit Administrative Portal?')) logoutAction();
            }}
            className="w-full flex items-center gap-4 px-5 py-3.5 text-gray-500 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all duration-300 group"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span className="text-[13px] font-medium tracking-wide">
              Logout Session
            </span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 z-10 w-full shadow-sm">

          {/* Left */}
          <div className="flex items-center gap-4">
            <div className="lg:hidden w-10 h-10 rounded-lg bg-maroon flex items-center justify-center text-white mr-2">
              <Shield className="h-5 w-5" />
            </div>

            {/* ✅ Breadcrumb Style */}
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-gray-400 tracking-widest">
                {currentGroup?.title || "Main"}
              </span>
              <h2 className="font-serif font-bold text-xl text-gray-900 tracking-tight">
                {currentItem?.label || "Dashboard"}
              </h2>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <div className="h-8 w-px bg-gray-100" />

            <Link
              href="/"
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-maroon border-b border-transparent hover:border-maroon transition-all"
              target="_blank"
            >
              View Public Website
            </Link>

            <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F3F4F6] p-10 lg:p-14">
          <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}