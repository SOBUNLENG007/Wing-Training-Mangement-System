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
    // Log detailed error information
    if (error.response) {
      console.error("❌ API Error Response:", {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.response.data?.message,
        error: error.response.data?.error,
        errors: error.response.data?.errors,
        body: error.response.data,
      });
    } else if (error.request) {
      console.error("❌ No Response Received:", error.request);
    } else {
      console.error("❌ Error:", error.message);
    }

    if (error.response?.status === 401) {
      clearAuth();

      // redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
