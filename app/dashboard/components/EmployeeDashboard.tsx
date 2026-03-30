"use client";
import { useEffect, useState } from "react";
import { sessionsService } from "@/service/sessions/sessions.service";
import { assignmentsService } from "@/service/assignments/assignments.service";
import { notificationsService } from "@/service/notifications/notifications.service";
import { progressService } from "@/service/progress/progress.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  Bell,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

function StatCard({ label, value, icon: Icon, color, href }: any) {
  return (
    <Link href={href}>
      <Card className="cursor-pointer transition-shadow hover:shadow-md">
        <CardContent className="flex items-center gap-4 p-5">
          <div
            className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${color}`}
          >
            <Icon className="size-6 text-card" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function EmployeeDashboard({ userName }: { userName: string }) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [sessionsRes, assignmentsRes, notificationsRes, progressRes] =
          await Promise.all([
            sessionsService.getAll(),
            assignmentsService.getAll(),
            notificationsService.getAll(),
            progressService.getAll(),
          ]);
        setSessions(sessionsRes.payload || sessionsRes);
        setAssignments(assignmentsRes);
        setNotifications(notificationsRes);
        setProgress(progressRes);
      } catch (e) {}
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  const ongoingSessions = sessions.filter((s: any) => s.status === "ongoing");
  const pendingAssignments = assignments.filter(
    (a: any) => a.status === "pending",
  );
  const unreadNotifications = notifications.filter((n: any) => !n.read);
  const inProgressCourses = progress.filter(
    (p: any) => p.status === "in-progress",
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground text-balance">
          Welcome back, {userName.split(" ")[0]}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here is your personal training overview for today.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Ongoing Sessions"
          value={ongoingSessions.length}
          icon={BookOpen}
          color="bg-primary"
          href="/dashboard/my-sessions"
        />
        <StatCard
          label="Upcoming Deadlines"
          value={pendingAssignments.length}
          icon={ClipboardCheck}
          color="bg-wtms-teal"
          href="/dashboard/assignments"
        />
        <StatCard
          label="Unread Notifications"
          value={unreadNotifications.length}
          icon={Bell}
          color="bg-wtms-orange"
          href="/dashboard/notifications"
        />
        <StatCard
          label="Courses In Progress"
          value={inProgressCourses.length}
          icon={BarChart3}
          color="bg-wtms-green"
          href="/dashboard/my-progress"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              My Sessions
            </CardTitle>
            <Link
              href="/dashboard/my-sessions"
              className="text-xs text-primary hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {ongoingSessions.map((session: any) => (
              <div
                key={session.id}
                className="flex items-start gap-4 rounded-lg border border-border p-4"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="size-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {session.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {session.trainer} &middot; {session.department}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="border-0 bg-wtms-teal/10 text-[10px] text-wtms-teal"
                >
                  Ongoing
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              My Progress
            </CardTitle>
            <Link
              href="/dashboard/my-progress"
              className="text-xs text-primary hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {progress
              .filter((p: any) => p.status !== "not-started")
              .map((progress: any) => (
                <div key={progress.sessionTitle} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">
                      {progress.sessionTitle}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {progress.completionRate}%
                    </span>
                  </div>
                  <Progress value={progress.completionRate} className="h-2" />
                  {progress.score > 0 && (
                    <div className="flex items-center gap-1">
                      <TrendingUp className="size-3 text-wtms-green" />
                      <span className="text-xs text-muted-foreground">
                        Score: {progress.score}%
                      </span>
                    </div>
                  )}
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
