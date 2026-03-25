import { Users, BarChart3, Download, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const ACTIONS = [
  { label: "Per Employee",           icon: Users,     variant: "outline" as const },
  { label: "Per Session / Per Dept.", icon: BarChart3, variant: "outline" as const },
  { label: "Export PDF",             icon: Download,  variant: "outline" as const },
  { label: "Export for Mgmt. Review", icon: PieChart, variant: "default" as const },
];

export function ExportActions() {
  return (
    <div className="flex flex-wrap gap-2">
      {ACTIONS.map(({ label, icon: Icon, variant }) => (
        <Button key={label} variant={variant} className="gap-2 text-sm">
          <Icon className="size-4" /> {label}
        </Button>
      ))}
    </div>
  );
}