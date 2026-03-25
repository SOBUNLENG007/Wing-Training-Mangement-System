import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { ProgressEntry, ProgressStatus, SummaryStat } from"@/lib/types/progress";


// ── Status config ─────────────────────────────────────────────────────────────

export const STATUS_CFG: Record<ProgressStatus, { label: string; icon: React.ElementType; color: string }> = {
  "completed":   { label: "Complete",    icon: CheckCircle2, color: "bg-wtms-green/10  text-wtms-green  border-0" },
  "in-progress": { label: "In Progress", icon: Clock,        color: "bg-wtms-orange/10 text-wtms-orange border-0" },
  "not-started": { label: "Not Started", icon: AlertCircle,  color: "bg-muted          text-muted-foreground border-0" },
};

// ── Derived summary stats from progress data ──────────────────────────────────

export function calcSummaryStats(progress: ProgressEntry[]) {
  const completed    = progress.filter((p) => p.status === "completed").length;
  const inProgress   = progress.filter((p) => p.status === "in-progress").length;
  const scored       = progress.filter((p) => p.score > 0);
  const avgScore     = scored.reduce((a, p) => a + p.score, 0) / (scored.length || 1);
  const avgCompletion = progress.reduce((a, p) => a + p.completionRate, 0) / progress.length;

  return { completed, inProgress, avgScore, avgCompletion };
}