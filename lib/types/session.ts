export type SessionStatus = "ongoing" | "upcoming" | "completed";

export type TrainingSession = {
  id: string;
  title: string;
  description: string;
  trainer: string;
  departmentName: string;
  startDate: string;
  endDate: string;
  status: boolean; // changed from SessionStatus to boolean
  enrolledCount: number;
  numSession: number;
  instructorName: string; // added for display purposes
};
