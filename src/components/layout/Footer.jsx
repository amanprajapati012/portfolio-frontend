"use client";

import { Download } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10">
      {/* Gradient Border */}
      <div className="h-[1px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />

      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-700 dark:text-gray-300">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              Aman Prajapati
            </span>
          </p>

          <a
            href="/assets/resume/AmanResume.pdf"
            download
            className="relative z-20 inline-flex items-center gap-2 px-4 py-2 rounded-xl
                       text-sm font-semibold text-white
                       bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400
                       hover:scale-105 transition-transform shadow-md"
          >
            <Download size={16} />
            Resume
          </a>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Built with Next.js & Tailwind
          </p>
        </div>
      </div>

      {/* Background Glow (NON-CLICKABLE) */}
      <div className="absolute -top-10 left-1/2 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl -translate-x-1/2 pointer-events-none -z-10" />
    </footer>
  );
}
