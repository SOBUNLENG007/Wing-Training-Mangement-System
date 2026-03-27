"use client";

import { useState, useEffect } from "react";
import { RoleGuard } from "@/components/auth/role-guard";
import { reportsService } from "@/service/reports/reports.service";
import type { DepartmentStat, Metric } from "@/lib/types/report";

import { METRICS } from "../reports/utils";
import { MetricCard, DepartmentTable, ExportButton } from "./components";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

function ReportsPageContent() {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [departmentStats, setDepartmentStats] = useState<DepartmentStat[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    loadReportsData();
  }, []);

  const loadReportsData = async () => {
    try {
      setLoading(true);
      const data = await reportsService.getDepartmentStats();
      setDepartmentStats(data);
    } catch (error) {
      console.error("Failed to load reports data:", error);
      toast.error("Failed to load reports data");
    } finally {
      setLoading(false);
    }
  };

  function handleMetricClick(id: string) {
    setActiveMetric((prev) => (prev === id ? null : id));
  }

  function handleDeptSelect(dept: string) {
    setSelectedDept((prev) => (prev === dept ? null : dept));
  }

  return (
    <div className="mx-auto max-w-7xl animate-in space-y-6 fade-in pb-10 duration-500">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-[22px] font-bold text-[#1f6fff]">
            Reports & Analytics
          </h1>
          <p className="mt-1 text-[13px] text-slate-500">
            Training performance insights and analytics across Wing Bank
          </p>
        </div>
        <ExportButton />
      </div>

      {/* Metric cards */}
      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              isActive={activeMetric === metric.id}
              onClick={handleMetricClick}
            />
          ))}
        </div>
      )}

      {/* Department table */}
      {loading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <DepartmentTable
          stats={departmentStats}
          selectedDept={selectedDept}
          onSelect={handleDeptSelect}
        />
      )}
    </div>
  );
}

export default function ReportsPage() {
  return (
    <RoleGuard allowed={["admin", "trainer"]}>
      <ReportsPageContent />
    </RoleGuard>
  );
}
