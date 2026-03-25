// import { baseUrl } from '../../utils/constants';

// // ── Login ────────────────────────────────────────────────────────────────
// export const loginService = {
//   async login(credentials: { email: string; password: string }) {
//     const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(credentials),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.message || 'Invalid email or password');
//     }

//     // Assuming your Spring Boot returns { payload: { user: {...}, accessToken: "..." } }
//     return data.payload;
//   }
// };



import { api } from "@/lib/api";

export const authService = {
  login: async (data: { email: string; password: string }) => {
    const res = await api.post("/auth/login", data);
    return res.data;
  },

  register: async (data: any) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },
};