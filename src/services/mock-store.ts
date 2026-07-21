import type { Customer, Project } from "@/types";

const STORAGE_KEY_PREFIX = "businux-mock-data";

interface UserMockStore {
  customers: Customer[];
  projects: Project[];
  tutorialSkipped: boolean;
}

const DEFAULT_STORE: UserMockStore = {
  customers: [],
  projects: [],
  tutorialSkipped: false,
};

function getCurrentUserId() {
  if (typeof window === "undefined") return "guest";

  try {
    const raw = window.localStorage.getItem("businux-auth");
    if (!raw) return "guest";
    const parsed = JSON.parse(raw) as { state?: { user?: { id?: string } } } | { user?: { id?: string } };
    return parsed?.state?.user?.id ?? parsed?.user?.id ?? "guest";
  } catch {
    return "guest";
  }
}

function getStorageKey() {
  return `${STORAGE_KEY_PREFIX}:${getCurrentUserId()}`;
}

function readStore(): UserMockStore {
  if (typeof window === "undefined") return DEFAULT_STORE;

  const key = getStorageKey();
  const raw = window.localStorage.getItem(key);
  if (!raw) return { ...DEFAULT_STORE };

  try {
    return JSON.parse(raw) as UserMockStore;
  } catch {
    return { ...DEFAULT_STORE };
  }
}

function writeStore(store: UserMockStore) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getStorageKey(), JSON.stringify(store));
}

export function getPersistedCustomers(): Customer[] {
  return readStore().customers;
}

export function hasDismissedTutorial(): boolean {
  return readStore().tutorialSkipped;
}

export function setDismissedTutorial(value: boolean) {
  const store = readStore();
  store.tutorialSkipped = value;
  writeStore(store);
}

export function addPersistedCustomer(payload: Partial<Customer>): Customer {
  const now = new Date().toISOString().slice(0, 10);
  const nextCustomer: Customer = {
    id: crypto.randomUUID(),
    name: payload.name?.trim() || "New Customer",
    type: payload.type ?? "Company",
    industry: payload.industry?.trim() || "Not specified",
    email: payload.email?.trim() || "hello@example.com",
    phone: payload.phone?.trim() || "",
    address: payload.address?.trim() || "",
    status: payload.status ?? "Lead",
    tags: payload.tags ?? [],
    totalDeals: payload.totalDeals ?? 0,
    totalValue: payload.totalValue ?? 0,
    wonDeals: payload.wonDeals ?? 0,
    lastContact: payload.lastContact ?? now,
    customerSince: payload.customerSince ?? now,
  };

  const store = readStore();
  store.customers = [...store.customers, nextCustomer];
  writeStore(store);
  return nextCustomer;
}

export function getPersistedProjects(): Project[] {
  return readStore().projects;
}

export function addPersistedProject(payload: Partial<Project>): Project {
  const nextProject: Project = {
    id: crypto.randomUUID(),
    name: payload.name?.trim() || "New Project",
    progress: payload.progress ?? 0,
    status: payload.status ?? "In Progress",
  };

  const store = readStore();
  store.projects = [...store.projects, nextProject];
  writeStore(store);
  return nextProject;
}
