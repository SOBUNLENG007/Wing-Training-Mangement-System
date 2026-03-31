"use client";
import { useEffect, useState } from "react";
import { sessionsService } from "@/service/sessions/sessions.service";
import { assignmentsService } from "@/service/assignments/assignments.service";
import { notificationsService } from "@/service/notifications/notifications.service";
import { attendanceService } from "@/service/attendance/attendance.service";
import { usersService } from "@/service/users/users.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Plus,
  Settings,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  Users,
  ArrowRight,
  Clock,
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

export default function AdminDashboard({ userName }: { userName: string }) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [
          sessionsRes,
          assignmentsRes,
          notificationsRes,
          attendanceRes,
          usersRes,
        ] = await Promise.all([
          sessionsService.getAll(),
          assignmentsService.getAll(),
          notificationsService.getAll(),
          attendanceService.getAll(),
          usersService.getAll(),
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
        setNotifications(
          Array.isArray((notificationsRes as any)?.payload)
            ? (notificationsRes as any).payload
            : Array.isArray(notificationsRes)
              ? notificationsRes
              : [],
        );
        setAttendance(
          Array.isArray((attendanceRes as any)?.payload)
            ? (attendanceRes as any).payload
            : Array.isArray(attendanceRes)
              ? attendanceRes
              : [],
        );
        setUsers(
          Array.isArray((usersRes as any)?.payload)
            ? (usersRes as any).payload
            : Array.isArray(usersRes)
              ? usersRes
              : [],
        );
      } catch (e) {}
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  const ongoingSessions = sessions.filter((s: any) => s.status === "ongoing");
  const totalUsers = users.length;
  const totalTrainers = users.filter(
    (u: any) => u.role?.toLowerCase() === "trainer",
  ).length;
  const totalEmployees = users.filter(
    (u: any) => u.role?.toLowerCase() === "employee",
  ).length;
  const unreadNotifications = notifications.filter((n: any) => !n.read);
  const submittedAssignments = assignments.filter(
    (a: any) => a.status === "submitted",
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
          Here is the full administrative overview of the training system.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Users"
          value={totalUsers}
          icon={Users}
          color="bg-primary"
          href="/dashboard/users"
        />
        <StatCard
          label="Total Trainers"
          value={totalTrainers}
          icon={Briefcase}
          color="bg-wtms-teal"
          href="/dashboard/trainers"
        />
        <StatCard
          label="Ongoing Sessions"
          value={ongoingSessions.length}
          icon={BookOpen}
          color="bg-wtms-orange"
          href="/dashboard/sessions"
        />
        <StatCard
          label="Participation Rate"
          value={`${participationRate}%`}
          icon={BarChart3}
          color="bg-wtms-green"
          href="/dashboard/reports"
        />
      </div>
      <div>
        <h2 className="mb-4 text-base font-semibold text-foreground">
          Admin Management
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <QuickActionCard
            title="User Management"
            description="Manage employees, trainers, and admins"
            icon={Users}
            color="bg-primary"
            href="/dashboard/users"
            actions={[
              { label: "Create User", icon: Plus },
              { label: "Assign Role", icon: ShieldCheck },
              { label: "Enable / Disable", icon: Settings },
              { label: "Department Setup", icon: Briefcase },
            ]}
          />
          <QuickActionCard
            title="Training Sessions"
            description="Oversee all training programs"
            icon={BookOpen}
            color="bg-wtms-teal"
            href="/dashboard/sessions"
            actions={[
              { label: "Create Session", icon: Plus },
              { label: "Assign Trainer", icon: UserPlus },
              { label: "Schedule", icon: Calendar },
              { label: "Track Status", icon: Clock },
            ]}
          />
          <QuickActionCard
            title="Reports & Analytics"
            description="Download reports and monitor performance"
            icon={BarChart3}
            color="bg-wtms-orange"
            href="/dashboard/reports"
            actions={[
              { label: "Export PDF", icon: Download },
              { label: "Attendance", icon: Users },
              { label: "Progress", icon: TrendingUp },
              { label: "Assignments", icon: ClipboardCheck },
            ]}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              Submitted Work to Review
            </CardTitle>
            <Link
              href="/dashboard/assignments"
              className="text-xs text-primary hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {submittedAssignments.length > 0 ? (
              submittedAssignments.map((a: any) => (
                <div
                  key={a.id}
                  className="flex items-start gap-4 rounded-lg border border-border p-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-wtms-orange/10">
                    <ClipboardCheck className="size-5 text-wtms-orange" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {a.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {a.sessionTitle}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 text-xs"
                  >
                    Review
                  </Button>
                </div>
              ))
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No submissions waiting.
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              Recent Notifications
            </CardTitle>
            <Link
              href="/dashboard/notifications"
              className="text-xs text-primary hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {unreadNotifications.slice(0, 5).map((n: any) => (
              <div
                key={n.id}
                className="flex items-start gap-3 rounded-lg bg-muted/50 p-3"
              >
                <div className="mt-0.5 size-2 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {n.title}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                    {n.message}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
