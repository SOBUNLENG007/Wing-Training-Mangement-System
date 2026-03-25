// lib/types/assignment.ts
export type AssignmentType = "assignment" | "quiz";

export type AssignmentStatus = "pending" | "submitted" | "graded" | "overdue";

export interface Assignment {
  id: string;
  title: string;
  type: AssignmentType;
  sessionId: string;
  sessionTitle: string;
  deadline: string;
  status: AssignmentStatus;
  score?: number;
  maxScore: number;
  allowLate: boolean;
  description?: string;
  instructions?: string;
  attachments?: string[];
}