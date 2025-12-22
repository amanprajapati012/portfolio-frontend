"use client";

import React, { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header({ isAdmin = false }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const menuItems = ["overview", "Experience", "Projects", "Skills", "Testimonials", "Contact"];

  const handleLogout = () => {
    // clear admin auth (example)
    localStorage.removeItem("adminToken");
    router.push("/main/admin/auth");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top bar */}
      <div className="bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-cyan-400/10 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo / Title */}
          <div className="leading-tight">
            {isAdmin ? (
              <>
                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Admin <span className="text-indigo-500 dark:text-cyan-400">Panel</span>
                </h1>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                  PORTFOLIO MANAGEMENT
                </p>
              </>
            ) : (
              <>
                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Aman <span className="text-indigo-500 dark:text-cyan-400">Prajapati</span>
                </h1>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                  MERN STACK DEVELOPER
                </p>
              </>
            )}
          </div>

          {/* Desktop Menu */}
          {!isAdmin && (
            <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-700 dark:text-gray-300">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative group"
                >
                  <span className="transition-colors group-hover:text-indigo-500 dark:group-hover:text-cyan-400">
                    {item}
                  </span>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-all group-hover:w-full"></span>
                </a>
              ))}
            </nav>
          )}

          {/* Admin Logout */}
          {isAdmin && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-cyan-400 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}

          {/* Mobile Menu Button (Only User) */}
          {!isAdmin && (
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu (Only User) */}
      {!isAdmin && (
        <div
          className={`
            md:hidden fixed top-[72px] left-0 w-full
            bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700
            transition-all duration-300 ease-in-out
            ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}
          `}
        >
          <nav className="flex flex-col px-8 py-8 gap-6 text-gray-700 dark:text-gray-300 font-medium">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-lg hover:text-indigo-500 dark:hover:text-cyan-400 transition"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
