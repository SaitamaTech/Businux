import { env } from "@/lib/env";
import { apiClient } from "./client";
import type { Product } from "@/types";

async function mockDelay(ms = 300) {
  await new Promise((r) => setTimeout(r, ms));
}

export const inventoryApi = {
  async listProducts(): Promise<Product[]> {
    if (env.useMockApi) {
      await mockDelay();
      return [];
    }
    return apiClient<Product[]>("/inventory/products");
  },

  async getProduct(id: string): Promise<Product | null> {
    if (env.useMockApi) {
      await mockDelay(150);
      return null;
    }
    return apiClient<Product | null>(`/inventory/products/${id}`);
  },
};
