import { Badge }    from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ProgressEntry }  from "@/lib/types/progress";
import { STATUS_CFG }    from "../utils";

type Props = { entry: ProgressEntry };

export function ProgressRow({ entry: p }: Props) {
  const cfg        = STATUS_CFG[p.status];
  const StatusIcon = cfg.icon;

  return (
    <tr className="border-b border-border/50 last:border-0 hover:bg-muted/30">
      <td className="px-4 py-3">
        <p className="font-medium text-foreground">{p.sessionTitle}</p>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Progress value={p.completionRate} className="h-2 w-24" />
          <span className="w-10 text-xs text-muted-foreground">{p.completionRate}%</span>
        </div>
      </td>

      <td className="px-4 py-3">
        <span className={`text-sm font-medium ${p.score > 0 ? "text-foreground" : "text-muted-foreground"}`}>
          {p.score > 0 ? `${p.score}%` : "-"}
        </span>
      </td>

      <td className="px-4 py-3">
        <Badge className={`text-[10px] ${cfg.color}`}>
          <StatusIcon className="mr-1 size-3" />
          {cfg.label}
        </Badge>
      </td>
    </tr>
  );
}