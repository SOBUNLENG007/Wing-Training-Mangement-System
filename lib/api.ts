// import { useAuth } from "./auth-store";

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// export async function fetchApi<T = any>(path: string, options?: RequestInit): Promise<T> {
//   const token = useAuth.getState().token;

//   const res = await fetch(`${BASE_URL}${path}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       ...options?.headers,
//     },
//   });

//   // If Java backend returns 401, logout immediately
//   if (res.status === 401) {
//     useAuth.getState().logout();
//     if (typeof window !== "undefined") window.location.href = "/";
//     throw new Error("Session expired.");
//   }

//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Request failed");
//   return data;
// }


// import { useAuth } from "./auth-store";

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// export async function fetchApi<T = any>(path: string, options?: RequestInit): Promise<T> {
//   const token = useAuth.getState().token;

//   const res = await fetch(`${BASE_URL}${path}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       ...options?.headers,
//     },
//   });

//   if (res.status === 401) {
//     useAuth.getState().logout();
//     if (typeof window !== "undefined") window.location.href = "/";
//     throw new Error("Session expired.");
//   }

//   const data = await res.json();
//   // Important: We return the whole 'data' which contains 'payload'
//   if (!res.ok) throw new Error(data.message || "Request failed");
//   return data;
// }


// lib/api.ts
import axios from "axios";
import { getAccessToken, clearAuth } from "./auth";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ---------- REQUEST ----------
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// ---------- RESPONSE ----------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();

      // redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);