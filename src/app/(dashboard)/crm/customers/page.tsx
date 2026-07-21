"use client";
import Link from "next/link";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/providers/toast-provider";
import { useCustomers, customerKeys } from "@/hooks/use-customers";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateItemDialog } from "@/components/shared/create-item-dialog";
import { customersApi } from "@/services/api/customers";
import type { Customer } from "@/types";
import { formatNaira } from "@/lib/format";

const statusVariant: Record<Customer["status"], "success" | "secondary" | "warning"> = {
  Active: "success",
  Inactive: "secondary",
  Lead: "warning",
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const { data: customers, isLoading, isError } = useCustomers({ search });
  const queryClient = useQueryClient();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  return (
    <DashboardShell title="Customers" subtitle="Manage your customer relationships and deals.">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input aria-label="Search customers" placeholder="Search customers..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <CreateItemDialog
          triggerLabel="Add Customer"
          title="Create Customer"
          description="Add a new company or individual to your CRM."
          fields={[
            { name: "name", label: "Name", required: true, placeholder: "Company or person name" },
            { name: "industry", label: "Industry", placeholder: "Industry" },
            { name: "email", label: "Email", placeholder: "Email" },
            { name: "phone", label: "Phone", placeholder: "Phone" },
          ]}
            onSubmit={async (values) => {
            await customersApi.create({ name: values.name, industry: values.industry, email: values.email, phone: values.phone });
            queryClient.invalidateQueries({ queryKey: customerKeys.all });
            toast.success({ title: "Customer created", description: `${values.name} was added.` });
            setPage(1);
          }}
        />
      </div>

      {isError && <div className="text-sm text-destructive">Failed to load customers.</div>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-full animate-pulse bg-muted/40">
              <CardContent className="p-5">&nbsp;</CardContent>
            </Card>
          ))}

        {!isLoading &&
          (customers ?? []).slice((page - 1) * pageSize, page * pageSize).map((c) => (
            <Link key={c.id} href={`/crm/customers/${c.id}`} className="block">
              <Card className="h-full transition-shadow hover:shadow-card-hover">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{c.name.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold leading-tight">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.industry}</p>
                      </div>
                    </div>
                    <Badge variant={statusVariant[c.status]}>{c.status}</Badge>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Value</p>
                      <p className="font-semibold">{formatNaira(c.totalValue, { compact: true })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Deals</p>
                      <p className="font-semibold">{c.totalDeals}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.tags?.slice(0, 2).map((t) => (
                      <Badge key={t} variant="outline" className="text-[10px]">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Page {page} of {Math.max(1, Math.ceil((customers?.length ?? 0) / pageSize))}</div>
        <div className="flex items-center gap-2">
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="rounded border px-2 py-1 text-sm">
            <option value={6}>6 / page</option>
            <option value={9}>9 / page</option>
            <option value={12}>12 / page</option>
          </select>
          <div className="flex gap-2">
            <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
            <Button variant="outline" disabled={page >= Math.ceil((customers?.length ?? 0) / pageSize)} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
