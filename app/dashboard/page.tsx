"use client";

import { useAuthStore } from "@/lib/auth-store";
import dynamic from "next/dynamic";

const AdminDashboard = dynamic(() => import("./components/AdminDashboard"), {
  ssr: false,
});
const TrainerDashboard = dynamic(
  () => import("./components/TrainerDashboard"),
  { ssr: false },
);
const EmployeeDashboard = dynamic(
  () => import("./components/EmployeeDashboard"),
  { ssr: false },
);

export default function DashboardPage() {
  const { user } = useAuthStore();
  if (!user) return null;
  switch (user.role?.toLowerCase()) {
    case "admin":
      return <AdminDashboard userName={user.name || user.email || "Admin"} />;
    case "trainer":
      return (
        <TrainerDashboard userName={user.name || user.email || "Trainer"} />
      );
    case "employee":
      return (
        <EmployeeDashboard userName={user.name || user.email || "Employee"} />
      );
    default:
      return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Invalid role: {user.role}
        </div>
      );
  }
}
