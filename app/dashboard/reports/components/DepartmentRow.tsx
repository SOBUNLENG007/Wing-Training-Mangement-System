import { ChevronRight } from "lucide-react";
 
import { CompletionBar } from "./Completionbar";
import { StatusBadge }   from "./Statusbadge";
import { DepartmentStat } from "@/lib/types/report";

type Props = {
  stat:       DepartmentStat;
  isSelected: boolean;
  onClick:    (dept: string) => void;
};

export function DepartmentRow({ stat, isSelected, onClick }: Props) {
  return (
    <tr
      onClick={() => onClick(stat.dept)}
      className={`group cursor-pointer transition-all duration-200 ${
        isSelected ? "bg-blue-50/40" : "hover:bg-slate-50"
      }`}
    >
      {/* Department name */}
      <td className="p-4 px-6">
        <p className={`text-[14px] font-semibold transition-colors ${
          isSelected ? "text-[#1f6fff]" : "text-slate-800 group-hover:text-[#1f6fff]"
        }`}>
          {stat.dept}
        </p>
      </td>

      {/* Employees */}
      <td className="p-4 text-[14px] font-medium text-slate-600">{stat.employees}</td>

      {/* Completion bar */}
      <td className="p-4"><CompletionBar completion={stat.completion} /></td>

      {/* Avg score */}
      <td className="p-4 text-[14px] font-bold text-slate-700">
        {stat.avgScore > 0
          ? `${stat.avgScore}%`
          : <span className="font-normal text-slate-300">N/A</span>
        }
      </td>

      {/* Status badge */}
      <td className="p-4"><StatusBadge completion={stat.completion} /></td>

      {/* Arrow */}
      <td className="p-4 px-6 text-right">
        <ChevronRight className={`h-5 w-5 transition-all duration-200 ${
          isSelected
            ? "translate-x-1 text-[#1f6fff]"
            : "text-slate-300 group-hover:translate-x-1 group-hover:text-[#1f6fff]"
        }`} />
      </td>
    </tr>
  );
}