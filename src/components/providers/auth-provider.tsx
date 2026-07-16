"use client";
import { createContext, useContext } from "react";
import { useAuthStore } from "@/store/auth-store";
import type { User } from "@/types";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue>({ user: null, isAuthenticated: false });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return <AuthContext.Provider value={{ user, isAuthenticated }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
