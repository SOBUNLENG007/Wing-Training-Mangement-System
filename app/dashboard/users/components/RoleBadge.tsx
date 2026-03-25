// ─── RoleBadge ────────────────────────────────────────────────────────────────

import { GraduationCap, LucideIcon, ShieldCheck, UserIcon } from "lucide-react";
// ─── StatusBadge ──────────────────────────────────────────────────────────────
import { User, UserRole } from "@/lib/types/user";

 
const ROLE_STYLES: Record<UserRole, { cls: string; Icon: LucideIcon }> = {
  Admin:    { cls: "bg-purple-50 text-purple-700", Icon: ShieldCheck    },
  Trainer:  { cls: "bg-amber-50  text-amber-700",  Icon: GraduationCap  },
  Employee: { cls: "bg-blue-50   text-blue-700",   Icon: UserIcon       },
};
 
export function RoleBadge({ role }: { role: UserRole }) {
  const { cls, Icon } = ROLE_STYLES[role];
  return (
    <span className={`flex w-fit items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ${cls}`}>
      <Icon className="size-3.5" /> {role}
    </span>
  );
}