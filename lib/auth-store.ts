// lib/auth-store.ts
import { create } from "zustand";
import { setTokens, clearAuth, getPayload, getAccessToken } from "./auth";
import { usersService } from "@/service/users/users.service";

type User = {
  id?: number;
  email: string;
  role: string;
  name?: string;
  departmentId?: number;
  departmentName?: string;
  firstName?: string;
  lastName?: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;

  login: (tokens: {
    accessToken: string;
    refreshToken?: string;
    user: User;
  }) => void;

  logout: () => void;

  loadUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: ({ accessToken, refreshToken, user }) => {
    setTokens(accessToken, refreshToken);

    const payload = getPayload();
    const normalizedUser = user
      ? {
          id: user.id,
          email: user.email,
          role: user.role.toLowerCase(),
          name: user.name,
          departmentId: user.departmentId,
          departmentName: user.departmentName,
        }
      : payload
        ? {
            id: payload.id || (payload as any).userId || undefined,
            email: payload.sub || "",
            role: (payload.role || "").toLowerCase(),
            name: payload.name || payload.sub || "",
            departmentId:
              payload.departmentId || (payload as any).deptId || undefined,
            departmentName:
              payload.departmentName || (payload as any).deptName || undefined,
          }
        : null;

    if (normalizedUser) {
      localStorage.setItem("wtmsUser", JSON.stringify(normalizedUser));
    }

    set({
      user: normalizedUser,
      isAuthenticated: !!normalizedUser,
    });
  },

  logout: () => {
    clearAuth();
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  loadUser: async () => {
    const token = getAccessToken();

    const savedUser =
      typeof window !== "undefined" ? localStorage.getItem("wtmsUser") : null;
    let persistedUser = null;
    if (savedUser) {
      try {
        persistedUser = JSON.parse(savedUser);
      } catch (e) {
        persistedUser = null;
      }
    }

    if (!token && !persistedUser) {
      set({ user: null, isAuthenticated: false });
      return;
    }

    const payload = token ? getPayload() : null;

    let profile = null;

    try {
      profile = await usersService.getProfile();
      if (!profile) {
        clearAuth();
        set({ user: null, isAuthenticated: false });
        return;
      }
    } catch (err) {
      clearAuth();
      set({ user: null, isAuthenticated: false });
      return;
    }

    const user =
      profile ||
      persistedUser ||
      (payload
        ? {
            id: payload.id || (payload as any).userId || undefined,
            email: payload.sub || "",
            role: (payload.role || "").toLowerCase(),
            name: payload.name || payload.sub || "",
            departmentId:
              payload.departmentId || (payload as any).deptId || undefined,
            departmentName:
              payload.departmentName || (payload as any).deptName || undefined,
          }
        : null);

    if (user && typeof window !== "undefined") {
      localStorage.setItem("wtmsUser", JSON.stringify(user));
    }

    set({
      user,
      isAuthenticated: !!user,
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
