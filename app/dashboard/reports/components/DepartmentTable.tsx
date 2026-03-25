import { Building2 } from "lucide-react";
import { DepartmentStat } from "@/lib/types/report";
import { DepartmentRow } from "./DepartmentRow";

const COLUMNS = [
  "Department",
  "Employees",
  "Completion Rate",
  "Avg. Score",
  "Status",
  "",
];

type Props = {
  stats: DepartmentStat[];
  selectedDept: string | null;
  onSelect: (dept: string) => void;
};

export function DepartmentTable({ stats, selectedDept, onSelect }: Props) {
  function handleClick(dept: string) {
    onSelect(selectedDept === dept ? "" : dept);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      {/* Table header */}
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-[#1f6fff]" />
          <h2 className="text-[16px] font-bold text-slate-800">
            Department Performance
          </h2>
        </div>
        {selectedDept && (
          <span className="animate-in rounded-full bg-blue-50 px-3 py-1 text-[12px] font-medium text-[#1f6fff] fade-in">
            Viewing: {selectedDept}
          </span>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50 text-[12px] font-semibold uppercase tracking-wider text-slate-500">
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  className={`p-4 ${col === "Department" || col === "" ? "px-6" : ""}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {stats.map((stat) => (
              <DepartmentRow
                key={stat.dept}
                stat={stat}
                isSelected={selectedDept === stat.dept}
                onClick={handleClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
