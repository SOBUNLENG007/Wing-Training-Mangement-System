"use client";
import { useEffect, useState } from "react";
import { sessionsService } from "@/service/sessions/sessions.service";
import { assignmentsService } from "@/service/assignments/assignments.service";
import { attendanceService } from "@/service/attendance/attendance.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Plus,
  Settings,
  TrendingUp,
  UserPlus,
  Users,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

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

function QuickActionCard({
  title,
  description,
  icon: Icon,
  color,
  href,
  actions,
}: any) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="mb-4 flex items-start gap-3">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${color}`}
          >
            <Icon className="size-5 text-card" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        <div className="mb-3 flex flex-wrap gap-2">
          {actions.map((action: any) => (
            <Badge
              key={action.label}
              variant="outline"
              className="cursor-default gap-1 px-2 py-1 text-[10px]"
            >
              <action.icon className="size-3" />
              {action.label}
            </Badge>
          ))}
        </div>
        <Link href={href}>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between gap-1.5 text-xs"
          >
            Go to Management
            <ArrowRight className="size-3.5" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function TrainerDashboard({ userName }: { userName: string }) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [sessionsRes, assignmentsRes, attendanceRes] = await Promise.all([
          sessionsService.getAll(),
          assignmentsService.getAll(),
          attendanceService.getAll(),
        ]);
        setSessions(
          Array.isArray((sessionsRes as any)?.payload)
            ? (sessionsRes as any).payload
            : Array.isArray(sessionsRes)
              ? sessionsRes
              : [],
        );
        setAssignments(
          Array.isArray((assignmentsRes as any)?.payload)
            ? (assignmentsRes as any).payload
            : Array.isArray(assignmentsRes)
              ? assignmentsRes
              : [],
        );
        setAttendance(
          Array.isArray((attendanceRes as any)?.payload)
            ? (attendanceRes as any).payload
            : Array.isArray(attendanceRes)
              ? attendanceRes
              : [],
        );
      } catch (e) {}
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  const ongoingSessions = sessions.filter((s: any) => s.status === "ongoing");
  const upcomingSessions = sessions.filter((s: any) => s.status === "upcoming");
  const pendingAssignments = assignments.filter(
    (a: any) => a.status === "pending",
  );
  const submittedAssignments = assignments.filter(
    (a: any) => a.status === "submitted",
  );
  const totalEnrolled = sessions.reduce(
    (a: number, s: any) => a + (s.enrolledCount || 0),
    0,
  );
  const totalPresent = attendance.filter(
    (r: any) => r.status === "present" || r.status === "late",
  ).length;
  const participationRate =
    attendance.length > 0
      ? Math.round((totalPresent / attendance.length) * 100)
      : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground text-balance">
          Welcome back, {userName.split(" ")[0]}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here is your trainer overview and teaching activity summary.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Ongoing Sessions"
          value={ongoingSessions.length}
          icon={BookOpen}
          color="bg-primary"
          href="/dashboard/sessions"
        />
        <StatCard
          label="Total Enrolled"
          value={totalEnrolled}
          icon={Users}
          color="bg-wtms-teal"
          href="/dashboard/attendance"
        />
        <StatCard
          label="Pending Reviews"
          value={submittedAssignments.length}
          icon={ClipboardCheck}
          color="bg-wtms-orange"
          href="/dashboard/assignments"
        />
        <StatCard
          label="Participation Rate"
          value={`${participationRate}%`}
          icon={BarChart3}
          color="bg-wtms-green"
          href="/dashboard/progress"
        />
      </div>
      <div>
        <h2 className="mb-4 text-base font-semibold text-foreground">
          Trainer Management
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <QuickActionCard
            title="Session Management"
            description="Manage assigned training sessions"
            icon={BookOpen}
            color="bg-primary"
            href="/dashboard/sessions"
            actions={[
              { label: "Create Program", icon: Plus },
              { label: "Assign Employees", icon: UserPlus },
              { label: "Set Schedule", icon: Calendar },
              { label: "Enable / Disable", icon: Settings },
            ]}
          />
          <QuickActionCard
            title="Material Management"
            description="Upload and manage learning materials"
            icon={FileText}
            color="bg-wtms-teal"
            href="/dashboard/materials"
            actions={[
              { label: "Upload Documents", icon: FileText },
              { label: "Control Access", icon: Users },
              { label: "Slides / PDF", icon: FileText },
              { label: "Organize", icon: Settings },
            ]}
          />
          <QuickActionCard
            title="Assessment Management"
            description="Create and grade assessments"
            icon={ClipboardCheck}
            color="bg-wtms-orange"
            href="/dashboard/assignments"
            actions={[
              { label: "Create Quiz", icon: Plus },
              { label: "Set Deadline", icon: Calendar },
              { label: "Grade Work", icon: CheckCircle2 },
              { label: "View Submissions", icon: FileText },
            ]}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              Upcoming Sessions
            </CardTitle>
            <Link
              href="/dashboard/sessions"
              className="text-xs text-primary hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session: any) => (
              <div
                key={session.id}
                className="flex items-start gap-4 rounded-lg border border-border p-4"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="size-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {session.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {session.department}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="border-0 bg-primary/10 text-[10px] text-primary"
                >
                  Upcoming
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              Assignments Needing Attention
            </CardTitle>
            <Link
              href="/dashboard/assignments"
              className="text-xs text-primary hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingAssignments.length > 0 ? (
              pendingAssignments.map((a: any) => (
                <div
                  key={a.id}
                  className="flex items-start gap-4 rounded-lg border border-border p-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-wtms-orange/10">
                    <AlertTriangle className="size-5 text-wtms-orange" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {a.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {a.sessionTitle}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto size-8 text-wtms-green/40" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No pending assignments.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
