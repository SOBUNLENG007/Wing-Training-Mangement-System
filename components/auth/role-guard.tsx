// "use client";
// import { useAuthStore } from "@/lib/auth-store";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export function RoleGuard({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
//   const user = useAuthStore((state) => state.user);
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false);
//   const isAllowed = allowedRoles.some(role => role.toLowerCase() === (user?.role?.toLowerCase()));

//   useEffect(() => setMounted(true), []);

//   useEffect(() => {
//     if (mounted) {
//       if (!user) {
//         router.replace("/login");
//       } else if (!isAllowed) {
//         router.replace("/dashboard"); // No permission -> back to home
//       }
//     }
//   }, [user, mounted, router, allowedRoles]);

//   if (!mounted || !user) return null;
//   return <>{children}</>;
// }


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-store";

type RoleGuardProps = {
  allowed?: string[];
  allowedRoles?: string[];
  children: React.ReactNode;
};

export function RoleGuard({
  allowed,
  allowedRoles,
  children,
}: RoleGuardProps) {
  const router = useRouter();
  const { user, isAuthenticated, loadUser } = useAuth();

  // Normalize roles (fix inconsistency)
  const roles = (allowed || allowedRoles || []).map((r) =>
    r.toLowerCase()
  );

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!user) return;

    const userRole = user.role?.toLowerCase();

    const isAllowed =
      roles.length === 0 || roles.includes(userRole);

    if (!isAllowed) {
      router.push("/unauthorized");
    }
  }, [user, isAuthenticated, roles, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}