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
  Shield
} from "lucide-react";
import { logoutAction } from "./actions";

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

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/lawyers", label: "Lawyers", icon: Users },
    { href: "/admin/practice-areas", label: "Practice Areas", icon: Scale },
    { href: "/admin/articles", label: "Articles", icon: FileText },
    { href: "/admin/clients", label: "Clients", icon: Users },
    { href: "/admin/media", label: "Media Coverage", icon: FileText },
    { href: "/admin/media-library", label: "Media Library", icon: ImageIcon },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className={`${inter.variable} ${instrumentSans.variable} font-sans flex min-h-screen bg-[#FDFDFD] relative`}>
      {/* ─── SIDEBAR ─── */}
      <aside className="w-72 bg-[#0A0A0A] text-gray-400 flex-shrink-0 min-h-screen z-20 hidden lg:flex flex-col border-r border-white/5 shadow-2xl">
        <div className="p-8 mb-4">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-maroon flex items-center justify-center text-white shadow-lg shadow-maroon/20 group-hover:rotate-12 transition-transform duration-500">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="text-white font-serif font-bold text-lg tracking-wide">Rizal Law</div>
              <div className="text-gold text-[9px] font-bold uppercase tracking-[0.3em]">Administrator</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 mb-8">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-300 group ${isActive
                        ? "bg-white/5 text-white shadow-sm border border-white/5"
                        : "hover:bg-white/[0.02] hover:text-white"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className={`h-4.5 w-4.5 transition-colors duration-300 ${isActive ? "text-gold" : "text-gray-500 group-hover:text-gold"}`} />
                      <span className="text-[13px] font-medium tracking-wide">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="h-3.5 w-3.5 text-gold animate-in fade-in slide-in-from-left-1" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-6 mt-auto border-t border-white/5">
          <button
            onClick={() => { if (confirm('Exit Administrative Portal?')) logoutAction() }}
            className="w-full flex items-center gap-4 px-5 py-3.5 text-gray-500 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all duration-300 group"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span className="text-[13px] font-medium tracking-wide">Logout Session</span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 z-10 w-full shadow-sm">
          <div className="flex items-center gap-4">
            <div className="lg:hidden w-10 h-10 rounded-lg bg-maroon flex items-center justify-center text-white mr-2">
              <Shield className="h-5 w-5" />
            </div>
            <h2 className="font-serif font-bold text-xl text-gray-900 tracking-tight">
              {navItems.find(item => item.href === pathname)?.label || "Dashboard"}
            </h2>
          </div>

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

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F3F4F6] p-10 lg:p-14">
          <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
