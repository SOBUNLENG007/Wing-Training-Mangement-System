import { User } from "@/lib/types/user";
export type UserStatus = "Active" | "Inactive";
 
export function StatusBadge({ status }: { status: UserStatus }) {
  const active = status === "Active";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-bold ${active ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-500"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-green-500" : "bg-slate-400"}`} />
      {status}
    </span>
  );
}