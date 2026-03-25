export type ProgressStatus = "completed" | "in-progress" | "not-started";

export type ProgressEntry = {
  sessionTitle:   string;
  completionRate: number;
  score:          number;
  status:         ProgressStatus;
};

export type ProgressRecord = {
  sessionTitle: string;
  completionRate: number;
  score: number;
  status: ProgressStatus;
};

export type SummaryStat = {
  label: string;
  value: string | number;
  icon:  React.ElementType;
  bg:    string;
};