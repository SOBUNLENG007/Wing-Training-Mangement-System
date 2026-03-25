"use client";
import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function RoleGuard({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted) {
      if (!user) {
        router.replace("/login");
      } else if (!allowedRoles.map(r => r.toLowerCase()).includes(user.role.toLowerCase())) {
        router.replace("/dashboard"); // No permission -> back to home
      }
    }
  }, [user, mounted, router, allowedRoles]);

  if (!mounted || !user) return null;
  return <>{children}</>;
}