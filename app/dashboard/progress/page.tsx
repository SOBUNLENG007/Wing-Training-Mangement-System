"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-store";
import { RoleGuard } from "@/components/auth/role-guard";
import { progressService } from "@/service/progress/progress.service";
import { sessionsService } from "@/service/sessions/sessions.service";
import type { ProgressRecord } from "@/lib/types/progress"
import type { TrainingSession } from "@/lib/types/session";

import { calcSummaryStats } from "./utils";
import { SummaryCards, ExportActions, ProgressTable } from "./components";
import { SessionAnalyticsGrid } from "./components/Sessionanalyticsgrid";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

function ProgressPageContent() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressRecord[]>([]);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);

  const canExport = user?.role === "admin" || user?.role === "trainer";

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [progressData, sessionsData] = await Promise.all([
        progressService.getAll(),
        sessionsService.getAll()
      ]);
      setProgress(progressData);
      setSessions(sessionsData);
    } catch (error) {
      toast.error("Failed to load progress data");
    } finally {
      setLoading(false);
    }
  };

  const stats = calcSummaryStats(progress);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-8 w-80" />
          <Skeleton className="h-4 w-96" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Progress & Performance Tracking</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor employee progress, generate performance reports, and view analytics.
          </p>
        </div>
        {canExport && <ExportActions />}
      </div>

      {/* Summary stat cards */}
      <SummaryCards stats={stats} />

      {/* Training completion table */}
      <ProgressTable entries={progress} />

      {/* Session analytics grid */}
      <SessionAnalyticsGrid sessions={sessions} />
    </div>
  );
}

export default function ProgressPage() {
  return (
    <RoleGuard allowed={["admin", "trainer"]}>
      <ProgressPageContent />
    </RoleGuard>
  );
}