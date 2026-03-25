import { Badge }    from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { TrainingSession } from "@/lib/types/session";

type Props = { session: TrainingSession };

export function SessionAnalyticsCard({ session }: Props) {
  const pct = (session.enrolledCount / session.maxCapacity) * 100;

  return (
    <div className="space-y-3 rounded-lg border border-border p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">{session.title}</p>
        <Badge variant="outline" className="text-[10px] capitalize">{session.status}</Badge>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Enrollment</span>
          <span>{session.enrolledCount}/{session.maxCapacity}</span>
        </div>
        <Progress value={pct} className="h-1.5" />
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{session.department}</span>
        <span>&middot;</span>
        <span>{session.trainer}</span>
      </div>
    </div>
  );
}