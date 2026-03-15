"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, BarChart3, Users, TrendingUp, Award, Building2, ChevronRight, Loader2 } from "lucide-react";

const departmentStats = [
  { dept: "Operations", employees: 60, completion: 82, avgScore: 78 },
  { dept: "Compliance", employees: 55, completion: 95, avgScore: 84 },
  { dept: "Sales", employees: 45, completion: 65, avgScore: 72 },
  { dept: "HR", employees: 25, completion: 40, avgScore: 0 },
  { dept: "IT", employees: 120, completion: 30, avgScore: 71 },
  { dept: "Finance", employees: 35, completion: 100, avgScore: 88 },
];

const metrics = [
  { id: "completion", label: "Completion Rate", value: "73%", icon: BarChart3, color: "text-[#1f6fff]", bg: "bg-[#1f6fff]/10" },
  { id: "score", label: "Avg. Score", value: "79%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
  { id: "learners", label: "Active Learners", value: "215", icon: Users, color: "text-amber-600", bg: "bg-amber-50" },
  { id: "certs", label: "Certifications", value: "48", icon: Award, color: "text-purple-600", bg: "bg-purple-50" },
];

export default function ReportsPage() {
  // Interactive States
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Simulated Export Function
  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // Here you would normally trigger the actual file download
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500 pb-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[#1f6fff]">Reports & Analytics</h1>
          <p className="text-[13px] text-slate-500 mt-1">Training performance insights and analytics across Wing Bank</p>
        </div>
        <Button 
          onClick={handleExport}
          disabled={isExporting}
          className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm transition-all active:scale-95"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin text-[#1f6fff]" />
          ) : (
            <Download className="w-4 h-4 mr-2 text-slate-400" />
          )}
          {isExporting ? "Generating PDF..." : "Export All"}
        </Button>
      </div>

      {/* INTERACTIVE STAT CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isActive = activeMetric === metric.id;
          
          return (
            <div 
              key={metric.id}
              onClick={() => setActiveMetric(isActive ? null : metric.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 group flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg active:scale-95
                ${isActive 
                  ? "border-[#1f6fff] bg-blue-50/30 shadow-md ring-2 ring-[#1f6fff]/20" 
                  : "border-slate-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                }
              `}
            >
              <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${metric.bg} ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                <Icon className={`size-6 ${metric.color}`} />
              </div>
              <div>
                <p className={`text-[13px] font-medium ${isActive ? "text-[#1f6fff]" : "text-slate-500"}`}>
                  {metric.label}
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{metric.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* INTERACTIVE DEPARTMENT PERFORMANCE TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="size-5 text-[#1f6fff]" />
            <h2 className="font-bold text-[16px] text-slate-800">Department Performance</h2>
          </div>
          {selectedDept && (
            <span className="text-[12px] font-medium text-[#1f6fff] bg-blue-50 px-3 py-1 rounded-full animate-in fade-in">
              Viewing: {selectedDept}
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-[12px] uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4 px-6">Department</th>
                <th className="p-4">Employees</th>
                <th className="p-4 w-[250px]">Completion Rate</th>
                <th className="p-4">Avg. Score</th>
                <th className="p-4">Status</th>
                <th className="p-4 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {departmentStats.map((d, i) => {
                const isSelected = selectedDept === d.dept;

                return (
                  <tr 
                    key={i} 
                    onClick={() => setSelectedDept(isSelected ? null : d.dept)}
                    className={`transition-all duration-200 cursor-pointer group
                      ${isSelected ? "bg-blue-50/40" : "hover:bg-slate-50"}
                    `}
                  >
                    {/* Department Name */}
                    <td className="p-4 px-6">
                      <p className={`font-semibold text-[14px] transition-colors ${isSelected ? "text-[#1f6fff]" : "text-slate-800 group-hover:text-[#1f6fff]"}`}>
                        {d.dept}
                      </p>
                    </td>
                    
                    {/* Employee Count */}
                    <td className="p-4 text-[14px] text-slate-600 font-medium">
                      {d.employees}
                    </td>
                    
                    {/* Completion Progress Bar */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-full max-w-[120px] h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${
                              d.completion === 100 ? "bg-green-500" : 
                              d.completion >= 50 ? "bg-[#1f6fff]" : "bg-amber-500"
                            }`}
                            style={{ width: `${d.completion}%` }}
                          />
                        </div>
                        <span className="text-[13px] font-bold text-slate-700 w-9">{d.completion}%</span>
                      </div>
                    </td>

                    {/* Avg Score */}
                    <td className="p-4 text-[14px] font-bold text-slate-700">
                      {d.avgScore > 0 ? `${d.avgScore}%` : <span className="text-slate-300 font-normal">N/A</span>}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                        d.completion === 100 
                          ? "bg-green-50 text-green-600" 
                          : d.completion > 50 
                            ? "bg-blue-50 text-blue-600" 
                            : "bg-amber-50 text-amber-600"
                      }`}>
                        <span className={`size-1.5 rounded-full ${
                          d.completion === 100 ? "bg-green-500" : d.completion > 50 ? "bg-blue-500" : "bg-amber-500"
                        }`}></span>
                        {d.completion === 100 ? "Complete" : d.completion > 50 ? "On Track" : "Behind"}
                      </span>
                    </td>

                    {/* Action Arrow */}
                    <td className="p-4 px-6 text-right">
                      <ChevronRight className={`size-5 transition-all duration-200 ${
                        isSelected ? "text-[#1f6fff] translate-x-1" : "text-slate-300 group-hover:text-[#1f6fff] group-hover:translate-x-1"
                      }`} />
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}