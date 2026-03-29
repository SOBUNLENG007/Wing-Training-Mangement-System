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


//  import { api } from "@/lib/api";
// import type { TrainingSession } from "@/lib/types/session";

// export const sessionsService = {
//   // ✅ For employee
//   getMySessions: async (): Promise<TrainingSession[]> => {
//     const res = await api.get("/sessions/my-sessions");
//     return res.data?.payload ?? res.data ?? [];
//   },

//   // ✅ For admin / trainer
//   getAll: async (): Promise<TrainingSession[]> => {
//     const res = await api.get("/sessions");
//     return res.data?.payload ?? res.data ?? [];
//   },

//   // Get session details
//   getSessionDetails: async (sessionId: string) => {
//     const res = await api.get(`/sessions/${sessionId}/details`);
//     return res.data?.payload ?? res.data;
//   },

//   // Enroll
//   enroll: async (sessionId: string): Promise<void> => {
//     await api.post(`/sessions/${sessionId}/enroll`);
//   },
// };



import { api } from "@/lib/api";
import type { TrainingSession } from "@/lib/types/session";

export const sessionsService = {
  // ✅ Get all sessions
  getAll: async (): Promise<TrainingSession[]> => {
    const res = await api.get("/sessions");
    console.log("Fetched sessions:", res.data);
    return res.data?.payload ?? res.data ?? [];
  },

  // ✅ AUTO detect role
  getSessions: async (role?: string): Promise<TrainingSession[]> => {
    const endpoint =
      role === "employee"
        ? "/sessions/my-sessions"
        : "/sessions";

    const res = await api.get(endpoint);
    return res.data?.payload ?? res.data ?? [];
  },

  // ✅ Get one session
  getById: async (id: number): Promise<TrainingSession> => {
    const res = await api.get(`/sessions/${id}`);
    return res.data?.payload ?? res.data;
  },

  // ✅ Create (ADMIN / TRAINER)
  create: async (data: any): Promise<TrainingSession> => {
    console.log("📤 Creating session with payload:", JSON.stringify(data, null, 2));
    try {
      const res = await api.post("/sessions", data);
      console.log("✅ Create response:", res.data);
      return res.data?.payload ?? res.data;
    } catch (error: any) {
      console.error("❌ Create error:", error.response?.data || error.message);
      throw error;
    }
  },

  // ✅ Update
  update: async (id: number, data: any): Promise<TrainingSession> => {
    const res = await api.put(`/sessions/${id}`, data);
    return res.data?.payload ?? res.data;
  },

  // ✅ Delete
  delete: async (id: number): Promise<void> => {
    await api.delete(`/sessions/${id}`);
  },

  // ✅ Enroll (EMPLOYEE)
  enroll: async (sessionId: number): Promise<void> => {
    await api.post(`/sessions/${sessionId}/enroll`);
  },

  // ✅ Unenroll
  unenroll: async (sessionId: number): Promise<void> => {
    await api.delete(`/sessions/${sessionId}/enroll`);
  },
};