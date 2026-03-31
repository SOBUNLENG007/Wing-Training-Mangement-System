"use client";

import Link from "next/link";
import { Bell, Search, ChevronDown } from "lucide-react";
// import { useAuth } from "@/lib/auth-store";
import { useAuthStore } from "@/lib/auth-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
// Mock data import - ensure this path is correct
import { mockNotifications } from "@/lib/mock-data";

export function TopHeader() {
  // 1. Grab user from store
  const user = useAuthStore((state) => state.user);

  // 2. FULL NAME LOGIC (firstName + lastName)
  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Guest";

  // 3. INITIALS LOGIC (from firstName + lastName)
  const initials =
    [user?.firstName, user?.lastName]
      .filter(Boolean)
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "??";

  // 4. ROLE LOGIC
  const displayRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
    : "User";

  // 5. NOTIFICATION LOGIC
  const unreadCount = mockNotifications
    ? mockNotifications.filter((n) => !n.read).length
    : 0;

  return (
    <header className="sticky top-0 z-30 flex h-[74px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-7">
      {/* LEFT SIDE: Global Search */}
      <div className="relative hidden w-full max-w-[370px] sm:block">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <Input
          type="text"
          placeholder="Search training, materials, users..."
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-[14px] text-slate-700 placeholder:text-slate-400 transition-all focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-[#1f6fff]"
        />
      </div>

      {/* RIGHT SIDE: Notifications & Profile */}
      <div className="ml-auto flex items-center gap-4 sm:gap-6">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="h-[22px] w-[22px] text-slate-500 transition-colors hover:text-slate-700" />
          {unreadCount > 0 && (
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          )}
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-[1px] bg-slate-200 sm:block" />

        {/* Profile Link */}
        <Link
          href="/dashboard/settings/"
          className="flex items-center gap-3 rounded-xl px-1 py-1 transition-opacity hover:opacity-80"
        >
          <Avatar className="h-10 w-10 border border-slate-100 shadow-sm">
            <AvatarFallback className="bg-[#1f6fff] text-[13px] font-bold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="hidden text-left sm:block">
            <p className="text-[14px] font-bold leading-tight text-slate-800">
              {fullName}
            </p>
            <p className="mt-0.5 text-[12px] font-medium leading-tight text-slate-500">
              {displayRole}
            </p>
          </div>

          <ChevronDown className="ml-1 hidden h-4 w-4 text-slate-400 sm:block" />
        </Link>
      </div>
    </header>
  );
}