// import { api } from "@/lib/api";
// import type { TrainingSession } from "@/lib/types/session";

// export const sessionsService = {
//   // Get all sessions\

//   getAll: async (): Promise<TrainingSession[]> => {
//     const res = await api.get("/sessions");
//     console.log("Fetched sessions:", res.data);
//     return res.data;
    
//   },

//   // Get session by ID
//   getById: async (id: string): Promise<TrainingSession> => {
//     const res = await api.get(`/sessions/${id}`);
//     return res.data;
//   },



//   // Create new session
//   create: async (data: Omit<TrainingSession, "id">): Promise<TrainingSession> => {
//     const res = await api.post("/sessions", data);
//     return res.data;
//   },

//   // Update session
//   update: async (id: string, data: Partial<TrainingSession>): Promise<TrainingSession> => {
//     const res = await api.put(`/sessions/${id}`, data);
//     return res.data;
//   },

//   // Delete session
//   delete: async (id: string): Promise<void> => {
//     await api.delete(`/sessions/${id}`);
//   },

//   // Get sessions by department
//   getByDepartment: async (department: string): Promise<TrainingSession[]> => {
//     const res = await api.get(`/sessions/department/${department}`);
//     return res.data;
//   },

//   // Get sessions by trainer
//   getByTrainer: async (trainerId: string): Promise<TrainingSession[]> => {
//     const res = await api.get(`/sessions/trainer/${trainerId}`);
//     return res.data;
//   },

//   // Enroll in session
//   enroll: async (sessionId: string): Promise<void> => {
//     await api.post(`/sessions/${sessionId}/enroll`);
//   },

//   // Unenroll from session
//   unenroll: async (sessionId: string): Promise<void> => {
//     await api.delete(`/sessions/${sessionId}/enroll`);
//   },
// };


import { api } from "@/lib/api";
import type { TrainingSession } from "@/lib/types/session";
import type { Material } from "@/lib/types/material";
import type { Assignment } from "@/lib/types/assignment";

export const sessionsService = {
  // Get all sessions for the current user
  getMySessions: async (): Promise<TrainingSession[]> => {
    const res = await api.get("/sessions/my-sessions");
    return res.data.payload || res.data;
  },

  // Get specific details for a session (Materials, Assignments, etc.)
  getSessionDetails: async (sessionId: string) => {
    const res = await api.get(`/sessions/${sessionId}/details`);
    return res.data.payload || res.data;
  },

  // Enroll in a new session
  enroll: async (sessionId: string): Promise<void> => {
    await api.post(`/sessions/${sessionId}/enroll`);
  }
};