"use client";

import { createClient, type User as SupabaseUser } from "@supabase/supabase-js";
import { env } from "./env";
import type { User } from "@/types";

const supabase =
  env.useSupabase && typeof window !== "undefined"
    ? createClient(env.supabaseUrl, env.supabaseAnonKey, {
        auth: { persistSession: true, detectSessionInUrl: true },
      })
    : null;

export function mapSupabaseUser(user: SupabaseUser | null): User | null {
  if (!user) return null;

  const metadata = user.user_metadata as Record<string, unknown> | null;

  return {
    id: user.id,
    name: (metadata?.full_name as string) || user.email?.split("@")[0] || "User",
    email: user.email ?? "",
    role: "Administrator",
    companyName: (metadata?.company as string) || "Businux",
    avatarUrl: (metadata?.avatar_url as string) ?? undefined,
    orgId: (metadata?.org_id as string) ?? undefined,
  };
}

export async function supabaseGetUser(): Promise<User | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return mapSupabaseUser(data?.session?.user ?? null);
}

export async function supabaseSignInWithGoogle(): Promise<void> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${env.siteUrl}/dashboard`,
    },
  });

  if (error) throw error;
}

export async function supabaseLoginWithEmail(email: string, password: string): Promise<User | null> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;

  return mapSupabaseUser(data.session?.user ?? null);
}

export async function supabaseSignupWithEmail(email: string, password: string, fullName?: string): Promise<User | null> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;
  return mapSupabaseUser(data.user ?? null);
}

export async function supabaseSignOut(): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function supabaseOnAuthStateChanged(callback: (user: User | null) => void) {
  if (!supabase) return () => {};

  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(mapSupabaseUser(session?.user ?? null));
  });

  return () => data.subscription?.unsubscribe();
}
