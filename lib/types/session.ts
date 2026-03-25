export type SessionStatus = "ongoing" | "upcoming" | "completed";
 
export type TrainingSession = {
  id:            string;
  title:         string;
  description:   string;
  trainer:       string;
  department:    string;
  startDate:     string;
  endDate:       string;
  status:        SessionStatus;
  enrolledCount: number;
  maxCapacity:   number;
};