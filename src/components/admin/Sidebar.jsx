"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Layers,
  Code,
  Briefcase,
  MessageSquare,
  Mail,
  Menu,
  X,
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/main/admin/dashboard", icon: LayoutDashboard },
  { name: "Overview", href: "/main/admin/overview", icon: Layers },
  { name: "Skills", href: "/main/admin/skills", icon: Code },

  // ✅ EXPERIENCE ADDED
  { name: "Experience", href: "/main/admin/experience", icon: Briefcase },

  { name: "Project", href: "/main/admin/project", icon: Briefcase },
  { name: "Testimonial", href: "/main/admin/testimonial", icon: MessageSquare },
  { name: "Contact", href: "/main/admin/contact", icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-20 left-4 z-40 md:hidden p-2 bg-white rounded-lg shadow"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-50 h-full w-64 bg-white border-r shadow-sm
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="h-16 flex items-center px-6 border-b font-bold text-indigo-600">
          Admin Panel
        </div>

        <nav className="p-4 space-y-1">
          {links.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
                ${
                  active
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
