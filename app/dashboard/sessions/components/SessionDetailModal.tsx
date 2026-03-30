import { Calendar, Clock, Play, Users, BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrainingSession } from "@/lib/types/session";
import { formatDateRange, STATUS_CONFIG, STATUS_ICONS } from "../utils";

import { ReactNode } from "react";
type InfoTileProps = { label: string; value: ReactNode };

function InfoTile({ label, value }: InfoTileProps) {
  return (
    <div className="rounded-lg bg-muted p-3">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-medium capitalize text-foreground">
        {value}
      </p>
    </div>
  );
}

type Props = {
  session: TrainingSession | null;
  canManage: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
};

export function SessionDetailModal({
  session,
  canManage,
  onClose,
  onDelete,
}: Props) {
  if (!session) return null;

  // StatusKey logic (same as SessionCard)
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
    <Dialog open={!!session} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">{session.title}</DialogTitle>
          <DialogDescription>{session.departmentName}</DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          <p className="text-sm text-muted-foreground">{session.description}</p>

          <div className="grid grid-cols-2 gap-3">
            <InfoTile
              label="Status"
              value={
                <span className={`inline-flex items-center gap-1`}>
                  <StatusIcon className="size-3" />
                  {cfg.label}
                </span>
              }
            />
            <InfoTile label="Trainer" value={session.instructorName} />
            <InfoTile
              label="Duration"
              value={formatDateRange(session.startDate, session.endDate, true)}
            />
            <InfoTile
              label="Enrollment"
              value={`${session.enrolledCount} / ${session.numSession ?? 0}`}
            />
          </div>

          {canManage && (
            <div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Users className="size-3.5" /> Assign Employees
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Calendar className="size-3.5" /> Set Start & End Date
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Play className="size-3.5" />
                  {statusKey === "upcoming" ? "Enable" : "Disable"}
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Clock className="size-3.5" /> Schedule Session
                </Button>
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 text-xs"
                >
                  Update
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => {
                    onDelete(session.id);
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
