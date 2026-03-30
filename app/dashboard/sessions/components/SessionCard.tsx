import { BookOpen, Calendar, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrainingSession } from "@/lib/types/session";
import {
  STATUS_CONFIG,
  STATUS_ICONS,
  formatDateRange,
  enrollmentPercent,
} from "../utils";

type Props = {
  session: TrainingSession;
  onClick: (s: TrainingSession) => void;
};

export function SessionCard({ session, onClick }: Props) {
  // Determine statusKey: if startDate is after today, force 'upcoming'
  let statusKey: keyof typeof STATUS_CONFIG = "upcoming";
  const today = new Date();
  const startDate = new Date(session.startDate);
  if (startDate > today) {
    statusKey = "upcoming";
  } else if (session.status === true) {
    statusKey = "ongoing";
  } else if (session.status === false) {
    statusKey = "completed";
  }
  const cfg = STATUS_CONFIG[statusKey] ?? {
    label: "Unknown",
    color: "bg-slate-100 text-slate-500 border-0",
  };
  const StatusIcon = STATUS_ICONS[statusKey] ?? BookOpen;

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
              <p className="mt-0.5 text-xs text-muted-foreground">
                {session.departmentName}
              </p>
            </div>
          </div>

          <Badge className={`shrink-0 text-[10px] ${cfg.color}`}>
            <StatusIcon className="mr-1 size-3" />
            {cfg.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {session.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            {formatDateRange(session.startDate, session.endDate)}
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-3" />
            {session.enrolledCount}/{session.numSession}
          </span>
        </div>

        <Progress
          value={enrollmentPercent(session.enrolledCount, session.numSession)}
          className="h-1.5"
        />

        <p className="text-[10px] text-muted-foreground">
          Trainer: {session.instructorName}
        </p>
      </CardContent>
    </Card>
  );
}
