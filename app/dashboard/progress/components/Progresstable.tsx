import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressEntry } from "@/lib/types/progress";
import { ProgressRow }   from "./Progressrow";

const COLUMNS = ["Training Session", "Completion", "Score", "Status"];

type Props = { entries: ProgressEntry[] };

export function ProgressTable({ entries }: Props) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground">
            Training Completion Status
          </CardTitle>
          <Badge variant="secondary" className="text-[10px]">
            <Users className="mr-1 size-3" /> Per Employee / Per Session
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {COLUMNS.map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((p) => (
                <ProgressRow key={p.sessionTitle} entry={p} />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}