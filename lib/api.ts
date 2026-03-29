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
      const { config, status, statusText, data } = error.response;
      const url = config?.url || error.config?.url || "Unknown URL";
      const method = config?.method || error.config?.method || "Unknown method";
      const hasBody = data && Object.keys(data).length > 0;
      console.error("❌ API Error Response:", {
        url,
        method,
        status: status || "No status",
        statusText: statusText || "No statusText",
        message:
          data?.message ||
          (!hasBody
            ? "No error message returned from server"
            : "Unknown error from server"),
        error: data?.error,
        errors: data?.errors,
        body: hasBody ? data : "Empty response body",
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
