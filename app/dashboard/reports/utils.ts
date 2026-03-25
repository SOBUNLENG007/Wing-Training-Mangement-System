import { BarChart3, Users, TrendingUp, Award } from "lucide-react";
import { DepartmentStat, Metric } from"@/lib/types/report";

export const DEPARTMENT_STATS: DepartmentStat[] = [
  { dept: "Operations", employees: 60,  completion: 82,  avgScore: 78 },
  { dept: "Compliance", employees: 55,  completion: 95,  avgScore: 84 },
  { dept: "Sales",      employees: 45,  completion: 65,  avgScore: 72 },
  { dept: "HR",         employees: 25,  completion: 40,  avgScore: 0  },
  { dept: "IT",         employees: 120, completion: 30,  avgScore: 71 },
  { dept: "Finance",    employees: 35,  completion: 100, avgScore: 88 },
];

export const METRICS: Metric[] = [
  { id: "completion", label: "Completion Rate",  value: "73%", icon: BarChart3,  color: "text-[#1f6fff]",  bg: "bg-[#1f6fff]/10" },
  { id: "score",      label: "Avg. Score",        value: "79%", icon: TrendingUp, color: "text-green-600",  bg: "bg-green-50"     },
  { id: "learners",   label: "Active Learners",   value: "215", icon: Users,      color: "text-amber-600",  bg: "bg-amber-50"     },
  { id: "certs",      label: "Certifications",    value: "48",  icon: Award,      color: "text-purple-600", bg: "bg-purple-50"    },
];

// ── Pure helpers ──────────────────────────────────────────────────────────────

export function getCompletionColor(completion: number) {
  if (completion === 100) return "bg-green-500";
  if (completion >= 50)   return "bg-[#1f6fff]";
  return "bg-amber-500";
}

export function getStatusLabel(completion: number) {
  if (completion === 100) return "Complete";
  if (completion > 50)    return "On Track";
  return "Behind";
}

export function getStatusStyle(completion: number) {
  if (completion === 100) return { badge: "bg-green-50 text-green-600",  dot: "bg-green-500"  };
  if (completion > 50)    return { badge: "bg-blue-50 text-blue-600",    dot: "bg-blue-500"   };
  return                         { badge: "bg-amber-50 text-amber-600",  dot: "bg-amber-500"  };
}