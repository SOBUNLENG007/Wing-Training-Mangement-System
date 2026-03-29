 "use client";

import { useState, useEffect } from "react";
import { RoleGuard } from "@/components/auth/role-guard";
import { useAuthStore } from "@/lib/auth-store";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopHeader } from "@/components/layout/top-header";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // 1. Sidebar state logic
  const [collapsed, setCollapsed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const user = useAuthStore((state) => state.user);

  // 2. Handle Hydration to prevent "Flicker" on refresh
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="size-10 animate-spin rounded-full border-4 border-[#1f6fff] border-t-transparent" />
      </div>
    );
  }

  return (
    // 3. RoleGuard (Make sure these match your Java Role names)
    <RoleGuard allowedRoles={["ADMIN", "TRAINER", "EMPLOYEE"]}>
      <div className="flex min-h-screen bg-slate-50/50">
        
        {/* --- Sidebar Component --- */}
        <AppSidebar 
          collapsed={collapsed} 
          onToggleAction={() => setCollapsed(!collapsed)} 
        />

        {/* --- Main Content Area --- */}
        <div
          className={cn(
            "flex flex-1 flex-col transition-all duration-300",
            // This margin must match your sidebar widths
            collapsed ? "ml-17" : "ml-65"
          )}
        >
          {/* --- Top Header --- */}
          <TopHeader />

          {/* --- Main Dashboard Content --- */}
          <main className="flex-1 p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}