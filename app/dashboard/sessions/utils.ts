import { Play, Clock, CheckCircle2 } from "lucide-react";
import { SessionStatus, TrainingSession } from "@/lib/types/session";

export const STATUS_CONFIG: Record<SessionStatus, { label: string; color: string }> = {
  ongoing:   { label: "Ongoing",   color: "bg-wtms-teal/10 text-wtms-teal border-0"   },
  upcoming:  { label: "Upcoming",  color: "bg-primary/10 text-primary border-0"        },
  completed: { label: "Completed", color: "bg-wtms-green/10 text-wtms-green border-0"  },
};

export const STATUS_ICONS: Record<SessionStatus, React.ElementType> = {
  ongoing:   Play,
  upcoming:  Clock,
  completed: CheckCircle2,
};

export const FILTER_OPTIONS = ["all", "ongoing", "upcoming", "completed"] as const;
export type  FilterOption   = typeof FILTER_OPTIONS[number];

export function formatDateRange(start: string, end: string, showYear = false) {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const endOpts: Intl.DateTimeFormatOptions = showYear ? { ...opts, year: "numeric" } : opts;
  const fmt = (d: string, o: Intl.DateTimeFormatOptions) =>
    new Date(d).toLocaleDateString("en-US", o);
  return `${fmt(start, opts)} - ${fmt(end, endOpts)}`;
}

export function enrollmentPercent(enrolled: number, max: number) {
  return (enrolled / max) * 100;
}