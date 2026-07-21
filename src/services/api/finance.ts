import { env } from "@/lib/env";
import { apiClient } from "./client";
import { mockInvoices } from "@/services/mock-data";
import type { Invoice } from "@/types";

async function mockDelay(ms = 300) {
  await new Promise((r) => setTimeout(r, ms));
}

export const financeApi = {
  async listInvoices(): Promise<Invoice[]> {
    if (env.useMockApi) {
      await mockDelay();
      return [...mockInvoices];
    }
    return apiClient<Invoice[]>("/finance/invoices");
  },

  async getInvoice(id: string): Promise<Invoice | null> {
    if (env.useMockApi) {
      await mockDelay(150);
      return mockInvoices.find((i) => i.id === id) ?? null;
    }
    return apiClient<Invoice | null>(`/finance/invoices/${id}`);
  },

  async createInvoice(payload: Partial<Invoice>): Promise<Invoice> {
    if (env.useMockApi) {
      await mockDelay(200);
      return { id: `INV-${Math.floor(Math.random() * 100000)}`, customerName: payload.customerName ?? "", amount: payload.amount ?? 0, status: payload.status ?? "Pending", dueDate: payload.dueDate ?? new Date().toISOString() } as Invoice;
    }
    return apiClient<Invoice>("/finance/invoices", { method: "POST", body: payload });
  },

  // Payments, quotations, expenses are not mocked yet — return sensible empty shapes.
  async listPayments(): Promise<unknown[]> {
    if (env.useMockApi) {
      await mockDelay(120);
      return [];
    }
    return apiClient<unknown[]>("/finance/payments");
  },
};
