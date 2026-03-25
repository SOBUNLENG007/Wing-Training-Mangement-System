import { Metric } from "@/lib/types/report";

type Props = {
  metric: Metric;
  isActive: boolean;
  onClick: (id: string) => void;
};

export function MetricCard({ metric, isActive, onClick }: Props) {
  const Icon = metric.icon;

  return (
    <div
      onClick={() => onClick(metric.id)}
      className={`group flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95 ${
        isActive
          ? "border-[#1f6fff] bg-blue-50/30 shadow-md ring-2 ring-[#1f6fff]/20"
          : "border-slate-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ${metric.bg} ${isActive ? "scale-110" : "group-hover:scale-110"}`}
      >
        <Icon className={`h-6 w-6 ${metric.color}`} />
      </div>
      <div>
        <p
          className={`text-[13px] font-medium ${isActive ? "text-[#1f6fff]" : "text-slate-500"}`}
        >
          {metric.label}
        </p>
        <p className="mt-0.5 text-2xl font-bold text-slate-900">
          {metric.value}
        </p>
      </div>
    </div>
  );
}
