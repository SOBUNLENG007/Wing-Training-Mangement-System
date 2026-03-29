"use client";

export type JwtPayload = {
  sub?: string;
  name?: string;
  id?: number;
  role?: "ADMIN" | "EMPLOYEE" | "TRAINER";
  departmentId?: number;
  departmentName?: string;
  exp?: number;
};

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken?: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    const payload = JSON.parse(jsonPayload);
    console.log("🔍 JWT Payload decoded:", payload);
    return payload as JwtPayload;
  } catch (error) {
    console.error("❌ Failed to decode token:", error);
    return null;
  }
}

export function getPayload(): JwtPayload | null {
  const token = getAccessToken();
  if (!token) return null;
  const payload = decodeToken(token);
  console.log("📋 getPayload result:", payload);
  return payload;
}

export function getRole(): string | null {
  return getPayload()?.role ?? null;
}

export function isAdmin(): boolean {
  return getRole() === "ADMIN";
}

export function isUser(): boolean {
  return getRole() === "EMPLOYEE";
}

export function getEmail(): string | null {
  return getPayload()?.sub ?? null;
}

export function isTokenExpired(): boolean {
  const exp = getPayload()?.exp;
  if (!exp) return true;
  return Date.now() >= exp * 1000;
}

export function isLoggedIn(): boolean {
  const token = getAccessToken();
  return !!token && !isTokenExpired();
}
