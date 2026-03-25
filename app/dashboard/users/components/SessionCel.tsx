
// ─── SessionsCell ─────────────────────────────────────────────────────────────

import { BookOpen } from "lucide-react";

 
export function SessionsCell({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-1.5 text-[13px] text-slate-600">
      <BookOpen className="h-4 w-4 text-slate-400" /> {count}
    </span>
  );
}