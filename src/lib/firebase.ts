"use client";

import { initializeApp, getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import type { User } from "@/types";
import { env } from "./env";

type FirebaseConfig = {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
};

const fallbackFirebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyDU8NjwOu2JflgFaJeP_vQgb8ZIauhnwfo",
  authDomain: "businux.firebaseapp.com",
  projectId: "businux",
  storageBucket: "businux.firebasestorage.app",
  messagingSenderId: "640575692715",
  appId: "1:640575692715:web:17a29338530123473cfcee",
};

function getFirebaseConfig(): FirebaseConfig {
  return {
    ...fallbackFirebaseConfig,
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? fallbackFirebaseConfig.apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? fallbackFirebaseConfig.authDomain,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? fallbackFirebaseConfig.projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? fallbackFirebaseConfig.storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? fallbackFirebaseConfig.messagingSenderId,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? fallbackFirebaseConfig.appId,
  };
}

function initApp() {
  if (!env.useFirebase) return null;
  if (typeof window === "undefined") return null;
  if (!getApps().length) {
    initializeApp(getFirebaseConfig());
  }
  return getApps()[0];
}

function getFirebaseAuth() {
  const app = initApp();
  if (!app) throw new Error("Firebase is not enabled or not initialized");
  return getAuth(app);
}

export function mapFirebaseUser(user: FirebaseUser | null): User | null {
  if (!user) return null;
  return {
    id: user.uid,
    name: user.displayName ?? user.email?.split("@")[0] ?? "Admin User",
    email: user.email ?? "",
    role: "Administrator",
    companyName: "Businux",
    avatarUrl: user.photoURL ?? undefined,
  };
}

export async function firebaseSignup(email: string, password: string, displayName?: string) {
  const auth = getFirebaseAuth();
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) await updateProfile(cred.user, { displayName });
  return mapFirebaseUser(cred.user);
}

export async function firebaseLogin(email: string, password: string) {
  const auth = getFirebaseAuth();
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return mapFirebaseUser(cred.user);
}

export async function firebaseLogout() {
  const auth = getFirebaseAuth();
  await signOut(auth);
}

export async function firebaseUpdateProfile(updates: { displayName?: string; photoURL?: string | null }) {
  const auth = getFirebaseAuth();
  if (!auth.currentUser) throw new Error("No active Firebase user.");
  await updateProfile(auth.currentUser, updates);
  await auth.currentUser.reload();
  return mapFirebaseUser(auth.currentUser);
}

export function firebaseOnAuthStateChanged(callback: (user: User | null) => void) {
  if (!env.useFirebase || typeof window === "undefined") {
    callback(null);
    return () => undefined;
  }
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, (user: FirebaseUser | null) => callback(mapFirebaseUser(user)));
}
