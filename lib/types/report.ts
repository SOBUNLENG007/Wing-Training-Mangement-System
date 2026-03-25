import { LucideIcon } from "lucide-react";

export type DepartmentStat = {
  dept:       string;
  employees:  number;
  completion: number;
  avgScore:   number;
};

export type Metric = {
  id:    string;
  label: string;
  value: string;
  icon:  LucideIcon;
  color: string;
  bg:    string;
};