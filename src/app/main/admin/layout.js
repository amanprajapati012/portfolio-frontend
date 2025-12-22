"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token && pathname !== "/main/admin/auth") {
      router.push("/main/admin/auth");
    }

    setLoading(false);
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  // ❌ Login page pe sidebar nahi
  const showSidebar = pathname !== "/main/admin/auth";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {showSidebar && <Sidebar />}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
