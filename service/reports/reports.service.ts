import { api } from "@/lib/api";
import type { DepartmentStat } from "@/lib/types/report";

export const reportsService = {
  // Get department statistics
  getDepartmentStats: async (): Promise<DepartmentStat[]> => {
    const res = await api.get("/reports/departments");
    return res.data;
  },

  // Get training completion report
  getCompletionReport: async (params?: {
    startDate?: string;
    endDate?: string;
    department?: string;
  }): Promise<any> => {
    const res = await api.get("/reports/completion", { params });
    return res.data;
  },

  // Get attendance report
  getAttendanceReport: async (params?: {
    startDate?: string;
    endDate?: string;
    department?: string;
  }): Promise<any> => {
    const res = await api.get("/reports/attendance", { params });
    return res.data;
  },

  // Get performance report
  getPerformanceReport: async (params?: {
    startDate?: string;
    endDate?: string;
    department?: string;
  }): Promise<any> => {
    const res = await api.get("/reports/performance", { params });
    return res.data;
  },

  // Export report
  exportReport: async (type: string, format: "pdf" | "excel" | "csv" = "pdf"): Promise<Blob> => {
    const res = await api.get(`/reports/export/${type}`, {
      params: { format },
      responseType: "blob",
    });
    return res.data;
  },

  // Get dashboard metrics
  getDashboardMetrics: async (): Promise<{
    totalEmployees: number;
    totalSessions: number;
    completionRate: number;
    averageScore: number;
  }> => {
    const res = await api.get("/reports/metrics");
    return res.data;
  },
};