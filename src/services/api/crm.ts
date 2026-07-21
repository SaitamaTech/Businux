import { env } from "@/lib/env";
import { apiClient } from "./client";
import { mockCustomers, mockDeals } from "@/services/mock-data";
import type { Company, Contact, Deal } from "@/types";

async function mockDelay(ms = 300) {
  await new Promise((r) => setTimeout(r, ms));
}

export const crmApi = {
  async listCompanies(): Promise<Company[]> {
    if (env.useMockApi) {
      await mockDelay();
      return mockCustomers.map((c) => ({ id: c.id, name: c.name, industry: c.industry, address: c.address, phone: c.phone, email: c.email }));
    }
    return apiClient<Company[]>("/crm/companies");
  },

  async getCompany(id: string): Promise<Company | null> {
    if (env.useMockApi) {
      await mockDelay(150);
      const c = mockCustomers.find((m) => m.id === id);
      return c ? { id: c.id, name: c.name, industry: c.industry, address: c.address, phone: c.phone, email: c.email } : null;
    }
    return apiClient<Company | null>(`/crm/companies/${id}`);
  },

  async listDeals(companyId?: string): Promise<Deal[]> {
    if (env.useMockApi) {
      await mockDelay();
      return companyId ? mockDeals.filter((d) => d.customerId === companyId) : [...mockDeals];
    }
    return apiClient<Deal[]>(`/crm/deals${companyId ? `?companyId=${companyId}` : ""}`);
  },

  async createDeal(payload: Partial<Deal>): Promise<Deal> {
    if (env.useMockApi) {
      await mockDelay(200);
      return { id: crypto.randomUUID(), customerId: payload.customerId ?? "", title: payload.title ?? "New Deal", stage: (payload.stage as Deal["stage"]) ?? "Lead", value: payload.value ?? 0 } as Deal;
    }
    return apiClient<Deal>("/crm/deals", { method: "POST", body: payload });
  },

  async getContact(id: string): Promise<Contact | null> {
    if (env.useMockApi) {
      await mockDelay(120);
      return null;
    }
    return apiClient<Contact | null>(`/crm/contacts/${id}`);
  },

  async updateContact(id: string, payload: Partial<Contact>): Promise<Contact> {
    if (env.useMockApi) {
      await mockDelay(150);
      return { id, ...payload } as Contact;
    }
    return apiClient<Contact>(`/crm/contacts/${id}`, { method: "PUT", body: payload });
  },

  async deleteContact(id: string): Promise<void> {
    if (env.useMockApi) {
      await mockDelay(120);
      return;
    }
    await apiClient<void>(`/crm/contacts/${id}`, { method: "DELETE" });
  },

  async getDeal(id: string): Promise<Deal | null> {
    if (env.useMockApi) {
      await mockDelay(120);
      return mockDeals.find((d) => d.id === id) ?? null;
    }
    return apiClient<Deal | null>(`/crm/deals/${id}`);
  },

  async updateDeal(id: string, payload: Partial<Deal>): Promise<Deal> {
    if (env.useMockApi) {
      await mockDelay(150);
      return { id, ...payload } as Deal;
    }
    return apiClient<Deal>(`/crm/deals/${id}`, { method: "PUT", body: payload });
  },

  async deleteDeal(id: string): Promise<void> {
    if (env.useMockApi) {
      await mockDelay(120);
      return;
    }
    await apiClient<void>(`/crm/deals/${id}`, { method: "DELETE" });
  },

  // Contacts: lightweight stubs — mock data not present in dataset yet.
  async listContacts(companyId?: string): Promise<Contact[]> {
    if (env.useMockApi) {
      await mockDelay(120);
      return [];
    }
    return apiClient<Contact[]>(`/crm/contacts${companyId ? `?companyId=${companyId}` : ""}`);
  },
  async createContact(payload: Partial<Contact>): Promise<Contact> {
    if (env.useMockApi) {
      await mockDelay(150);
      return { id: crypto.randomUUID(), firstName: payload.firstName ?? "", lastName: payload.lastName ?? "", email: payload.email, phone: payload.phone, companyId: payload.companyId } as Contact;
    }
    return apiClient<Contact>("/crm/contacts", { method: "POST", body: payload });
  },
};
