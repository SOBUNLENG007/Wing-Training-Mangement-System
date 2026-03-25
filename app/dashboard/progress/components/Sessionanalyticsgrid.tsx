import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TrainingSession } from "@/lib/types/session";
import { SessionAnalyticsCard } from "./Sessionanalyticcard";

type Props = { sessions: TrainingSession[] };

export function SessionAnalyticsGrid({ sessions }: Props) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          Session Analytics Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sessions.map((s) => (
            <SessionAnalyticsCard key={s.id} session={s} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}