import { BookOpen, Calendar, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge }    from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrainingSession } from "@/lib/types/session";
import { STATUS_CONFIG, STATUS_ICONS, formatDateRange, enrollmentPercent } from "../utils";

type Props = {
  session: TrainingSession;
  onClick: (s: TrainingSession) => void;
};

export function SessionCard({ session, onClick }: Props) {
  const cfg        = STATUS_CONFIG[session.status];
  const StatusIcon = STATUS_ICONS[session.status];

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => onClick(session)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold leading-tight text-foreground">
                {session.title}
              </CardTitle>
              <p className="mt-0.5 text-xs text-muted-foreground">{session.department}</p>
            </div>
          </div>

          <Badge className={`shrink-0 text-[10px] ${cfg.color}`}>
            <StatusIcon className="mr-1 size-3" />
            {cfg.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="line-clamp-2 text-xs text-muted-foreground">{session.description}</p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            {formatDateRange(session.startDate, session.endDate)}
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-3" />
            {session.enrolledCount}/{session.maxCapacity}
          </span>
        </div>

        <Progress value={enrollmentPercent(session.enrolledCount, session.maxCapacity)} className="h-1.5" />

        <p className="text-[10px] text-muted-foreground">Trainer: {session.trainer}</p>
      </CardContent>
    </Card>
  );
}