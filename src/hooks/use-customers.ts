import { useQuery } from "@tanstack/react-query";
import { customersApi } from "@/services/api";
import type { CustomerListParams } from "@/types/api";

/**
 * Query key factory — keeps cache keys consistent across the app so
 * invalidation (e.g. after creating a customer) is reliable. Import these
 * instead of typing ["customers", ...] by hand elsewhere.
 */
export const customerKeys = {
  all: ["customers"] as const,
  list: (params: CustomerListParams) => [...customerKeys.all, "list", params] as const,
  detail: (id: string) => [...customerKeys.all, "detail", id] as const,
  deals: (id: string) => [...customerKeys.all, "deals", id] as const,
  activity: (id: string) => [...customerKeys.all, "activity", id] as const,
};

export function useCustomers(params: CustomerListParams = {}) {
  return useQuery({
    queryKey: customerKeys.list(params),
    queryFn: () => customersApi.list(params),
  });
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => customersApi.getById(id),
    enabled: !!id,
  });
}

export function useCustomerDeals(id: string) {
  return useQuery({
    queryKey: customerKeys.deals(id),
    queryFn: () => customersApi.getDeals(id),
    enabled: !!id,
  });
}

export function useCustomerActivity(id: string) {
  return useQuery({
    queryKey: customerKeys.activity(id),
    queryFn: () => customersApi.getActivity(id),
    enabled: !!id,
  });
}
