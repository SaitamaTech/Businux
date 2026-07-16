import { env } from "@/lib/env";
import { apiClient } from "./client";
import { mockCustomers, mockDeals, mockActivity } from "@/services/mock-data";
import type { Customer, Deal, ActivityItem } from "@/types";
import type { CustomerListParams } from "@/types/api";

async function mockDelay(ms = 350) {
  await new Promise((r) => setTimeout(r, ms));
}

export const customersApi = {
  async list(params: CustomerListParams = {}): Promise<Customer[]> {
    if (env.useMockApi) {
      await mockDelay();
      let results = [...mockCustomers];
      if (params.search) {
        const q = params.search.toLowerCase();
        results = results.filter((c) => c.name.toLowerCase().includes(q));
      }
      if (params.status) {
        results = results.filter((c) => c.status === params.status);
      }
      return results;
    }
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return apiClient<Customer[]>(`/customers${query ? `?${query}` : ""}`);
  },

  async getById(id: string): Promise<Customer | null> {
    if (env.useMockApi) {
      await mockDelay();
      return mockCustomers.find((c) => c.id === id) ?? null;
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
      return { ...mockCustomers[0], ...payload, id: crypto.randomUUID() } as Customer;
    }
    return apiClient<Customer>("/customers", { method: "POST", body: payload });
  },
};
