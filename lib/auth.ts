// import CredentialsProvider from "next-auth/providers/credentials";
// import type { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email:    { label: "Email",    type: "email"    },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;
//         try {
//           const res = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
//             {
//               method:  "POST",
//               headers: { "Content-Type": "application/json" },
//               body:    JSON.stringify({
//                 email:    credentials.email,
//                 password: credentials.password,
//               }),
//             }
//           );
//           const data = await res.json();
//           if (!res.ok || !data.success) return null;
//           return {
//             id:          data.payload.user.id,
//             email:       data.payload.user.email,
//             firstName:   data.payload.user.firstName,
//             lastName:    data.payload.user.lastName,
//             role:        data.payload.user.role,
//             accessToken: data.payload.accessToken,
//           };
//         } catch {
//           return null;
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id          = user.id;
//         token.firstName   = (user as any).firstName;
//         token.lastName    = (user as any).lastName;
//         token.role        = (user as any).role;
//         token.accessToken = (user as any).accessToken;
//       }
//       return token;
//     },
//     // async session({ session, token }) {
//     //   session.user.id          = token.id          as string;
//     //   session.user.firstName   = token.firstName   as string;
//     //   session.user.lastName    = token.lastName    as string;
//     //   session.user.role        = token.role        as string;
//     //   session.user.accessToken = token.accessToken as string;
//     //   return session;
//     // },
//   },

//   pages:   { signIn: "/", error: "/" },
//   session: { strategy: "jwt" },
//   secret:  process.env.NEXTAUTH_SECRET,
// };



"use client";

export type JwtPayload = {
  sub?: string;
  name?: string;       // ✅ add this
  role?: "ADMIN" | "EMPLOYEE" | "TRAINER";
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
        .join("")
    );
    return JSON.parse(jsonPayload) as JwtPayload;
  } catch {
    return null;
  }
}

export function getPayload(): JwtPayload | null {
  const token = getAccessToken();
  return token ? decodeToken(token) : null;
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