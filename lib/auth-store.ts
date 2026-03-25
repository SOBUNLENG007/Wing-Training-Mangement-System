// "use client"

// import { useSyncExternalStore } from "react"
// import type { User, Role } from "./mock-data"
// import { mockUsers } from "./mock-data"

// let _user: User | null = null
// const _listeners = new Set<() => void>()

// function notify() {
//   _listeners.forEach((l) => l())
// }
 
// export function getUser(): User | null {
//   return _user
// }

// export function login(email: string, _password: string): { success: boolean; error?: string } {
//   const found = mockUsers.find((u) => u.email === email)
//   if (found) {
//     _user = found
//     if (typeof window !== "undefined") {
//       sessionStorage.setItem("wtms_user", JSON.stringify(found))
//     }
//     notify()
//     return { success: true }
//   }
//   const role: Role = email.includes("admin") ? "admin" : email.includes("trainer") ? "trainer" : "employee"
//   const newUser: User = {
//     id: Math.random().toString(36).slice(2),
//     name: email.split("@")[0],
//     email,
//     role,
//     department: "General",
//   }
//   _user = newUser
//   if (typeof window !== "undefined") {
//     sessionStorage.setItem("wtms_user", JSON.stringify(newUser))
//   }
//   notify()
//   return { success: true }
// }

// export function register(name: string, email: string, _password: string, role: Role): { success: boolean; error?: string } {
//   const newUser: User = {
//     id: Math.random().toString(36).slice(2),
//     name,
//     email,
//     role,
//     department: "General",
//   }
//   _user = newUser
//   if (typeof window !== "undefined") {
//     sessionStorage.setItem("wtms_user", JSON.stringify(newUser))
//   }
//   notify()
//   return { success: true }
// }

// export function logout() {
//   _user = null
//   if (typeof window !== "undefined") {
//     sessionStorage.removeItem("wtms_user")
//   }
//   notify()
// }

// export function switchRole(role: Role) {
//   if (_user) {
//     _user = { ..._user, role }
//     if (typeof window !== "undefined") {
//       sessionStorage.setItem("wtms_user", JSON.stringify(_user))
//     }
//     notify()
//   }
// }

// export function restoreSession(): User | null {
//   if (typeof window !== "undefined") {
//     const stored = sessionStorage.getItem("wtms_user")
//     if (stored) {
//       _user = JSON.parse(stored)
//       return _user
//     }
//   }
//   return null
// }

// function subscribe(listener: () => void) {
//   _listeners.add(listener)
//   return () => { _listeners.delete(listener) }
// }

// export function useAuth() {
//   const user = useSyncExternalStore(subscribe, getUser, () => null)
//   return {
//     user,
//     isAuthenticated: !!user,
//     login,
//     register,
//     logout,
//     switchRole,
//     restoreSession,
//   }
// }



// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// export interface User {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   role: string;
// }

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   setAuth: (user: User, token: string) => void;
//   logout: () => void;
// }

// export const useAuth = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       token: null,
//       setAuth: (user, token) => set({ user, token }),
//       logout: () => {
//         set({ user: null, token: null });
//         localStorage.removeItem('auth-storage');
//       },
//     }),
//     { name: 'auth-storage' }
//   )
// );







// lib/auth-store.ts
import { create } from "zustand";
import {
  setTokens,
  clearAuth,
  getPayload,
  getAccessToken,
} from "./auth";

type User = {
  email: string;
  role: string;
  name?: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;

  login: (tokens: {
    accessToken: string;
    refreshToken?: string;
  }) => void;

  logout: () => void;

  loadUser: () => void;
};


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: ({ accessToken, refreshToken }) => {
    setTokens(accessToken, refreshToken);

    const payload = getPayload();

    set({
      user: payload
        ? {
            email: payload.sub || "",
            role: (payload.role || "").toLowerCase(),
            name: payload.name || payload.sub || "",
          }
        : null,
      isAuthenticated: true,
    });
  },

  logout: () => {
    clearAuth();
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  loadUser: () => {
    const token = getAccessToken();
    if (!token) return;

    const payload = getPayload();

    set({
      user: payload
        ? {
            email: payload.sub || "",
            role: (payload.role || "").toLowerCase(),
            name: payload.name || payload.sub || "",
          }
        : null,
      isAuthenticated: true,
    });
  },
}));

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const loadUser = useAuthStore((state) => state.loadUser);

  return {
    user,
    isAuthenticated,
    login,
    logout,
    loadUser,
    restoreSession: loadUser,
  };
}











// "use client";

// import { useSyncExternalStore } from "react";
// import type { User, Role } from "./mock-data";
// import { mockUsers } from "./mock-data";

// let _user: User | null = null;
// const _listeners = new Set<() => void>();

// function notify() {
//   _listeners.forEach((listener) => listener());
// }

// export function getUser(): User | null {
//   return _user;
// }

// export function getUserRole(): Role | null {
//   return _user?.role ?? null;
// }

// export function hasRole(role: Role): boolean {
//   return _user?.role === role;
// }

// export function hasAnyRole(roles: Role[]): boolean {
//   return !!_user && roles.includes(_user.role);
// }

// export function isAdmin(): boolean {
//   return _user?.role === "admin";
// }

// export function isTrainer(): boolean {
//   return _user?.role === "trainer";
// }

// export function isEmployee(): boolean {
//   return _user?.role === "employee";
// }

// // export function login(
// //   email: string,
// //   _password: string
// // ): { success: boolean; error?: string } {
// //   const found = mockUsers.find((u) => u.email === email);

