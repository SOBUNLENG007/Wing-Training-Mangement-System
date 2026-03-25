
// ─── InfoRow ──────────────────────────────────────────────────────────────────

import { LucideIcon } from "lucide-react";

 
export function InfoRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
      <div className="rounded-lg bg-white p-2 shadow-sm">
        <Icon className="h-4 w-4 text-[#1f6fff]" />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase text-slate-400">{label}</p>
        <p className="text-[14px] font-medium text-slate-700">{value}</p>
      </div>
    </div>
  );
}
 