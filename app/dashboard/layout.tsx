// "use client"

// import { useState, useEffect } from "react"
// import { useRouter, usePathname } from "next/navigation"
// import { AppSidebar } from "@/components/layout/app-sidebar"
// import { TopHeader } from "@/components/layout/top-header"
// import { useAuthStore } from "@/lib/auth-store"
// import { cn } from "@/lib/utils"

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const [collapsed, setCollapsed] = useState(false)
//   const [isHydrated, setIsHydrated] = useState(false)

//   const router = useRouter()
//   const pathname = usePathname()
  
//   // Get user from Zustand store
//  const user = useAuthStore((state) => state.user)

//   useEffect(() => {
//     // 1. Wait for Zustand to finish loading from LocalStorage
//     setIsHydrated(true)
//   }, [])

//   useEffect(() => {
//     // 2. Only redirect if the store is hydrated AND no user is found
//     if (isHydrated && !user) {
//       router.replace("/")
//     }
//   }, [isHydrated, user, router])

//   // 3. Show a loading spinner while checking auth
//   if (!isHydrated || !user) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-white">
//         <div className="size-10 animate-spin rounded-full border-4 border-[#1f6fff] border-t-transparent" />
//       </div>
//     )
//   }

//   const isSettingsPage = pathname === "/dashboard/settings"

//   return (
//     <div className="flex min-h-screen bg-slate-50/50">
//       {/* --- Sidebar --- */}
//       <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

//       {/* --- Main Content Area --- */}
//       <div
//         className={cn(
//           "flex flex-1 flex-col transition-all duration-300",
//           // Adjust these pixel values based on your actual Sidebar widths
//           collapsed ? "ml-[68px]" : "ml-[260px]"
//         )}
//       >
//         {/* Only show header if not on settings page */}
//         {!isSettingsPage && <TopHeader />}

//         <main className={cn("flex-1", isSettingsPage ? "p-8 lg:p-10" : "p-6 lg:p-8")}>
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }


// "use client";

// import { RoleGuard } from "@/components/auth/role-guard";
// import { useAuthStore } from "@/lib/auth-store";
// // import { Sidebar } from "@/components/layout/sidebar";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const { user } = useAuthStore();

//   return (
//     <RoleGuard allowedRoles={["ADMIN", "TRAINER", "EMPLOYEE"]}>
//       <div className="flex min-h-screen bg-slate-50">
//         {/* Sidebar Space */}
//         <aside className="w-64 border-r bg-white hidden md:block">
//            {/* <Sidebar /> */}
//            <div className="p-6 font-bold text-blue-600">WTMS MENU</div>
//         </aside>

//         <div className="flex-1">
//           {/* Top Header Space */}
//           <header className="h-16 border-b bg-white flex items-center justify-end px-8">
//             <span className="text-sm font-medium text-slate-600">
//               Welcome, <b className="text-slate-900">{user?.name}</b>
//             </span>
//           </header>

//           {/* Main Content */}
//           <main className="p-8">
//             {children}
//           </main>
//         </div>
//       </div>
//     </RoleGuard>
//   );
// }






"use client";

import { RoleGuard } from "@/components/auth/role-guard";
import { useAuthStore } from "@/lib/auth-store";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopHeader } from "@/components/layout/top-header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  return (
    <RoleGuard allowedRoles={["admin", "trainer", "employee"]}>
      <div className="flex min-h-screen bg-slate-50">
        <AppSidebar collapsed={false} onToggle={() => {}} />
        <div className="flex flex-1 flex-col">
          <TopHeader />
          <main className="p-8">{children}</main>
        </div>
      </div>
    </RoleGuard>
  );
}