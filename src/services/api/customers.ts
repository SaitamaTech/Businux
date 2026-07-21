import { env } from "@/lib/env";
import { apiClient } from "./client";
import { mockDeals, mockActivity } from "@/services/mock-data";
import { getPersistedCustomers, addPersistedCustomer } from "@/services/mock-store";
import type { Customer, Deal, ActivityItem } from "@/types";
import type { CustomerListParams } from "@/types/api";

async function mockDelay(ms = 350) {
  await new Promise((r) => setTimeout(r, ms));
}

function filterCustomers(customers: Customer[], params: CustomerListParams) {
  let results = [...customers];
  if (params.search) {
    const q = params.search.toLowerCase();
    results = results.filter((c) => c.name.toLowerCase().includes(q));
  }
  if (params.status) {
    results = results.filter((c) => c.status === params.status);
  }
  return results;
}

export const customersApi = {
  async list(params: CustomerListParams = {}): Promise<Customer[]> {
    if (env.useMockApi) {
      await mockDelay();
      const results = getPersistedCustomers();
      return filterCustomers(results, params);
    }
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return apiClient<Customer[]>(`/customers${query ? `?${query}` : ""}`);
  },

  async getById(id: string): Promise<Customer | null> {
    if (env.useMockApi) {
      await mockDelay();
      return getPersistedCustomers().find((c) => c.id === id) ?? null;
    }
    return apiClient<Customer | null>(`/customers/${id}`);
  },

  async getDeals(customerId: string): Promise<Deal[]> {
    if (env.useMockApi) {
      await mockDelay(250);
      return mockDeals.filter((d) => d.customerId === customerId);
    }
    return apiClient<Deal[]>(`/customers/${customerId}/deals`);
  },

  async getActivity(customerId: string): Promise<ActivityItem[]> {
    if (env.useMockApi) {
      await mockDelay(250);
      // Mock data isn't per-customer yet — every customer shares the same feed.
      return mockActivity;
    }
    return apiClient<ActivityItem[]>(`/customers/${customerId}/activity`);
  },

  async create(payload: Partial<Customer>): Promise<Customer> {
    if (env.useMockApi) {
      await mockDelay();
      return addPersistedCustomer(payload);
    }
    return apiClient<Customer>("/customers", { method: "POST", body: payload });
  },
};