// //   if (found) {
// //     _user = found;

// //     if (typeof window !== "undefined") {
// //       sessionStorage.setItem("wtms_user", JSON.stringify(found));
// //     }

// //     notify();
// //     return { success: true };
// //   }

// //   const role: Role = email.includes("admin")
// //     ? "admin"
// //     : email.includes("trainer")
// //     ? "trainer"
// //     : "employee";

// //   const newUser: User = {
// //     id: Math.random().toString(36).slice(2),
// //     name: email.split("@")[0],
// //     email,
// //     role,
// //     department: "General",
// //   };

// //   _user = newUser;

// //   if (typeof window !== "undefined") {
// //     sessionStorage.setItem("wtms_user", JSON.stringify(newUser));
// //   }

// //   notify();
// //   return { success: true };
// // }

// export function login(
//   email: string,
//   _password: string
// ): { success: boolean; error?: string } {
//   const found = mockUsers.find((u) => u.email === email);

//   if (!found) {
//     return { success: false, error: "Invalid email or password" };
//   }

//   _user = found;

//   if (typeof window !== "undefined") {
//     sessionStorage.setItem("wtms_user", JSON.stringify(found));
//   }

//   notify();
//   return { success: true };
// }

// export function register(
//   name: string,
//   email: string,
//   _password: string
// ): { success: boolean; error?: string } {
//   const existing = mockUsers.find((u) => u.email === email);

//   if (existing) {
//     return { success: false, error: "Email already exists" };
//   }

//   const newUser: User = {
//     id: Math.random().toString(36).slice(2),
//     name,
//     email,
//     role: "employee",
//     department: "General",
//   };

//   _user = newUser;

//   if (typeof window !== "undefined") {
//     sessionStorage.setItem("wtms_user", JSON.stringify(newUser));
//   }

//   notify();
//   return { success: true };
// }

// export function logout() {
//   _user = null;

//   if (typeof window !== "undefined") {
//     sessionStorage.removeItem("wtms_user");
//   }

//   notify();
// }

// export function switchRole(role: Role) {
//   if (_user) {
//     _user = { ..._user, role };

//     if (typeof window !== "undefined") {
//       sessionStorage.setItem("wtms_user", JSON.stringify(_user));
//     }

//     notify();
//   }
// }

// export function restoreSession(): User | null {
//   if (typeof window === "undefined") return null;

//   const stored = sessionStorage.getItem("wtms_user");
//   if (!stored) return null;

//   try {
//     _user = JSON.parse(stored);
//     return _user;
//   } catch {
//     sessionStorage.removeItem("wtms_user");
//     _user = null;
//     return null;
//   }
// }

// function subscribe(listener: () => void) {
//   _listeners.add(listener);
//   return () => {
//     _listeners.delete(listener);
//   };
// }

// export function useAuth() {
//   const user = useSyncExternalStore(subscribe, getUser, () => null);

//   return {
//     user,
//     role: user?.role ?? null,
//     isAuthenticated: !!user,

//     login,
//     register,
//     logout,
//     switchRole,
//     restoreSession,

//     getUserRole,
//     hasRole,
//     hasAnyRole,
//     isAdmin,
//     isTrainer,
//     isEmployee,
//   };
// }




// import { create } from "zustand";
// import { loginApi, logout as clearTokens, getAccessToken } from "./auth-service";
// import { fetchApi } from "./api";

// type AuthUser = {
//   id:         string;
//   email:      string;
//   firstName:  string;
//   lastName:   string;
//   role:       string;
//   department?: string;
// };

// // Derived helper used in components
// export function getFullName(user: AuthUser) {
//   return `${user.firstName} ${user.lastName}`;
// }

// type AuthStore = {
//   user:           AuthUser | null;
//   isLoading:      boolean;
//   error:          string | null;
//   login:          (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
//   logout:         () => void;
//   restoreSession: () => Promise<void>;
// };

// export const useAuth = create<AuthStore>((set) => ({
//   user:      null,
//   isLoading: false,
//   error:     null,

//   // ── Login ──────────────────────────────────────────────────────────────
//   login: async (email, password, rememberMe = false) => {
//     set({ isLoading: true, error: null });
//     try {
//       const res = await loginApi(email, password, rememberMe);

//       if (!res.success) {
//         set({ error: res.message, isLoading: false });
//         return false;
//       }

//       // If backend returns user in login response — use it directly
//       if (res.payload?.user) {
//         set({ user: res.payload.user, isLoading: false });
//         return true;
//       }

//       // Otherwise fetch /me with the new token
//       const { payload } = await fetchApi<{ payload: AuthUser }>("/api/v1/auth/me");
//       set({ user: payload, isLoading: false });
//       return true;

//     } catch (err) {
//       set({ error: (err as Error).message, isLoading: false });
//       return false;
//     }
//   },

//   // ── Logout ─────────────────────────────────────────────────────────────
//   logout: () => {
//     clearTokens();          // clears both localStorage + sessionStorage
//     set({ user: null });
//   },

//   // ── Restore session on page refresh ────────────────────────────────────
//   restoreSession: async () => {
//     const token = getAccessToken();
//     if (!token) return;     // no token = not logged in, do nothing

//     set({ isLoading: true });
//     try {
//       const { payload } = await fetchApi<{ payload: AuthUser }>("/api/v1/auth/me");
//       set({ user: payload, isLoading: false });
//     } catch {
//       clearTokens();
//       set({ user: null, isLoading: false });
//     }
//   },
// }));