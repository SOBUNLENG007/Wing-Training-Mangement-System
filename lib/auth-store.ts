// lib/auth-store.ts
import { create } from "zustand";
import { setTokens, clearAuth, getPayload, getAccessToken } from "./auth";

type User = {
  email: string;
  role: string;
  name?: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;

  login: (tokens: { accessToken: string; refreshToken?: string }) => void;

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
